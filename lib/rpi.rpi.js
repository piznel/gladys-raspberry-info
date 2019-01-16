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
      cpu: cpu.split('=')[1].replace('M',''),
      gpu: gpu.split('=')[1].replace('M','')
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
    let ipExterne = exec('curl ipinfo.io/ip').replace(/\n/g, "");
    let ipLocal = {}

    Object.keys(networkInterfaces).forEach(function(ifname) {
      var alias = 0;

      networkInterfaces[ifname].forEach(function(iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          ipLocal.push({
            name: ifname + ', alias "' + alias + '"',
            address: iface.address
          })
        } else {
          // this interface has only one ipv4 adress
          ipLocal.push({
            name: ifname,
            address: iface.address
          })
        }
        ++alias;
      });
    });
    return {
      hostname: hostname,
      ipExterne: ipExterne,
      ipLocal: ipLocal
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
      coreFrenquency[i] = read(`/sys/devices/system/cpu/cpu${i}/cpufreq/scaling_cur_freq`) / 1000 + ' MHz';
    }
    return coreFrenquency
  }

  get uptime() {
    var uptime = read('/proc/uptime');
    var arr = uptime.split(' ');
    return {
      total: (arr[0]).toHHMMSS(),
      idle: (arr[1]).toHHMMSS()
    };
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
    const memInfo = read('/proc/meminfo');
    const INFO_MATCH_REGEXP = /^(.*?)\s*:\s*(\d+)/;
    return memInfo.split('\n').reduce((info, line) => {
      var matched = line.match(INFO_MATCH_REGEXP);
      if (matched) {
        info[matched[1]] = +matched[2] || 0;
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
      if (matched) {
        info[matched[1]] = {
          received: read(`/sys/class/net/${matched[1]}/statistics/rx_bytes`).replace(/\n/g, ''),
          transmit: read(`/sys/class/net/${matched[1]}/statistics/tx_bytes`).replace(/\n/g, ''),
          errorRx: read(`/sys/class/net/${matched[1]}/statistics/rx_errors`).replace(/\n/g, ''),
          errorTx: read(`/sys/class/net/${matched[1]}/statistics/tx_errors`).replace(/\n/g, ''),
          droppedRx: read(`/sys/class/net/${matched[1]}/statistics/rx_dropped`).replace(/\n/g, ''),
          collisionsTx: read(`/sys/class/net/${matched[1]}/statistics/collisions`).replace(/\n/g, '')
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
      total: +info[1],
      used: +info[2],
      free: +info[3]
    };
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


module.exports = new Proc();