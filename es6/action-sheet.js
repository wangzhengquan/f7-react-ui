'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _modals = require('./modals');

var _modals2 = _interopRequireDefault(_modals);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action Sheet
require('./resources/less/lists.less');
var _compiledTemplates = {};
var _modalTemplateTempDiv = document.createElement('div');

var ActionSheet = {
				open: function open(target, params) {
								var toPopover = false,
								    modal,
								    groupSelector,
								    buttonSelector;
								if (arguments.length === 1) {
												// Actions
												params = target;
								} else {
												// Popover
												if (_device2.default.ios) {
																if (_device2.default.ipad) toPopover = true;
												} else {
																if ((0, _dom2.default)(window).width() >= 768) toPopover = true;
												}
								}
								params = params || [];

								if (params.length > 0 && !Array.isArray(params[0])) {
												params = [params];
								}
								var modalHTML;
								if (toPopover) {
												var actionsToPopoverTemplate = '<div class="popover actions-popover">' + '<div class="popover-inner">' + '{{#each this}}' + '<div class="list-block">' + '<ul>' + '{{#each this}}' + '{{#if label}}' + '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' + '{{else}}' + '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>' + '{{/if}}' + '{{/each}}' + '</ul>' + '</div>' + '{{/each}}' + '</div>' + '</div>';
												if (!_compiledTemplates.actionsToPopover) {
																_compiledTemplates.actionsToPopover = _template2.default.compile(actionsToPopoverTemplate);
												}
												var popoverHTML = _compiledTemplates.actionsToPopover(params);
												modal = (0, _dom2.default)(_modals2.default.popover(popoverHTML, target, true));
												groupSelector = '.list-block ul';
												buttonSelector = '.list-button';
								} else {
												var buttonsHTML = '';
												for (var i = 0; i < params.length; i++) {
																for (var j = 0; j < params[i].length; j++) {
																				if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
																				if (!params[i][j]) {
																								continue;
																				}
																				var button = params[i][j];
																				var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
																				if (button.bold) buttonClass += ' actions-modal-button-bold';
																				if (button.color) buttonClass += ' color-' + button.color;
																				if (button.bg) buttonClass += ' bg-' + button.bg;
																				if (button.disabled) buttonClass += ' disabled';
																				buttonsHTML += '<div class="' + buttonClass + '">' + button.text + '</div>';
																				if (j === params[i].length - 1) buttonsHTML += '</div>';
																}
												}
												modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';

												_modalTemplateTempDiv.innerHTML = modalHTML;
												modal = (0, _dom2.default)(_modalTemplateTempDiv).children();
												(0, _dom2.default)('body').append(modal[0]);
												groupSelector = '.actions-modal-group';
												buttonSelector = '.actions-modal-button';
								}
								var groups = modal.find(groupSelector);
								groups.each(function (index, el) {
												var groupIndex = index;
												(0, _dom2.default)(el).children().each(function (index, el) {
																var buttonIndex = index;
																var buttonParams = params[groupIndex][buttonIndex];
																var clickTarget;
																if (!toPopover && (0, _dom2.default)(el).is(buttonSelector)) clickTarget = (0, _dom2.default)(el);
																if (toPopover && (0, _dom2.default)(el).find(buttonSelector).length > 0) clickTarget = (0, _dom2.default)(el).find(buttonSelector);

																if (clickTarget) {
																				clickTarget.on('click', function (e) {
																								e.preventDefault();
																								if (buttonParams.close !== false) _modals2.default.closeModal(modal);
																								if (buttonParams.onClick) buttonParams.onClick(modal, e);
																				});
																}
												});
								});
								if (!toPopover) _modals2.default.openModal(modal);
								return modal[0];
				}
};

exports.default = ActionSheet;