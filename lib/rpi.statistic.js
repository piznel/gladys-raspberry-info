const rpi = require('./rpi.rpi.js');
const shared = require('./rpi.shared.js')

module.exports = function() {
  let statistic = [];
  let wifi = false;

  statistic.disk = rpi.disk;
  statistic.uptime = rpi.uptime;
  statistic.memory = rpi.memory;

  let net = rpi.net;

  for (let face in net) {
    let traffic = parseInt(face.received) + parseInt(face.transmit)
    if (traffic > 0) {
      statistic.net[face.face] = face
      if (face.face.charAt(0) === 'w') {
        wifi = true;
      }
    }
  }

  if (wifi) statistic.wifi = rpi.statWifi

  return statistic
}