// import K from './K'
import KWidget from './widget'
import KNode from './node'
import KCmd from './cmd'
import Util from './util'
import VARS from './vars'
import TagMap from './tag-map'

var html, _direction = '';
if ((html = document.getElementsByTagName('html'))) {
	_direction = html[0].dir;
}

function _getInitHtml(themesPath, bodyClass, cssPath, cssData) {
	var arr = [
		(_direction === '' ? '<html>' : '<html dir="' + _direction + '">'),
		'<head><meta charset="utf-8" /><title></title>',
		'<style>',
		'html {margin:0;padding:0;}',
		'body {margin:0;padding:5px;}',
		'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}',
		'body, p, div {word-wrap: break-word;}',
		'p {margin:5px 0;}',
		'table {border-collapse:collapse;}',
		'img {border:0;}',
		'noscript {display:none;}',
		'table.ke-zeroborder td {border:1px dotted #AAA;}',
		'img.ke-flash {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/flash.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-rm {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/rm.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-media {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/media.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-anchor {',
		'	border:1px dashed #666;',
		'	width:16px;',
		'	height:16px;',
		'}',
		'.ke-script, .ke-noscript, .ke-display-none {',
		'	display:none;',
		'	font-size:0;',
		'	width:0;',
		'	height:0;',
		'}',
		'.ke-pagebreak {',
		'	border:1px dotted #AAA;',
		'	font-size:0;',
		'	height:2px;',
		'}',
		'</style>'
	];
	if (!Util.isArray(cssPath)) {
		cssPath = [cssPath];
	}
	Util.each(cssPath, function(i, path) {
		if (path) {
			arr.push('<link href="' + path + '" rel="stylesheet" />');
		}
	});
	if (cssData) {
		arr.push('<style>' + cssData + '</style>');
	}
	arr.push('</head><body ' + (bodyClass ? 'class="' + bodyClass + '"' : '') + '></body></html>');
	return arr.join('\n');
}



// create KEdit class
function KEdit(options) {
	this.init(options);
}
Util.extend(KEdit, KWidget, {
	init : function(options) {
		var self = this;
		KEdit.parent.init.call(self, options);

		self.srcElement = KNode(options.srcElement);
		self.div.addClass('ke-edit');
		self.designMode = Util.undef(options.designMode, true);
		self.beforeGetHtml = options.beforeGetHtml;
		self.beforeSetHtml = options.beforeSetHtml;
		self.afterSetHtml = options.afterSetHtml;

		var themesPath = Util.undef(options.themesPath, ''),
			bodyClass = options.bodyClass,
			cssPath = options.cssPath,
			cssData = options.cssData,
			isDocumentDomain = location.protocol != 'res:' && location.host.replace(/:\d+/, '') !== document.domain,
			srcScript = ('document.open();' +
				(isDocumentDomain ? 'document.domain="' + document.domain + '";' : '') +
				'document.close();'),
			iframeSrc = VARS.IE ? ' src="javascript:void(function(){' + encodeURIComponent(srcScript) + '}())"' : '';
		self.iframe = KNode('<iframe class="ke-edit-iframe" hidefocus="true" frameborder="0"' + iframeSrc + '></iframe>').css('width', '100%');
		self.textarea = KNode('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css('width', '100%');
		self.tabIndex = isNaN(parseInt(options.tabIndex, 10)) ? self.srcElement.attr('tabindex') : parseInt(options.tabIndex, 10);
		self.iframe.attr('tabindex', self.tabIndex);
		self.textarea.attr('tabindex', self.tabIndex);

		if (self.width) {
			self.setWidth(self.width);
		}
		if (self.height) {
			self.setHeight(self.height);
		}
		if (self.designMode) {
			self.textarea.hide();
		} else {
			self.iframe.hide();
		}
		function ready() {
			var doc = KNode.iframeDoc(self.iframe);
			doc.open();
			if (isDocumentDomain) {
				doc.domain = document.domain;
			}
			doc.write(_getInitHtml(themesPath, bodyClass, cssPath, cssData));
			doc.close();
			self.win = self.iframe[0].contentWindow;
			self.doc = doc;
			var cmd = KCmd.cmd(doc);
			// add events
			self.afterChange(function() {
				cmd.selection();
			});
			// [WEBKIT] select an image after click the image
			if (VARS.WEBKIT) {
				KNode(doc).click(function(e) {
					if (KNode(e.target).name === 'img') {
						cmd.selection(true);
						cmd.range.selectNode(e.target);
						cmd.select();
					}
				});
			}
			if (VARS.IE) {
				// Fix bug: https://github.com/kindsoft/kindeditor/issues/53
				self._mousedownHandler = function() {
					var newRange = cmd.range.cloneRange();
					newRange.shrink();
					if (newRange.isControl()) {
						self.blur();
					}
				};
				KNode(document).mousedown(self._mousedownHandler);
				// [IE] bug: clear iframe when press backspase key
				KNode(doc).keydown(function(e) {
					if (e.which == 8) {
						cmd.selection();
						var rng = cmd.range;
						if (rng.isControl()) {
							rng.collapse(true);
							KNode(rng.startContainer.childNodes[rng.startOffset]).remove();
							e.preventDefault();
						}
					}
				});
			}
			self.cmd = cmd;

			self.html(self.srcElement.val());
			if (VARS.IE) {
				doc.body.disabled = true;
				doc.body.contentEditable = true;
				doc.body.removeAttribute('disabled');
			} else {
				doc.designMode = 'on';
			}
			if (options.afterCreate) {
				options.afterCreate.call(self);
			}
		}
		if (isDocumentDomain) {
			self.iframe.bind('load', function() {
				self.iframe.unbind('load');
				if (VARS.IE) {
					ready();
				} else {
					setTimeout(ready, 0);
				}
			});
		}
		self.div.append(self.iframe);
		self.div.append(self.textarea);
		self.srcElement.hide();
		!isDocumentDomain && ready();
	},
	setWidth : function(val) {
		var self = this;
		val = Util.addUnit(val);
		self.width = val;
		self.div.css('width', val);
		return self;
	},
	setHeight : function(val) {
		var self = this;
		val = Util.addUnit(val);
		self.height = val;
		self.div.css('height', val);
		self.iframe.css('height', val);
		// 校正IE6和IE7的textarea高度
		if ((VARS.IE && VARS.V < 8) || VARS.QUIRKS) {
			val = Util.addUnit(VARS.removeUnit(val) - 2);
		}
		self.textarea.css('height', val);
		return self;
	},
	remove : function() {
		var self = this, doc = self.doc;
		// remove events
		KNode(doc.body).unbind();
		KNode(doc).unbind();
		KNode(self.win).unbind();
		if (self._mousedownHandler) {
			KNode(document).unbind('mousedown', self._mousedownHandler);
		}
		// remove elements
		KNode.elementVal(self.srcElement, self.html());
		self.srcElement.show();
		// doc.write('');
		self.iframe.unbind();
		self.textarea.unbind();
		KEdit.parent.remove.call(self);
	},
	html : function(val, isFull) {
		var self = this, doc = self.doc;
		// design mode
		if (self.designMode) {
			var body = doc.body;
			// get
			if (val === undefined) {
				if (isFull) {
					val = '<!doctype html><html>' + body.parentNode.innerHTML + '</html>';
				} else {
					val = body.innerHTML;
				}
				if (self.beforeGetHtml) {
					val = self.beforeGetHtml(val);
				}
				// bugfix: Firefox自动生成一个br标签
				if (VARS.GECKO && val == '<br />') {
					val = '';
				}
				return val;
			}
			// set
			if (self.beforeSetHtml) {
				val = self.beforeSetHtml(val);
			}
			// IE9 Bugfix: https://github.com/kindsoft/kindeditor/issues/62
			if (VARS.IE && VARS.V >= 9) {
				val = val.replace(/(<.*?checked=")checked(".*>)/ig, '$1$2');
			}
			KNode(body).html(val);
			if (self.afterSetHtml) {
				self.afterSetHtml();
			}
			return self;
		}
		// source mode
		if (val === undefined) {
			return self.textarea.val();
		}
		self.textarea.val(val);
		return self;
	},
	design : function(bool) {
		var self = this, val;
		if (bool === undefined ? !self.designMode : bool) {
			if (!self.designMode) {
				val = self.html();

				self.designMode = true;
				self.textarea.hide();

				self.html(val);

				// cache
				var iframe = self.iframe;
				var height = VARS.removeUnit(self.height);

				iframe.height(height - 2);
				iframe.show();

				// safari iframe scrollbar hack
				setTimeout(function() {
					iframe.height(height);
				}, 0);
			}
		} else {
			if (self.designMode) {
				val = self.html();
				self.designMode = false;
				self.html(val);
				self.iframe.hide();
				self.textarea.show();
			}
		}
		return self.focus();
	},
	focus : function() {
		var self = this;
		self.designMode ? self.win.focus() : self.textarea[0].focus();
		return self;
	},
	blur : function() {
		var self = this;
		if (VARS.IE) {
			var input = KNode('<input type="text" style="float:left;width:0;height:0;padding:0;margin:0;border:0;" value="" />', self.div);
			self.div.append(input);
			input[0].focus();
			input.remove();
		} else {
			self.designMode ? self.win.blur() : self.textarea[0].blur();
		}
		return self;
	},
	afterChange : function(fn) {
		var self = this, doc = self.doc, body = doc.body;
		KNode(doc).keyup(function(e) {
			if (!e.ctrlKey && !e.altKey && TagMap.CHANGE_KEY_MAP[e.which]) {
				fn(e);
			}
		});
		KNode(doc).mouseup(fn).contextmenu(fn);

		KNode(self.win).blur(fn);
		function timeoutHandler(e) {
			setTimeout(function() {
				fn(e);
			}, 1);
		}
		KNode(body).bind('paste', timeoutHandler);
		KNode(body).bind('cut', timeoutHandler);
		return self;
	}
});

function _edit(options) {
	return new KEdit(options);
}


KEdit.edit = _edit;
export default KEdit;
