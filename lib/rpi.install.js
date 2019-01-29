const rpi = require('./rpi.rpi.js');
const queries = require('./rpi.queries.js');

module.exports = function install() {

  const boxRaspberryInfo = {
    uuid: '9d3cdce8-2603-4d64-b9de-969ba2261a21',
    title: 'RPi info',
    path: 'api/hooks/rpi-info/views/rpi.box.ejs',
    view: 'dashboard'
  };

  return gladys.boxType.create(boxRaspberryInfo)
    .then((boxType) => {
      sails.log.debug(`RPi Info : box type created, with id ${boxType.id} !`);
      return createDevice()
    })
    .then(() => {
      return getModuleId()
    })
    .then((id) => {
      return createParam(id)
    })
    .catch((err) => {
      sails.log.error('RPi info : install failed with error ', err)
      return 'success'
    })
};

function createParam(id) {
  var param = {
    name: 'Info_RPi_Refresh_Time',
    value: 5,
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
  let id = rpi.core.serial;

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
        sensor: true,
        min: 0,
        max: 100
      },
      {
        name: 'CPU voltage',
        identifier: 'CPU_VOLTAGE',
        type: 'multilevel',
        unit: 'V',
        sensor: true,
        min: 0,
        max: 5
      },
      {
        name: 'CPU usage',
        identifier: 'CPU_USAGE',
        type: 'multilevel',
        unit: '%',
        sensor: true,
        min: 0,
        max: 100
      }
    ]
  };

  return gladys.device.create(newDevice)
}