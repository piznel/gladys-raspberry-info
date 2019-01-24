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
    vm.deviceTypes = [];
    vm.commandToSend = null;
    vm.returnCommand = '';
    vm.showStatWifi = false;

    vm.refresh = refresh;
    vm.sendCommand = sendCommand;
    vm.classTemperatureColor = classTemperatureColor;
    vm.classVoltageColor = classVoltageColor;
    vm.classUsageColor = classUsageColor;
    vm.classPercentColor = classPercentColor;



    activate()

    function activate() {
      vm.remoteIsBusy = true;

      var child = document.getElementsByClassName('nav nav-tabs');
      child[0].parentNode.removeChild(child[0]);

      return rpiService.stat()
        .then(function(data) {
          if (data.status == 200) {
            vm.stat = data.data;
            vm.stat.net = statNetwork(data.data.net)
            vm.stat.wifi = statWifi(data.data.wifi)
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
          return rpiService.getDeviceType()
        })
        .then(function(data) {
          if (data.status == 200) {
            vm.deviceTypes = data.data
          } else {
            rpiService.errorNotificationTranslated('ERROR')
          }
          vm.ready = true;
          vm.remoteIsBusy = false;
          waitNewValue();
          return
        })
        .catch(function(err) {
          console.log(err)
        })
    }

    function statNetwork(stat) {
      var tempNet = {};
      for (var face in stat) {
        if (parseInt(stat[face].received) > 0 || parseInt(stat[face].transmit) > 0) {
          tempNet[face] = stat[face]
        }
      }
      return tempNet;
    }

    function statWifi(stat) {
      var tempWifi = {};
      for (var face in stat) {
        if (stat[face].ssid && stat[face].ssid.length) {
          tempWifi[face] = stat[face]
          vm.showStatWifi = true
        }
      }
      return tempWifi;
    }

    function refresh() {
      vm.remoteIsBusy = true;
      return rpiService.stat()
        .then(function(data) {
          vm.stat.net = statNetwork(data.data.net)
          vm.stat.wifi = statWifi(data.data.wifi)
          vm.remoteIsBusy = false;
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

    function waitNewValue() {
      io.socket.on('newDeviceState', function(deviceState) {
        if (vm.deviceTypes.hasOwnProperty(deviceState.devicetype)) {
          switch (vm.deviceTypes.deviceState.devicetype) {
            case 'CPU_TEMP':
              vm.core.temp_cpu = deviceState.value;
              break;
            case 'GPU_TEMP':
              vm.core.temp_gpu = deviceState.value;
              break;
            case 'CPU_VOLTAGE':
              vm.core.voltage = deviceState.value;
              break;
            case 'CPU_USAGE':
              vm.core.usage = deviceState.value;
              break;
          }
          //$scope.$apply();
        }
      });
    }

    function classTemperatureColor(temp) {
      if (temp < 40) return 'label bg-blue'
      if (temp < 50) return 'label bg-green'
      if (temp < 70) return 'label bg-orange'
      return 'label bg-red'
    }

    // from 0.8V to 1.4V
    function classVoltageColor(voltage) {
      if (voltage < 0.9) return 'label bg-blue'
      if (voltage < 1.2) return 'label bg-green'
      if (voltage < 1.3) return 'label bg-orange'
      return 'label bg-red'
    }

    function classUsageColor(usage) {
      if (usage < 20) return 'label bg-blue'
      if (usage < 40) return 'label bg-green'
      if (usage < 80) return 'label bg-orange'
      return 'label bg-red'
    }

    function classPercentColor(percent) {
      let value = parseInt(percent);
      if (value > 80) return 'text-red'
      if (value > 60) return 'text-orange'

    }
  }
})();