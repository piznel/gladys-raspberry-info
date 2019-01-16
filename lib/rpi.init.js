const rpi = require('./rpi.rpi.js');
const shared = require('./lib/rpi.shared.js')

module.exports = function init() {
  return initSharedValue()
    .then(() => {
      return gladys.param.getValue('Info_RPi_Refresh_Time')
    })
    .then((rpiFrequency) => {
      return shared.frequency = rpiFrequency
    });
};

function initSharedValue() {
  let model = rpi.model.replace('\u0000', '');
  let serial = rpi.core.serial.split('0');

  shared.core = rpi.core;
  shared.core.frequency = rpi.frequencyCpu;
  shared.model = shared.revision[shared.core.revision];
  if (model.length > 0) {
    shared.model.full_name = model
  }

  shared.memory = rpi.memoryDistribution;
  shared.system = rpi.sys;
  shared.id = serial[serial.length - 1];
  shared.network = rpi.network;

  return;
}