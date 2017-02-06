'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _domUtils = require('../core/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

var _dtd = require('../core/dtd');

var _dtd2 = _interopRequireDefault(_dtd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_plugins2.default.plugins['horizontal'] = function () {
    var me = this;
    me.commands['horizontal'] = {
        execCommand: function execCommand() {
            this.document.execCommand('insertHorizontalRule');
            var rng = me.selection.getRange().txtToElmBoundary(true),
                start = rng.startContainer;
            if (_domUtils2.default.isBody(rng.startContainer)) {
                var next = rng.startContainer.childNodes[rng.startOffset];
                if (!next) {
                    next = (0, _dom2.default)('<p></p>').appendTo(rng.startContainer).html(_browser2.default.ie ? '&nbsp;' : '<br/>')[0];
                }
                rng.setStart(next, 0).setCursor();
            } else {

                while (_dtd2.default.$inline[start.tagName] && start.lastChild === start.firstChild) {

                    var parent = start.parentNode;
                    parent.appendChild(start.firstChild);
                    parent.removeChild(start);
                    start = parent;
                }
                while (_dtd2.default.$inline[start.tagName]) {
                    start = start.parentNode;
                }
                if (start.childNodes.length == 1 && start.lastChild.nodeName == 'HR') {
                    var hr = start.lastChild;
                    (0, _dom2.default)(hr).insertBefore(start);
                    rng.setStart(start, 0).setCursor();
                } else {
                    hr = (0, _dom2.default)('hr', start)[0];
                    _domUtils2.default.breakParent(hr, start);
                    var pre = hr.previousSibling;
                    if (pre && _domUtils2.default.isEmptyBlock(pre)) {
                        (0, _dom2.default)(pre).remove();
                    }
                    rng.setStart(hr.nextSibling, 0).setCursor();
                }
            }
        }
    };
}; ///import core
///import plugins\inserthtml.js
///commands 分割线
///commandsName  Horizontal
///commandsTitle  分隔线
/**
 * 分割线
 * @function
 * @name Plugins.execCommand
 * @param {String}     cmdName    horizontal插入分割线
 */
/* eslint quotes : "off"*/