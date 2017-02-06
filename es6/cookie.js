'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var doc = document,
    MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1E3,
    encode = encodeURIComponent,
    decode = decodeURIComponent;

function isNotEmptyString(val) {
  return typeof val === 'string' && val !== '';
}
var Cookie = {
  get: function get(name) {
    var ret, m;
    if (isNotEmptyString(name)) {
      if (m = String(doc.cookie).match(new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)'))) {
        ret = m[1] ? decode(m[1]) : '';
      }
    }
    return ret;
  },

  set: function set(name, val, expires, domain, path, secure) {
    var text = String(encode(val)),
        date = expires;
    if (typeof date === 'number') {
      date = new Date();
      date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
    }
    if (date instanceof Date) {
      text += '; expires=' + date.toUTCString();
    }
    if (isNotEmptyString(domain)) {
      text += '; domain=' + domain;
    }
    if (isNotEmptyString(path)) {
      text += '; path=' + path;
    }
    if (secure) {
      text += '; secure';
    }
    doc.cookie = name + '=' + text;
  },

  remove: function remove(name, domain, path, secure) {
    this.set(name, '', -1, domain, path, secure);
  }
};

exports.default = Cookie;