const shared = require('../lib/rpi.shared.js');
const sendCommand = require('../lib/rpi.send.js');
const stat = require('../lib/rpi.stat.js');
const getDeviceType = require('../lib/rpi.getDeviceType.js');
const saveBoxParams = require('../lib/rpi.saveBoxParams.js');

module.exports = {

  infoCore: function(req, res, next) {
    return res.json(shared.core)
  },

  infoModel: function(req, res, next) {
    return res.json(shared.model)
  },

  infoSystem: function(req, res, next) {
    return res.json(shared.system)
  },

  infoNetwork: function(req, res, next) {
    return res.json(shared.network)
  },

  infoMemory: function(req, res, next) {
    return res.json(shared.memory)
  },

  stat: function(req, res, next) {
    stat()
      .then((result) => {
        return res.json(result)
      })
      .catch(next);
  },

  sendCommand: function(req, res, next) {
    sendCommand(req.body.cmd)
      .then((result) => {
        return res.send(result)
      })
      .catch(next);
  },

  getDeviceType: function(req, res, next) {
    getDeviceType()
      .then((result) => {
        return res.json(result)
      })
      .catch(next);
  },

  getBoxParams: function(req, res, next) {
    return res.json(shared.box[req.params.id].params);
  },

  saveBoxParams: function(req, res, next) {
    saveBoxParams(req.params.id, req.body)
      .then(box => res.json(box))
      .catch(next);
  }
}