'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// DOM Library Utilites
var $ = {};

var guid = 0;

$.guid = function () {
  return '' + guid++;
};

exports.default = $;