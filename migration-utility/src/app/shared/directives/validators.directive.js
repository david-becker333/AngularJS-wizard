(function () {
    'use strict';


    angular.module('migrationUtils')
        .directive('lowerThan', [
            function () {

                var link = function (scope, element, attrs, ctrl) {

                    var validate = function (viewValue) {
                        var comparisonModel = scope.$eval(attrs.lowerThan);
                        var to, from;

                        if (!viewValue || !comparisonModel) {
                            // It's valid because we have nothing to compare against
                            ctrl.$setValidity('lowerThan', true);
                        }

                        if (comparisonModel) {
                            from = new Date(comparisonModel);
                        }
                        if (viewValue) {
                            to = new Date(viewValue);
                        }

                        ctrl.$setValidity('lowerThan', Date.parse(to) > Date.parse(from));
                       
                        // It's valid if model is lower than the model we're comparing against

                        return viewValue;
                    };

                    ctrl.$parsers.unshift(validate);


                };

                return {
                    require: 'ngModel',
                    link: link
                };

            }
        ]);


        
    angular.module('migrationUtils')
        .directive('higherThan', [
            function () {

                var link = function (scope, element, attrs, ctrl) {

                    var validate = function (viewValue) {
                        var comparisonModel = scope.$eval(attrs.higherThan);
                        var to, from;

                        if (!viewValue || !comparisonModel) {
                            // It's valid because we have nothing to compare against
                            ctrl.$setValidity('higherThan', true);
                        }

                        if (comparisonModel) {
                            from = new Date(comparisonModel);
                        }
                        if (viewValue) {
                            to = new Date(viewValue);
                        }

                        ctrl.$setValidity('higherThan', Date.parse(to) < Date.parse(from));
                        // It's valid if model is lower than the model we're comparing against
                         scope.timeSpanValid = Date.parse(to) > Date.parse(from);

                        return viewValue;
                    };

                    ctrl.$parsers.unshift(validate);


                };

                return {
                    require: 'ngModel',
                    link: link
                };

            }
        ]);
})();