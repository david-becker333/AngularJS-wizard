(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('StepCriteriaController', ["$scope", "_", StepCriteriaController]);

  /** @ngInject */
  function StepCriteriaController($scope, _) {
      
      var policyTypesOptions = ["Hyper-V",
              "SAP",
              "FlashBackup",
              "Enterprise-Vault",
              "PureDisk-Export",
              "DB2",
              "Oracle",
              "NDMP",
              "FlashBackup-Windows",
              "Informix-On-BAR",
              "Vault",
              "NetWare",
              "Sybase",
              "NBU-Catalog",
              "DataStore",
              "Lotus-Notes",
              "AFS",
              "OS/2",
              "Standard",
              "VMWare",
              "MS-SharePoint",
              "MS-Exchange-Server",
              "MS-Windows",
              "MS-SQL-Server"];
 
      // TODO change to appropriate values
      $scope.imageTypes = {
         ALL_IMAGES: "all-images",
         ONLY_FULL_IMAGES: "only-full-images"
      }
      $scope.context.jobModel.imageType = "";
      
      $scope.context.jobModel.policyTypes;

      if(!$scope.context.jobModel.policyTypes) {
        $scope.context.jobModel.policyTypes = [];
        _.forEach(policyTypesOptions, function(e) {
              $scope.context.jobModel.policyTypes.push({label: e, value: false});
        });
      }

      $scope.selectAllPolicyTypes = function() {
        _.forEach($scope.context.jobModel.policyTypes, function(e) {
             e.value = true;
        });
        $scope.setPolicyTypesMinLength();
      };

      $scope.clearAllPolicyTypes = function() {
        _.forEach($scope.context.jobModel.policyTypes, function(e) {
              e.value = false;
        });
        $scope.setPolicyTypesMinLength();
      };
 
      // used to hold length validation value
      $scope.policyTypesMinSelected = _.filter($scope.context.jobModel.policyTypes, { value: true }).length;
      $scope.policyTypesMinSelectedPristine = true;
      $scope.setPolicyTypesMinLength = function() {
         $scope.policyTypesMinSelected = _.filter($scope.context.jobModel.policyTypes, { value: true }).length;
         $scope.policyTypesMinSelectedPristine = false;
      }

      
      
  }
})();
