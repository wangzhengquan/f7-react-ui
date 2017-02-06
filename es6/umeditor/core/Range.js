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

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///import editor.js
///import core/utils.js
///import core/browser.js
///import core/dom/dom.js
///import core/dom/dtd.js
///import core/dom/domUtils.js
/**
 * @file
 * @name UM.dom.Range
 * @anthor zhanyi
 * @short Range
 * @import editor.js,core/utils.js,core/browser.js,core/dom/domUtils.js,core/dom/dtd.js
 * @desc Range范围实现类，本类是UEditor底层核心类，统一w3cRange和ieRange之间的差异，包括接口和属性
 */
// import {dom} from '../editor'
// import utils from './utils'
var guid = 0,
    fillChar = _domUtils2.default.fillChar,
    fillData;

/**
 * 更新range的collapse状态
 * @param  {Range}   range    range对象
 */
function updateCollapse(range) {
    range.collapsed = range.startContainer && range.endContainer && range.startContainer === range.endContainer && range.startOffset == range.endOffset;
}

function selectOneNode(rng) {
    return !rng.collapsed && rng.startContainer.nodeType == 1 && rng.startContainer === rng.endContainer && rng.endOffset - rng.startOffset == 1;
}
function setEndPoint(toStart, node, offset, range) {
    //如果node是自闭合标签要处理
    if (node.nodeType == 1 && (_dtd2.default.$empty[node.tagName] || _dtd2.default.$nonChild[node.tagName])) {
        offset = _domUtils2.default.getNodeIndex(node) + (toStart ? 0 : 1);
        node = node.parentNode;
    }
    if (toStart) {
        range.startContainer = node;
        range.startOffset = offset;
        if (!range.endContainer) {
            range.collapse(true);
        }
    } else {
        range.endContainer = node;
        range.endOffset = offset;
        if (!range.startContainer) {
            range.collapse(false);
        }
    }
    updateCollapse(range);
    return range;
}

/**
 * @name Range
 * @grammar new UM.dom.Range(document)  => Range 实例
 * @desc 创建一个跟document绑定的空的Range实例
 * - ***startContainer*** 开始边界的容器节点,可以是elementNode或者是textNode
 * - ***startOffset*** 容器节点中的偏移量，如果是elementNode就是childNodes中的第几个，如果是textNode就是nodeValue的第几个字符
 * - ***endContainer*** 结束边界的容器节点,可以是elementNode或者是textNode
 * - ***endOffset*** 容器节点中的偏移量，如果是elementNode就是childNodes中的第几个，如果是textNode就是nodeValue的第几个字符
 * - ***document*** 跟range关联的document对象
 * - ***collapsed*** 是否是闭合状态
 */
var Range = function Range(document, body) {
    var me = this;
    me.startContainer = me.startOffset = me.endContainer = me.endOffset = null;
    me.document = document;
    me.collapsed = true;
    me.body = body;
};

/**
 * 删除fillData
 * @param doc
 * @param excludeNode
 */
function removeFillData(doc, excludeNode) {
    try {
        if (fillData && _domUtils2.default.inDoc(fillData, doc)) {
            if (!fillData.nodeValue.replace(_domUtils2.default.fillCharReg, '').length) {
                var tmpNode = fillData.parentNode;
                _domUtils2.default.remove(fillData);
                while (tmpNode && _domUtils2.default.isEmptyInlineElement(tmpNode) && (
                //safari的contains有bug
                _browser2.default.safari ? !(_domUtils2.default.getPosition(tmpNode, excludeNode) & _domUtils2.default.POSITION_CONTAINS) : !tmpNode.contains(excludeNode))) {
                    fillData = tmpNode.parentNode;
                    _domUtils2.default.remove(tmpNode);
                    tmpNode = fillData;
                }
            } else {
                fillData.nodeValue = fillData.nodeValue.replace(_domUtils2.default.fillCharReg, '');
            }
        }
    } catch (e) {}
}

/**
 *
 * @param node
 * @param dir
 */
function mergeSibling(node, dir) {
    var tmpNode;
    node = node[dir];
    while (node && _domUtils2.default.isFillChar(node)) {
        tmpNode = node[dir];
        _domUtils2.default.remove(node);
        node = tmpNode;
    }
}

function execContentsAction(range, action) {
    //调整边界
    //range.includeBookmark();
    var start = range.startContainer,
        end = range.endContainer,
        startOffset = range.startOffset,
        endOffset = range.endOffset,
        doc = range.document,
        frag = doc.createDocumentFragment(),
        tmpStart,
        tmpEnd;
    if (start.nodeType == 1) {
        start = start.childNodes[startOffset] || (tmpStart = start.appendChild(doc.createTextNode('')));
    }
    if (end.nodeType == 1) {
        end = end.childNodes[endOffset] || (tmpEnd = end.appendChild(doc.createTextNode('')));
    }
    if (start === end && start.nodeType == 3) {
        frag.appendChild(doc.createTextNode(start.substringData(startOffset, endOffset - startOffset)));
        //is not clone
        if (action) {
            start.deleteData(startOffset, endOffset - startOffset);
            range.collapse(true);
        }
        return frag;
    }
    var current,
        currentLevel,
        clone = frag,
        startParents = _domUtils2.default.findParents(start, true),
        endParents = _domUtils2.default.findParents(end, true);
    for (var i = 0; startParents[i] == endParents[i];) {
        i++;
    }
    for (var j = i, si; si = startParents[j]; j++) {
        current = si.nextSibling;
        if (si == start) {
            if (!tmpStart) {
                if (range.startContainer.nodeType == 3) {
                    clone.appendChild(doc.createTextNode(start.nodeValue.slice(startOffset)));
                    //is not clone
                    if (action) {
                        start.deleteData(startOffset, start.nodeValue.length - startOffset);
                    }
                } else {
                    clone.appendChild(!action ? start.cloneNode(true) : start);
                }
            }
        } else {
            currentLevel = si.cloneNode(false);
            clone.appendChild(currentLevel);
        }
        while (current) {
            if (current === end || current === endParents[j]) {
                break;
            }
            si = current.nextSibling;
            clone.appendChild(!action ? current.cloneNode(true) : current);
            current = si;
        }
        clone = currentLevel;
    }
    clone = frag;
    if (!startParents[i]) {
        clone.appendChild(startParents[i - 1].cloneNode(false));
        clone = clone.firstChild;
    }
    for (var j = i, ei; ei = endParents[j]; j++) {
        current = ei.previousSibling;
        if (ei == end) {
            if (!tmpEnd && range.endContainer.nodeType == 3) {
                clone.appendChild(doc.createTextNode(end.substringData(0, endOffset)));
                //is not clone
                if (action) {
                    end.deleteData(0, endOffset);
                }
            }
        } else {
            currentLevel = ei.cloneNode(false);
            clone.appendChild(currentLevel);
        }
        //如果两端同级，右边第一次已经被开始做了
        if (j != i || !startParents[i]) {
            while (current) {
                if (current === start) {
                    break;
                }
                ei = current.previousSibling;
                clone.insertBefore(!action ? current.cloneNode(true) : current, clone.firstChild);
                current = ei;
            }
        }
        clone = currentLevel;
    }
    if (action) {
        range.setStartBefore(!endParents[i] ? endParents[i - 1] : !startParents[i] ? startParents[i - 1] : endParents[i]).collapse(true);
    }
    tmpStart && _domUtils2.default.remove(tmpStart);
    tmpEnd && _domUtils2.default.remove(tmpEnd);
    return frag;
}
Range.prototype = {
    /**
     * @name deleteContents
     * @grammar range.deleteContents()  => Range
     * @desc 删除当前选区范围中的所有内容并返回range实例，这时的range已经变成了闭合状态
     * @example
     * DOM Element :
     * <b>x<i>x[x<i>xx]x</b>
     * //执行方法后
     * <b>x<i>x<i>|x</b>
     * 注意range改变了
     * range.startContainer => b
     * range.startOffset  => 2
     * range.endContainer => b
     * range.endOffset => 2
     * range.collapsed => true
     */
    deleteContents: function deleteContents() {
        var txt;
        if (!this.collapsed) {
            execContentsAction(this, 1);
        }
        if (_browser2.default.webkit) {
            txt = this.startContainer;
            if (txt.nodeType == 3 && !txt.nodeValue.length) {
                this.setStartBefore(txt).collapse(true);
                _domUtils2.default.remove(txt);
            }
        }
        return this;
    },
    inFillChar: function inFillChar() {
        var start = this.startContainer;
        if (this.collapsed && start.nodeType == 3 && start.nodeValue.replace(new RegExp('^' + _domUtils2.default.fillChar), '').length + 1 == start.nodeValue.length) {
            return true;
        }
        return false;
    },
    /**
     * @name  setStart
     * @grammar range.setStart(node,offset)  => Range
     * @desc    设置range的开始位置位于node节点内，偏移量为offset
     * 如果node是elementNode那offset指的是childNodes中的第几个，如果是textNode那offset指的是nodeValue的第几个字符
     */
    setStart: function setStart(node, offset) {
        return setEndPoint(true, node, offset, this);
    },
    /**
     * 设置range的结束位置位于node节点，偏移量为offset
     * 如果node是elementNode那offset指的是childNodes中的第几个，如果是textNode那offset指的是nodeValue的第几个字符
     * @name  setEnd
     * @grammar range.setEnd(node,offset)  => Range
     */
    setEnd: function setEnd(node, offset) {
        return setEndPoint(false, node, offset, this);
    },
    /**
     * 将Range开始位置设置到node节点之后
     * @name  setStartAfter
     * @grammar range.setStartAfter(node)  => Range
     * @example
     * <b>xx<i>x|x</i>x</b>
     * 执行setStartAfter(i)后
     * range.startContainer =>b
     * range.startOffset =>2
     */
    setStartAfter: function setStartAfter(node) {
        return this.setStart(node.parentNode, _domUtils2.default.getNodeIndex(node) + 1);
    },
    /**
     * 将Range开始位置设置到node节点之前
     * @name  setStartBefore
     * @grammar range.setStartBefore(node)  => Range
     * @example
     * <b>xx<i>x|x</i>x</b>
     * 执行setStartBefore(i)后
     * range.startContainer =>b
     * range.startOffset =>1
     */
    setStartBefore: function setStartBefore(node) {
        return this.setStart(node.parentNode, _domUtils2.default.getNodeIndex(node));
    },
    /**
     * 将Range结束位置设置到node节点之后
     * @name  setEndAfter
     * @grammar range.setEndAfter(node)  => Range
     * @example
     * <b>xx<i>x|x</i>x</b>
     * setEndAfter(i)后
     * range.endContainer =>b
     * range.endtOffset =>2
     */
    setEndAfter: function setEndAfter(node) {
        return this.setEnd(node.parentNode, _domUtils2.default.getNodeIndex(node) + 1);
    },
    /**
     * 将Range结束位置设置到node节点之前
     * @name  setEndBefore
     * @grammar range.setEndBefore(node)  => Range
     * @example
     * <b>xx<i>x|x</i>x</b>
     * 执行setEndBefore(i)后
     * range.endContainer =>b
     * range.endtOffset =>1
     */
    setEndBefore: function setEndBefore(node) {
        return this.setEnd(node.parentNode, _domUtils2.default.getNodeIndex(node));
    },
    /**
     * 将Range开始位置设置到node节点内的开始位置
     * @name  setStartAtFirst
     * @grammar range.setStartAtFirst(node)  => Range
     */
    setStartAtFirst: function setStartAtFirst(node) {
        return this.setStart(node, 0);
    },
    /**
     * 将Range开始位置设置到node节点内的结束位置
     * @name  setStartAtLast
     * @grammar range.setStartAtLast(node)  => Range
     */
    setStartAtLast: function setStartAtLast(node) {
        return this.setStart(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
    },
    /**
     * 将Range结束位置设置到node节点内的开始位置
     * @name  setEndAtFirst
     * @grammar range.setEndAtFirst(node)  => Range
     */
    setEndAtFirst: function setEndAtFirst(node) {
        return this.setEnd(node, 0);
    },
    /**
     * 将Range结束位置设置到node节点内的结束位置
     * @name  setEndAtLast
     * @grammar range.setEndAtLast(node)  => Range
     */
    setEndAtLast: function setEndAtLast(node) {
        return this.setEnd(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
    },

    /**
     * 选中完整的指定节点,并返回包含该节点的range
     * @name  selectNode
     * @grammar range.selectNode(node)  => Range
     */
    selectNode: function selectNode(node) {
        return this.setStartBefore(node).setEndAfter(node);
    },
    /**
     * 选中node内部的所有节点，并返回对应的range
     * @name selectNodeContents
     * @grammar range.selectNodeContents(node)  => Range
     * @example
     * <b>xx[x<i>xxx</i>]xxx</b>
     * 执行后
     * <b>[xxx<i>xxx</i>xxx]</b>
     * range.startContainer =>b
     * range.startOffset =>0
     * range.endContainer =>b
     * range.endOffset =>3
     */
    selectNodeContents: function selectNodeContents(node) {
        return this.setStart(node, 0).setEndAtLast(node);
    },

    /**
     * 克隆一个新的range对象
     * @name  cloneRange
     * @grammar range.cloneRange() => Range
     */
    cloneRange: function cloneRange() {
        var me = this;
        return new Range(me.document).setStart(me.startContainer, me.startOffset).setEnd(me.endContainer, me.endOffset);
    },

    /**
     * 让选区闭合到尾部，若toStart为真，则闭合到头部
     * @name  collapse
     * @grammar range.collapse() => Range
     * @grammar range.collapse(true) => Range   //闭合选区到头部
     */
    collapse: function collapse(toStart) {
        var me = this;
        if (toStart) {
            me.endContainer = me.startContainer;
            me.endOffset = me.startOffset;
        } else {
            me.startContainer = me.endContainer;
            me.startOffset = me.endOffset;
        }
        me.collapsed = true;
        return me;
    },

    /**
     * 调整range的边界，使其"收缩"到最小的位置
     * @name  shrinkBoundary
     * @grammar range.shrinkBoundary()  => Range  //range开始位置和结束位置都调整，参见<code><a href="#adjustmentboundary">adjustmentBoundary</a></code>
     * @grammar range.shrinkBoundary(true)  => Range  //仅调整开始位置，忽略结束位置
     * @example
     * <b>xx[</b>xxxxx] ==> <b>xx</b>[xxxxx]
     * <b>x[xx</b><i>]xxx</i> ==> <b>x[xx]</b><i>xxx</i>
     * [<b><i>xxxx</i>xxxxxxx</b>] ==> <b><i>[xxxx</i>xxxxxxx]</b>
     */
    shrinkBoundary: function shrinkBoundary(ignoreEnd) {
        var me = this,
            child,
            collapsed = me.collapsed;
        function check(node) {
            return node.nodeType == 1 && !_domUtils2.default.isBookmarkNode(node) && !_dtd2.default.$empty[node.tagName] && !_dtd2.default.$nonChild[node.tagName];
        }
        while (me.startContainer.nodeType == 1 //是element
        && (child = me.startContainer.childNodes[me.startOffset]) //子节点也是element
        && check(child)) {
            me.setStart(child, 0);
        }
        if (collapsed) {
            return me.collapse(true);
        }
        if (!ignoreEnd) {
            while (me.endContainer.nodeType == 1 //是element
            && me.endOffset > 0 //如果是空元素就退出 endOffset=0那么endOffst-1为负值，childNodes[endOffset]报错
            && (child = me.endContainer.childNodes[me.endOffset - 1]) //子节点也是element
            && check(child)) {
                me.setEnd(child, child.childNodes.length);
            }
        }
        return me;
    },

    /**
     * 调整边界容器，如果是textNode,就调整到elementNode上
     * @name trimBoundary
     * @grammar range.trimBoundary([ignoreEnd])  => Range //true忽略结束边界
     * @example
     * DOM Element :
     * <b>|xxx</b>
     * startContainer = xxx; startOffset = 0
     * //执行后本方法后
     * startContainer = <b>;  startOffset = 0
     * @example
     * Dom Element :
     * <b>xx|x</b>
     * startContainer = xxx;  startOffset = 2
     * //执行本方法后，xxx被实实在在地切分成两个TextNode
     * startContainer = <b>; startOffset = 1
     */
    trimBoundary: function trimBoundary(ignoreEnd) {
        this.txtToElmBoundary();
        var start = this.startContainer,
            offset = this.startOffset,
            collapsed = this.collapsed,
            end = this.endContainer;
        if (start.nodeType == 3) {
            if (offset == 0) {
                this.setStartBefore(start);
            } else {
                if (offset >= start.nodeValue.length) {
                    this.setStartAfter(start);
                } else {
                    var textNode = _domUtils2.default.split(start, offset);
                    //跟新结束边界
                    if (start === end) {
                        this.setEnd(textNode, this.endOffset - offset);
                    } else if (start.parentNode === end) {
                        this.endOffset += 1;
                    }
                    this.setStartBefore(textNode);
                }
            }
            if (collapsed) {
                return this.collapse(true);
            }
        }
        if (!ignoreEnd) {
            offset = this.endOffset;
            end = this.endContainer;
            if (end.nodeType == 3) {
                if (offset == 0) {
                    this.setEndBefore(end);
                } else {
                    offset < end.nodeValue.length && _domUtils2.default.split(end, offset);
                    this.setEndAfter(end);
                }
            }
        }
        return this;
    },
    /**
     * 如果选区在文本的边界上，就扩展选区到文本的父节点上
     * @name  txtToElmBoundary
     * @example
     * Dom Element :
     * <b> |xxx</b>
     * startContainer = xxx;  startOffset = 0
     * //本方法执行后
     * startContainer = <b>; startOffset = 0
     * @example
     * Dom Element :
     * <b> xxx| </b>
     * startContainer = xxx; startOffset = 3
     * //本方法执行后
     * startContainer = <b>; startOffset = 1
     */
    txtToElmBoundary: function txtToElmBoundary(ignoreCollapsed) {
        function adjust(r, c) {
            var container = r[c + 'Container'],
                offset = r[c + 'Offset'];
            if (container.nodeType == 3) {
                if (!offset) {
                    r['set' + c.replace(/(\w)/, function (a) {
                        return a.toUpperCase();
                    }) + 'Before'](container);
                } else if (offset >= container.nodeValue.length) {
                    r['set' + c.replace(/(\w)/, function (a) {
                        return a.toUpperCase();
                    }) + 'After'](container);
                }
            }
        }

        if (ignoreCollapsed || !this.collapsed) {
            adjust(this, 'start');
            adjust(this, 'end');
        }
        return this;
    },

    /**
     * 在当前选区的开始位置前插入一个节点或者fragment，range的开始位置会在插入节点的前边
     * @name  insertNode
     * @grammar range.insertNode(node)  => Range //node可以是textNode,elementNode,fragment
     * @example
     * Range :
     * xxx[x<p>xxxx</p>xxxx]x<p>sdfsdf</p>
     * 待插入Node :
     * <p>ssss</p>
     * 执行本方法后的Range :
     * xxx[<p>ssss</p>x<p>xxxx</p>xxxx]x<p>sdfsdf</p>
     */
    insertNode: function insertNode(node) {
        var first = node,
            length = 1;
        if (node.nodeType == 11) {
            first = node.firstChild;
            length = node.childNodes.length;
        }
        this.trimBoundary(true);
        var start = this.startContainer,
            offset = this.startOffset;
        var nextNode = start.childNodes[offset];
        if (nextNode) {
            start.insertBefore(node, nextNode);
        } else {
            start.appendChild(node);
        }
        if (first.parentNode === this.endContainer) {
            this.endOffset = this.endOffset + length;
        }
        return this.setStartBefore(first);
    },
    /**
     * 设置光标闭合位置,toEnd设置为true时光标将闭合到选区的结尾
     * @name  setCursor
     * @grammar range.setCursor([toEnd])  =>  Range   //toEnd为true时，光标闭合到选区的末尾
     */
    setCursor: function setCursor(toEnd, noFillData) {
        return this.collapse(!toEnd).select(noFillData);
    },
    /**
     * 创建当前range的一个书签，记录下当前range的位置，方便当dom树改变时，还能找回原来的选区位置
     * @name createBookmark
     * @grammar range.createBookmark([serialize])  => Object  //{start:开始标记,end:结束标记,id:serialize} serialize为真时，开始结束标记是插入节点的id，否则是插入节点的引用
     */
    createBookmark: function createBookmark(serialize, same) {
        var endNode,
            startNode = this.document.createElement('span');
        startNode.style.cssText = 'display:none;line-height:0px;';
        startNode.appendChild(this.document.createTextNode('\u200D'));
        startNode.id = '_baidu_bookmark_start_' + (same ? '' : guid++);

        if (!this.collapsed) {
            endNode = startNode.cloneNode(true);
            endNode.id = '_baidu_bookmark_end_' + (same ? '' : guid++);
        }
        this.insertNode(startNode);
        if (endNode) {
            this.collapse().insertNode(endNode).setEndBefore(endNode);
        }
        this.setStartAfter(startNode);
        return {
            start: serialize ? startNode.id : startNode,
            end: endNode ? serialize ? endNode.id : endNode : null,
            id: serialize
        };
    },
    /**
     *  移动边界到书签位置，并删除插入的书签节点
     *  @name  moveToBookmark
     *  @grammar range.moveToBookmark(bookmark)  => Range //让当前的range选到给定bookmark的位置,bookmark对象是由range.createBookmark创建的
     */
    moveToBookmark: function moveToBookmark(bookmark) {
        var start = bookmark.id ? this.document.getElementById(bookmark.start) : bookmark.start,
            end = bookmark.end && bookmark.id ? this.document.getElementById(bookmark.end) : bookmark.end;
        this.setStartBefore(start);
        _domUtils2.default.remove(start);
        if (end) {
            this.setEndBefore(end);
            _domUtils2.default.remove(end);
        } else {
            this.collapse(true);
        }
        return this;
    },

    /**
     * 调整Range的边界，使其"缩小"到最合适的位置
     * @name adjustmentBoundary
     * @grammar range.adjustmentBoundary() => Range   //参见<code><a href="#shrinkboundary">shrinkBoundary</a></code>
     * @example
     * <b>xx[</b>xxxxx] ==> <b>xx</b>[xxxxx]
     * <b>x[xx</b><i>]xxx</i> ==> <b>x[xx</b>]<i>xxx</i>
     */
    adjustmentBoundary: function adjustmentBoundary() {
        if (!this.collapsed) {
            while (!_domUtils2.default.isBody(this.startContainer) && this.startOffset == this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length && this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length) {

                this.setStartAfter(this.startContainer);
            }
            while (!_domUtils2.default.isBody(this.endContainer) && !this.endOffset && this.endContainer[this.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length) {
                this.setEndBefore(this.endContainer);
            }
        }
        return this;
    },

    /**
     * 得到一个自闭合的节点,常用于获取自闭和的节点，例如图片节点
     * @name  getClosedNode
     * @grammar range.getClosedNode()  => node|null
     * @example
     * <b>xxxx[<img />]xxx</b>
     */
    getClosedNode: function getClosedNode() {
        var node;
        if (!this.collapsed) {
            var range = this.cloneRange().adjustmentBoundary().shrinkBoundary();
            if (selectOneNode(range)) {
                var child = range.startContainer.childNodes[range.startOffset];
                if (child && child.nodeType == 1 && (_dtd2.default.$empty[child.tagName] || _dtd2.default.$nonChild[child.tagName])) {
                    node = child;
                }
            }
        }
        return node;
    },
    /**
     * 根据当前range选中内容节点（在页面上表现为反白显示）
     * @name select
     * @grammar range.select();  => Range
     */
    select: _browser2.default.ie ? function (noFillData, textRange) {
        var nativeRange;
        if (!this.collapsed) this.shrinkBoundary();
        var node = this.getClosedNode();
        if (node && !textRange) {
            try {
                nativeRange = this.document.body.createControlRange();
                nativeRange.addElement(node);
                nativeRange.select();
            } catch (e) {}
            return this;
        }
        var bookmark = this.createBookmark(),
            start = bookmark.start,
            end;
        nativeRange = this.document.body.createTextRange();
        nativeRange.moveToElementText(start);
        nativeRange.moveStart('character', 1);
        if (!this.collapsed) {
            var nativeRangeEnd = this.document.body.createTextRange();
            end = bookmark.end;
            nativeRangeEnd.moveToElementText(end);
            nativeRange.setEndPoint('EndToEnd', nativeRangeEnd);
        } else {
            if (!noFillData && this.startContainer.nodeType != 3) {
                //使用<span>|x<span>固定住光标
                var tmpText = this.document.createTextNode(fillChar),
                    tmp = this.document.createElement('span');
                tmp.appendChild(this.document.createTextNode(fillChar));
                start.parentNode.insertBefore(tmp, start);
                start.parentNode.insertBefore(tmpText, start);
                //当点b,i,u时，不能清除i上边的b
                removeFillData(this.document, tmpText);
                fillData = tmpText;
                mergeSibling(tmp, 'previousSibling');
                mergeSibling(start, 'nextSibling');
                nativeRange.moveStart('character', -1);
                nativeRange.collapse(true);
            }
        }
        this.moveToBookmark(bookmark);
        tmp && _domUtils2.default.remove(tmp);
        //IE在隐藏状态下不支持range操作，catch一下
        try {
            nativeRange.select();
        } catch (e) {}
        return this;
    } : function (notInsertFillData) {
        function checkOffset(rng) {

            function check(node, offset, dir) {
                if (node.nodeType == 3 && node.nodeValue.length < offset) {
                    rng[dir + 'Offset'] = node.nodeValue.length;
                }
            }
            check(rng.startContainer, rng.startOffset, 'start');
            check(rng.endContainer, rng.endOffset, 'end');
        }
        var win = _domUtils2.default.getWindow(this.document),
            sel = win.getSelection(),
            txtNode;
        //FF下关闭自动长高时滚动条在关闭dialog时会跳
        //ff下如果不body.focus将不能定位闭合光标到编辑器内
        _browser2.default.gecko ? this.body.focus() : win.focus();
        if (sel) {
            sel.removeAllRanges();
            // trace:870 chrome/safari后边是br对于闭合得range不能定位 所以去掉了判断
            // this.startContainer.nodeType != 3 &&! ((child = this.startContainer.childNodes[this.startOffset]) && child.nodeType == 1 && child.tagName == 'BR'
            if (this.collapsed && !notInsertFillData) {
                //                    //opear如果没有节点接着，原生的不能够定位,不能在body的第一级插入空白节点
                //                    if (notInsertFillData && browser.opera && !domUtils.isBody(this.startContainer) && this.startContainer.nodeType == 1) {
                //                        var tmp = this.document.createTextNode('');
                //                        this.insertNode(tmp).setStart(tmp, 0).collapse(true);
                //                    }
                //
                //处理光标落在文本节点的情况
                //处理以下的情况
                //<b>|xxxx</b>
                //<b>xxxx</b>|xxxx
                //xxxx<b>|</b>
                var start = this.startContainer,
                    child = start;
                if (start.nodeType == 1) {
                    child = start.childNodes[this.startOffset];
                }
                if (!(start.nodeType == 3 && this.startOffset) && (child ? !child.previousSibling || child.previousSibling.nodeType != 3 : !start.lastChild || start.lastChild.nodeType != 3)) {
                    txtNode = this.document.createTextNode(fillChar);
                    //跟着前边走
                    this.insertNode(txtNode);
                    removeFillData(this.document, txtNode);
                    mergeSibling(txtNode, 'previousSibling');
                    mergeSibling(txtNode, 'nextSibling');
                    fillData = txtNode;
                    this.setStart(txtNode, _browser2.default.webkit ? 1 : 0).collapse(true);
                }
            }
            var nativeRange = this.document.createRange();
            if (this.collapsed && _browser2.default.opera && this.startContainer.nodeType == 1) {
                var child = this.startContainer.childNodes[this.startOffset];
                if (!child) {
                    //往前靠拢
                    child = this.startContainer.lastChild;
                    if (child && _domUtils2.default.isBr(child)) {
                        this.setStartBefore(child).collapse(true);
                    }
                } else {
                    //向后靠拢
                    while (child && _domUtils2.default.isBlockElm(child)) {
                        if (child.nodeType == 1 && child.childNodes[0]) {
                            child = child.childNodes[0];
                        } else {
                            break;
                        }
                    }
                    child && this.setStartBefore(child).collapse(true);
                }
            }
            //是createAddress最后一位算的不准，现在这里进行微调
            checkOffset(this);
            nativeRange.setStart(this.startContainer, this.startOffset);
            nativeRange.setEnd(this.endContainer, this.endOffset);
            sel.addRange(nativeRange);
        }
        return this;
    },

    createAddress: function createAddress(ignoreEnd, ignoreTxt) {
        var addr = {},
            me = this;

        function getAddress(isStart) {
            var node = isStart ? me.startContainer : me.endContainer;
            var parents = _domUtils2.default.findParents(node, true, function (node) {
                return !_domUtils2.default.isBody(node);
            }),
                addrs = [];
            for (var i = 0, ci; ci = parents[i++];) {
                addrs.push(_domUtils2.default.getNodeIndex(ci, ignoreTxt));
            }
            var firstIndex = 0;

            if (ignoreTxt) {
                if (node.nodeType == 3) {
                    var tmpNode = node.previousSibling;
                    while (tmpNode && tmpNode.nodeType == 3) {
                        firstIndex += tmpNode.nodeValue.replace(_domUtils2.default.fillCharReg, '').length;
                        tmpNode = tmpNode.previousSibling;
                    }
                    firstIndex += isStart ? me.startOffset : me.endOffset; // - (fillCharReg.test(node.nodeValue) ? 1 : 0 )
                } else {
                    node = node.childNodes[isStart ? me.startOffset : me.endOffset];
                    if (node) {
                        firstIndex = _domUtils2.default.getNodeIndex(node, ignoreTxt);
                    } else {
                        node = isStart ? me.startContainer : me.endContainer;
                        var first = node.firstChild;
                        while (first) {
                            if (_domUtils2.default.isFillChar(first)) {
                                first = first.nextSibling;
                                continue;
                            }
                            firstIndex++;
                            if (first.nodeType == 3) {
                                while (first && first.nodeType == 3) {
                                    first = first.nextSibling;
                                }
                            } else {
                                first = first.nextSibling;
                            }
                        }
                    }
                }
            } else {
                firstIndex = isStart ? _domUtils2.default.isFillChar(node) ? 0 : me.startOffset : me.endOffset;
            }
            if (firstIndex < 0) {
                firstIndex = 0;
            }
            addrs.push(firstIndex);
            return addrs;
        }
        addr.startAddress = getAddress(true);
        if (!ignoreEnd) {
            addr.endAddress = me.collapsed ? [].concat(addr.startAddress) : getAddress();
        }
        return addr;
    },
    moveToAddress: function moveToAddress(addr, ignoreEnd) {
        var me = this;
        function getNode(address, isStart) {
            var tmpNode = me.body,
                parentNode,
                offset;
            for (var i = 0, ci, l = address.length; i < l; i++) {
                ci = address[i];
                parentNode = tmpNode;
                tmpNode = tmpNode.childNodes[ci];
                if (!tmpNode) {
                    offset = ci;
                    break;
                }
            }
            if (isStart) {
                if (tmpNode) {
                    me.setStartBefore(tmpNode);
                } else {
                    me.setStart(parentNode, offset);
                }
            } else {
                if (tmpNode) {
                    me.setEndBefore(tmpNode);
                } else {
                    me.setEnd(parentNode, offset);
                }
            }
        }
        getNode(addr.startAddress, true);
        !ignoreEnd && addr.endAddress && getNode(addr.endAddress);
        return me;
    },
    equals: function equals(rng) {
        for (var p in this) {
            if (this.hasOwnProperty(p)) {
                if (this[p] !== rng[p]) return false;
            }
        }
        return true;
    },
    scrollIntoView: function scrollIntoView() {
        var $span = (0, _dom2.default)('<span style="padding:0;margin:0;display:block;border:0">&nbsp;</span>');
        this.cloneRange().insertNode($span.get(0));
        var winScrollTop = (0, _dom2.default)(window).scrollTop(),
            winHeight = (0, _dom2.default)(window).height(),
            spanTop = $span.offset().top;
        if (spanTop < winScrollTop - winHeight || spanTop > winScrollTop + winHeight) {
            if (spanTop > winScrollTop + winHeight) {
                window.scrollTo(0, spanTop - winHeight + $span.height());
            } else {
                window.scrollTo(0, winScrollTop - spanTop);
            }
        }
        $span.remove();
    },
    getOffset: function getOffset() {
        var bk = this.createBookmark();
        var offset = (0, _dom2.default)(bk.start).css('display', 'inline-block').offset();
        this.moveToBookmark(bk);
        return offset;
    }
};

exports.default = Range;