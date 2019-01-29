const rpi = require('./rpi.rpi.js');

module.exports = function() {
  require('events').EventEmitter.defaultMaxListeners = 15;
  setInterval(function() {
    gladys.socket.emit('CPU_STAT', {
        temperature: rpi.temperature.cpu,
        voltage: rpi.voltageCpu,
        usage: rpi.cpuUsage,
        ram:rpi.memory.memoryAvailable/rpi.memory.memoryTotal*100
    })
  }, 1500);


  setInterval(function() {
    gladys.socket.emit('PORT_STAT', rpi.openPort)
  }, 1000 * 10);


}
