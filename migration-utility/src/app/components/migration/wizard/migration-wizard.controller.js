(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('MigrationWizardController', ["$scope", "MigrationService", MigrationWizardController]);

  /** @ngInject */
  function MigrationWizardController($scope, MigrationService) {
       

            $scope.context = {};
            $scope.context.jobModel = {};

            $scope.startMigration = function() {

            };

            $scope.cancelWizard = function () {
                $scope.$state.go("app.status");
            };

            $scope.startMigration = function() {

                  MigrationService.findSourceMedia($scope.context.jobModel, {}).then(function(response) {
                      console.log("Saved job: ", response);
                  }, function(err) {
                      console.log("There was an error saving this job: ", err);
                  });
                 
            }

            /*
             * work around to set check mark on completed step change.  This must be available on wizard.
             */
            $scope.stepObserver = function(msc) {
                var setStepComplete = function(stepIndex) {
                    msc.$getSteps()[stepIndex - 1].data.stepComplete = true;
                };
               
                var lastStepIndex = msc.$getActiveIndex() - 1;
                if(lastStepIndex > 0) {
                    setStepComplete(lastStepIndex);
                } 
            };


    
        
            $scope.steps = [

              {
                    templateUrl: contextPath + 'app/components/migration/wizard/step-sources.html',
                    hasForm: true,
                    //TODO i18n label support for title
                    title: 'Select source and destination',
                    data: {
                        stepComplete: false
                    },
                    controller: 'StepSourcesController',
                    resolve: {
                       sourceMediaOptions: function(MigrationService) {
                           return MigrationService.findSourceMedia({});
                       },
                       sourceDiskOptions: function(MigrationService) {
                           return MigrationService.findSourceDisk();
                       },
                       destinationMediaOptions: function(MigrationService) {
                           return MigrationService.findDestinationMedia();
                       }, 
                       destinationDiskPoolOptions: function(MigrationService) {
                           return MigrationService.findDestinationDisk();

                       }
                    }
                },
                {
                    templateUrl: contextPath + 'app/components/migration/wizard/step-criteria.html',
                    hasForm: true,
                    //TODO i18n label support for title
                    title: 'Specify selction criteria',
                    data: {
                        stepComplete: false
                    },
                    controller: 'StepCriteriaController',
                    resolve: {

                    }
                }, 
                {
                    templateUrl: contextPath + 'app/components/migration/wizard/step-policy.html',
                    hasForm: true,
                    //TODO i18n label support for title
                    title: 'Set up policy conversion',
                    data: {
                        stepComplete: false
                    },
                    controller: 'StepPolicyConversionController',
                    resolve: {

                    }
                },
                {
                    templateUrl: contextPath + 'app/components/migration/wizard/step-schedule.html',
                    hasForm: true,
                    //TODO i18n label support for title
                    title: 'Schedule migration',
                    data: {
                        stepComplete: false
                    },
                    controller: 'StepScheduleController',
                    resolve: {

                    }
                }
            ];
  }
})();
