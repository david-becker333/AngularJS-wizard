(function () {
  'use strict';

  angular
    .module('migrationUtils')
    .controller('StartController', ["$scope", "$state", StartController]);


  function StartController($scope, $state) {

      $scope.tooltipMessage = function() {
          var bits = "-[Info] Deleting Share 'APJ_dbinst_002'\n-[Info] Other line of output.\n-[Error] Failed to delete Share. Share cannot be found. Try again.".split("\n");

          var msg = [];
          msg.push('<ul class="log-details-list">');
          bits.forEach(function(element) {
              msg.push('<li>'+ element +'</li>');
          })
          msg.push('</ul>');

          return msg.join("");
      }

   }
})();
