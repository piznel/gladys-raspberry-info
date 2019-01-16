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