const shared = require('../lib/rpi.shared.js')

module.exports = {

  infoCore: function(req, res, next) {
    res.json(shared.core)
  },

  infoModel: function(req, res, next) {
    res.json(shared.model)
  },

  infoSystem: function(req, res, next) {
    res.json(shared.system)
  },

  infoNetwork: function(req, res, next) {
    res.json(shared.network)
  },

  infoMemory: function(req, res, next) {
    res.json(shared.memory)
  }
}