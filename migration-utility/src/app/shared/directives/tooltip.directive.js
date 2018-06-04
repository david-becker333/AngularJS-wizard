'use strict';

angular
	.module('migrationUtils').directive('qtipTooltip', function () {
		return {

			restrict: 'A C',
			link: function (scope, element, attrs) {

				var my = attrs.qtipMy || 'left center',
					at = attrs.qtipAt || 'right center',
					target = attrs.qtipTarget || element,
					show = attrs.qtipShow || 'mouseover focus',
					hide = attrs.qtipHide || 'mouseout blur',
					suppress = attrs.qtipSuppress || false,
					content = attrs.alt || attrs.title,
					tip = attrs.qtipTip || 'left center',
					//render = scope.$parent.$eval(attrs.qtipRender || true),
					render = true,
					classes = attrs.qtipClasses;

				if (!angular.isElement(target)) {
					target = angular.element('#' + target);
				}

				if (render === true) {
					element.qtip({
						content: content,
						//show: show,	
						show: {
							when: { event: show },
							delay: 500
						},
						hide: hide,
						suppress: suppress,
						style: {
							classes: 'qtip-light ' + classes,
							tip: {
								corner: tip
							},

							def: false
						},
						position: {
							my: my,
							at: at,
							target: target,
							adjust: {
								resize: true,
							}
						}
					});
				}

			}
		};
	});

angular
	.module('migrationUtils').directive('poshyTooltip', function () {
		return {
			// Restrict it to be an attribute in this case
			restrict: 'C',
			// responsible for registering DOM listeners as well as updating the DOM
			link: function (scope, element, attrs) {
				element.poshytip({
					className: 'tip-blue',
					showTimeout: 1,
					alignTo: 'target',
					alignX: 'right',
					alignY: 'center',
					offsetY: 5,
					allowTipHover: true,
					liveEvents: true,
					showOn: 'none',
					offsetX: 10,
					closeButton: true,
					closeImage: '',
					content: function () {
						return $(this).find(".inlineHelpContent").html();
					}

				});

				element.click(function (e) {
					element.poshytip('show');
				});

				$(document).mouseup(function (e) {
					try {
						var container = $(".tip-blue");
						if (container.has(e.target).length === 0 && $(element).length > 0) {
							element.poshytip('hide');
						}
					} catch (e) { }
				});
			}
		};
	})

