const shared = require('../lib/rpi.shared.js')

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
  }
}