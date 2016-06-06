
import React  from 'react';
var classNames = require('classnames');

require('./resources/less/searchbar.less');

class Searchbar extends React.Component{
	

  constructor(props) {
    super(props);
    this.state = {
    	value: ''
    }
    
  }
	  
  handleChange(event) {
  	// console.log(event)
   	this.setState({value: event.target.value})
   	this.props.onChange && this.props.onChange(event)
  }

  onSubmit(event) {
  	event.preventDefault()
  	this.state.value !== '' && this.props.onSubmit && this.props.onSubmit(this.state.value)
  }

  handleClear(event) {
    event.preventDefault()
    this.setState ({value: ''})
  }

  render() {
  	return (
	  <form onSubmit={this.onSubmit.bind(this)}
	  	className={classNames("searchbar searchbar-init", this.props.className, {'searchbar-not-empty': (this.state.value !== '')})} >
	    <div className="searchbar-input">
	      <input type="search" value={this.state.value} placeholder={this.props.placeholder} onChange={this.handleChange.bind(this)}/>
	      <a href="#" onClick={this.handleClear.bind(this)} className="searchbar-clear"></a>
	    </div>
	    <a href="#" className="searchbar-cancel">Cancel</a>
	  </form>
	)
  }
}

Searchbar.propTypes = {
	placeholder: React.PropTypes.string.isRequired,
}
Searchbar.defaultProps = {
	placeholder: '搜索'
}

export default Searchbar