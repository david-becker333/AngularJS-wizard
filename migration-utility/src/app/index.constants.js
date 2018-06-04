
(function(window) {
  'use strict';

  angular
    .module('migrationUtils')

    .constant('_', window._)
  
    .constant('API', {
       host: "http://localhost",
       port: "9000",
       apiUri: "/migration/api/v1",
       baseApiUrl: function() {
           var builder = [];
           builder.push(this.host);
           builder.push(this.port && this.port.length > 0 ? ":" + this.port : "");
           builder.push(this.apiUri);
           return builder.join('');
       }
    })

})(window);
