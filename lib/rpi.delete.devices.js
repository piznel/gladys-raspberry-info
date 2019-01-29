module.exports = function deleteDevice(){
	sails.log.debug('Uninstalling the Livebox module...');
	gladys.device.getByService({'service':'rpi-info'})
	.then((devices) => {
		devices.forEach(function(device) {
			gladys.device.delete(device)
		})
		sails.log.debug('uninstalled RPi-info module!');
	})
}