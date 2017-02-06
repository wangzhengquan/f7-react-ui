'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../resources/less/widget/loading.less');

// import InfiniteScrollPreloader from '../preloader'

var Loading = function Loading(props) {

	return _react2.default.createElement(
		'div',
		{ className: 'loading' },
		'\u6B63\u5728\u52A0\u8F7D...'
	);
};

exports.default = Loading;