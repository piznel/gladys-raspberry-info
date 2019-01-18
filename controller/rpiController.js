const shared = require('../lib/rpi.shared.js');
const command = require('../lib/rpi.send.js');
const stat = require('../lib/rpi.stat.js');

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
    command(req.body)
      .then((result) => {
        return res.json(result)
      })
    .catch(next);
  }
}