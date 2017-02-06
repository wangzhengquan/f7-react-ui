'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactUi = require('./react-ui');

var _reactUi2 = _interopRequireDefault(_reactUi);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*=======================================
************   Plugins API   ************
=======================================*/
var plugins = {};
var _plugins = [];

var $ = {};
$.initPlugins = _reactUi2.default.initPlugins = function () {
    // Initialize plugins
    for (var plugin in plugins) {
        var p = plugins[plugin](_reactUi2.default, _params2.default[plugin]);
        if (p) _plugins.push(p);
    }
};
// Plugin Hooks
$.pluginHook = _reactUi2.default.pluginHook = function (hook) {
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].hooks && hook in _plugins[i].hooks) {
            _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    }
};
// Prevented by plugin
$.pluginPrevent = _reactUi2.default.pluginPrevent = function (action) {
    var prevent = false;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].prevents && action in _plugins[i].prevents) {
            if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
        }
    }
    return prevent;
};
// Preprocess content by plugin
$.pluginProcess = _reactUi2.default.pluginProcess = function (process, data) {
    var processed = data;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
            processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
        }
    }
    return processed;
};

exports.default = $;