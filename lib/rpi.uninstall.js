const queries = require('./rpi.queries.js');
const deleteDevice = require('./rpi.delete.devices.js');

module.exports = function uninstall() {

  // delete parameter
  var param = {
    name: "Info_RPi_Refresh_Time"
  }
  gladys.param.delete(param)
    .then(function(param) {
      sails.log.debug('parameter "Info_RPi_Refresh_Time" deleted!');
    });

  // delete devices
  deleteDevice()

  // delete dashboard box
  gladys.utils.sql(queries.deleteBox)
    .then(function(data) {
      sails.log.debug('RPi-info box deleted!');
    })

  // delete boxType
  return gladys.utils.sql(queries.deleteBoxType)
    .then(function(data) {
      sails.log.debug('RPi-info boxType deleted!');
    })
};