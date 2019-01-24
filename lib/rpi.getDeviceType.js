module.exports = function() {
  let temp = {};
  return gladys.device.getByService({ service: 'rpi-info' })
    .then((device) => {
      return gladys.deviceType.getByDevice({ id: device.id })
    })
    .then((devicetypes) => {
      return devicetypes.map((devicetype) => {
        temp[devicetype.id] = devicetype.identifier;
      })
    })
    .then(() => {
        return temp;
    })


}