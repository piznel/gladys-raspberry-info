module.exports = function(sails) {
  const rpiController = require('./controller/rpiController.js');
  const install = require('./lib/rpi.install.js');
  const uninstall = require('./lib/rpi.uninstall.js');
  const init = require('./lib/rpi.init.js');

  gladys.on('ready', function() {
    init();
  });

  return {
    install: install,
    uninstall: uninstall,
    routes: {
      before: {
        'get /rpi/core': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /rpi/model': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /rpi/system': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /rpi/network': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /rpi/memory': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /rpi/stat': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /rpi/command': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next)
      },
      after: {
        'get /rpi/core': rpiController.infoCore,
        'get /rpi/model': rpiController.infoModel,
        'get /rpi/system': rpiController.infoSystem,
        'get /rpi/network': rpiController.infoNetwork,
        'get /rpi/memory': rpiController.infoMemory,
        'get /rpi/stat': rpiController.stat,
        'get /rpi/command': rpiController.sendCommand
      }
    }
  };
};