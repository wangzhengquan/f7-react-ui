import React  from 'react';
import ReactDOM from 'react-dom';
import Views from '../views'
import $ from '../dom'
import t7 from '../template'
import TextField from './text-field'
import Modals from '../modals'
import Navbars from '../navbars'
require('../resources/less/widget/textfield.less')
require('../resources/less/forms.less')
var hideNavbar = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'

var TextfieldEditor = {
	open (option) {
		var defaultOption = {
			maxLength: 17
		}
		if(!option){
			option = defaultOption
		}else{
			for(var p in defaultOption){
				if(option[p] === undefined){
					option[p] = defaultOption[p]
				}
			}
		}

		var content = t7.compile(

			'<div class="popup">'+
	    	'<div class="view">'+
	        '<!-- Top Navbar-->' +
	        '{{#unless hideNavbar}}'+
	        '<div class="navbar">' +
	        '  <div class="navbar-inner">' +
	        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>取消</span></a></div>' +
	        '    <div class="center sliding">' + ((option && option.title) || '文字编辑') + '</div>' +
	        '    <div class="right sliding"><a class="ok link" disabled><span>保存</span></a></div>' +
	        '  </div>' +
	        '</div>' +
	        '{{/unless}}'+
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page text-editor-page {{#if hideNavbar}}no-navbar toolbar-through {{else}} navbar-through{{/if}}">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content">' +
	        '    </div>' +
	        '	{{#if hideNavbar}}' +
	        '    <div class="toolbar">' +
	        '	 	<div class="full-button-toolbar-inner toolbar-inner" >' +
		    '   		<a class="cancel" style="width: 40%">取消</a>' +
		    '   		<a  class="button ok button-fill"  disabled style="width: 60%">确定</a>' +
		    '   	</div>' +
	        '    </div>' +
	        '	{{/if}}' +
	        '  </div>' +
	        '</div>'+
	        '</div>'+
	        '</div>'

	    )({
	    	hideNavbar: hideNavbar
	    });

	    var page, navbar , closeFn;

	    if(option.showType === 'page'){
	    	var mainView = window.mainView = window.mainView || Views.addView('.view-main', {
		        // Enable Dynamic Navbar for this view
		        dynamicNavbar: true
		    });
		    
		    let res = window.mainView.router.loadContent(content);
		    page = res[1]
	     	navbar = res[0]
	     	closeFn = () => {
	     		// event.preventDefault()
	    		mainView.back()
	     	} 
	    } else {

	    	var modal = Modals.popup(content),
	    		$modal = $(modal)
		    $modal.on('opened', function(){
		       Navbars.sizeNavbar(modal.querySelector('.navbar-inner'))
		    })
		    page =  $modal.find('.page')[0]
		    navbar = $modal.find('.navbar')[0]
		   
		    closeFn = () => {
		      // e.preventDefault()
		      Modals.closeModal(modal)
		    }

	    }
	   

	    
	    var bar =  navbar ? $(navbar) : $(page).find('.toolbar')
	     
	    var onChange = function(value){
	    	if(value && value.trim() !== ''){
	    		bar.find('.ok').removeAttr('disabled');

	    	}else  {
	    		bar.find('.ok').attr('disabled', 'disabled');
	    	}
	    }
	    var textfield = ReactDOM.render(<TextField onChange={onChange} maxLength={option.maxLength} placeholder={option && option.placeholder ? option.placeholder : ''} value={option && option.value ? option.value : ''} />, page.querySelector('.page-content'))
	    
	    bar.on('click',  '.ok:not([disabled])', function(e){
	    	e.preventDefault()
	    	if(option.onOk) option.onOk(textfield.state.value)
	    	closeFn()

	    });

	    bar.on('click', '.cancel ,.back', (event) => {
	    	event.preventDefault()
	    	closeFn()
	    })
    }
}
export default TextfieldEditor;