'use strict';

var _tagMap = require('./tag-map');

var _tagMap2 = _interopRequireDefault(_tagMap);

var _dom = require('../dom');

var _dom2 = _interopRequireDefault(_dom);

var _string = require('../string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Util from './Util'
// import Vars from './vars'
// import HtmlHelper from './html'
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
	iframe = (0, _dom2.default)(iframe)[0];
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
	} catch (e) {
		// bugfix: 在IE上innerHTML有时候报错
		(0, _dom2.default)(el).empty();
		(0, _dom2.default)(html, doc).each(function () {
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
	var win = Node.getWin(el),
	    camelKey = _string2.default.toCamelCase(key),
	    val = '';
	if (win.getComputedStyle) {
		var style = win.getComputedStyle(el, null);
		val = style[camelKey] || style.getPropertyValue(key) || el.style[camelKey];
	} else if (el.currentStyle) {
		val = el.currentStyle[camelKey] || el.style[camelKey];
	}
	return val;
}

function _hasVal(node) {
	return !!_tagMap2.default.VALUE_TAG_MAP[_getNodeName(node)];
}

function _docHeight(doc) {
	var el = doc.body;
	return Math.max(el.scrollHeight, el.clientHeight);
}

function _docWidth(doc) {
	var el = doc.body;
	return Math.max(el.scrollWidth, el.clientWidth);
}

function _getScrollPos(doc) {
	doc = doc || document;
	var x, y;

	x = _getWin(doc).scrollX;
	y = _getWin(doc).scrollY;

	return { x: x, y: y };
}

_dom2.default.fn.nodeName = function () {
	return _getNodeName(this[0]);
};

_dom2.default.fn.isSingle = function () {
	return !!_tagMap2.default.SINGLE_TAG_MAP[_getNodeName(this[0])];
};
_dom2.default.fn.isInline = function () {
	return !!_tagMap2.default.INLINE_TAG_MAP[_getNodeName(this[0])];
};
_dom2.default.fn.isBlock = function () {
	return !!_tagMap2.default.BLOCK_TAG_MAP[_getNodeName(this[0])];
};
_dom2.default.fn.isStyle = function () {
	return !!_tagMap2.default.STYLE_TAG_MAP[_getNodeName(this[0])];
};
_dom2.default.fn.isControl = function () {
	return !!_tagMap2.default.CONTROL_TAG_MAP[_getNodeName(this[0])];
};

_dom2.default.fn.before = function (selector) {
	this.each(function () {
		this.parentNode.insertBefore((0, _dom2.default)(selector)[0], this);
	});
	return this;
};
_dom2.default.fn.after = function (selector) {
	this.each(function () {
		if (this.nextSibling) {
			this.parentNode.insertBefore((0, _dom2.default)(selector)[0], this.nextSibling);
		} else {
			this.parentNode.appendChild((0, _dom2.default)(selector)[0]);
		}
	});
	return this;
};

_dom2.default.fn.empty = function () {
	var self = this;
	this.each(function (node) {
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
};

// $.fn.clone = function(bool) {

// 	return KNode(this[0].cloneNode(bool));
// }

_dom2.default.fn.pos = function () {
	var node = this[0],
	    x = 0,
	    y = 0;
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
	return { x: Math.round(x), y: Math.round(y) };
};

_dom2.default.fn.opacity = function (val) {
	this.each(function () {
		if (this.style.opacity === undefined) {
			this.style.filter = val == 1 ? '' : 'alpha(opacity=' + val * 100 + ')';
		} else {
			this.style.opacity = val == 1 ? '' : val;
		}
	});
	return this;
};

_dom2.default.fn.get = function (i) {
	if (this.length < 1) {
		return null;
	}
	return this[i || 0];
};

_dom2.default.fn.replaceWith = function (expr) {
	var nodes = [];
	this.each(function (i, node) {
		var newNode = (0, _dom2.default)(expr)[0];
		node.parentNode.replaceChild(newNode, node);
		nodes.push(newNode);
	});
	return (0, _dom2.default)(nodes);
};

_dom2.default.fn.outer = function () {
	if (this.length < 1) {
		return '';
	}
	var div = this.doc.createElement('div'),
	    html;
	div.appendChild(this[0].cloneNode(true));
	html = div.innerHTML;
	div = null;
	return html;
};

_dom2.default.fn.contains = function (otherNode) {
	if (this.length < 1) {
		return false;
	}
	if (this.nodeType == 9 && this.nodeType != 9) {
		return true;
	}
	while (otherNode = otherNode.parentNode) {
		if (otherNode == this) {
			return true;
		}
	}
	return false;
};

_dom2.default.fn.first = function () {
	var list = this.children();
	return list.length > 0 ? list.eq(0) : null;
};

_dom2.default.fn.last = function () {
	var list = this.children();
	return list.length > 0 ? list.eq(list.length - 1) : null;
};

_dom2.default.fn.scan = function (fn, order) {
	if (this.length < 1) {
		return;
	}

	order = order === undefined ? true : order;
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
};

_dom2.default.fn.hasVal = function () {
	if (this.length < 1) {
		return false;
	}
	return _hasVal(this[0]);
};

// $.fn.html = function(val) {
// 	var self = this;
// 	if (val === undefined) {
// 		if (self.length < 1 || self.type != 1) {
// 			return '';
// 		}
// 		return HtmlHelper.formatHtml(self[0].innerHTML);
// 	}
// 	self.each(function() {
// 		_setHtml(this, val);
// 	});
// 	return self;
// }


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