'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _object = require('../object');

var _object2 = _interopRequireDefault(_object);

var _array = require('../array');

var _array2 = _interopRequireDefault(_array);

var _string = require('../string');

var _string2 = _interopRequireDefault(_string);

var _type = require('../type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Util = {};
function _each(obj, fn) {
	if (_array2.default.isArray(obj)) {
		for (var i = 0, len = obj.length; i < len; i++) {
			if (fn.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn.call(obj[key], key, obj[key]) === false) {
					break;
				}
			}
		}
	}
}
function _inString(val, str, delimiter) {
	delimiter = delimiter === undefined ? ',' : delimiter;
	return (delimiter + str + delimiter).indexOf(delimiter + val + delimiter) >= 0;
}

function _addUnit(val, unit) {
	unit = unit || 'px';
	return val && /^-?\d+(?:\.\d+)?$/.test(val) ? val + unit : val;
}

function _removeUnit(val) {
	var match;
	return val && (match = /(\d+)/.exec(val)) ? parseInt(match[1], 10) : 0;
}

function _toHex(val) {
	function hex(d) {
		var s = parseInt(d, 10).toString(16).toUpperCase();
		return s.length > 1 ? s : '0' + s;
	}
	return val.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/ig, function ($0, $1, $2, $3) {
		return '#' + hex($1) + hex($2) + hex($3);
	});
}

function _toMap(val, delimiter) {
	delimiter = delimiter === undefined ? ',' : delimiter;
	var map = {},
	    arr = _array2.default.isArray(val) ? val : val.split(delimiter),
	    match;
	_each(arr, function (key, val) {
		if (match = /^(\d+)\.\.(\d+)$/.exec(val)) {
			for (var i = parseInt(match[1], 10); i <= parseInt(match[2], 10); i++) {
				map[i.toString()] = true;
			}
		} else {
			map[val] = true;
		}
	});
	return map;
}

function _undef(val, defaultVal) {
	return val === undefined ? defaultVal : val;
}

function _invalidUrl(url) {
	return !url || /[<>"]/.test(url);
}

function _addParam(url, param) {
	return url.indexOf('?') >= 0 ? url + '&' + param : url + '?' + param;
}

//From http://www.json.org/json2.js
function _json(text) {
	var match;
	if (match = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(text)) {
		text = match[0];
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	cx.lastIndex = 0;
	if (cx.test(text)) {
		text = text.replace(cx, function (a) {
			return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		});
	}
	if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		return eval('(' + text + ')');
	}
	throw 'JSON parse error';
}

var _extend = function _extend(child, parent, proto) {
	if (!proto) {
		proto = parent;
		parent = null;
	}
	var childProto;
	if (parent) {
		var fn = function fn() {};
		fn.prototype = parent.prototype;
		childProto = new fn();
		_object2.default.each(proto, function (key, val) {
			childProto[key] = val;
		});
	} else {
		childProto = proto;
	}
	childProto.constructor = child;
	child.prototype = childProto;
	child.parent = parent ? parent.prototype : null;
};

Object.assign(Util, {
	each: _each,
	isArray: _array2.default.isArray,
	isFunction: _type2.default.isFunction,
	inArray: _array2.default.inArray,
	inString: _inString,
	trim: _string2.default.trim,
	addUnit: _addUnit,
	removeUnit: _removeUnit,
	// escape : _escape,
	// unescape : _unescape,
	toCamel: _string2.default.toCamelCase,
	toHex: _toHex,
	toMap: _toMap,
	toArray: _array2.default.toArray,
	undef: _undef,
	invalidUrl: _invalidUrl,
	addParam: _addParam,
	extend: _extend,
	json: _json
});
exports.default = Util;