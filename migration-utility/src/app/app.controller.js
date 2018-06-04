(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('AppController', ['$scope', '$window', AppController]);

  /** @ngInject */
  function AppController($scope, $window) {
      $scope.contextPath = $window.contextPath;
      $scope.commonsPath = $window.commonsPath;
  }
})();
