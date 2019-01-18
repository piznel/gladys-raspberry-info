const rpi = require('./rpi.rpi.js');
const queries = require('./rpi.queries.js');

module.exports = function install() {

  return createDevice()
    .then(() => {
      return getModuleId()
    })
    .then((id) => {
      return createParam(id)
    })
    .catch((err) => {
      sails.log.error('Raspberry-info module : install failed with error ', err)
      return 'success'
    })
};

function createParam(id) {
  var param = {
    name: 'Info_RPi_Refresh_Time',
    value: 10,
    type: 'hidden',
    module: id,
    description: 'Raspberry information refresh time (in minutes)'
  }

  return gladys.param.getValue(param.name)
    .then(() => {
      return gladys.utils.sql(queries.updateIdParamRpiInfo, [param.module])
    })
    .catch(() => {
      return gladys.param.setValue(param)
    })
}

function getModuleId() {
  return gladys.module.get()
    .then(modules => {
      for (let module of modules) {
        if (module.slug == 'rpi-info') {
          return Promise.resolve(module.id)
        }
      }
    })
}

function createDevice() {
  let serial = rpi.core.serial.split('0');
  let id = serial[serial.length - 1];

  var newDevice = {
    device: {
      name: `Raspberry`,
      protocol: `info`,
      service: `rpi-info`,
      identifier: id
    },
    types: [{
        name: 'CPU Temperature',
        identifier: 'CPU_TEMP',
        type: 'multilevel',
        sensor: true,
        unit: '°C',
        min: 0,
        max: 100
      },
      {
        name: 'GPU Temperature',
        identifier: 'GPU_TEMP',
        type: 'multilevel',
        unit: '°C',
        min: 0,
        max: 100
      },
      {
        name: 'CPU voltage',
        identifier: 'CPU_VOLTAGE',
        type: 'multilevel',
        unit: 'V',
        min:0,
        max: 5
      }
    ]
  };

  return gladys.device.create(newDevice)
}