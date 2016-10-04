import React  from 'react';
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import Quill from 'quill'

require('quill/dist/quill.snow.css')

class EditorPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
    var me = this
    var quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        // toolbar: toolbarOptions
        toolbar: me.refs.toolbar
      }
    });
    // $(me.refs.toolbar).on('change', 'input[type=file]', function(e){
    //   console.log(e)
    //   return false;
    // })
    
    var imageButton = me.refs.toolbar.querySelector('.ql-image');
    var inputImage ;
    imageButton.addEventListener('click', function(e) {
      console.log('Clicked!',e.target);
      if(!inputImage){
        inputImage = $('<input type="file" accept="image/*" class="ql-image" style="display:none;" />')
        $(imageButton).append(inputImage);
      }
      inputImage.trigger('click')
      e.stopPropagation()
      return false;
    });

    var toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', function(...args){
      console.log(args)
      return false
    });
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
        <div id="toolbar" ref="toolbar">
          <span className="ql-formats">
            
            <select className="ql-size" defaultValue="normal">
              <option value="small"></option>
              <option value="normal"></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
          </span>
         
          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
           
          </span>
          <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
          </span>

        </div>

	      <div id="editor">
          <p>Hello World!</p>
          <p>Some initial <strong>bold</strong> text</p>
          <p><br/></p>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = EditorPage
