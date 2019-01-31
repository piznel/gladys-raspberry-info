(function() {
  'use strict';

  angular
    .module('gladys')
    .factory('rpiService', rpiService);

  rpiService.$inject = ['$http', 'Notification', '$translate'];

  function rpiService($http, Notification, $translate) {

    var service = {
      infoCore: infoCore,
      infoModel: infoModel,
      infoSystem: infoSystem,
      infoNetwork: infoNetwork,
      infoMemory: infoMemory,
      stat: stat,
      sendCommand: sendCommand,
      getDeviceType: getDeviceType,
      getBoxParams: getBoxParams,
      savBoxParams: savBoxParams,
      successNotificationTranslated: successNotificationTranslated,
      errorNotificationTranslated: errorNotificationTranslated
    };

    return service;

    function infoCore() {
      return $http({ method: 'GET', url: '/rpi/core/' });
    }

    function infoModel() {
      return $http({ method: 'GET', url: '/rpi/model/' });
    }

    function infoSystem() {
      return $http({ method: 'GET', url: '/rpi/system/' });
    }

    function infoNetwork() {
      return $http({ method: 'GET', url: '/rpi/network/' });
    }

    function infoMemory() {
      return $http({ method: 'GET', url: '/rpi/memory/' });
    }

    function stat() {
      return $http({ method: 'GET', url: '/rpi/stat/' });
    }

    function sendCommand(cmd) {
      return $http({ method: 'POST', url: '/rpi/command/', data: cmd });
    }

    function getDeviceType() {
      return $http({ method: 'GET', url: '/rpi/devicetype/' });
    }

    function getBoxParams(id) {
      return $http({ method: 'GET', url: '/rpi/box/' + id });
    }

    function savBoxParams(id, params) {
      return $http({ method: 'PATCH', url: '/rpi/box/' + id, data: params });
    }

    function successNotificationTranslated(key, complement) {
      return $translate(key)
        .then(function(text) {
          if (complement) text += complement;
          Notification.success(text);
        });
    }

    function errorNotificationTranslated(key, complement) {
      return $translate(key)
        .then(function(text) {
          if (complement) text += complement;
          Notification.error(text);
        });
    }
  }
})();