(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider) {
    
    // Enable log
    $logProvider.debugEnabled(true);

    // enable html 5 url path mode and allow for non ui-router urls.
    $locationProvider.html5Mode({
        enabled: false,
        rewriteLinks: false
    });

   

  }

     angular
    .module('migrationUtils')
    .config(['$translateProvider', function($translateProvider) {
       var defaultCulture = "en_US";
       $translateProvider
          .translations('en_US', i18nMessages.translations[defaultCulture])
          .preferredLanguage('en_US');
    }]);


})();


