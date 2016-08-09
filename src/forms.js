import React  from 'react';
import ReactDOM from 'react-dom';
import $ from 'react-ui/dom'
require('./resources/less/forms.less')

var resizeTextarea = function (textarea) {
    textarea = $(textarea);
     
    textarea.css({'height': ''});
    var height = textarea[0].offsetHeight;
    var diff = height - textarea[0].clientHeight;
    //
    var scrollHeight = textarea[0].scrollHeight;
    if (scrollHeight + diff > height) {
        var newAreaHeight = scrollHeight + diff;
        textarea.css('height', newAreaHeight + 'px');
    }
};


/*===============================================================================
************   Resizable textarea   ************
===============================================================================*/

class ResizableTextarea extends React.Component{
  constructor(props) {
    super(props);
    this.destroyList = []
  }

  componentWillUnmount(){
    this.destroyList.forEach((fun) => {
        fun()
    })
    this.destroyList = []
  }
   
  componentDidMount(){
    var textarea = ReactDOM.findDOMNode(this);
    // textarea = $(textarea);

    // var textareaTimeout;
    // function handleTextarea() {
    //     clearTimeout(textareaTimeout);
    //     textareaTimeout = setTimeout(function () {
    //         resizeTextarea(textarea);
    //     }, 0);
    // }
    // textarea.on('change keydown keypress keyup paste cut', handleTextarea);
    // this.destroyList.push(function () {
    //     textarea.off('change keydown keypress keyup paste cut', handleTextarea);
    // })

    resizeTextarea(textarea);
     
  }

  componentDidUpdate(){
    var textarea = ReactDOM.findDOMNode(this);
    resizeTextarea(textarea);
  }
  
  render(){
    return (
    <textarea value={this.props.value || ''} className={this.props.className} placeholder={this.props.placeholder} onChange={this.props.onChange}></textarea>
    )
  }
}

export {
    ResizableTextarea
}
