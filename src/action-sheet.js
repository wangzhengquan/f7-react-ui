// Action Sheet
import Modals from './modals'
import $ from './dom'
import t7 from './template'
require('./resources/less/lists.less')
var _compiledTemplates = {}
var _modalTemplateTempDiv = document.createElement('div');

var ActionSheet = {
	open (target, params) {
	    var toPopover = false, modal, groupSelector, buttonSelector;
	    if (arguments.length === 1) {
	        // Actions
	        params = target;
	    }
	    else {
	        // Popover
	        if (device.ios) {
	            if (device.ipad) toPopover = true;
	        }
	        else {
	            if ($(window).width() >= 768) toPopover = true;
	        }
	    }
	    params = params || [];

	    if (params.length > 0 && !Array.isArray(params[0])) {
	        params = [params];
	    }
	    var modalHTML;
	    if (toPopover) {
	        var actionsToPopoverTemplate = 
	            '<div class="popover actions-popover">' +
	              '<div class="popover-inner">' +
	                '{{#each this}}' +
	                '<div class="list-block">' +
	                  '<ul>' +
	                    '{{#each this}}' +
	                    '{{#if label}}' +
	                    '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' +
	                    '{{else}}' +
	                    '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>' +
	                    '{{/if}}' +
	                    '{{/each}}' +
	                  '</ul>' +
	                '</div>' +
	                '{{/each}}' +
	              '</div>' +
	            '</div>';
	        if (!_compiledTemplates.actionsToPopover) {
	            _compiledTemplates.actionsToPopover = t7.compile(actionsToPopoverTemplate);
	        }
	        var popoverHTML = _compiledTemplates.actionsToPopover(params);
	        modal = $(Modals.popover(popoverHTML, target, true));
	        groupSelector = '.list-block ul';
	        buttonSelector = '.list-button';
	    }
	    else {
	        var buttonsHTML = '';
            for (var i = 0; i < params.length; i++) {
                for (var j = 0; j < params[i].length; j++) {
                    if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
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
	        modal = $(_modalTemplateTempDiv).children();
	        $('body').append(modal[0]);
	        groupSelector = '.actions-modal-group';
	        buttonSelector = '.actions-modal-button';
	    }
	    var groups = modal.find(groupSelector);
	    groups.each(function (index, el) {
	        var groupIndex = index;
	        $(el).children().each(function (index, el) {
	            var buttonIndex = index;
	            var buttonParams = params[groupIndex][buttonIndex];
	            var clickTarget;
	            if (!toPopover && $(el).is(buttonSelector)) clickTarget = $(el);
	            if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);

	            if (clickTarget) {
	                clickTarget.on('click', function (e) {
	                	e.preventDefault()
	                    if (buttonParams.close !== false) Modals.closeModal(modal);
	                    if (buttonParams.onClick) buttonParams.onClick(modal, e);
	                });
	            }
	        });
	    });
	    if (!toPopover) Modals.openModal(modal);
	    return modal[0];
	}	
}

export default ActionSheet
    