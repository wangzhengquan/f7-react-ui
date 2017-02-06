'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent = function MicroEvent() {};
MicroEvent.prototype = {
	on: function on(types, listener) {
		var _this = this;

		types = types.trim().split(/\s+/);
		types.forEach(function (type) {
			_this._listeners = _this._listeners || {};
			_this._listeners[type] = _this._listeners[type] || [];
			_this._listeners[type].push(listener);
		});
	},

	addListener: function addListener() {
		return this.on.apply(this, arguments);
	},
	addEventListener: function addEventListener() {
		return this.on.apply(this, arguments);
	},

	onece: function onece(type, listener) {
		function proxy() {
			listener.apply(this, arguments);
			this.off.call(this, type, proxy);
		}
		return this.on.call(this, type, proxy);
	},

	off: function off(types, listener) {
		var _this2 = this;

		this._listeners = this._listeners || {};
		types = types.trim().split(/\s+/);
		types.forEach(function (type) {
			if (type in _this2._listeners === false) return;
			if (!listener) {
				delete _this2._listeners[type];
			} else {
				_this2._listeners[type].splice(_this2._listeners[type].indexOf(listener), 1);
			}
		});
	},

	removeListener: function removeListener() {
		return this.off.apply(this, arguments);
	},
	removeEventListener: function removeEventListener() {
		return this.off.apply(this, arguments);
	},

	trigger: function trigger(types /* , args... */) {
		var _this3 = this;

		var args = Array.prototype.slice.call(arguments, 1);
		this._listeners = this._listeners || {};
		types = types.trim().split(/\s+/);
		var result = [];
		types.forEach(function (type) {
			if (type in _this3._listeners === false) return;
			var tevents = _this3._listeners[type];
			for (var i = 0, len = tevents.length; i < len; i++) {
				var res = tevents[i].apply(_this3, args);
				if (res !== undefined) result.push(res);
			}
		});
		return result.length === 1 ? result[0] : result;
	},

	fireEvent: function fireEvent() {
		return this.trigger.apply(this, arguments);
	}

};

var inArray = function inArray(arr, val) {
	for (var i = 0, len = arr.length; i < len; i++) {
		if (val === arr[i]) {
			return i;
		}
	}
	return -1;
};
/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin = function (destObject, proplist) {
	var prototype = MicroEvent.prototype;
	if (typeof destObject === 'function') {
		destObject = destObject.prototype;
	}
	for (var p in prototype) {
		if (proplist) {
			if (inArray(proplist, p)) destObject[p] = prototype[p];
		} else {
			destObject[p] = prototype[p];
		}
	}
	return destObject;
};

exports.default = MicroEvent;
// export in common js
// if( typeof module !== "undefined" && ('exports' in module)){
// 	module.exports	= MicroEvent;
// }