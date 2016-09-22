 
import CONFIG from './config'
import VARS from './vars'
import TagMap from './tag-map'
// import KCmd from './cmd'
import KMenu from './menu'
import KNode from './node'
import KWidget from './widget'
import KToolbar from './toolbar'
import KEdit from './edit'
import HtmlHelper from './html'
import Util from './util'
// import KEvent from './event'
import KColorPicker from './colorpicker'
import MicroEvent from '../microevent'
require('../resources/editor/default/default.css')
var Main = {}


function _ctrl(el, key, fn) {
	key = /^\d{2,}$/.test(key) ? key : key.toUpperCase().charCodeAt(0);
	KNode(el).bind('keydown', function(e) {
		if (e.ctrlKey && e.which == key && !e.shiftKey && !e.altKey) {
			fn.call(el);
			e.preventDefault();
			e.stopPropagation()
		}
	});
}
var _plugins = {};

function _plugin(name, fn) {
	if (name === undefined) {
		return _plugins;
	}
	if (!fn) {
		return _plugins[name];
	}
	_plugins[name] = fn;
}

var _language = {};

function _parseLangKey(key) {
	var match, ns = 'core';
	if ((match = /^(\w+)\.(\w+)$/.exec(key))) {
		ns = match[1];
		key = match[2];
	}
	return { ns : ns, key : key };
}
/**
	@example
	K.lang('about'); //get core.about
	K.lang('about.version'); // get about.version
	K.lang('about.').version; // get about.version
	K.lang('about', 'en'); //get English core.about
	K.lang({
		core.about : '关于',
		about.version : '4.0'
	}, 'zh-CN'); //add language
*/
function _lang(mixed, langType) {
	
	langType = langType === undefined ? CONFIG.langType : langType;
	if (typeof mixed === 'string') {
		
		if (!_language[langType]) {
			return 'no language';
		}
		var pos = mixed.length - 1;
		if (mixed.substr(pos) === '.') {
			return _language[langType][mixed.substr(0, pos)];
		}
		var obj = _parseLangKey(mixed);
		return _language[langType][obj.ns][obj.key];
	}
	Util.each(mixed, function(key, val) {
		var obj = _parseLangKey(key);
		if (!_language[langType]) {
			_language[langType] = {};
		}
		if (!_language[langType][obj.ns]) {
			_language[langType][obj.ns] = {};
		}
		_language[langType][obj.ns][obj.key] = val;
	});
}
 

  

function KEditor(options) {
	var self = this;
	// save original options
	self.options = {};
	function setOption(key, val) {
		if (KEditor.prototype[key] === undefined) {
			self[key] = val;
		}
		self.options[key] = val;
	}
	
	// set options from param
	Util.each(options, function(key) {
		setOption(key, options[key]);
	});
	// set options from default setting
	Util.each(CONFIG, function(key, val) {
		if (self[key] === undefined) {
			setOption(key, val);
		}
	});
	var se = KNode(self.srcElement || '<textarea/>');
	if (!self.width) {
		self.width = se[0].style.width || se.width();
	}
	if (!self.height) {
		self.height = se[0].style.height || se.height();
	}
	setOption('width', Util.undef(self.width, self.minWidth));
	setOption('height', Util.undef(self.height, self.minHeight));
	setOption('width', Util.addUnit(self.width));
	setOption('height', Util.addUnit(self.height));
	 
	self.srcElement = se;
	self.initContent = '';
	self.plugin = {};
	self.isCreated = false;
	// private properties
	self._undoStack = [];
	self._redoStack = [];
	self.menu = self.contextmenu = null;
}



KEditor.prototype = {
	lang : function(mixed) {
		return _lang(mixed, this.langType);
	},
	loadPlugin : function(name, fn) {
		var self = this;
		var _pluginStatus = this._pluginStatus;
		if (!_pluginStatus) {
			_pluginStatus = this._pluginStatus = {};
		}

		if (_plugins[name]) {
			// JS加载完成，避免初始化多次
			if(!_pluginStatus[name]) {
				_plugins[name].call(self, Main);
				_pluginStatus[name] = 'inited';
			}

			if (fn) {
				fn.call(self);
			}
			return self;
		}
		 
		return self;
	},

	updateState : function() {
		var self = this;
		Util.each(('justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,' +
			'subscript,superscript,bold,italic,underline,strikethrough').split(','), function(i, name) {
			self.cmd.state(name) ? self.toolbar.select(name) : self.toolbar.unselect(name);
		});
		return self;
	},
	 
	create : function() {

		var self = this, fullscreenMode = self.fullscreenMode;
		if (self.isCreated) {
			return self;
		}

		if (self.srcElement.data('kindeditor')) {
			return self;
		}
		self.srcElement.data('kindeditor', 'true');

		if (fullscreenMode) {
			KNode.docElement().style.overflow = 'hidden';
		} else {
			KNode.docElement().style.overflow = '';
		}
		var width = fullscreenMode ? KNode.docElement().clientWidth + 'px' : self.width,
			height = fullscreenMode ? KNode.docElement().clientHeight + 'px' : self.height;
		 
		var container = self.container = KNode(self.layout);
		if (fullscreenMode) {
			KNode(document.body).append(container);
		} else {
			self.srcElement.before(container);
		}
		var toolbarDiv = KNode('.toolbar', container),
			editDiv = KNode('.edit', container),
			statusbar = self.statusbar = KNode('.statusbar', container);

		container.removeClass('container')
			.addClass('ke-container ke-container-' + self.themeType).css('width', width);
		if (fullscreenMode) {
			container.css({
				position : 'absolute',
				left : 0,
				top : 0,
				'z-index' : 811211
			});
			if (!VARS.GECKO) {
				self._scrollPos = KNode.getScrollPos();
			}
			window.scrollTo(0, 0);
			// bugfix: [WEBKIT] 高度为0时在dialog里无法粘贴文本
			KNode(document.body).css({
				'height' : '1px',
				'overflow' : 'hidden'
			});
			KNode(document.body.parentNode).css('overflow', 'hidden');
			self._fullscreenExecuted = true;
		} else {
			if (self._fullscreenExecuted) {
				// 恢复文档高度
				KNode(document.body).css({
					'height' : '',
					'overflow' : ''
				});
				KNode(document.body.parentNode).css('overflow', '');
			}
			if (self._scrollPos) {
				window.scrollTo(self._scrollPos.x, self._scrollPos.y);
			}
		}
		// create toolbar
		var toolBarHtmlList = [];
		Util.each(self.items, function(i, name) {
			if (name == '|') {
				toolBarHtmlList.push('<span class="ke-inline-block ke-separator"></span>');
			} else if (name == '/') {
				toolBarHtmlList.push('<div class="ke-hr"></div>');
			} else if (name == 'fontname') {
				toolBarHtmlList.push([
					'<span class="ke-outline" data-name="' + name + '" title="' + self.lang(name) + '" unselectable="on">',
						'<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + name + '" unselectable="on"></span>',
						'<select name="' + name + '" data-name="' + name + '"/>'
				].join(''));
				var options = []
				Util.each(self.lang('fontname.fontName'), function(key, val) {
					options.push('<option value="'+key+'">'+val+'</option>')
				});
				toolBarHtmlList.push(options.join(''))
				toolBarHtmlList.push([
					'</select>',
				'</span>'
				].join(''))

			}
			else {
				toolBarHtmlList.push('<span class="ke-outline" data-name="' + name + '" title="' + self.lang(name) + '" unselectable="on">');
				toolBarHtmlList.push('<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + name + '" unselectable="on"></span></span>');
			}
		});
		var toolbar = self.toolbar = new KToolbar({
			src : toolbarDiv,
			html : toolBarHtmlList.join(''),
			noDisableItems : self.noDisableItems,
			onClick : function(e, name) {
				e.preventDefault()
				e.stopPropagation()
				if (self.menu) {
					var menuName = self.menu.name;
					self.hideMenu();
					if (menuName === name) {
						return;
					}
				}
				self.fire('click-toolbar-'+name, this);
			},
			onChange : function(e, name) {
				
				self.fire('change-toolbar-'+name, this);
			}
		});
		// create edit
		var editHeight = Util.removeUnit(height) - toolbar.div.height();
		var edit = self.edit = new KEdit({
			height : editHeight > 0 && Util.removeUnit(height) > self.minHeight ? editHeight : self.minHeight,
			src : editDiv,
			srcElement : self.srcElement,
			designMode : self.designMode,
			themesPath : self.themesPath,
			bodyClass : self.bodyClass,
			cssPath : self.cssPath,
			cssData : self.cssData,
			beforeGetHtml : function(html) {

				html = self.beforeGetHtml(html);
				// Bugfix: 浏览器后退产生__kindeditor_bookmark_start_0__
				html = _removeBookmarkTag(_removeTempTag(html));
				return HtmlHelper.formatHtml(html, self.filterMode ? self.htmlTags : null, self.urlType, self.wellFormatMode, self.indentChar);
			},
			beforeSetHtml : function(html) {
				html = HtmlHelper.formatHtml(html, self.filterMode ? self.htmlTags : null, '', false);
				return self.beforeSetHtml(html);
			},
			afterSetHtml : function() {
				self.edit = edit = this;
				self.afterSetHtml();
			},
			afterCreate : function() {
				self.edit = edit = this;
				self.cmd = edit.cmd;
				// hide menu when click document
				self._docMousedownFn = function() {
					if (self.menu) {
						self.hideMenu();
					}
				};
				// KNode(edit.doc, document).mousedown(self._docMousedownFn);
				// _bindContextmenuEvent.call(self);
				// _bindNewlineEvent.call(self);
				// _bindTabEvent.call(self);
				// _bindFocusEvent.call(self);
				// afterChange event
				edit.afterChange(function() {
					if (!edit.designMode) {
						return;
					}
					self.updateState();
					self.addBookmark();
					if (self.options.afterChange) {
						self.options.afterChange.call(self);
					}
				});
				edit.textarea.keyup(function(e) {
					if (!e.ctrlKey && !e.altKey && TagMap.INPUT_KEY_MAP[e.which]) {
						if (self.options.afterChange) {
							self.options.afterChange.call(self);
						}
					}
				});
				// readonly
				if (self.readonlyMode) {
					self.readonly();
				}
				self.isCreated = true;
				if (self.initContent === '') {
					self.initContent = self.html();
				}
				// Bugfix: 全屏后和还原后光标没有选中之前光标的位置
				if (self._undoStack.length > 0) {
					var prev = self._undoStack.pop();
					if (prev.start) {
						self.html(prev.html);
						edit.cmd.range.moveToBookmark(prev);
						self.select();
					}
				}
				
				self.afterCreate();
				if (self.options.afterCreate) {
					self.options.afterCreate.call(self);
				}
			}
		});
		// create statusbar
		statusbar.removeClass('statusbar').addClass('ke-statusbar')
			.append('<span class="ke-inline-block ke-statusbar-center-icon"></span>')
			.append('<span class="ke-inline-block ke-statusbar-right-icon"></span>');

		// remove resize event
		if (self._fullscreenResizeHandler) {
			KNode(window).unbind('resize', self._fullscreenResizeHandler);
			self._fullscreenResizeHandler = null;
		}
		// reset size
		function initResize() {
			// Bugfix: 页面刷新后，与第一次访问加载的编译器高度不一致
			if (statusbar.height() === 0) {
				setTimeout(initResize, 100);
				return;
			}
			self.resize(width, height, false);
		}
		initResize();
		// fullscreen mode
		if (fullscreenMode) {
			self._fullscreenResizeHandler = function() {
				if (self.isCreated) {
					self.resize(KNode.docElement().clientWidth, KNode.docElement().clientHeight, false);
				}
			};
			KNode(window).bind('resize', self._fullscreenResizeHandler);
			toolbar.select('fullscreen');
			statusbar.first().css('visibility', 'hidden');
			statusbar.last().css('visibility', 'hidden');
		} else {
			if (VARS.GECKO) {
				KNode(window).bind('scroll', function() {
					self._scrollPos = KNode.getScrollPos();
				});
			}
			// bind drag event
			if (self.resizeType > 0) {
				KWidget.drag({
					moveEl : container,
					clickEl : statusbar,
					moveFn : function(x, y, width, height, diffX, diffY) {
						height += diffY;
						self.resize(null, height);
					}
				});
			} else {
				statusbar.first().css('visibility', 'hidden');
			}
			if (self.resizeType === 2) {
				KWidget.drag({
					moveEl : container,
					clickEl : statusbar.last(),
					moveFn : function(x, y, width, height, diffX, diffY) {
						width += diffX;
						height += diffY;
						self.resize(width, height);
					}
				});
			} else {
				statusbar.last().css('visibility', 'hidden');
			}
		}
		return self;
	},
	remove : function() {
		var self = this;
		if (!self.isCreated) {
			return self;
		}
		self.beforeRemove();

		self.srcElement.data('kindeditor', '');

		if (self.menu) {
			self.hideMenu();
		}
		Util.each(self.dialogs, function() {
			self.hideDialog();
		});
		KNode(document).unbind('mousedown', self._docMousedownFn);
		self.toolbar.remove();
		self.edit.remove();
		self.statusbar.last().unbind();
		self.statusbar.unbind();
		self.container.remove();
		self.container = self.toolbar = self.edit = self.menu = null;
		self.dialogs = [];
		self.isCreated = false;
		return self;
	},
	resize : function(width, height, updateProp) {
		var self = this;
		updateProp = Util.undef(updateProp, true);
		if (width) {
			if (!/%/.test(width)) {
				width = Util.removeUnit(width);
				width = width < self.minWidth ? self.minWidth : width;
			}
			self.container.css('width', Util.addUnit(width));
			if (updateProp) {
				self.width = Util.addUnit(width);
			}
		}
		if (height) {
			height = Util.removeUnit(height);
			var editHeight = Util.removeUnit(height) - self.toolbar.div.height() - self.statusbar.height();
			editHeight = editHeight < self.minHeight ? self.minHeight : editHeight;
			self.edit.setHeight(editHeight);
			if (updateProp) {
				self.height = Util.addUnit(height);
			}
		}
		return self;
	},
	select : function() {
		this.isCreated && this.cmd.select();
		return this;
	},
	html : function(val) {
		var self = this;
		if (val === undefined) {
			return self.isCreated ? self.edit.html() : KNode.elementVal(self.srcElement);
		}
		self.isCreated ? self.edit.html(val) : KNode.elementVal(self.srcElement, val);
		// Bugfix: http://www.kindsoft.net/view.php?bbsid=4&postid=6703&pagenum=1
		if (self.isCreated) {
			self.cmd.selection();
		}
		return self;
	},
	fullHtml : function() {
		return this.isCreated ? this.edit.html(undefined, true) : '';
	},
	text : function(val) {
		var self = this;
		if (val === undefined) {
			return Util.trim(self.html().replace(/<(?!img|embed).*?>/ig, '').replace(/&nbsp;/ig, ' '));
		} else {
			return self.html(HtmlHelper.escape(val));
		}
	},
	isEmpty : function() {
		return Util.trim(this.text().replace(/\r\n|\n|\r/, '')) === '';
	},
	isDirty : function() {
		return Util.trim(this.initContent.replace(/\r\n|\n|\r|t/g, '')) !== Util.trim(this.html().replace(/\r\n|\n|\r|t/g, ''));
	},
	 
	count : function(mode) {
		var self = this;
		mode = (mode || 'html').toLowerCase();
		if (mode === 'html') {
			return self.html().length;
		}
		if (mode === 'text') {
			return self.text().replace(/<(?:img|embed).*?>/ig, 'K').replace(/\r\n|\n|\r/g, '').length;
		}
		return 0;
	},
	 
	insertHtml : function(val, quickMode) {
		if (!this.isCreated) {
			return this;
		}
		val = this.beforeSetHtml(val);
		this.exec('inserthtml', val, quickMode);
		return this;
	},
	appendHtml : function(val) {
		this.html(this.html() + val);
		if (this.isCreated) {
			var cmd = this.cmd;
			cmd.range.selectNodeContents(cmd.doc.body).collapse(false);
			cmd.select();
		}
		return this;
	},
	sync : function() {
		KNode.elementVal(this.srcElement, this.html());
		return this;
	},
	focus : function() {
		this.isCreated ? this.edit.focus() : this.srcElement[0].focus();
		return this;
	},
	blur : function() {
		this.isCreated ? this.edit.blur() : this.srcElement[0].blur();
		return this;
	},
	 
	fullscreen : function(bool) {
		this.fullscreenMode = (bool === undefined ? !this.fullscreenMode : bool);
		this.addBookmark(false);
		return this.remove().create();
	},
	readonly : function(isReadonly) {
		isReadonly = Util.undef(isReadonly, true);
		var self = this, edit = self.edit, doc = edit.doc;
		if (self.designMode) {
			self.toolbar.disableAll(isReadonly, []);
		} else {
			Util.each(self.noDisableItems, function() {
				self.toolbar[isReadonly ? 'disable' : 'enable'](this);
			});
		}
		if (VARS.IE) {
			doc.body.contentEditable = !isReadonly;
		} else {
			doc.designMode = isReadonly ? 'off' : 'on';
		}
		edit.textarea[0].disabled = isReadonly;
	},
	createMenu : function(options) {
		var self = this,
			name = options.name,
			knode = self.toolbar.get(name),
			pos = knode.pos();
		options.x = pos.x;
		options.y = pos.y + knode.height();
		options.z = self.options.zIndex;
		options.shadowMode = Util.undef(options.shadowMode, self.shadowMode);
		if (options.selectedColor !== undefined) {
			options.cls = 'ke-colorpicker-' + self.themeType;
			options.noColor = self.lang('noColor');
			self.menu = new KColorPicker(options);
		} else {
			options.cls = 'ke-menu-' + self.themeType;
			options.centerLineMode = false;
			self.menu = new KMenu(options);
		}
		return self.menu;
	},
	hideMenu : function() {
		this.menu.remove();
		this.menu = null;
		return this;
	},
	hideContextmenu : function() {
		this.contextmenu.remove();
		this.contextmenu = null;
		return this;
	}
	 
};

MicroEvent.mixin(KEditor)

function _editor(options) {
	return new KEditor(options);
}

var _instances = [];

/**
	@example
	K.create('textarea');
	K.create('textarea.class');
	K.create('#id');
*/
function _create(expr, options) {
	options = options || {};
	// options.basePath = Util.undef(options.basePath, K.basePath);
	// options.themesPath = Util.undef(options.themesPath, options.basePath + 'themes/');
	// options.langPath = Util.undef(options.langPath, options.basePath + 'lang/');
	// options.pluginsPath = Util.undef(options.pluginsPath, options.basePath + 'plugins/');
	// 自动加载CSS文件
	// if (Util.undef(options.loadStyleMode, CONFIG.loadStyleMode)) {
	// 	var themeType = Util.undef(options.themeType, CONFIG.themeType);
	// 	_loadStyle(options.themesPath + 'default/default.css');
	// 	_loadStyle(options.themesPath + themeType + '/' + themeType + '.css');
	// }
	
	function create(editor) {
		Util.each(_plugins, function(name, fn) {
			if (Util.isFunction(fn)) {
				fn.call(editor, Main);
				if (!editor._pluginStatus) {
					editor._pluginStatus = {};
				}
				editor._pluginStatus[name] = 'inited';
			}
		});
		return editor.create();
	}
	var knode = KNode(expr);
	if (!knode || knode.length === 0) {
		return;
	}
	if (knode.length > 1) {
		knode.each(function() {
			_create(this, options);
		});
		return _instances[0];
	}
	options.srcElement = knode[0];
	var editor = new KEditor(options);
	_instances.push(editor);
	// create editor
	 return create(editor);
	// if (_language[editor.langType]) {
		// return create(editor);
	// }
	// create editor after load lang file
	// _loadScript(editor.langPath + editor.langType + '.js?ver=' + encodeURIComponent(K.DEBUG ? _TIME : VARS.VERSION), function() {
	// 	create(editor);
	// });
	// return editor;
}

function _eachEditor(expr, fn) {
	KNode(expr).each(function(i, el) {
		Util.each(_instances, function(j, editor) {
			if (editor && editor.srcElement[0] == el) {
				fn.call(editor, j);
				return false;
			}
		});
	});
}

Main.remove = function(expr) {
	_eachEditor(expr, function(i) {
		this.remove();
		_instances.splice(i, 1);
	});
};

Main.sync = function(expr) {
	_eachEditor(expr, function() {
		this.sync();
	});
};

Main.html = function(expr, val) {
	_eachEditor(expr, function() {
		this.html(val);
	});
};

Main.insertHtml = function(expr, val) {
	_eachEditor(expr, function() {
		this.insertHtml(val);
	});
};

Main.appendHtml = function(expr, val) {
	_eachEditor(expr, function() {
		this.appendHtml(val);
	});
};

// 解决IE6浏览器重复下载背景图片的问题
// if (VARS.IE && VARS.V < 7) {
// 	KCmd._nativeCommand(document, 'BackgroundImageCache', true);
// }

Main.EditorClass = KEditor;
Main.editor = _editor;
Main.create = _create;
Main.instances = _instances;
Main.plugin = _plugin;
Main.lang = _lang;

// core plugins
_plugin('core', function() {
	var self = this;
		 
	  
	// fontname
	self.on('change-toolbar-fontname', function(el) {
		//self.exec('fontname', el.value)
		var selection = window.getSelection()
		var range = selection.getRange()
		console.log(selection, range)
		 
	});
	   
	 
});
window.KindEditor = Main;
export default Main;
