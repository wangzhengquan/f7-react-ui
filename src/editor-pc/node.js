import TagMap from './tag-map'
import $ from '../dom'
import Util from './Util'
import Vars from './vars'
import HtmlHelper from './html'
// import KEvent from './event'

function _getDoc(node) {
	if (!node) {
		return document;
	}
	return node.ownerDocument || node.document || node;
}

function _getWin(node) {
	if (!node) {
		return window;
	}
	var doc = _getDoc(node);
	return doc.parentWindow || doc.defaultView;
}

function _iframeDoc(iframe) {
	iframe = $(iframe)[0];
	return iframe.contentDocument || iframe.contentWindow.document;
}



function _elementVal(knode, val) {
	if (knode.hasVal()) {
		if (val === undefined) {
			var html = knode.val();
			// 去除内容为空的p标签
			// https://github.com/kindsoft/kindeditor/pull/52
			html = html.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, '');
			return html;
		}
		return knode.val(val);
	}
	return knode.html(val);
}
function _setHtml(el, html) {
	if (el.nodeType != 1) {
		return;
	}
	var doc = _getDoc(el);
	try {
		el.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + html;
		var temp = doc.getElementById('__kindeditor_temp_tag__');
		temp.parentNode.removeChild(temp);
	} catch(e) {
		// bugfix: 在IE上innerHTML有时候报错
		KNode(el).empty();
		KNode(html, doc).each(function() {
			el.appendChild(this);
		});
	}
}

 

function _getNodeName(node) {
	if (!node || !node.nodeName) {
		return '';
	}
	return node.nodeName.toLowerCase();
}

function _computedCss(el, key) {
	var win = Node.getWin(el), camelKey = Util.toCamel(key), val = '';
	if (win.getComputedStyle) {
		var style = win.getComputedStyle(el, null);
		val = style[camelKey] || style.getPropertyValue(key) || el.style[camelKey];
	} else if (el.currentStyle) {
		val = el.currentStyle[camelKey] || el.style[camelKey];
	}
	return val;
}

function _hasVal(node) {
	console.log(TagMap.VALUE_TAG_MAP, _getNodeName(node), !!TagMap.VALUE_TAG_MAP[_getNodeName(node)])
	return !!TagMap.VALUE_TAG_MAP[_getNodeName(node)];
}

function _docElement(doc) {
	doc = doc || document;
	return Vars.QUIRKS ? doc.body : doc.documentElement;
}


function _docHeight(doc) {
	var el = _docElement(doc);
	return Math.max(el.scrollHeight, el.clientHeight);
}

function _docWidth(doc) {
	var el = _docElement(doc);
	return Math.max(el.scrollWidth, el.clientWidth);
}

function _getScrollPos(doc) {
	doc = doc || document;
	var x, y;
	if (Vars.IE || Vars.NEWIE || Vars.OPERA) {
		x = _docElement(doc).scrollLeft;
		y = _docElement(doc).scrollTop;
	} else {
		x = _getWin(doc).scrollX;
		y = _getWin(doc).scrollY;
	}
	return {x : x, y : y};
}


var KNode = function(selector, context){
	var el = $(selector, context)
	el.doc = _getDoc(el[0]);
	el.name = (!el[0] || !el[0].nodeName) ? '' : el[0].nodeName.toLowerCase()
	el.type = el.length > 0 ? el[0].nodeType : null;
	el.win = _getWin(el[0]);
	return el;
}
$.fn.nodeName = function(){
	_getNodeName(this[0])
}

$.fn.isSingle = function() {
	return !!TagMap.SINGLE_TAG_MAP[_getNodeName(this[0])];
}
$.fn.isInline = function() {
	return !!TagMap.INLINE_TAG_MAP[_getNodeName(this[0])];
}
$.fn.isBlock = function() {
	return !!TagMap.BLOCK_TAG_MAP[_getNodeName(this[0])];
}
$.fn.isStyle = function() {
	return !!TagMap.STYLE_TAG_MAP[_getNodeName(this[0])];
}
$.fn.isControl = function() {
	return !!TagMap.CONTROL_TAG_MAP[_getNodeName(this[0])];
}

$.fn.before =function(selector) {
	this.each(function() {
		this.parentNode.insertBefore($(selector)[0], this);
	});
	return this;
}
$.fn.after = function(selector) {
	this.each(function() {
		if (this.nextSibling) {
			this.parentNode.insertBefore($(selector)[0], this.nextSibling);
		} else {
			this.parentNode.appendChild($(selector)[0]);
		}
	});
	return this;
}


$.fn.empty = function() {
	var self = this;
	this.each(function(node) {
		var child = node.firstChild;
		while (child) {
			if (!node.parentNode) {
				return;
			}
			var next = child.nextSibling;
			child.parentNode.removeChild(child);
			child = next;
		}
	});
	return self;
}

$.fn.clone = function(bool) {
	 
	return KNode(this[0].cloneNode(bool));
}

$.fn.pos =function() {
	var  node = this[0], x = 0, y = 0;
	if (node) {
		if (node.getBoundingClientRect) {
			var box = node.getBoundingClientRect(),
				pos = _getScrollPos(this.doc);
			x = box.left + pos.x;
			y = box.top + pos.y;
		} else {
			while (node) {
				x += node.offsetLeft;
				y += node.offsetTop;
				node = node.offsetParent;
			}
		}
	}
	return {x : Math.round(x), y : Math.round(y)};
}

$.fn.opacity = function(val) {
	Util.each(function() {
		if (this.style.opacity === undefined) {
			this.style.filter = val == 1 ? '' : 'alpha(opacity=' + (val * 100) + ')';
		} else {
			this.style.opacity = val == 1 ? '' : val;
		}
	});
	return this;
}

$.fn.get = function(i) {
	if (this.length < 1) {
		return null;
	}
	return this[i || 0];
}

$.fn.replaceWith = function(expr) {
	var nodes = [];
	this.each(function(i, node) {
		var newNode = $(expr)[0];
		node.parentNode.replaceChild(newNode, node);
		nodes.push(newNode);
	});
	return KNode(nodes);
}

$.fn.outer = function() {
	if (this.length < 1) {
		return '';
	}
	var div = this.doc.createElement('div'), html;
	div.appendChild(this[0].cloneNode(true));
	html = (div.innerHTML);
	div = null;
	return html;
}



$.fn.contains = function(otherNode) {
	if (this.length < 1) {
		return false;
	}
	if (this.nodeType == 9 && this.nodeType != 9) {
		return true;
	}
	while ((otherNode = otherNode.parentNode)) {
		if (otherNode == this) {
			return true;
		}
	}
	return false;
}

$.fn.first = function() {
	var list = this.children();
	return list.length > 0 ? list.eq(0) : null;
}

$.fn.last = function() {
	var list = this.children();
	return list.length > 0 ? list.eq(list.length - 1) : null;
}

$.fn.scan = function(fn, order) {
	if (this.length < 1) {
		return;
	}
	order = (order === undefined) ? true : order;
	function walk(node) {
		var n = order ? node.firstChild : node.lastChild;
		while (n) {
			var next = order ? n.nextSibling : n.previousSibling;
			if (fn(n) === false) {
				return false;
			}
			if (walk(n) === false) {
				return false;
			}
			n = next;
		}
	}
	walk(this[0]);
	return this;
}

$.fn.hasVal = function() {
	if (this.length < 1) {
		return false;
	}
	return _hasVal(this[0]);
}

$.fn.html = function(val) {
	var self = this;
	if (val === undefined) {
		if (self.length < 1 || self.type != 1) {
			return '';
		}
		return HtmlHelper.formatHtml(self[0].innerHTML);
	}
	self.each(function() {
		_setHtml(this, val);
	});
	return self;
}

$.fn.bind = $.fn.on 
$.fn.unbind = $.fn.off

// $.fn.bind = function(type, fn) {
// 	this.each(function() {
// 		KEvent.bind(this, type, fn);
// 	});
// 	return this;
// }

// $.fn.unbind = function(type, fn) {
// 	this.each(function() {
// 		KEvent.unbind(this, type, fn);
// 	});
// 	return this;
// }

// $.fn.fire = function(type) {
// 	if (this.length < 1) {
// 		return this;
// 	}
// 	KEvent.fire(this[0], type);
// 	return this;
// }



// Util.each(('blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,' +
// 	'mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,' +
// 	'change,select,submit,keydown,keypress,keyup,error,contextmenu').split(','), function(i, type) {
// 	$.fn[type] = function(fn) {
// 		return fn ? this.bind(type, fn) : this.fire(type);
// 	};
// });

Object.assign(KNode, {
	getDoc: _getDoc,
	getWin: _getWin,
	iframeDoc: _iframeDoc
})
 
KNode.getScrollPos = _getScrollPos
KNode.docHeight = _docHeight;
KNode.docWidth = _docWidth
KNode.docElement = _docElement
KNode.elementVal = _elementVal
KNode.computedCss = _computedCss;
KNode.hasVal = _hasVal;
KNode.setHtml = _setHtml;

export default KNode;
