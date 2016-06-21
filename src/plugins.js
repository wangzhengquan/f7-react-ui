/*=======================================
************   Plugins API   ************
=======================================*/
import reactUI from './react-ui'
import PARAMS from './params'
var plugins = {}
var _plugins = [];

var $ = {}
$.initPlugins = reactUI.initPlugins = function () {
    // Initialize plugins
    for (var plugin in plugins) {
        var p = plugins[plugin](reactUI, PARAMS[plugin]);
        if (p) _plugins.push(p);
    }
};
// Plugin Hooks
$.pluginHook = reactUI.pluginHook = function (hook) {
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].hooks && hook in _plugins[i].hooks) {
            _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    }
};
// Prevented by plugin
$.pluginPrevent = reactUI.pluginPrevent = function (action) {
    var prevent = false;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].prevents && action in _plugins[i].prevents) {
            if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
        }
    }
    return prevent;
};
// Preprocess content by plugin
$.pluginProcess = reactUI.pluginProcess = function (process, data) {
    var processed = data;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
            processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
        }
    }
    return processed;
};

export default plugin;

