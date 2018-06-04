(function() {
  'use strict';

  angular
    .module('migrationUtils')
    .directive('footer', footer);

  /** @ngInject */
  function footer() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/layouts/footer/footer.html',
      controller: FooterController,
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterController() {
    
    }
  }

})();
