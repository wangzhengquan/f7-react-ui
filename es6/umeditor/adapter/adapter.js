'use strict';

var _editor = require('../editor');

var _editor2 = _interopRequireDefault(_editor);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _Editor = require('../core/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _toolbar = require('../tools/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file adapter.js
 * @desc adapt ui to editor
 * @import core/Editor.js, core/utils.js
 */
/* eslint quotes : "off"*/
var _editorUI = {},
    _editors = {},
    _readyFn = [],

// _activeWidget = null,
_widgetData = {},
    _widgetCallBack = {},
    _cacheUI = {},
    _maxZIndex = null;

_utils2.default.extend(_editor2.default, {
    defaultWidth: 500,
    defaultHeight: 500,
    registerUI: function registerUI(name, fn) {
        _utils2.default.each(name.split(/\s+/), function (uiname) {
            _editorUI[uiname] = fn;
        });
    },

    setEditor: function setEditor(editor) {
        !_editors[editor.id] && (_editors[editor.id] = editor);
    },
    // registerWidget : function(name,pro,cb){
    //     _widgetData[name] = $.extend2(pro,{
    //         $root : '',
    //         _preventDefault:false,
    //         root:function($el){
    //             return this.$root || (this.$root = $el);
    //         },
    //         preventDefault:function(){
    //             this._preventDefault = true;
    //         },
    //         clear:false
    //     });
    //     if(cb){
    //         _widgetCallBack[name] = cb;
    //     }
    // },
    getWidgetData: function getWidgetData(name) {
        return _widgetData[name];
    },
    setWidgetBody: function setWidgetBody(name, $widget, editor) {
        if (!editor._widgetData) {

            _utils2.default.extend(editor, {
                _widgetData: {},
                getWidgetData: function getWidgetData(name) {
                    return this._widgetData[name];
                },
                getWidgetCallback: function getWidgetCallback(widgetName) {
                    var me = this;
                    return function () {
                        return _widgetCallBack[widgetName].apply(me, [me, $widget].concat(Array.prototype.slice.call(arguments, 0)));
                    };
                }
            });
        }
        var pro = _widgetData[name];
        if (!pro) {
            return null;
        }
        pro = editor._widgetData[name];
        if (!pro) {
            pro = _widgetData[name];
            pro = editor._widgetData[name] = typeof pro == 'function' ? pro : _utils2.default.clone(pro);
        }

        pro.root($widget.edui().getBodyContainer());

        pro.initContent(editor, $widget);
        if (!pro._preventDefault) {
            pro.initEvent(editor, $widget);
        }

        pro.width && $widget.width(pro.width);
    },
    setActiveWidget: function setActiveWidget($widget) {
        _activeWidget = $widget;
    },
    getEditor: function getEditor(id, options) {
        var editor = _editors[id] || (_editors[id] = this.createEditor(id, options));
        _maxZIndex = _maxZIndex ? Math.max(editor.getOpt('zIndex'), _maxZIndex) : editor.getOpt('zIndex');
        _toolbar2.default.init(editor);
        return editor;
    },
    setTopEditor: function setTopEditor(editor) {
        _editors.forEach(function (o) {
            if (editor == o) {
                editor.$container && editor.$container.css('zIndex', _maxZIndex + 1);
            } else {
                o.$container && o.$container.css('zIndex', o.getOpt('zIndex'));
            }
        });
    },
    clearCache: function clearCache(id) {
        if (_editors[id]) {
            delete _editors[id];
        }
    },
    delEditor: function delEditor(id) {
        var editor;
        if (editor = _editors[id]) {
            editor.destroy();
        }
    },
    ready: function ready(fn) {
        _readyFn.push(fn);
    },
    createEditor: function createEditor(id, opt) {
        var editor = new _Editor2.default(opt);
        var T = this;

        // editor.langIsReady ? renderUI.bind(T)() : editor.addListener("langReady", renderUI.bind(T));
        renderUI.bind(T)();
        function renderUI() {

            var $container = this.createUI('#' + id, editor);
            editor.key = id;
            editor.ready(function () {
                _readyFn.forEach(function (fn) {
                    fn.bind(editor)();
                });
            });
            var options = editor.options;
            if (options.initialFrameWidth) {
                options.minFrameWidth = options.initialFrameWidth;
            } else {
                options.minFrameWidth = options.initialFrameWidth = editor.$body.width() || _editor2.default.defaultWidth;
            }

            $container.css({
                width: options.initialFrameWidth,
                zIndex: editor.getOpt('zIndex')
            });

            //ie6下缓存图片
            _browser2.default.ie && _browser2.default.version === 6 && document.execCommand("BackgroundImageCache", false, true);

            editor.render(id);

            //添加tooltip;
            // $.eduitooltip && $.eduitooltip('attachTo', $("[data-original-title]",$container)).css('z-index',editor.getOpt('zIndex')+1);

            $container.find('a').click(function (evt) {
                evt.preventDefault();
            });

            editor.fireEvent("afteruiready");
        }

        return editor;
    },
    createUI: function createUI(id, editor) {
        var $editorCont = (0, _dom2.default)(id),
            $container = (0, _dom2.default)('<div class="edui-container"><div class="edui-editor-body"></div></div>').insertBefore($editorCont);
        editor.$container = $container;
        editor.container = $container[0];

        editor.$body = $editorCont;

        //修正在ie9+以上的版本中，自动长高收起时的，残影问题
        if (_browser2.default.ie && _browser2.default.ie9above) {
            var $span = (0, _dom2.default)('<span style="padding:0;margin:0;height:0;width:0"></span>');
            $span.insertAfter($container);
        }
        //初始化注册的ui组件
        _utils2.default.each(_editorUI, function (v, n) {
            var widget = v.call(editor, n);
            if (widget) {
                _cacheUI[n] = widget;
            }
        });

        // $container.find('.edui-editor-body').append($editorCont).before(this.createToolbar(editor.options, editor));
        $container.find('.edui-editor-body').append($editorCont);

        $container.find('.edui-toolbar').append((0, _dom2.default)('<div class="edui-dialog-container"></div>'));

        return $container;
    },
    createToolbar: function createToolbar(options, editor) {
        // var $toolbar = $.eduitoolbar(), toolbar = $toolbar.edui();
        // //创建下来菜单列表

        // if (options.toolbar && options.toolbar.length) {
        //     var btns = [];
        //     $.each(options.toolbar,function(i,uiNames){
        //         $.each(uiNames.split(/\s+/),function(index,name){
        //             if(name == '|'){
        //                     $.eduiseparator && btns.push($.eduiseparator());
        //             }else{
        //                 var ui = _cacheUI[name];
        //                 if(name=="fullscreen"){
        //                     ui&&btns.unshift(ui);
        //                 }else{
        //                     ui && btns.push(ui);
        //                 }
        //             }

        //         });
        //         btns.length && toolbar.appendToBtnmenu(btns);
        //     });
        // } else {
        //     $toolbar.find('.edui-btn-toolbar').remove()
        // }
        // return $toolbar;
    }

});