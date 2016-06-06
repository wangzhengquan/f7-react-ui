import React  from 'react';
import $ from 'react-ui/dom'
import classNames from 'classnames'
require('./resources/less/lists.less');
require('./resources/less/forms.less');

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
        console.log(event.target.checked, event.target.value)
        this.props.onSelect && this.props.onSelect(event.target.value, event)
    }

    
    render() {
        var _props = this.props;
        var inputType = _props.multiple ? 'checkbox' : 'radio';
        var optionHasMedia = _props.image || _props.icon || inputType === 'checkbox';
        var titleColor = _props.color ? "color-"+_props.color : ""
        if(_props.type === 'label'){
            return (<div className="item-divider">{_props.children}</div>)
        }
        return (
            <label className={classNames("item-content", "label-" + inputType,_props.className)}>
                <input type={inputType} name={_props.name} defaultValue={_props.value} onChange={this.handleChange.bind(this)}  defaultChecked = {_props.selected ? 'checked' : false}/>
                {
                    optionHasMedia ? (
                        <div className="item-media">
                            {inputType === "checkbox" ? <i className="icon icon-form-checkbox"></i> : ""}
                            {_props.icon ? <i className={classnames("icon", _props.icon)}></i> : ""}
                            {_props.image ? <img src={_props.image} /> : ""} 
                        </div>
                    ) : ""
                }
                <div className="item-inner">
                   <div className={classNames("item-title", titleColor)}>{_props.children}</div>
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
    Option,
    Select
}
export default  Select;