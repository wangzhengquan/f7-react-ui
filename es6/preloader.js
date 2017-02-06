'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./resources/less/preloader.less');
var Preloader = function Preloader(props) {
  return _react2.default.createElement(
    'div',
    { className: 'infinite-scroll-preloader' },
    _react2.default.createElement('div', { className: 'preloader' })
  );
};

exports.default = Preloader;