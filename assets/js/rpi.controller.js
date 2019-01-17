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

    vm.refresh = refresh


    activate()

    function activate() {
      vm.remoteIsBusy = true;
      return rpiService.statistic()
        .then(function(data) {
          if (data.status == 200) {
            vm.stat = data.data
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

    function refresh() {
      rpiService.statistic()
        .then(function(data) {
          vm.stat = data.data
        })
    }
  }
})();