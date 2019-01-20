const rpi = require('./rpi.rpi.js');
const Promise = require('bluebird')

module.exports = function stat() {
  let statistic = {};

  statistic = {
      disk: rpi.disk,
      uptime: rpi.uptime,
      memory: rpi.memory,
      net: rpi.net,
      wifi: rpi.statWifi,
      usb: rpi.deviceUsb
  }
  return Promise.resolve(statistic)
}