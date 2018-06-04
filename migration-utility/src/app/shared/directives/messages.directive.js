
  angular.module('migrationUtils')
    .directive("messages", function ($parse, $timeout) {
        return {
            restrict: 'EAC',
            scope: {
               messages: '='
            },
            controller: function($scope) {


            },

            link: function (scope, elem, attrs) {
                   

                scope.$watch('messages', function(newValue, oldValue) {
                    if (newValue && newValue.length > 0) {
                         $timeout(function() {
                            if(scope.messages && scope.messages.length > 0) {
                              for(var i = 0; i < scope.messages.length; i++) {
                                var alert = scope.messages[i];
                                if(alert.clear) {
                                    clearAlerts(alert);
                                } else {
                                    addAlert(alert);
                                }
                              }
                              // reset
                              scope.messages.splice(0, scope.messages.length);
                          }
                        }, 100)     
                    }      
                }, true);  
            
                function addAlert(props) {

                    var target = props.target,
                        severity = props.severity,
                        message = props.message || "",
                        position = props.position || "fixed",
                        closable = props.closable,
                        delay = props.delay || 5000,
                        fadeout = props.fadeout;
                        // fadeout = props.fadeout === undefined ? true : false;


                    //$('#successMessage').slideToggle(200);
                    if(!target) {
                        var target = '#messages';
                        var targetWidth = $(target).width();
                    }
                    else {
                        var targetWidth = '100%';
                    }

                    if(!message) {
                      var message = '';
                    }

                    if(!severity) {
                        var severity = 'info';
                    }
                    // Fixed for position, absolute for inline
                    if(!position) {
                        var position = 'fixed';
                    }else if(position=='absolute'){
                        var position = 'absolute';
                    }else if(position!='static'){
                        var position = 'static';
                    }

                    // If no alert container exists already, add one
                    var isContainer = $(target).children('.alert-container').length > 0 ;
                    if(!isContainer){
                      var alertContainer = $('<div class="alert-container"></div>');
                      alertContainer.prependTo(target);
                      //Set Alert Container width to match parent
                      //var targetWidth = $(target).width();
                      $(target).children('.alert-container').width(targetWidth).css('position',''+position+'');
                    }

                    // create alert
                    var message = $('<div class="fade in alert alert-'+severity+'">'+message+'</div>');
                    // add a close button
                    var close = $('<span class="close pull-right" aria-hidden="true" aria-label="Close"  data-dismiss="alert">&times;</span>')

                    // adding the close button to the message
                    if(closable) {
                        message.prepend(close);
                    }

                    if((severity=='success' || severity=='info') && fadeout) {
                        // add the alert element to the container, fadein, wait 3secs, slide out
                        message.prependTo($(target).children('.alert-container')).fadeIn(300).delay(delay).slideUp(300, function(){
                            $(this).remove();
                        });
                    }
                    else {
                        // add the alert element to the container, fadein, wait 3secs, slide out
                        message.prependTo($(target).children('.alert-container')).fadeIn(300);
                    }
                }

                function clearAlerts(props) {

                    var target = props.target || "#messages";

                    $(target).children('.alert-container').each(function(){
                        $(this).remove();
                    });
                    
                }
            }
        }
    });