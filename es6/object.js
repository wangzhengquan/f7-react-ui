'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectHelper = {};

var EmptyFn = function EmptyFn() {};
var each = function each(obj, fn) {
  if (Array.isArray(obj)) {
    for (var i = 0, len = obj.length; i < len; i++) {
      if (fn.call(obj[i], obj[i], i) === false) {
        break;
      }
    }
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (fn.call(obj[key], obj[key], key) === false) {
          break;
        }
      }
    }
  }
};

var _mixInternal = function _mixInternal(rc, sp, override, deep, wl) {
  var property, src, target;

  if (rc) {
    for (property in sp) {
      if (sp.hasOwnProperty(property)) {
        src = sp[property];
        target = rc[property];
        if (wl) {
          src = wl.call(sp, property, src);
        }
        if (deep && src && (_array2.default.isArray(src) || _type2.default.isPlainObject(src))) {
          target = target ? target : _type2.default.isArray(src) ? [] : {};
          rc[property] = target;
          _mixInternal(target, src, override, deep);
        } else {
          if (src !== undefined && (override || target == null || target == undefined)) {
            rc[property] = src;
          }
        }
      }
    }
  }

  return rc;
};

var mix = function mix(rc, sp, override, deep, wl) {
  if (override === undefined) {
    override = true;
  }
  if (wl && typeof wl !== 'function') {
    var originalWl = wl;
    wl = function wl(name, val) {
      // console.log('inarray',name, originalWl, Ufo.inArray(name, originalWl));
      return _array2.default.inArray(name, originalWl) ? val : undefined;
    };
  }
  return _mixInternal(rc, sp, override, deep, wl);
};

var clone = function clone(obj, wl) {
  var cloneObj = {};
  mix(cloneObj, obj, true, true, wl);
  return cloneObj;
};

var inherits = function inherits(subclass, superclass, proto) {
  if (arguments.length === 2 && _type2.default.isPlainObject(superclass)) {
    proto = superclass;
    superclass = null;
  }

  if (superclass) {
    EmptyFn.prototype = superclass.prototype;
    var subProto = new EmptyFn();
    subclass.prototype = mix(subProto, subclass.prototype);
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
  }

  if (proto) mix(subclass.prototype, proto);
};

ObjectHelper.mix = mix;
ObjectHelper.each = each;
ObjectHelper.clone = clone;
ObjectHelper.inherits = inherits;

exports.default = ObjectHelper;