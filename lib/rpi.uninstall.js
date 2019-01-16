module.exports = function uninstall() {

var param = {
    name: "Info_RPi_Refresh_Time"
  }
  gladys.param.delete(param)
    .then(function(param) {
      sails.log.debug('parameter "Rpi Info" deleted !');
    });
}