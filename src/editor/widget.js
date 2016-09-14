import HtmlHelper from './html'
import KNode from './node'
import Util from './util'
import VARS from './vars'
function _drag(options) {
	var moveEl = options.moveEl,
		moveFn = options.moveFn,
		clickEl = options.clickEl || moveEl,
		beforeDrag = options.beforeDrag,
		iframeFix = options.iframeFix === undefined ? true : options.iframeFix;

	var docs = [document];

	if (iframeFix) {
		KNode('iframe').each(function() {
			// 判断是否跨域
			var src = HtmlHelper.formatUrl(this.src || '', 'absolute');
			if (/^https?:\/\//.test(src)) {
				return;
			}
			var doc;
			try {
				doc = KNode.iframeDoc(this);
			} catch(e) {}
			if (doc) {
				var pos = KNode(this).pos();
				KNode(doc).data('pos-x', pos.x);
				KNode(doc).data('pos-y', pos.y);
				docs.push(doc);
			}
		});
	}

	clickEl.mousedown(function(e) {
		// 不响应右键，否则可能导致点选右键菜单时无法取消拖拽
		if(e.button !== 0 && e.button !== 1) {
			return;
		}

		e.stopPropagation();

		var self = clickEl.get(),
			x = Util.removeUnit(moveEl.css('left')),
			y = Util.removeUnit(moveEl.css('top')),
			width = moveEl.width(),
			height = moveEl.height(),
			pageX = e.pageX,
			pageY = e.pageY;

		if (beforeDrag) {
			beforeDrag();
		}

		function moveListener(e) {
			e.preventDefault();
			var kdoc = KNode(KNode.getDoc(e.target));
			var diffX = Math.round((kdoc.data('pos-x') || 0) + e.pageX - pageX);
			var diffY = Math.round((kdoc.data('pos-y') || 0) + e.pageY - pageY);
			moveFn.call(clickEl, x, y, width, height, diffX, diffY);
		}

		function selectListener(e) {
			e.preventDefault();
		}

		function upListener(e) {
			e.preventDefault();
			KNode(docs).unbind('mousemove', moveListener)
				.unbind('mouseup', upListener)
				.unbind('selectstart', selectListener);
			if (self.releaseCapture) {
				self.releaseCapture();
			}
		}

		// bind event
		KNode(docs).mousemove(moveListener)
			.mouseup(upListener)
			.bind('selectstart', selectListener);

		if (self.setCapture) {
			self.setCapture();
		}
	});
}

// create KWidget class
function KWidget(options) {
	this.init(options);
}
Util.extend(KWidget, {
	init : function(options) {
		var self = this;
		// public properties
		self.name = options.name || '';
		self.doc = options.doc || document;
		self.win = KNode.getWin(self.doc);
		self.x = Util.addUnit(options.x);
		self.y = Util.addUnit(options.y);
		self.z = options.z;
		self.width = Util.addUnit(options.width);
		self.height = Util.addUnit(options.height);
		self.div = KNode('<div style="display:block;"></div>');
		self.options = options;
		// pravate properties
		self._alignEl = options.alignEl;
		if (self.width) {
			self.div.css('width', self.width);
		}
		if (self.height) {
			self.div.css('height', self.height);
		}
		if (self.z) {
			self.div.css({
				position : 'absolute',
				left : self.x,
				top : self.y,
				'z-index' : self.z
			});
		}
		if (self.z && (self.x === undefined || self.y === undefined)) {
			self.autoPos(self.width, self.height);
		}
		if (options.cls) {
			self.div.addClass(options.cls);
		}
		if (options.shadowMode) {
			self.div.addClass('ke-shadow');
		}
		if (options.css) {
			self.div.css(options.css);
		}
		if (options.src) {
			KNode(options.src).replaceWith(self.div);
		} else {
			KNode(self.doc.body).append(self.div);
		}
		if (options.html) {
			self.div.html(options.html);
		}
		if (options.autoScroll) {
			if (VARS.IE && VARS.V < 7 || VARS.QUIRKS) {
				var scrollPos = KNode.getScrollPos();
				KNode(self.win).bind('scroll', function() {
					var pos = KNode.getScrollPos(),
						diffX = pos.x - scrollPos.x,
						diffY = pos.y - scrollPos.y;
					self.pos(Util.removeUnit(self.x) + diffX, Util.removeUnit(self.y) + diffY, false);
				});
			} else {
				self.div.css('position', 'fixed');
			}
		}
	},
	pos : function(x, y, updateProp) {
		var self = this;
		updateProp = Util.undef(updateProp, true);
		if (x !== null) {
			x = x < 0 ? 0 : Util.addUnit(x);
			self.div.css('left', x);
			if (updateProp) {
				self.x = x;
			}
		}
		if (y !== null) {
			y = y < 0 ? 0 : Util.addUnit(y);
			self.div.css('top', y);
			if (updateProp) {
				self.y = y;
			}
		}
		return self;
	},
	autoPos : function(width, height) {
		var x, y, self = this,
			w = Util.removeUnit(width) || 0,
			h = Util.removeUnit(height) || 0,
			scrollPos = KNode.getScrollPos();
		if (self._alignEl) {
			var knode = KNode(self._alignEl),
				pos = knode.pos(),
				diffX = Math.round(knode[0].clientWidth / 2 - w / 2),
				diffY = Math.round(knode[0].clientHeight / 2 - h / 2);
			x = diffX < 0 ? pos.x : pos.x + diffX;
			y = diffY < 0 ? pos.y : pos.y + diffY;
		} else {
			var docEl = KNode.docElement(self.doc);
			x = Math.round(scrollPos.x + (docEl.clientWidth - w) / 2);
			y = Math.round(scrollPos.y + (docEl.clientHeight - h) / 2);
		}
		// 用position:fixed后不需要添加scroll坐标
		if (!(VARS.IE && VARS.V < 7 || VARS.QUIRKS)) {
			x -= scrollPos.x;
			y -= scrollPos.y;
		}
		return self.pos(x, y);
	},
	remove : function() {
		var self = this;
		if (VARS.IE && VARS.V < 7 || VARS.QUIRKS) {
			KNode(self.win).unbind('scroll');
		}
		self.div.remove();
		Util.each(self, function(i) {
			self[i] = null;
		});
		return this;
	},
	show : function() {
		this.div.show();
		return this;
	},
	hide : function() {
		this.div.hide();
		return this;
	},
	draggable : function(options) {
		var self = this;
		options = options || {};
		options.moveEl = self.div;
		options.moveFn = function(x, y, width, height, diffX, diffY) {
			if ((x = x + diffX) < 0) {
				x = 0;
			}
			if ((y = y + diffY) < 0) {
				y = 0;
			}
			self.pos(x, y);
		};
		_drag(options);
		return self;
	}
});

function _widget(options) {
	return new KWidget(options);
}

KWidget.widget = _widget;
KWidget.drag = _drag
export default KWidget;
