'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_plugins2.default.plugins['formula'] = function () {
    var me = this;

    function getActiveIframe() {
        return me.$body.find('iframe.edui-formula-active')[0] || null;
    }

    function blurActiveIframe() {
        var iframe = getActiveIframe();
        iframe && iframe.contentWindow.formula.blur();
    }

    me.addInputRule(function (root) {
        _utils2.default.each(root.getNodesByTagName('span'), function (node) {
            if (node.hasClass('mathquill-embedded-latex')) {
                var firstChild,
                    latex = '';
                while (firstChild = node.firstChild()) {
                    latex += firstChild.data;
                    node.removeChild(firstChild);
                }
                node.tagName = 'iframe';
                node.setAttr({
                    'frameborder': '0',
                    'src': me.getOpt('PluginsEDITOR_HOME_URL') + 'dialogs/formula/formula.html',
                    'data-latex': _utils2.default.unhtml(latex)
                });
            }
        });
    });
    me.addOutputRule(function (root) {
        _utils2.default.each(root.getNodesByTagName('iframe'), function (node) {
            if (node.hasClass('mathquill-embedded-latex')) {
                node.tagName = 'span';
                node.appendChild(_plugins2.default.uNode.createText(node.getAttr('data-latex')));
                node.setAttr({
                    'frameborder': '',
                    'src': '',
                    'data-latex': ''
                });
            }
        });
    });
    me.addListener('click', function () {
        blurActiveIframe();
    });
    me.addListener('afterexeccommand', function (type, cmd) {
        if (cmd != 'formula') {
            blurActiveIframe();
        }
    });

    me.commands['formula'] = {
        execCommand: function execCommand(cmd, latex) {
            var iframe = getActiveIframe();
            if (iframe) {
                iframe.contentWindow.formula.insertLatex(latex);
            } else {
                me.execCommand('inserthtml', '<span class="mathquill-embedded-latex">' + latex + '</span>');
                _browser2.default.ie && _browser2.default.ie9below && setTimeout(function () {
                    var rng = me.selection.getRange(),
                        startContainer = rng.startContainer;
                    if (startContainer.nodeType == 1 && !startContainer.childNodes[rng.startOffset]) {
                        rng.insertNode(me.document.createTextNode(' '));
                        rng.setCursor();
                    }
                }, 100);
            }
        },
        queryCommandState: function queryCommandState(cmd) {
            return 0;
        },
        queryCommandValue: function queryCommandValue(cmd) {
            var iframe = getActiveIframe();
            return iframe && iframe.contentWindow.formula.getLatex();
        }
    };
}; /**
    * 公式插件
    */
/* eslint quotes : "off"*/