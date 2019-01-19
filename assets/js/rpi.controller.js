(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('rpiCtrl', rpiCtrl);

  rpiCtrl.$inject = ['rpiService', '$scope'];

  function rpiCtrl(rpiService, $scope) {
    /* jshint validthis: true */
    var vm = this;
    vm.remoteIsBusy = false;
    vm.ready = false;
    vm.stat = '';
    vm.core = '';
    vm.model = '';
    vm.system = '';
    vm.network = '';
    vm.memory = '';
    vm.commandBash = '';
    vm.readyCommand = true;

    vm.refresh = refresh;
    vm.sendCommand = sendCommand;
    vm.commandToSend = null;
    vm.returnCommand = '';



    activate()

    function activate() {
      vm.remoteIsBusy = true;

      var child = document.getElementsByClassName('nav nav-tabs');
      child[0].parentNode.removeChild(child[0]);

      return rpiService.stat()
        .then(function(data) {
          if (data.status == 200) {
            vm.stat = statNetwork(data.data)
          } else {
            rpiService.errorNotificationTranslated('ERROR')
          }
          return rpiService.infoCore()
        })
        .then(function(data) {
          if (data.status == 200) {
            vm.core = data.data
          } else {
            rpiService.errorNotificationTranslated('ERROR')
          }
          return rpiService.infoModel()
        })
        .then(function(data) {
          if (data.status == 200) {
            vm.model = data.data
          } else {
            rpiService.errorNotificationTranslated('ERROR')
          }
          return rpiService.infoSystem()
        })
        .then(function(data) {
          if (data.status == 200) {
            vm.system = data.data
          } else {
            rpiService.errorNotificationTranslated('ERROR')
          }
          return rpiService.infoNetwork()
        })
        .then(function(data) {
          if (data.status == 200) {
            vm.network = data.data
          } else {
            rpiService.errorNotificationTranslated('ERROR')
          }
          return rpiService.infoMemory()
        })
        .then(function(data) {
          if (data.status == 200) {
            vm.memory = data.data
          } else {
            rpiService.errorNotificationTranslated('ERROR')
          }
          vm.ready = true;
          vm.remoteIsBusy = false;
          return
        })
        .catch(function(err) {
          console.log(err)
        })
    }

    function statNetwork(stat) {
      var net = stat.net;
      var tempNet = {};
      for (var face in net) {
        if (parseInt(net[face].received) > 0 || parseInt(net[face].transmit) > 0) {
          tempNet[face] = net[face]
        }
      }
      stat.net = tempNet;
      return stat
    }

    function refresh() {
      return rpiService.stat()
        .then(function(data) {
          vm.stat = statNetwork(data.data)
        })
    }

    function sendCommand(cmd) {
      vm.readyCommand = false;
      return rpiService.sendCommand({ cmd: cmd })
        .then(function(data) {
          if (data.status == 200) {
            var answer = data.data;
            if (typeof answer === 'object') {
              answer = JSON.stringify(answer)
            }
            vm.returnCommand = vm.returnCommand + cmd + ' :\n' + answer + '\n'
            vm.readyCommand = true;
          }
        })

    }
  }
})();