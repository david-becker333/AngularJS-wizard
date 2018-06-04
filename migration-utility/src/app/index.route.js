(function () {
  'use strict';

  angular
    .module('migrationUtils')
    .config(routerConfig);

  
  function routerConfig($stateProvider, $urlRouterProvider) {

    var viewStateParams = "pid&mid";

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: contextPath + "app/app.html",
        controller: "AppController"

      })

      .state('app.status', {
        url: "/migration/status",
        templateUrl: contextPath + "app/components/migration/status.html",
        controller: "StatusController",
        resolve: {
         jobStatuses: function (MigrationService) {
           return MigrationService.findMigrationJobStatuses({})
         }
        }
      })

      .state('app.start', {
        url: "/migration/start",
        templateUrl: contextPath + "app/components/migration/start.html",
        controller: "StartController"
        
      })
      .state('app.migrationwizard', {
        url: "/migration/create",
        templateUrl: contextPath + "app/components/migration/wizard/migration-wizard.html",
        controller: "MigrationWizardController"
      })


    $urlRouterProvider.otherwise('/migration/start');
  }

})();
