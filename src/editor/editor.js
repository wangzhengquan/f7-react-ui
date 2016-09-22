import $ from '../dom'
import React from 'react'
import Edit from './edit'
import ObjectHelper from '../object'
import Config from './config'
import Modals from 'react-ui/modals'
import ReactDOM from 'react-dom'
import Toolbar from './toolbar'
require('../resources/less/scroll.less')
require('../resources/less/editor.less')
var tpl = '<div class="editor"><div class="edit"></div><div class="statusbar"></div></div>'
class Editor {

 	constructor(options) {
 		this.options = {};
 		ObjectHelper.mix(this.options, Config)
 		ObjectHelper.mix(this.options, options)
 		this.el = $(tpl);
 		
 	}

 	initToolbar() {
 		// setTimeout(()=>{
 		// 	Toolbar.init()
 		// }, 500)
 		Toolbar.init(this.edit)
	    
	}

 	create(){
 		this.el.insertBefore(this.options.srcElement)
 		this.el.css({
			'width': '100%',
			'height': '100%'
		});

 		this.edit = new Edit({
			// height : editHeight > 0 && Util.removeUnit(height) > this.minHeight ? editHeight : this.minHeight,
			src : this.el.find('.edit'),
			srcElement : this.options.srcElement,
			designMode : this.options.designMode,
			themesPath : this.themesPath,
			bodyClass : this.options.bodyClass,
			///react-ui/src/resources/editor/default/default.css
			cssData : this.options.cssData
		})

		this.initToolbar()
 	}
}

Editor.create = function (selector, options){
	options = options || {}
	options.srcElement = $(selector)
	var editor = new Editor(options)
	editor.create()
}

export default Editor;