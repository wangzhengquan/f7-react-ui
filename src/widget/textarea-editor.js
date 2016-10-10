import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
import t7 from 'react-ui/template'
require('../resources/less/forms.less')
require('../resources/less/widget/textarea-editor.less')



var hideNavbar = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'

class EditorArea extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
      	value: this.props.value
      }
    }

    handleChange(event){
    	var value = event.target.value;
    	this.setState({value: value});
    	this.props.onChange && this.props.onChange(value)
    	// setTimeout(() => console.log("area state value====", this.state.value), 1000 )
    }
     
    render(){
       return (
       	<textarea className="editor-area" maxLength={this.props.maxLength} value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
       	);
    }
}

 



var TextAreaEditorView = {
	open (option) {
		var defaultOption = {
			maxLength: 2000
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
	    window.mainView = window.mainView || Views.addView('.view-main', {
	        // Enable Dynamic Navbar for this view
	        dynamicNavbar: true
	    });
	   
	    let res = window.mainView.router.loadContent( t7.compile(
	    	'<div class="view">'+
	        '<!-- Top Navbar-->' +
	        '{{#unless hideNavbar}}' +
	        '<div class="navbar">' +
	        '  <div class="navbar-inner">' +
	        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
	        '    <div class="center sliding">' + ((option && option.title) || '文字编辑') + '</div>' +
	        '    <div class="right sliding">' +
          	'      <a class="ok link" disabled><span>确定</span></a>' +
          	'    </div>' +
	        '  </div>' +
	        '</div>' +
	        '{{/unless}}'+
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page textarea-editor-page {{#if hideNavbar}}no-navbar toolbar-through {{else}} navbar-through{{/if}}">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content"></div>' +
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
	        '</div>'
	    )({
	    	hideNavbar: hideNavbar
	    }));

	    let page = res[1]
	    let navbar = res[0]
	    var bar =  navbar ? $(navbar) : $(page).find('.toolbar')
	     
	    var onChange = function(value){
	    	if(value && value.trim()!==''){
	    		bar.find('.ok').removeAttr('disabled');
	    	} else {
	    		bar.find('.ok').attr('disabled', 'disabled');
	    	}
	    }
	    var editorArea = ReactDOM.render(<EditorArea onChange={onChange} maxLength={option.maxLength} value={option && option.value ? option.value : ''} />, page.querySelector('.page-content'))
	    var onOk = (event) => {
	      var isLink = event.target.nodeName.toLowerCase() === 'a';
	      if(isLink) event.preventDefault()
	      
	      var value = editorArea.state.value;
	      if(value.length > option.maxLength){
	      	alert('输入字符长度不能大于'+ option.maxLength)
	      	return;
	      }
	      if(option.onOk) option.onOk(editorArea.state.value)
	  	  $(page).trigger('ok', {value: editorArea.state.value})
	      window.mainView.back()
	    }

	    var onCancel = (event) => {
	    	event.preventDefault()
	    	window.mainView.back()
	    }
	    bar.on('click', '.cancel', onCancel)
	    bar.on('click', '.ok:not([disabled])', onOk)
	    
	    return res
    }
}
export default TextAreaEditorView;