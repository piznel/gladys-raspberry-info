const rpi = require('./rpi.rpi.js');
const shared = require('./rpi.shared.js');

module.exports = function() {
  require('events').EventEmitter.defaultMaxListeners = 15;
  setInterval(function() {
    gladys.socket.emit('CPU_STAT', {
      temperature: rpi.temperature.cpu,
      voltage: rpi.voltageCpu,
      usage: rpi.cpuUsage,
      ram: rpi.memory.memoryAvailable / rpi.memory.memoryTotal * 100
    })
  }, 1500);

  setInterval(function() {
    let openPorts = rpi.openPort;
    let listBox = shared.box;
    let resultPort = {};
    for (id in listBox) {
      let listPort = listBox[id].params;
      listPort.forEach((port => {
        resultPort[port] = openPorts.includes(port.toString())
      }))
    }
    gladys.socket.emit('PORT_STAT', resultPort)
  }, 1000 * 10);


}