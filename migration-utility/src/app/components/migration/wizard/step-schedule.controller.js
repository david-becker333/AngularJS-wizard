(function () {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('StepScheduleController', ["$scope", "$filter", "$timeout", "_", StepScheduleController]);


  function StepScheduleController($scope, $filter, $timeout, _) {

    var defaultMigrationWindow  = 4; // 4 hour default window

    $scope.context.jobModel.repeatJobDays // defaults to 1

    $scope.context.jobModel.startDate;

    if (!$scope.context.jobModel.startDate) {
      $scope.context.jobModel.startDate = $scope.today();
    }

    $scope.startDatePicker = {
        
        opened: false,
        open: function() {
          this.opened = true;
        },
        format: "MM-dd-yyyy",
        options: {
          dateDisabled: false,
          //formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
          minDate: new Date(),
          startingDay: 1
        }

    }

    $scope.context.jobModel.startTime = new Date();
    $scope.context.jobModel.endTime = new Date($scope.context.jobModel.startTime.getTime() + (defaultMigrationWindow*60*60*1000));

    $scope.timePickerDefaults = {
        minuteStep: 1,
        hourStep: 1,
        showMeridian: true
    };

    $scope.startTimePicker = angular.extend({}, $scope.timePickerDefaults);

    $scope.endTimePicker = angular.extend({}, $scope.timePickerDefaults);

    $scope.migrationWindowTime;
    
    function calculateTime(startTime, endTime) {

      var hourDiff = endTime - startTime; //in ms
      var secDiff = hourDiff / 1000; //in s
      var minDiff = hourDiff / 60 / 1000; //in minutes
      var hDiff = hourDiff / 3600 / 1000; //in hours
      var humanReadable = {};
      humanReadable.hours = Math.floor(hDiff);
      humanReadable.minutes = (Math.ceil(minDiff - 60 * humanReadable.hours) == 60) ? 0 : Math.ceil(minDiff - 60 * humanReadable.hours) ;
    
      return humanReadable;
    
    }

    if(!$scope.migrationWindowTime) {
        $scope.migrationWindowTime = calculateTime($scope.context.jobModel.startTime, $scope.context.jobModel.endTime);
    }


    $scope.timeSpanChange = function() {
       
        if (Date.parse($scope.context.jobModel.endTime) <= Date.parse($scope.context.jobModel.startTime)) {
             $scope.wizardForm.startTimeId.$setValidity("higherThan", false);
        } else {
            $scope.wizardForm.startTimeId.$setValidity("higherThan", true);
         }

        $scope.migrationWindowTime = calculateTime($scope.context.jobModel.startTime, $scope.context.jobModel.endTime);
    };
    
    
   // var daysOfWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
    var daysOfWeek = [
      $filter('translate')('migration.wizard.dow.m'),
      $filter('translate')('migration.wizard.dow.tu'),
      $filter('translate')('migration.wizard.dow.w'),
      $filter('translate')('migration.wizard.dow.th'),
      $filter('translate')('migration.wizard.dow.f'),
      $filter('translate')('migration.wizard.dow.sa'),
      $filter('translate')('migration.wizard.dow.su') 
    ]
    $scope.context.jobModel.daysOfWeekOptions;

    if (!$scope.context.jobModel.daysOfWeekOptions) {
      $scope.context.jobModel.daysOfWeekOptions = [];
      _.forEach(daysOfWeek, function (e) {
        $scope.context.jobModel.daysOfWeekOptions.push({ label: e, value: false });
      });
    }

    if(!$scope.context.jobModel.repeatJobDays) {
       $scope.context.jobModel.repeatJobDays = 1;
    }

  
    $scope.days = {};
    $scope.days.daysOfWeekMinSelected = {};

    $scope.days.daysOfWeekMinSelected = _.filter($scope.context.jobModel.daysOfWeekOptions, { value: true }).length;
    $scope.days.daysOfWeekMinSelectedPristine = true;
    $scope.setDaysOfWeekMinLength = function() {
         $scope.days.daysOfWeekMinSelected = _.filter($scope.context.jobModel.daysOfWeekOptions, { value: true }).length;
         $scope.days.daysOfWeekMinSelectedPristine = false;


    }

  }
})();
