'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./resources/less/accordion.less'); /*===============================================================================
                                            ************   Accordion   ************
                                            ===============================================================================*/


var accordionToggle = function accordionToggle(item) {
    item = (0, _dom2.default)(item);
    if (item.length === 0) return;
    if (item.hasClass('accordion-item-expanded')) accordionClose(item);else accordionOpen(item);
};
var accordionOpen = function accordionOpen(item) {
    item = (0, _dom2.default)(item);
    var list = item.parents('.accordion-list').eq(0);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
    if (expandedItem.length > 0) {
        accordionClose(expandedItem);
    }
    content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        } else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('open');
    item.addClass('accordion-item-expanded');
};
var accordionClose = function accordionClose(item) {
    item = (0, _dom2.default)(item);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    item.removeClass('accordion-item-expanded');
    content.transition(0);
    content.css('height', content[0].scrollHeight + 'px');
    // Relayout
    var clientLeft = content[0].clientLeft;
    // Close
    content.transition('');
    content.css('height', '').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        } else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('close');
};

(0, _dom2.default)(document).on('click', 'a, .accordion-item-toggle', function (e) {

    var clicked = (0, _dom2.default)(this);
    var isLink = clicked[0].nodeName.toLowerCase() === 'a';
    if (clicked.hasClass('accordion-item-toggle') || clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item')) {
        if (isLink) e.preventDefault();
        var accordionItem = clicked.parent('.accordion-item');
        if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
        if (accordionItem.length === 0) accordionItem = clicked.parents('li');
        accordionToggle(accordionItem);
    }
});
exports.default = {
    accordionToggle: accordionToggle,
    accordionOpen: accordionOpen,
    accordionClose: accordionClose
};