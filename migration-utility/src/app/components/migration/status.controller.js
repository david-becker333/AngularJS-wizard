(function () {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('StatusController', ["$scope", "$state", "MigrationService", "jobStatuses", "$uibModal", StatusController]);


  function StatusController($scope, $state, MigrationService, jobStatuses, $uibModal) {

    $scope.jobStatuses = jobStatuses.data;

    $scope.hasQueuedJobs = false;

    // if jobStatuses is empty or length === 0 it should redirect to start page.
    // $scope.jobStatuses = [];


    $scope.isQueuedJob = function (param) {
      var QUEUED = new String("Queued");
      return QUEUED.toUpperCase() === param.toUpperCase();
    }

    $scope.hasQueuedActiveJobs = function () {
      var groups = _.groupBy($scope.jobStatuses, 'status');
      return groups['Queued'] ? true : false;
    }

    if ($scope.jobStatuses && $scope.jobStatuses.length == 0) {
      $scope.$state.go('app.start');
    } else {
      $scope.hasQueuedJobs = $scope.hasQueuedActiveJobs();
    }


    $scope.jobDetails = function () {

    }

    $scope.loadJobDetails = function (selectedJob) {

      MigrationService.findMigrationJobStatusDetails({ id: selectedJob.migrationJobId }).then(function (data) {
        selectedJob.details = data.data;
        selectedJob.expanded = true;
      }, function (err) {
        selectedJob.details = [];
        selectedJob.expanded = false;
      });
    }


    $scope.calculateActual = function (actual, scheduled) {
      var percent = actual < scheduled ? ((actual / scheduled) * 100) : 100;
      return percent;
    }
    $scope.calculateScheduled = function (actual, scheduled) {
      var percent = actual < scheduled ? (100 - ((actual / scheduled) * 100)) : 0;
      return percent;
    }
    $scope.calculateOverage = function (actual, scheduled) {
      var percent = actual > scheduled ? (100 - ((scheduled / actual) * 100)) : 0;
      return percent;
    }



    $scope.openViewMigratioJobDetails = function (migrationJob) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dialog_view_migration_details.html',
        animation: true,
        backdrop: 'static',

        controller: ['$scope', '$filter', '$window', 'migrationJobDetails', function ($scope, $filter, $window, migrationJobDetails) {
          
           $scope.contextPath = window.contextPath;
                    $scope.commonsPath = window.commonsPath;
          $scope.migrationJobDetails = migrationJobDetails.data;

          $scope.cancel = function () {
            modalInstance.dismiss('close');
          };

          var daysOfWeek = [
            $filter('translate')('migration.wizard.dow.m'),
            $filter('translate')('migration.wizard.dow.tu'),
            $filter('translate')('migration.wizard.dow.w'),
            $filter('translate')('migration.wizard.dow.th'),
            $filter('translate')('migration.wizard.dow.f'),
            $filter('translate')('migration.wizard.dow.sa'),
            $filter('translate')('migration.wizard.dow.su')
          ]
          $scope.daysOfWeekOptions;

          if (!$scope.daysOfWeekOptions) {
            $scope.daysOfWeekOptions = [];
            _.forEach(daysOfWeek, function (e) {
              $scope.daysOfWeekOptions.push({ label: e, value: false });
            });
          }

        }],
        size: "lg",
        keyboard: false,
        windowClass: "wizard-detail-modal-window",
        resolve: {
          migrationJobDetails: function () {
            return MigrationService.findMigrationJobDetails({ id: migrationJob })
          }
        }
      });

    }





    $scope.openCancelJobModal = function (jobId) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dialog_cancel_job.html',
        animation: true,
        backdrop: 'static',
        controller: ['$scope', '$window', function ($scope, $window) {
           
           $scope.contextPath = $window.contextPath;
                    $scope.commonsPath = $window.commonsPath;
          $scope.accept = function () {

            MigrationService.cancelJob({ id: jobId }).then(function (response) {
              // TODO add logic to handle response

              MigrationService.findMigrationJobStatuses({}).then(function (response) {
                $scope.jobStatuses = response.data;

              }, function (err) {
                $scope.jobStatuses = [];

              });
              modalInstance.dismiss('close');

            }, function (err) {
              // error handler
              modalInstance.dismiss('close');
            });


          };
          $scope.cancel = function () {
            modalInstance.dismiss('close');
          };
        }],
        size: "sm",
        keyboard: false,
        windowClass: "wizard-modal-window",
        resolve: {
        }
      });

    }


    $scope.openViewNbaJobDetails = function (jobId) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dialog_view_nba_job_details.html',
        animation: true,
        backdrop: 'static',
        controller: ['$scope', '$window', 'nbaJobDetails', function ($scope, $window, nbaJobDetails) {

           $scope.contextPath = $window.contextPath;
                    $scope.commonsPath = $window.commonsPath;
          $scope.nbaJobDetails = nbaJobDetails.data;

          $scope.cancel = function () {
            modalInstance.dismiss('close');
          };
        }],
        size: "lg",
        keyboard: false,
        windowClass: "wizard-detail-modal-window",
        resolve: {
          nbaJobDetails: function () {
            return MigrationService.findNBAJobDetails({ id: jobId })
          }
        }
      });

    }





  }
})();
