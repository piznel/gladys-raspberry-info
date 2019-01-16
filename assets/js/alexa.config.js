var translationsEN = {
    SAVE_SETTINGS: "Save"
  };
  
  var translationsFR = {
    SAVE_SETTINGS: "Enregistrer"
  };
  
  angular
    .module('gladys')
    .config(['$translateProvider', function($translateProvider) {
      // add translation table
      $translateProvider
        .translations('en', translationsEN)
        .translations('fr', translationsFR);
    }]);