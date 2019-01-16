var translationsEN = {
    MATERIEL: "Materiel"
  };
  
  var translationsFR = {
    MATERIEL: "Matériel"
  };
  
  angular
    .module('gladys')
    .config(['$translateProvider', function($translateProvider) {
      // add translation table
      $translateProvider
        .translations('en', translationsEN)
        .translations('fr', translationsFR);
    }]);