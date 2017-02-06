'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dom = exports.UM = undefined;

var _plugins = require('./plugins/plugins');

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UM = window.UM = {
    plugins: _plugins2.default.plugins,

    commands: {},

    I18N: {},

    version: '1.2.2'
};
// window.UMEDITOR_CONFIG = window.UMEDITOR_CONFIG || {};


var dom = UM.dom = {};
exports.UM = UM;
exports.dom = dom;
exports.default = UM;