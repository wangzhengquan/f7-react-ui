'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

var _dtd = require('./dtd');

var _dtd2 = _interopRequireDefault(_dtd);

var _domUtils = require('./domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

var _Range = require('./Range');

var _Range2 = _interopRequireDefault(_Range);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var dom =UM.dom


function getBoundaryInformation(range, start) {
    var getIndex = _domUtils2.default.getNodeIndex;
    range = range.duplicate();
    range.collapse(start);
    var parent = range.parentElement();
    //如果节点里没有子节点，直接退出
    if (!parent.hasChildNodes()) {
        return { container: parent, offset: 0 };
    }
    var siblings = parent.children,
        child,
        testRange = range.duplicate(),
        startIndex = 0,
        endIndex = siblings.length - 1,
        index = -1,
        distance;
    while (startIndex <= endIndex) {
        index = Math.floor((startIndex + endIndex) / 2);
        child = siblings[index];
        testRange.moveToElementText(child);
        var position = testRange.compareEndPoints('StartToStart', range);
        if (position > 0) {
            endIndex = index - 1;
        } else if (position < 0) {
            startIndex = index + 1;
        } else {
            //trace:1043
            return { container: parent, offset: getIndex(child) };
        }
    }
    if (index == -1) {
        testRange.moveToElementText(parent);
        testRange.setEndPoint('StartToStart', range);
        distance = testRange.text.replace(/(\r\n|\r)/g, '\n').length;
        siblings = parent.childNodes;
        if (!distance) {
            child = siblings[siblings.length - 1];
            return { container: child, offset: child.nodeValue.length };
        }

        var i = siblings.length;
        while (distance > 0) {
            distance -= siblings[--i].nodeValue.length;
        }
        return { container: siblings[i], offset: -distance };
    }
    testRange.collapse(position > 0);
    testRange.setEndPoint(position > 0 ? 'StartToStart' : 'EndToStart', range);
    distance = testRange.text.replace(/(\r\n|\r)/g, '\n').length;
    if (!distance) {
        return _dtd2.default.$empty[child.tagName] || _dtd2.default.$nonChild[child.tagName] ? { container: parent, offset: getIndex(child) + (position > 0 ? 0 : 1) } : { container: child, offset: position > 0 ? 0 : child.childNodes.length };
    }
    while (distance > 0) {
        try {
            var pre = child;
            child = child[position > 0 ? 'previousSibling' : 'nextSibling'];
            distance -= child.nodeValue.length;
        } catch (e) {
            return { container: parent, offset: getIndex(pre) };
        }
    }
    return { container: child, offset: position > 0 ? -distance : child.nodeValue.length + distance };
}

/**
 * 将ieRange转换为Range对象
 * @param {Range}   ieRange    ieRange对象
 * @param {Range}   range      Range对象
 * @return  {Range}  range       返回转换后的Range对象
 */
///import editor.js
///import core/browser.js
///import core/dom/dom.js
///import core/dom/dtd.js
///import core/dom/domUtils.js
///import core/dom/Range.js
/**
 * @class UM.dom.Selection    Selection类
 */
// import {dom} from '../editor'
function transformIERangeToRange(ieRange, range) {
    if (ieRange.item) {
        range.selectNode(ieRange.item(0));
    } else {
        var bi = getBoundaryInformation(ieRange, true);
        range.setStart(bi.container, bi.offset);
        if (ieRange.compareEndPoints('StartToEnd', ieRange) != 0) {
            bi = getBoundaryInformation(ieRange, false);
            range.setEnd(bi.container, bi.offset);
        }
    }
    return range;
}

/**
 * 获得ieRange
 * @param {Selection} sel    Selection对象
 * @return {ieRange}    得到ieRange
 */
function _getIERange(sel, txtRange) {
    var ieRange;
    //ie下有可能报错
    try {
        ieRange = sel.getNative(txtRange).createRange();
    } catch (e) {
        return null;
    }
    var el = ieRange.item ? ieRange.item(0) : ieRange.parentElement();
    if ((el.ownerDocument || el) === sel.document) {
        return ieRange;
    }
    return null;
}

var Selection = function Selection(doc, body) {
    var me = this;
    me.document = doc;
    me.body = body;
    if (_browser2.default.ie9below) {
        (0, _dom2.default)(body).on('beforedeactivate', function () {
            me._bakIERange = me.getIERange();
        }).on('activate', function () {
            try {
                var ieNativRng = _getIERange(me);
                if ((!ieNativRng || !me.rangeInBody(ieNativRng)) && me._bakIERange) {
                    me._bakIERange.select();
                }
            } catch (ex) {}
            me._bakIERange = null;
        });
    }
};

Selection.prototype = {
    hasNativeRange: function hasNativeRange() {
        var rng;
        if (!_browser2.default.ie || _browser2.default.ie9above) {
            var nativeSel = this.getNative();
            if (!nativeSel.rangeCount) {
                return false;
            }
            rng = nativeSel.getRangeAt(0);
        } else {
            rng = _getIERange(this);
        }
        return this.rangeInBody(rng);
    },
    /**
     * 获取原生seleciton对象
     * @public
     * @function
     * @name    UM.dom.Selection.getNative
     * @return {Selection}    获得selection对象
     */
    getNative: function getNative(txtRange) {
        var doc = this.document;
        try {
            return !doc ? null : _browser2.default.ie9below || txtRange ? doc.selection : _domUtils2.default.getWindow(doc).getSelection();
        } catch (e) {
            return null;
        }
    },
    /**
     * 获得ieRange
     * @public
     * @function
     * @name    UM.dom.Selection.getIERange
     * @return {ieRange}    返回ie原生的Range
     */
    getIERange: function getIERange(txtRange) {
        var ieRange = _getIERange(this, txtRange);
        if (!ieRange || !this.rangeInBody(ieRange, txtRange)) {
            if (this._bakIERange) {
                return this._bakIERange;
            }
        }
        return ieRange;
    },
    rangeInBody: function rangeInBody(rng, txtRange) {
        var node = _browser2.default.ie9below || txtRange ? rng.item ? rng.item() : rng.parentElement() : rng.startContainer;

        return node === this.body || _domUtils2.default.inDoc(node, this.body);
    },
    /**
     * 缓存当前选区的range和选区的开始节点
     * @public
     * @function
     * @name    UM.dom.Selection.cache
     */
    cache: function cache() {
        this.clear();
        this._cachedRange = this.getRange();
        this._cachedStartElement = this.getStart();
        this._cachedStartElementPath = this.getStartElementPath();
    },

    getStartElementPath: function getStartElementPath() {
        if (this._cachedStartElementPath) {
            return this._cachedStartElementPath;
        }
        var start = this.getStart();
        if (start) {
            return _domUtils2.default.findParents(start, true, null, true);
        }
        return [];
    },
    /**
     * 清空缓存
     * @public
     * @function
     * @name    UM.dom.Selection.clear
     */
    clear: function clear() {
        this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null;
    },
    /**
     * 编辑器是否得到了选区
     */
    isFocus: function isFocus() {
        return this.hasNativeRange();
    },
    /**
     * 获取选区对应的Range
     * @public
     * @function
     * @name    UM.dom.Selection.getRange
     * @returns {UM.dom.Range}    得到Range对象
     */
    getRange: function getRange() {
        var me = this;
        function optimze(range) {
            var child = me.body.firstChild,
                collapsed = range.collapsed;
            while (child && child.firstChild) {
                range.setStart(child, 0);
                child = child.firstChild;
            }
            if (!range.startContainer) {
                range.setStart(me.body, 0);
            }
            if (collapsed) {
                range.collapse(true);
            }
        }

        if (me._cachedRange != null) {
            return this._cachedRange;
        }
        var range = new _Range2.default(me.document, me.body);
        if (_browser2.default.ie9below) {
            var nativeRange = me.getIERange();
            if (nativeRange && this.rangeInBody(nativeRange)) {

                try {
                    transformIERangeToRange(nativeRange, range);
                } catch (e) {
                    optimze(range);
                }
            } else {
                optimze(range);
            }
        } else {
            var sel = me.getNative();
            if (sel && sel.rangeCount && me.rangeInBody(sel.getRangeAt(0))) {
                var firstRange = sel.getRangeAt(0);
                var lastRange = sel.getRangeAt(sel.rangeCount - 1);
                range.setStart(firstRange.startContainer, firstRange.startOffset).setEnd(lastRange.endContainer, lastRange.endOffset);
                if (range.collapsed && _domUtils2.default.isBody(range.startContainer) && !range.startOffset) {
                    optimze(range);
                }
            } else {
                //trace:1734 有可能已经不在dom树上了，标识的节点
                if (this._bakRange && (this._bakRange.startContainer === this.body || _domUtils2.default.inDoc(this._bakRange.startContainer, this.body))) {
                    return this._bakRange;
                }
                optimze(range);
            }
        }

        return this._bakRange = range;
    },

    /**
     * 获取开始元素，用于状态反射
     * @public
     * @function
     * @name    UM.dom.Selection.getStart
     * @return {Element}     获得开始元素
     */
    getStart: function getStart() {
        if (this._cachedStartElement) {
            return this._cachedStartElement;
        }
        var range = _browser2.default.ie9below ? this.getIERange() : this.getRange(),
            tmpRange,
            start,
            tmp,
            parent;
        if (_browser2.default.ie9below) {
            if (!range) {
                //todo 给第一个值可能会有问题
                return this.document.body.firstChild;
            }
            //control元素
            if (range.item) {
                return range.item(0);
            }
            tmpRange = range.duplicate();
            //修正ie下<b>x</b>[xx] 闭合后 <b>x|</b>xx
            tmpRange.text.length > 0 && tmpRange.moveStart('character', 1);
            tmpRange.collapse(1);
            start = tmpRange.parentElement();
            parent = tmp = range.parentElement();
            while (tmp = tmp.parentNode) {
                if (tmp == start) {
                    start = parent;
                    break;
                }
            }
        } else {
            start = range.startContainer;
            if (start.nodeType == 1 && start.hasChildNodes()) {
                start = start.childNodes[Math.min(start.childNodes.length - 1, range.startOffset)];
            }
            if (start.nodeType == 3) {
                return start.parentNode;
            }
        }
        return start;
    },
    /**
     * 得到选区中的文本
     * @public
     * @function
     * @name    UM.dom.Selection.getText
     * @return  {String}    选区中包含的文本
     */
    getText: function getText() {
        var nativeSel, nativeRange;
        if (this.isFocus() && (nativeSel = this.getNative())) {
            nativeRange = _browser2.default.ie9below ? nativeSel.createRange() : nativeSel.getRangeAt(0);
            return _browser2.default.ie9below ? nativeRange.text : nativeRange.toString();
        }
        return '';
    }
};
exports.default = Selection;