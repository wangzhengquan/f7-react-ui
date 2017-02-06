'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  /*
   * @param {Object} value
   * @return {String}
   * @markdown
   */
  typeOf: function typeOf(value) {
    var type, typeToString;

    if (value === null) {
      return 'null';
    }

    type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

    if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean' || type === 'function') {
      return type;
    }

    typeToString = toString.call(value);

    switch (typeToString) {
      case '[object Array]':
        return 'array';
      case '[object Date]':
        return 'date';
      case '[object Boolean]':
        return 'boolean';
      case '[object Number]':
        return 'number';
      case '[object RegExp]':
        return 'regexp';
    }

    if (type === 'object') {
      if (value.nodeType !== undefined) {
        if (value.nodeType === 3) {
          return (/\S/.test(value.nodeValue) ? 'textnode' : 'whitespace'
          );
        } else {
          return 'element';
        }
      }

      return 'object';
    }

    console.error('Failed to determine the type of the specified value "' + value + '". This is most likely a bug.');
    //</debug>
  },
  isArray: 'isArray' in Array ? Array.isArray : function (value) {
    return toString.call(value) === '[object Array]';
  },
  isDate: function isDate(value) {
    return toString.call(value) === '[object Date]';
  },

  isEmpty: function isEmpty(value, allowEmptyString) {
    return value === null || value === undefined || (!allowEmptyString ? value === '' : false) || this.isArray(value) && value.length === 0;
  },
  /**
   * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
   * @param {Object} value The value to test
   * @return {Boolean}
   */
  isPrimitive: function isPrimitive(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

    return type === 'string' || type === 'number' || type === 'boolean';
  },
  /**
   * Returns true if the passed value is a JavaScript Function, false otherwise.
   * @param {Object} value The value to test
   * @return {Boolean}
   * @method
   */
  isFunction:
  // Safari 3.x and 4.x returns 'function' for typeof <NodeList>, hence we need to fall back to using
  // Object.prototype.toString (slower)
  typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function' ? function (value) {
    return toString.call(value) === '[object Function]';
  } : function (value) {
    return typeof value === 'function';
  },

  /**
   * Returns true if the passed value is a number. Returns false for non-finite numbers.
   * @param {Object} value The value to test
   * @return {Boolean}
   */
  isNumber: function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
  },

  /**
   * Validates that a value is numeric.
   * @param {Object} value Examples: 1, '1', '2.34'
   * @return {Boolean} True if numeric, false otherwise
   */
  isNumeric: function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  /**
   * Returns true if the passed value is a string.
   * @param {Object} value The value to test
   * @return {Boolean}
   */
  isString: function isString(value) {
    return typeof value === 'string';
  },

  /**
   * Returns true if the passed value is a boolean.
   *
   * @param {Object} value The value to test
   * @return {Boolean}
   */
  isBoolean: function isBoolean(value) {
    return typeof value === 'boolean';
  },

  /**
   * Returns true if the passed value is an HTMLElement
   * @param {Object} value The value to test
   * @return {Boolean}
   */
  isElement: function isElement(value) {
    return value ? value.nodeType === 1 : false;
  },

  /**
   * Returns true if the passed value is a TextNode
   * @param {Object} value The value to test
   * @return {Boolean}
   */
  isTextNode: function isTextNode(value) {
    return value ? value.nodeName === "#text" : false;
  },

  /**
   * Returns true if the passed value is defined.
   * @param {Object} value The value to test
   * @return {Boolean}
   */
  isDefined: function isDefined(value) {
    return typeof value !== 'undefined';
  },
  /**
   * Returns true if the passed value is a JavaScript Object, false otherwise.
   * @param {Object} value The value to test
   * @return {Boolean}
   * @method
   */
  isObject: toString.call(null) === '[object Object]' ? function (value) {
    // check ownerDocument here as well to exclude DOM nodes
    return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
  } : function (value) {
    return toString.call(value) === '[object Object]';
  },

  isWindow: function isWindow(obj) {
    return obj != null && obj == obj.window;
  },
  //测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。
  isPlainObject: function isPlainObject(obj) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if (!this.isObject(obj) || obj.nodeType || this.isWindow(obj)) {
      return false;
    }
    try {
      // Not own constructor property must be Object
      if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      // IE8,9 Will throw exceptions on certain host objects #9897
      return false;
    }
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.    
    var key;
    for (key in obj) {}

    return key === undefined || hasOwnProperty.call(obj, key);
  }
};