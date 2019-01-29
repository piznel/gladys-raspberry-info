const rpi = require('./rpi.rpi.js');

module.exports = function() {
  setInterval(function() {
    gladys.socket.emit('CPU_STAT', {
        temperature: rpi.temperature.cpu,
        voltage: rpi.voltageCpu,
        usage: rpi.cpuUsage,
        ram:rpi.memory.memoryAvailable/rpi.memory.memoryTotal*100
    })
  }, 1000);
}
