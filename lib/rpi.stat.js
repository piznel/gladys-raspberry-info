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
      usb: rpi.deviceUsb,
      last: rpi.lastConnected,
      connexion: rpi.connexion
  }
  return Promise.resolve(statistic)
}