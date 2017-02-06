'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

var _domUtils = require('../core/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_plugins2.default.plugins['paste'] = function () {
    function getClipboardData(callback) {
        var doc = this.document;
        if (doc.getElementById('baidu_pastebin')) {
            return;
        }
        var range = this.selection.getRange(),
            bk = range.createBookmark(),

        //创建剪贴的容器div
        pastebin = doc.createElement('div');
        pastebin.id = 'baidu_pastebin';
        // Safari 要求div必须有内容，才能粘贴内容进来
        _browser2.default.webkit && pastebin.appendChild(doc.createTextNode(_domUtils2.default.fillChar + _domUtils2.default.fillChar));
        this.body.appendChild(pastebin);
        //trace:717 隐藏的span不能得到top
        //bk.start.innerHTML = '&nbsp;';
        bk.start.style.display = '';

        pastebin.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" +
        //要在现在光标平行的位置加入，否则会出现跳动的问题
        (0, _dom2.default)(bk.start).position().top + 'px';

        range.selectNodeContents(pastebin).select(true);

        setTimeout(function () {
            if (_browser2.default.webkit) {
                for (var i = 0, pastebins = doc.querySelectorAll('#baidu_pastebin'), pi; pi = pastebins[i++];) {
                    if (_domUtils2.default.isEmptyNode(pi)) {
                        _domUtils2.default.remove(pi);
                    } else {
                        pastebin = pi;
                        break;
                    }
                }
            }
            try {
                pastebin.parentNode.removeChild(pastebin);
            } catch (e) {}
            range.moveToBookmark(bk).select(true);
            callback(pastebin);
        }, 0);
    }

    var me = this;

    function filter(div) {
        var html;
        if (div.firstChild) {
            //去掉cut中添加的边界值
            var nodes = _domUtils2.default.getElementsByTagName(div, 'span');
            for (var i = 0, ni; ni = nodes[i++];) {
                if (ni.id == '_baidu_cut_start' || ni.id == '_baidu_cut_end') {
                    _domUtils2.default.remove(ni);
                }
            }

            if (_browser2.default.webkit) {

                var brs = div.querySelectorAll('div br');
                for (var i = 0, bi; bi = brs[i++];) {
                    var pN = bi.parentNode;
                    if (pN.tagName == 'DIV' && pN.childNodes.length == 1) {
                        pN.innerHTML = '<p><br/></p>';
                        _domUtils2.default.remove(pN);
                    }
                }
                var divs = div.querySelectorAll('#baidu_pastebin');
                for (var i = 0, di; di = divs[i++];) {
                    var tmpP = me.document.createElement('p');
                    di.parentNode.insertBefore(tmpP, di);
                    while (di.firstChild) {
                        tmpP.appendChild(di.firstChild);
                    }
                    _domUtils2.default.remove(di);
                }

                var metas = div.querySelectorAll('meta');
                for (var i = 0, ci; ci = metas[i++];) {
                    _domUtils2.default.remove(ci);
                }

                var brs = div.querySelectorAll('br');
                for (i = 0; ci = brs[i++];) {
                    if (/^apple-/i.test(ci.className)) {
                        _domUtils2.default.remove(ci);
                    }
                }
            }
            if (_browser2.default.gecko) {
                var dirtyNodes = div.querySelectorAll('[_moz_dirty]');
                for (i = 0; ci = dirtyNodes[i++];) {
                    ci.removeAttribute('_moz_dirty');
                }
            }
            if (!_browser2.default.ie) {
                var spans = div.querySelectorAll('span.Apple-style-span');
                for (var i = 0, ci; ci = spans[i++];) {
                    _domUtils2.default.remove(ci, true);
                }
            }

            //ie下使用innerHTML会产生多余的\r\n字符，也会产生&nbsp;这里过滤掉
            html = div.innerHTML; //.replace(/>(?:(\s|&nbsp;)*?)</g,'><');

            //过滤word粘贴过来的冗余属性
            html = _plugins2.default.filterWord(html);
            //取消了忽略空白的第二个参数，粘贴过来的有些是有空白的，会被套上相关的标签
            var root = _plugins2.default.htmlparser(html);
            //如果给了过滤规则就先进行过滤
            if (me.options.filterRules) {
                _plugins2.default.filterNode(root, me.options.filterRules);
            }
            //执行默认的处理
            me.filterInputRule(root);
            //针对chrome的处理
            if (_browser2.default.webkit) {
                var br = root.lastChild();
                if (br && br.type == 'element' && br.tagName == 'br') {
                    root.removeChild(br);
                }
                _utils2.default.each(me.body.querySelectorAll('div'), function (node) {
                    if (_domUtils2.default.isEmptyBlock(node)) {
                        _domUtils2.default.remove(node);
                    }
                });
            }
            html = { 'html': root.toHtml() };
            me.fireEvent('beforepaste', html, root);
            //抢了默认的粘贴，那后边的内容就不执行了，比如表格粘贴
            if (!html.html) {
                return;
            }

            me.execCommand('insertHtml', html.html, true);
            me.fireEvent("afterpaste", html);
        }
    }

    me.addListener('ready', function () {
        (0, _dom2.default)(me.body).on('cut', function () {
            var range = me.selection.getRange();
            if (!range.collapsed && me.undoManger) {
                me.undoManger.save();
            }
        }).on(_browser2.default.ie || _browser2.default.opera ? 'keydown' : 'paste', function (e) {
            //ie下beforepaste在点击右键时也会触发，所以用监控键盘才处理
            if ((_browser2.default.ie || _browser2.default.opera) && (!e.ctrlKey && !e.metaKey || e.keyCode != '86')) {
                return;
            }
            getClipboardData.call(me, function (div) {
                filter(div);
            });
        });
    });
}; ///import core
///import plugins/inserthtml.js
///import plugins/undo.js
///import plugins/serialize.js
///commands 粘贴
///commandsName  PastePlain
///commandsTitle  纯文本粘贴模式
/**
 * @description 粘贴
 * @author zhanyi
 */
/* eslint quotes : "off"*/