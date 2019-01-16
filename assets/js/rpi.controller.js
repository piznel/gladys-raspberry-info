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
    vm.core = '';
    vm.model = '';
    vm.system = '';
    vm.network = '';
    vm.memory = '';

    vm.refresh = refresh


    activate()

    function activate() {
      vm.remoteIsBusy = true;
      return rpiService.infoCore()
        .then(function(data) {
          vm.core = data.data
          return rpiService.infoModel()
        })
        .then(function(data) {
          vm.model = data.data
          return rpiService.infoSystem()
        })
        .then(function(data) {
          vm.system = data.data
          return rpiService.infoNetwork()
        })
        .then(function(data) {
          vm.network = data.data
          return rpiService.infoMemory()
        })
        .then(function(data) {
          vm.memory = data.data
          vm.ready = true;
          vm.remoteIsBusy = false;
          return
        })
        .catch(function(err) {
          console.log(err)
        })
    }

    function refresh() {
      
    }

  }
})();