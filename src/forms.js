import React  from 'react';
import ReactDOM from 'react-dom';
import $ from 'react-ui/dom'
import DateUtil from 'react-ui/date'
import classNames from 'classnames'

require('./resources/less/lists.less');
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
************   DateField   ************
===============================================================================*/

class DateField extends React.Component{
   constructor(props) {
    super(props);
  }
  render(){
    var value = this.props.value || ''
    if(value){
      if(typeof value === 'number'){
        value = DateUtil.format(new Date(value), this.props.format || 'yyyy-MM-dd')
      } else if(toString.call(value) === '[object Date]'){
        value = DateUtil.format(value, this.props.format || 'yyyy-MM-dd')
      }
    }
    return <input type={this.props.type || 'date'} placeholder={this.props.placeholder}  onChange={this.props.onChange} name={this.props.name || false} style={this.props.style} value={value} />
             
  }
}

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

/*===============================================================================
************   Select   ************
===============================================================================*/

class Option extends React.Component{
  
    /**
     * [constructor description]
     * @param  {[type]} props [multiple, image, icon, color, name, selected]
     * @return {[type]}       [description]
     */
    constructor(props) {
      super(props);
    }

    handleChange(event){
        this.props.onSelect && this.props.onSelect(event.target.value, event)
    }

    
    render() {
        var _props = this.props;
        var inputType = _props.multiple ? 'checkbox' : 'radio';
        var optionHasMedia = _props.image || _props.icon || inputType === 'checkbox';
        var titleColor = _props.color ? 'color-'+_props.color : ''
        if(_props.type === 'label'){
            return (<div className="item-divider">{_props.children}</div>)
        }
        return (
            <label className={classNames('item-content', 'label-' + inputType,_props.className)}>
                <input type={inputType} name={_props.name} defaultValue={_props.value} onChange={this.handleChange.bind(this)}  defaultChecked = {_props.selected ? 'checked' : false}/>
                {
                    optionHasMedia ? (
                        <div className="item-media">
                            {inputType === 'checkbox' ? <i className="icon icon-form-checkbox"></i> : ''}
                            {_props.icon ? <i className={classNames('icon', _props.icon)}></i> : ''}
                            {_props.image ? <img src={_props.image} /> : ''} 
                        </div>
                    ) : ''
                }
                <div className="item-inner">
                   <div className={classNames('item-title', titleColor)}>{_props.children}</div>
                </div>
            </label>
        )
    }
}

class Select extends React.Component{
  
  /**
   * [constructor description]
   * @param  {[type]} props [multiple : 'multiple', image, icon, color, name, selected]
   * @return {[type]}       [description]
   */
    constructor(props) {
      super(props);
    }

  
    render() {
       
      return (
          <div className="list-block" style={this.props.style}>
          <ul>
          {
            React.Children.map(this.props.children,  (child) => {
              return (
                <li>
                {
                this.props.type === 'label' ? child :
                React.cloneElement(child, {
                    name: this.props.name, 
                    multiple: this.props.multiple,
                    onSelect: this.props.onSelect
                 })
                }
              </li>);
            })
          }
          </ul>
          </div>
        );
    }
}

 

export {
    ResizableTextarea,
    DateField,
    Option,
    Select
}
