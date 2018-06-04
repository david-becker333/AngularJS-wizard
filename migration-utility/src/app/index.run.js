(function () {
  'use strict';

  angular
    .module('migrationUtils')
    .run(['$rootScope', '$state', '$stateParams', '$log', 'API', '$location', runBlock]);


  function runBlock($rootScope, $state, $stateParams, $log, API, $location) {

    $log.debug('Loading application');

    // place application state info into root scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.apiBaseUrl = API.baseApiUrl();

  
    // todays date
    $rootScope.today = function () {
      return new Date();
    };

     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) { 
         console.log("toState: ", toState);
     });

     $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });


  

  };




angular.module('jcs-autoValidate')
.run([
    'validator',
    'angularTranslateErrorMessageResolver',
    //'validationErrorMessageResolver',
    function (validator, errorMessageResolver) {
    
    	validator.setErrorMessageResolver(errorMessageResolver.resolve);
    }
]);
 

//now register the custom element modifier with the auto-validate module and set it as the default one for all elements
angular.module('jcs-autoValidate')
.run([
'validator',
'validationElementModifier',
function (validator, validationElementModifier) {
	
    validator.registerDomModifier(validationElementModifier.key, validationElementModifier);
     validator.setDefaultElementModifier(validationElementModifier.key);
}
]);
 




angular.module('jcs-autoValidate').factory('angularTranslateErrorMessageResolver', [
     '$q',
     '$http',
     '$translate',
     '$filter',
     function ($q, $http, $translate, $filter) {
    	 
         var currentCulture = 'en_US',
       
             getMessageKeyTypeOverride = function (errorType, el) {
                 var overrideKey;

                 if (el) {
                     // try and find an attribute which overrides the given error type in the form of errorType-err-type="someMsgKey"
                     errorType += '-err-type';
                
                     overrideKey = el.attr(errorType);
                     if (overrideKey === undefined) {
                         overrideKey = el.attr('data-ng-' + errorType) || el.attr('ng-' + errorType);
                     }

                     if (overrideKey) {
                        // overrideKey = overrideKey.replace(/[\W]/g, '');
                     }
                 }

                 return overrideKey;
             },
             
             getMessageTypeOverride = function (errorType, el) {
                 var overrideKey;

                 if (el) {
                     // try and find an attribute which overrides the given error type in the form of errorType-err-type="someMsgKey"
                     errorType += '-err-msg';
                
                     overrideKey = el.attr(errorType);
                 }

                 return overrideKey;
             },

            resolve = function (errorType, el) {
           	  var defer = $q.defer(),
                 errMsg,
                 parameters = [],
                 parameter,
                 messageTypeOverride;
           
          
	           
                 errMsg = $filter('translate')(errorType);
                 messageTypeOverride = getMessageKeyTypeOverride(errorType, el);
                
                 if (messageTypeOverride) {
                	 errMsg = $filter('translate')(messageTypeOverride);
                 }
                 
                 messageTypeOverride = getMessageTypeOverride(errorType, el);
                 
                 if (messageTypeOverride) {
                	 errMsg = messageTypeOverride;
                 }
         
                 if (errMsg === undefined) {
                   	 errMsg = $filter('translate')('defaultMsg').format(errorType);
                 }

                 if (el && el.attr) {
                     try {
                         parameter = el.attr(errorType);
                         if (parameter === undefined) {
                             parameter = el.attr('data-ng-' + errorType) || el.attr('ng-' + errorType);
                         }

                         parameters.push(parameter || '');

                         errMsg = errMsg.format(parameters);
                     } catch (e) {}
                 }

                 defer.resolve(errMsg);
             

             return defer.promise;
           };

         return {
             resolve: resolve
         };
     }
 ]);


angular.module('jcs-autoValidate').factory('validationErrorMessageResolver', [
     '$q',
     '$http',
     function ($q, $http) {
    	 
         var currentCulture = 'en_US',
       
             getMessageTypeOverride = function (errorType, el) {
                 var overrideKey;

                 if (el) {
                     // try and find an attribute which overrides the given error type in the form of errorType-err-type="someMsgKey"
                     errorType += '-err-type';
                
                     overrideKey = el.attr(errorType);
                     if (overrideKey === undefined) {
                         overrideKey = el.attr('data-ng-' + errorType) || el.attr('ng-' + errorType);
                     }

                     if (overrideKey) {
                        // overrideKey = overrideKey.replace(/[\W]/g, '');
                     }
                 }

                 return overrideKey;
             },

            resolve = function (errorType, el) {
           	  var defer = $q.defer(),
                 errMsg,
                 parameters = [],
                 parameter,
                 messageTypeOverride;
             
                 errMsg = i18nMessages.translations[currentCulture][errorType];
                 messageTypeOverride = getMessageTypeOverride(errorType, el);
                 if (messageTypeOverride) {
                     errMsg = i18nMessages.translations[currentCulture][messageTypeOverride];
                 }

                 if (errMsg === undefined) {
                     errMsg = i18nMessages.translations[currentCulture].defaultMsg.format(errorType);
                 }

                 if (el && el.attr) {
                     try {
                         parameter = el.attr(errorType);
                         if (parameter === undefined) {
                             parameter = el.attr('data-ng-' + errorType) || el.attr('ng-' + errorType);
                         }

                         parameters.push(parameter || '');

                         errMsg = errMsg.format(parameters);
                     } catch (e) {}
                 }

                 defer.resolve(errMsg);
             

             return defer.promise;
           };

         return {
             resolve: resolve
         };
     }
 ]);



angular.module('jcs-autoValidate').factory('validationElementModifier', [
    function () {
    	 var reset = function (el) {
             angular.forEach(el.find('span'), function (spanEl) {
                 spanEl = angular.element(spanEl);
                 if (spanEl.hasClass('error-msg') || spanEl.hasClass('form-control-feedback') || spanEl.hasClass('control-feedback')) {
                     spanEl.remove();
                 }
             });

             el.removeClass('has-success has-error has-feedback');
         },
         findWithClassElementAsc = function (el, klass) {
             var parent = el;
             for (var i = 0; i <= 3; i += 1) {
                 if (parent !== undefined && parent.hasClass(klass)) {
                     break;
                 } else if (parent !== undefined) {
                     parent = parent.parent();
                 }
             }

             return parent;
         },

         findWithClassElementDesc = function (el, klass) {
             var child;
             for (var i = 0; i < el.children.length; i += 1) {
                 child = el.children[i];
                 if (child !== undefined && angular.element(child).hasClass(klass)) {
                     break;
                 } else if (child.children !== undefined) {
                     child = findWithClassElementDesc(child, klass);
                     if (child.length > 0) {
                         break;
                     }
                 }
             }

             return angular.element(child);
         },

         findFormGroupElement = function (el) {
             return findWithClassElementAsc(el, 'form-group');
         },

         findInputGroupElement = function (el) {
             return findWithClassElementDesc(el, 'input-group');
         },

         insertAfter = function (referenceNode, newNode) {
             referenceNode[0].parentNode.insertBefore(newNode[0], referenceNode[0].nextSibling);
         },

         /**
          * @ngdoc property
          * @name bootstrap3ElementModifier#addValidationStateIcons
          * @propertyOf bootstrap3ElementModifier
          * @returns {bool} True if an state icon will be added to the element in the valid and invalid control
          * states.  The default is false.
          */
         addValidationStateIcons = false,

         /**
          * @ngdoc function
          * @name bootstrap3ElementModifier#enableValidationStateIcons
          * @methodOf bootstrap3ElementModifier
          *
          * @description
          * Makes an element appear invalid by apply an icon to the input element.
          *
          * @param {bool} enable - True to enable the icon otherwise false.
          */
         enableValidationStateIcons = function (enable) {
             addValidationStateIcons = enable;
         },

         /**
          * @ngdoc function
          * @name bootstrap3ElementModifier#makeValid
          * @methodOf bootstrap3ElementModifier
          *
          * @description
          * Makes an element appear valid by apply bootstrap 3 specific styles and child elements. If the service
          * property 'addValidationStateIcons' is true it will also append validation glyphicon to the element.
          * See: http://getbootstrap.com/css/#forms-control-validation
          *
          * @param {Element} el - The input control element that is the target of the validation.
          */
         makeValid = function (el) {
             var frmGroupEl = findFormGroupElement(el),
                 inputGroupEl = findInputGroupElement(frmGroupEl[0]);

             reset(frmGroupEl);
             //frmGroupEl.addClass('has-success ' + (inputGroupEl.length > 0 ? '' : 'has-feedback'));
             if (addValidationStateIcons) {
                 var iconElText = '<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
                 if (inputGroupEl.length > 0) {
                     iconElText = iconElText.replace('form-', '');
                     iconElText = '<span class="input-group-addon control-feedback">' + iconElText + '</span';
                 }

                 insertAfter(el, angular.element(iconElText));
             }
         },

         /**
          * @ngdoc function
          * @name bootstrap3ElementModifier#makeInvalid
          * @methodOf bootstrap3ElementModifier
          *
          * @description
          * Makes an element appear invalid by apply bootstrap 3 specific styles and child elements. If the service
          * property 'addValidationStateIcons' is true it will also append validation glyphicon to the element.
          * See: http://getbootstrap.com/css/#forms-control-validation
          *
          * @param {Element} el - The input control element that is the target of the validation.
          */
         makeInvalid = function (el, errorMsg) {
             var frmGroupEl = findFormGroupElement(el),
                 inputGroupEl = findInputGroupElement(frmGroupEl[0]),
                 helpTextEl = angular.element('<span class="help-block has-error error-msg">' + errorMsg + '</span>');
             reset(frmGroupEl, inputGroupEl);
             frmGroupEl.addClass('has-error ' + (inputGroupEl.length > 0 ? '' : 'has-feedback'));
             insertAfter(inputGroupEl.length > 0 ? inputGroupEl : el, helpTextEl);
             if (addValidationStateIcons) {
                 var iconElText = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
                 if (inputGroupEl.length > 0) {
                     iconElText = iconElText.replace('form-', '');
                     iconElText = '<span class="input-group-addon control-feedback">' + iconElText + '</span';
                 }

                 insertAfter(el, angular.element(iconElText));
             }
         },

         /**
          * @ngdoc function
          * @name bootstrap3ElementModifier#makeDefault
          * @methodOf bootstrap3ElementModifier
          *
          * @description
          * Makes an element appear in its default visual state by apply bootstrap 3 specific styles and child elements.
          *
          * @param {Element} el - The input control element that is the target of the validation.
          */
         makeDefault = function (el) {
             var frmGroupEl = findFormGroupElement(el);
             reset(frmGroupEl);
         };

        return {
            makeValid: makeValid,
            makeInvalid: makeInvalid,
            makeDefault: makeDefault,
            enableValidationStateIcons: enableValidationStateIcons,
            key: 'validationModifierKey'
        };
    }
]);


 

})();
