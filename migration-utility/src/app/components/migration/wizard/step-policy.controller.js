(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('StepPolicyConversionController', ["$scope", "$filter", StepPolicyConversionController]);

  /** @ngInject */
  function StepPolicyConversionController($scope, $filter) {
   
      $scope.context.jobModel.stuPolicies;
      $scope.context.jobModel.slpPolicies;

      $scope.context.jobModel.convertPoliciesDuringMigration;
      if($scope.context.jobModel.convertPoliciesDuringMigration === undefined) {
        $scope.context.jobModel.convertPoliciesDuringMigration = true;
      }

      $scope.stuNewOptions = [
        { label: $filter('translate')('label.select'), value: "" },
        { label: "stu_disk_nbapp-04-1", value: "stu_disk_nbapp-04-1" },
        { label: "stu_disk_nbapp-04-2", value: "stu_disk_nbapp-04-2" },
        { label: "stu_disk_nbapp-04-3", value: "stu_disk_nbapp-04-3" },
        { label: "stu_disk_nbapp-04-4", value: "stu_disk_nbapp-04-4" }
      ];

      $scope.slpNewOptions = [
        { label: $filter('translate')('label.select'), value: "" },
        { label: "slp_disk_nbapp-04-1", value: "slp_disk_nbapp-04-1" },
        { label: "slp_disk_nbapp-04-2", value: "slp_disk_nbapp-04-2" },
        { label: "slp_disk_nbapp-04-3", value: "slp_disk_nbapp-04-3" },
        { label: "slp_disk_nbapp-04-4", value: "slp_disk_nbapp-04-4" }
      ];


      if(!$scope.context.jobModel.stuPolicies) {
        $scope.context.jobModel.stuPolicies = [];
        $scope.context.jobModel.stuPolicies = [].concat([
          { stuCurrent: "stu_disk_nbapp-01-1", stuNew: "" },
          { stuCurrent: "stu_disk_nbapp-01-2", stuNew: "" }
        ]);
      }

      if(!$scope.context.jobModel.slpPolicies) {
        $scope.context.jobModel.slpPolicies = [];
        $scope.context.jobModel.slpPolicies = [].concat([
          { slpCurrent: "slp_disk_nbapp-01-1", slpNew: ""},
          { slpCurrent: "slp_disk_nbapp-01-1", slpNew: ""}
        ]);
      }

      $scope.slpPolicyOptionChangeListener = function() {
         // TODO - change listener to remove options already selected
      }

      $scope.slpPolicyOptionChangeListener = function() {
        // TODO - change listener to remove options already selected
      }
  }
})();
