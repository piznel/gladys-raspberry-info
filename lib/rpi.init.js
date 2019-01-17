const rpi = require('./rpi.rpi.js');
const shared = require('./rpi.shared.js')
const rpi_update = require('./rpi.devices.update.js');

module.exports = function init() {
  return initSharedValue()
    .then(() => {
      return gladys.param.getValue('Info_RPi_Refresh_Time')
    })
    .then((rpiFrequency) => {
      return shared.frequency = rpiFrequency
    })
    .catch(() => {
      return shared.frequency = 1;
    })
    .then(() => {
      return rpi_update()
    })
};

function initSharedValue() {
  let model = rpi.model.replace('\u0000', '');
  let serial = rpi.core.serial.split('0');

  shared.core = rpi.core;
  shared.core.frequency = rpi.frequency[0];
  shared.core.temp_cpu = rpi.temperature.cpu;
  shared.core.temp_gpu = rpi.temperature.gpu;
  shared.core.voltage = rpi.voltageCpu;
  
  shared.model = shared.revision[shared.core.revision];
  if (model.length > 0) {
    shared.model.full_name = model
  } else {
    shared.model.full_name = 'Raspberry Pi ' + shared.model.model + ' Rev ' + shared.PCB_Revision
  }

  shared.memory = rpi.memoryDistribution;
  shared.model.memory = parseFloat(shared.memory.cpu) + parseFloat(shared.memory.gpu)
  shared.system = rpi.sys;
  shared.id = serial[serial.length - 1];
  shared.network = rpi.network;

  return Promise.resolve();
}