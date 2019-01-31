const rpi = require('./rpi.rpi.js');
const shared = require('./rpi.shared.js')
const rpi_update = require('./rpi.devices.update.js');
const rpi_box_update = require('./rpi.box.update.js');
const queries = require('./rpi.queries.js');

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
      return gladys.utils.sql(queries.rpiBox)
    })
    .then((response) => {
      if (response) {
        response.map((box) => {
          if (box.params && box.params.port) {
            shared.box[box.id] = { params: box.params.port }
          } else {
            shared.box[box.id] = { params: [8080, 80, 443, 3306, 22] }
            gladys.box.update({ id: box.id, params: { port: [8080, 80, 443, 3306, 22] } })
              .catch((err) => {
                sails.log.error(err)
              })
          }
        })
        rpi_box_update()
      }
      return rpi_update()
    })
    .catch((err) => sails.log.error(err));
};

function initSharedValue() {
  let model = rpi.model.replace('\u0000', '');
  let serial = rpi.core.serial.split('0');

  shared.core = rpi.core;
  shared.core.frequency = rpi.frequency[0];
  shared.core.temp_cpu = rpi.temperature.cpu;
  shared.core.temp_gpu = rpi.temperature.gpu;
  shared.core.voltage = rpi.voltageCpu;
  shared.core.usage = rpi.cpuUsage;

  if (shared.revision[shared.core.revision]) {
    shared.model = shared.revision[shared.core.revision];
    if (model && model.length > 0) {
      shared.model.full_name = model
    }
  }

  shared.memory = rpi.memoryDistribution;
  shared.model.memory = parseFloat(shared.memory.cpu) + parseFloat(shared.memory.gpu)
  shared.system = rpi.sys;
  shared.id = serial[serial.length - 1];
  shared.network = rpi.network;

  return Promise.resolve();
}