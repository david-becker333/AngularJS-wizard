(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('StepSourcesController', ["$scope", "$filter", "sourceMediaOptions", "sourceDiskOptions", "destinationMediaOptions", "destinationDiskPoolOptions", StepSourcesController]);

  /** @ngInject */
  function StepSourcesController($scope, $filter, sourceMediaOptions, sourceDiskOptions, destinationMediaOptions, destinationDiskPoolOptions) {
      
      var defaultOption = {label: "Select", value: ""};

      $scope.sourceMediaOptions = sourceMediaOptions.data;
      $scope.sourceMediaOptions.unshift(defaultOption);

      $scope.sourceDiskOptions = sourceDiskOptions.data;
      $scope.sourceDiskOptions.unshift(defaultOption);

      $scope.destinationMediaOptions = destinationMediaOptions.data;
      $scope.destinationMediaOptions.unshift(defaultOption);

      $scope.destinationDiskPoolOptions = destinationDiskPoolOptions.data;
      $scope.destinationDiskPoolOptions.unshift(defaultOption);

   
      $scope.context.jobModel.sourceMedia ? $scope.context.jobModel.sourceMedia : $scope.context.jobModel.sourceMedia = "";
      $scope.context.jobModel.sourceDisk ? $scope.context.jobModel.sourceDisk : $scope.context.jobModel.sourceDisk = "";
      $scope.context.jobModel.destinationMedia ? $scope.context.jobModel.destinationMedia : $scope.context.jobModel.destinationMedia = "";
      $scope.context.jobModel.destinationDiskPool ? $scope.context.jobModel.destinationDiskPool : $scope.context.jobModel.destinationDiskPool = "";
  }
})();


