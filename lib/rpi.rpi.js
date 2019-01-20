const fs = require('fs');
const childProcess = require('child_process');
const os = require('os');
const networkInterfaces = os.networkInterfaces();

function read(filepath) {
  try {
    return fs.readFileSync(filepath, { encoding: 'utf-8' });
  } catch (e) {
    // treat error as an empty file.
    return '';
  }
}

function exec(command) {
  try {
    return childProcess.execSync(command).toString();
  } catch (e) {
    // treat execute error as empty.
    return '';
  }
}

class Proc {
  constructor() {
    this._cache = {};
    this.interface = [];
    this.temperature = {
      get cpu() {
        return Math.round(read('/sys/class/thermal/thermal_zone0/temp') / 100) / 10;
      },
      get gpu() {
        const temp = exec('/opt/vc/bin/vcgencmd measure_temp');
        return parseFloat(temp.replace('temp=', ''));
      }
    };
  }

  toString() {
    return JSON.stringify(this.info, null, 2);
  }

  get memoryDistribution() {
    const cpu = exec('/opt/vc/bin/vcgencmd get_mem arm').replace('\n', '');
    const gpu = exec('/opt/vc/bin/vcgencmd get_mem gpu').replace('\n', '');
    return {
      cpu: cpu.split('=')[1].replace('M', ''),
      gpu: gpu.split('=')[1].replace('M', '')
    }
  }

  get core() {
    if (this._cache.core) {
      return this._cache.core;
    }
    const cpuInfo = read('/proc/cpuinfo');
    return (this._cache.core = {
      count: (cpuInfo.match(/^model name\s*:/gim) || []).length,
      model: (cpuInfo.match(/^model name\s*:\s*(.*)$/im) || [])[1] || '',
      serial: (cpuInfo.match(/^serial\s*:\s*(.*)$/im) || [])[1] || '',
      revision: (cpuInfo.match(/^revision\s*:\s*(.*)/im) || [])[1] || ''
    });
  }


  get voltageCpu() {
    let voltage = exec('/opt/vc/bin/vcgencmd measure_volts');
    voltage = voltage.replace('V', '').split('=')
    return voltage[1]
  }

  get sys() {
    let os = read('/proc/sys/kernel/ostype').replace(/\n/g, "");
    let release = read('/proc/sys/kernel/osrelease').replace(/\n/g, "");
    return {
      os: os,
      release: release
    }
  }

  get network() {
    let hostname = read('/proc/sys/kernel/hostname').replace(/\n/g, "");
    let ip_externe = exec('curl ipinfo.io/ip').replace(/\n/g, "");
    let ip_local = []

    Object.keys(networkInterfaces).forEach(function(ifname) {
      var alias = 0;

      networkInterfaces[ifname].forEach(function(iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          ip_local.push({
            name: ifname + ', alias "' + alias + '"',
            address: iface.address
          })
        } else {
          // this interface has only one ipv4 adress
          ip_local.push({
            name: ifname,
            address: iface.address
          })
        }
        ++alias;
      });
    });
    return {
      hostname: hostname,
      ip_externe: ip_externe,
      ip_local: ip_local
    }
  }

  get model() {
    return read('/proc/device-tree/model');
  }

  get frequency() {
    let i = 0
    let coreNumber = (read('/proc/cpuinfo').match(/^model name\s*:/gim) || []).length;
    let coreFrenquency = {}
    for (i = 0; i < coreNumber; i++) {
      coreFrenquency[i] = read(`/sys/devices/system/cpu/cpu${i}/cpufreq/scaling_cur_freq`) / 1000;
    }
    return coreFrenquency
  }

  get uptime() {
    var uptime = read('/proc/uptime');
    var arr = uptime.split(' ');
    var localtime = exec('zdump /etc/localtime');
    var match = localtime.match(/^\/etc\/localtime\s*(.*)$/im);

    return {
      total: (arr[0]).toHHMMSS(),
      idle: (arr[1]).toHHMMSS(),
      gdh: match[1]
    };
  }

  get statWifi() {
    let wifi = {};
    for (let index in this.interface) {
      if (this.interface[index].charAt(0) === 'w') {
        let match = '';

        const block = exec(`iwconfig ${this.interface[index]}`);
        let parsed = { interface: block.match(/^([^\s]+)/)[1] };
        let key = parsed.interface;

        if ((match = block.match(/Access Point:\s*([A-Fa-f0-9:]{17})/))) {
          parsed.access_point = match[1].toLowerCase();
        }

        if ((match = block.match(/Frequency[:|=]\s*([0-9\.]+)/))) {
          parsed.frequency = parseFloat(match[1]);
        }

        if ((match = block.match(/IEEE\s*([^\s]+)/))) {
          parsed.ieee = match[1].toLowerCase();
        }

        if ((match = block.match(/Mode[:|=]\s*([^\s]+)/))) {
          parsed.mode = match[1].toLowerCase();
        }

        if ((match = block.match(/Noise level[:|=]\s*(-?[0-9]+)/))) {
          parsed.noise = parseInt(match[1], 10);
        }

        if ((match = block.match(/Link Quality[:|=]\s*([\d\/\d]+)/))) {
          parsed.quality = match[1];
        }

        if ((match = block.match(/Sensitivity[:|=]\s*([0-9]+)/))) {
          parsed.sensitivity = parseInt(match[1], 10);
        }

        if ((match = block.match(/Signal level[:|=]\s*(-?[0-9]+)/))) {
          parsed.signal = parseInt(match[1], 10);
        }

        if ((match = block.match(/Bit Rate[:|=]\s*([0-9\.]+)/))) {
          parsed.bitrate = parseFloat(match[1]);
        }

        if ((match = block.match(/ESSID[:|=]\s*"([^"]+)"/))) {
          parsed.ssid = match[1];
        }

        if ((match = block.match(/unassociated/))) {
          parsed.unassociated = true;
        }
        wifi[key] = parsed;
      }
    }
    return wifi
  }

  get stat() {
    const stat = read('/proc/stat');
    const arr = (stat.split('\n')[0] || '').split(/\s+/).map(num => +num);
    return {
      user: arr[1],
      nice: arr[2],
      system: arr[3],
      idle: arr[4],
      iowait: arr[5],
      irq: arr[6],
      softirq: arr[7],
      steal: arr[8],
      guest: arr[9],
      guestNice: arr[10]
    };
  }

  get memory() {
    const memInfo = exec('egrep \'Mem|Cache|Swap|Buffers\' /proc/meminfo');
    const INFO_MATCH_REGEXP = /^(.*?)\s*:\s*(\d+)/;
    return memInfo.split('\n').reduce((info, line) => {
      var matched = line.match(INFO_MATCH_REGEXP);
      if (matched) {
        info[matched[1]] = formatBytes(matched[2] * 1024 || 0, 2);
      }
      return info;
    }, {});
  }

  get loadAvg() {
    const loadAvg = read('/proc/loadavg');
    const arr = loadAvg.split(' ');
    return {
      1: +arr[0] || 0,
      5: +arr[1] || 0,
      15: +arr[2] || 0
    };
  }

  get net() {
    const net = read('/proc/net/dev');
    const eths = net.split('\n').slice(2);
    const NET_INFO_MATCH_STR = /^\s*(.*?):\s*(\d+)(?:\s*\d+){7}\s*(\d+)/;
    return eths.reduce((info, str) => {
      const matched = str.match(NET_INFO_MATCH_STR);
      if (matched && matched[1] !== 'lo') {
        this.interface.push(matched[1])
        info[matched[1]] = {
          face: matched[1],
          received: formatBytes(read(`/sys/class/net/${matched[1]}/statistics/rx_bytes`).replace(/\n/g, ''), 2),
          transmit: formatBytes(read(`/sys/class/net/${matched[1]}/statistics/tx_bytes`).replace(/\n/g, ''), 2),
          errorRx: formatBytes(read(`/sys/class/net/${matched[1]}/statistics/rx_errors`).replace(/\n/g, ''), 2),
          errorTx: formatBytes(read(`/sys/class/net/${matched[1]}/statistics/tx_errors`).replace(/\n/g, ''), 2),
          droppedRx: formatBytes(read(`/sys/class/net/${matched[1]}/statistics/rx_dropped`).replace(/\n/g, ''), 2),
          collisionsTx: formatBytes(read(`/sys/class/net/${matched[1]}/statistics/collisions`).replace(/\n/g, ''), 2)
        };
      }
      return info;
    }, {});
  }

  get disk() {
    const df = exec('df');
    const info = df
      .trim()
      .split('\n')
      .slice(1)
      .map(str => str.trim().split(/\s+/g))
      .filter(arr => {
        return arr[arr.length - 1] === '/';
      })[0];
    if (!info) return null;
    return {
      total: formatBytes(info[1] * 1024, 2),
      used: formatBytes(info[2] * 1024, 2),
      free: formatBytes(info[3] * 1024, 2),
      per_cent: info[4]
    };
  }

  get deviceUsb() {
    let devices = []
    const listDevices = exec('find /sys/bus/usb/devices/usb*/ -name dev')

    listDevices.split('\n').forEach((line) => {
      let syspath = line.slice(0, -4);
      let devname = exec(`udevadm info -q name -p ${syspath}`);
      if (!devname.match(/^bus/)) {

        let results = exec(`udevadm info -q property --export -p ${syspath}`)
        //console.log(results)
        var temp = {
          devname: (results.match(/^DEVNAME\s*='\s*(.*)'$/m) || [])[1] || '',
          devtype: (results.match(/^DEVTYPE\s*='\s*(.*)'$/m) || [])[1] || '',
          class: (results.match(/^ID_USB_CLASS_FROM_DATABASE\s*='\s*(.*)'$/m) || [])[1] || '',
          serial: (results.match(/^ID_SERIAL\s*='\s*(.*)'$/m) || [])[1] || '',
          serial_short: (results.match(/^ID_SERIAL_SHORT\s*='\s*(.*)'$/m) || [])[1] || '',
          model: (results.match(/^ID_MODEL_FROM_DATABASE\s*='\s*(.*)'$/m) || [])[1] || '',
          model_enc: (results.match(/^ID_MODEL_ENC\s*='\s*(.*)'$/m) || [])[1] || '',
          vendor: (results.match(/^ID_VENDOR\s*='\s*(.*)'$/m) || [])[1] || '',
          vendor_from_db: (results.match(/^ID_VENDOR_FROM_DATABASE\s*='\s*(.*)'$/m) || [])[1] || ''
        }
        if (temp.serial !== '') {
          devices.push(temp)
        }
      }
    })
    return devices
  }

  get info() {
    const temperature = this.temperature;
    return {
      core: this.core,
      uptime: this.uptime,
      temperature: {
        cpu: temperature.cpu,
        gpu: temperature.gpu
      },
      stat: this.stat,
      memory: this.memory,
      loadAvg: this.loadAvg,
      net: this.net,
      disk: this.disk
    };
  }
}

String.prototype.toHHMMSS = function() {
  let seconds = parseInt(this, 10);
  let numdays = Math.floor(seconds / 86400);
  let numhours = Math.floor((seconds % 86400) / 3600);
  let numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
  return numdays + " days " + numhours + " hours " + numminutes + " minutes ";
}

function formatBytes(a, b) {
  if (0 == a) return "0";
  var c = 1024,
    d = b || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

module.exports = new Proc();