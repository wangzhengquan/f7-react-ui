'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _dtd = require('./dtd');

var _dtd2 = _interopRequireDefault(_dtd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file
 * @name UM.filterNode
 * @short filterNode
 * @desc 根据给定的规则过滤节点
 * @import editor.js,core/utils.js
 * @anthor zhanyi
 */
var filterNode = function () {
    function filterNode(node, rules) {
        switch (node.type) {
            case 'text':
                break;
            case 'element':
                var val;
                if (val = rules[node.tagName]) {
                    if (val === '-') {
                        node.parentNode.removeChild(node);
                    } else if (_utils2.default.isFunction(val)) {
                        var parentNode = node.parentNode,
                            index = node.getIndex();
                        val(node);
                        if (node.parentNode) {
                            if (node.children) {
                                for (var i = 0, ci; ci = node.children[i];) {
                                    filterNode(ci, rules);
                                    if (ci.parentNode) {
                                        i++;
                                    }
                                }
                            }
                        } else {
                            for (var i = index, ci; ci = parentNode.children[i];) {
                                filterNode(ci, rules);
                                if (ci.parentNode) {
                                    i++;
                                }
                            }
                        }
                    } else {
                        var attrs = val['$'];
                        if (attrs && node.attrs) {
                            var tmpAttrs = {},
                                tmpVal;
                            for (var a in attrs) {
                                tmpVal = node.getAttr(a);
                                //todo 只先对style单独处理
                                if (a == 'style' && _utils2.default.isArray(attrs[a])) {
                                    var tmpCssStyle = [];
                                    _utils2.default.each(attrs[a], function (v) {
                                        var tmp;
                                        if (tmp = node.getStyle(v)) {
                                            tmpCssStyle.push(v + ':' + tmp);
                                        }
                                    });
                                    tmpVal = tmpCssStyle.join(';');
                                }
                                if (tmpVal) {
                                    tmpAttrs[a] = tmpVal;
                                }
                            }
                            node.attrs = tmpAttrs;
                        }
                        if (node.children) {
                            for (var i = 0, ci; ci = node.children[i];) {
                                filterNode(ci, rules);
                                if (ci.parentNode) {
                                    i++;
                                }
                            }
                        }
                    }
                } else {
                    //如果不在名单里扣出子节点并删除该节点,cdata除外
                    if (_dtd2.default.$cdata[node.tagName]) {
                        node.parentNode.removeChild(node);
                    } else {
                        var parentNode = node.parentNode,
                            index = node.getIndex();
                        node.parentNode.removeChild(node, true);
                        for (var i = index, ci; ci = parentNode.children[i];) {
                            filterNode(ci, rules);
                            if (ci.parentNode) {
                                i++;
                            }
                        }
                    }
                }
                break;
            case 'comment':
                node.parentNode.removeChild(node);
        }
    }
    return function (root, rules) {
        if (_utils2.default.isEmptyObject(rules)) {
            return root;
        }
        var val;
        if (val = rules['-']) {
            _utils2.default.each(val.split(' '), function (k) {
                rules[k] = '-';
            });
        }
        for (var i = 0, ci; ci = root.children[i];) {
            filterNode(ci, rules);
            if (ci.parentNode) {
                i++;
            }
        }
        return root;
    };
}();
exports.default = filterNode;