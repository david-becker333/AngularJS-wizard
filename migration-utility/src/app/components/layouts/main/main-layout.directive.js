(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .directive('mainLayout', mainLayout);

  /** @ngInject */
  function mainLayout() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/layouts/main/main-layout.html',
      controller: MainLayoutController,
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MainLayoutController() {
    
    }
  }

})();
