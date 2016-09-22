// import K from './K'
import KWidget from './widget'
import Util from './util'
import KNode from './node'
function _selectToolbar(name, fn) {
	var self = this,
		knode = self.get(name);
	if (knode) {
		if (knode.hasClass('ke-disabled')) {
			return;
		}
		fn(knode);
	}
}

// create KToolbar class
function KToolbar(options) {
	this.init(options);
}
Util.extend(KToolbar, KWidget, {
	init : function(options) {
		var self = this;
		KToolbar.parent.init.call(self, options);
		self.disableMode = Util.undef(options.disableMode, false);
		self.noDisableItemMap = Util.toMap(Util.undef(options.noDisableItems, []));
		self._itemMap = {};
		self.div.addClass('ke-toolbar').bind('contextmenu,mousedown,mousemove', function(e) {
			e.preventDefault();
		}).attr('unselectable', 'on');
		 
		function hover(knode, method) {
			if (knode) {
				if (knode.hasClass('ke-disabled')) {
					return;
				}
				if (knode.hasClass('ke-selected')) {
					return;
				}
				knode[method]('ke-on');
			}
		}
		 
		self.div.on('mouseover', '.ke-outline', function(e){
			hover(KNode(this), 'addClass')
			 
		})
		self.div.on('mouseout', '.ke-outline', function(e){
			hover(KNode(this), 'removeClass')
			 
		})

		self.div.on('click', '.ke-outline', function(e){
			e.preventDefault()
			e.stopPropagation()
			if(KNode(this).hasClass('ke-disabled')) return;

			self.options.onClick.call(this, e,  KNode(this).attr('data-name'),this);
		})

		self.div.on('change', 'input[type=file],select', function(e){
			e.preventDefault()
			e.stopPropagation()
			if(KNode(this).hasClass('ke-disabled')) return;
			self.options.onChange.call(this, e, KNode(this).attr('data-name'), this);
			return false;
		})

		// .click(function(e) {
		// 	var knode = find(e.target);
		// 	if (knode) {
		// 		if (knode.hasClass('ke-disabled')) {
		// 			return;
		// 		}
				
		// 	}
		// });

	},
	get : function(name) {
		// cache
		if (this._itemMap[name]) {
			return this._itemMap[name];
		}
		return (this._itemMap[name] = KNode('span.ke-icon-' + name, this.div).parent());
	},
	select : function(name) {
		_selectToolbar.call(this, name, function(knode) {
			knode.addClass('ke-selected');
		});
		return self;
	},
	unselect : function(name) {
		_selectToolbar.call(this, name, function(knode) {
			knode.removeClass('ke-selected').removeClass('ke-on');
		});
		return self;
	},
	enable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-disabled');
			knode.opacity(1);
		}
		return self;
	},
	disable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-selected').addClass('ke-disabled');
			knode.opacity(0.5);
		}
		return self;
	},
	disableAll : function(bool, noDisableItems) {
		var self = this, map = self.noDisableItemMap;
		if (noDisableItems) {
			map = Util.toMap(noDisableItems);
		}
		// disable toolbar
		if (bool === undefined ? !self.disableMode : bool) {
			KNode('span.ke-outline', self.div).each(function() {
				var knode = KNode(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.disable(knode);
				}
			});
			self.disableMode = true;
		// enable toolbar
		} else {
			KNode('span.ke-outline', self.div).each(function() {
				var knode = KNode(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.enable(knode);
				}
			});
			self.disableMode = false;
		}
		return self;
	}
});

function _toolbar(options) {
	return new KToolbar(options);
}

KToolbar.toolbar = _toolbar;
export default KToolbar
