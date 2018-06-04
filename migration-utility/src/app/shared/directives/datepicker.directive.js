'use strict';



	angular
        .module('migrationUtils')
        .directive('jquiDatepicker', ['$http', '$filter', function($http, $filter){
	    
	    var defaultDatepickerOptions = {
	      dateFormat: 'm-dd-yy',
	      ngDateformat: 'M-d-yyyy',	
	      changeMonth: false,
	      changeYear: false
	    }
	    
	    return {
	      	  restrict: 'A',
		      scope: {
	             jquiOptions: "="
	          },
	          require: "ngModel",
		      link: function (scope, element, attrs, ngModel) {
		      
		       var optionsConfig;	
		       if(angular.isDefined(scope.jquiOptions)) {
                  optionsConfig = angular.extend(defaultDatepickerOptions, scope.jquiOptions);
		       } else {
		       	  optionsConfig = defaultDatepickerOptions;
		       }	

               ngModel.$formatters.push(function(value){
               	 var formattedValue = $filter('date')(value, optionsConfig.ngDateformat);
               	  //console.log("formatted: ", formattedValue);
                 return formattedValue;

	           });

	           ngModel.$parsers.push(function(value){
	           	  var parsedValue = new Date(value).toISOString();
	           	  //console.log("parsed: ", parsedValue);
	           	  return parsedValue;
	           });	

	      	   element.datepicker(optionsConfig);
               
               //element.addClass("ku-datepicker");
              

		      }
	    }

	
	}]);

