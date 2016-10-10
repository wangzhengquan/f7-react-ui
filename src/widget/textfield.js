import React  from 'react';
import classnames from 'classnames'
require('../resources/less/forms.less')
require('../resources/less/widget/textfield.less')

class TextField extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
      	value: this.props.value
      }
    }

    componentDidMount(){
      setTimeout(() => {this.refs.input.focus()}, 500)
    }

    handleChange(event){
    	var value = event.target.value;
    	this.setState({value: value});
    	this.props.onChange && this.props.onChange(value)
    	// setTimeout(() => console.log("area state value====", this.state.value), 1000 )
    }

    handleClear(event){
    	event.preventDefault()
    	this.setState({
    		value: ''
    	})
    }
     
    render(){
       return (
       	<div style={{marginTop: '10px'}}>
       		<div className={classnames('textfield', {'textfield-not-empty': !!this.state.value})} >
              <input type="text" ref="input" value={this.state.value} maxLength={this.props.maxLength} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder || ''}/>
              <a className="textfield-clear" onClick={this.handleClear.bind(this)}></a>
            </div> 
       	</div> 
       );

    }
}

export default TextField;