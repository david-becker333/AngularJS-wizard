(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .directive('sidebar', sidebar);

  /** @ngInject */
  function sidebar() {
    var directive = {
      restrict: 'A',
      templateUrl: 'app/components/layouts/sidebar/sidebar.html',
      controller: SidebarController,
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidebarController() {
     
    }
  }

})();
