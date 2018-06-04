(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .directive('header', header);

  /** @ngInject */
  function header() {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/components/layouts/header/header.html',
      controller: HeaderController,
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function HeaderController() {
      
    }
  }

})();
