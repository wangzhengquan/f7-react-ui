import React  from 'react';
import ReactDOM from 'react-dom'
import PARAMS from 'react-ui/params';
import Device from 'react-ui/device'
import $ from 'react-ui/dom'

var classnames = require('classnames');

require('./resources/less/searchbar.less');
 var cancelMarginProp = 'margin-right';
class Searchbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    	value: '',
      searchbarActive: false
    }
    this.cancelButtonHasMargin = false;
    this.destroyList = []

  }

  componentWillUnmount(){
    this.destroy()
  }

  componentDidMount(){

    this.container = $(ReactDOM.findDOMNode(this));
    this.pageContainer = this.container.parents('.page').eq(0);
    if(this.pageContainer.length === 0){
      this.pageContainer = $(this.container.parents('.navbar-inner').eq(0)[0].f7RelatedPage);
    }
    this.cancelButton =  this.container.find('.searchbar-cancel');
    this.input = this.container.find('input[type="search"]');
    this.overlay = this.pageContainer.length > 0 ? this.pageContainer.find('.searchbar-overlay') : $('.searchbar-overlay');
    if(this.props.overlay && this.overlay.length === 0 && this.pageContainer.length > 0){

      this.pageContainer.append('<div class="searchbar-overlay"></div>')
      this.overlay = this.pageContainer.find('.searchbar-overlay') ;
    }
    if(this.overlay.length > 0){
      this.overlay.on('click', this.disable.bind(this));
      this.destroyList.push( () => {
        this.overlay.off('click')
      })
    }

   
  }
	  
  destroy(){
    this.destroyList.forEach((fun) => {
      fun()
    })
  }
  

  onSubmit(event) {
  	event.preventDefault()
  	this.state.value !== '' && this.props.onSubmit && this.props.onSubmit(this.state.value)
  }

  

  setCancelButtonMargin () {
    var cancelButton = this.cancelButton ;
    cancelButton.transition(0).show();
    cancelButton.css(cancelMarginProp, -cancelButton[0].offsetWidth + 'px');
    var clientLeft = cancelButton[0].clientLeft;
    cancelButton.transition('');
    this.cancelButtonHasMargin = true;
  }
  onFocus(e){
     this.props.onFocus &&  this.props.onFocus(e)
     this.enable(e)
  }
  enable (e) {
      
       var _enable = () => {
          if (!this.state.searchbarActive ){
            this.setState({
              active: true
            });
            this.overlay.length > 0 && this.overlay.addClass('searchbar-overlay-active');
          }
          
          if (this.props.cancelButton  && !PARAMS.material) {
              if (!this.cancelButtonHasMargin) {
                  this.setCancelButtonMargin();
              }
              this.cancelButton.css(cancelMarginProp, '0px');
          }
          this.props.enableSearch && this.props.enableSearch()
          this.props.onEnable && this.props.onEnable()
      }
      if (Device.ios && !PARAMS.material && e && e.type === 'focus') {
          setTimeout(function () {
              _enable();
          }, 400);
      }
      else {
          _enable();
      }
  }

  disable () {
    var s = this;
    var oldValue = this.state.value
    var newValue = ''
    this.setState ({value: newValue})
    this.props.onChange && this.props.onChange(newValue, oldValue)
    this.setState({
      active: false
    })
    if (s.cancelButton.length > 0 && !PARAMS.material) s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');

    s.overlay.length > 0  && s.overlay.removeClass('searchbar-overlay-active');

    var _disable = () => {
        s.input.blur();
    }
    if (Device.ios) {
        setTimeout(function () {
            _disable();
        }, 400);
    }
    else {
        _disable();
    }
    this.props.onDisable && this.props.onDisable()
  }

  handleCancel(e){
    e.preventDefault()
    this.disable()
    this.props.onCancel && this.props.onCancel()
  }

  handleClear(event) {
    event.preventDefault()
    var oldValue = this.state.value
    var newValue = ''
    if(oldValue !== newValue){
      this.setState ({value: newValue})
      this.props.onChange && this.props.onChange(newValue, oldValue)
      this.props.onClear && this.props.onClear()
    }
   
  }

  handleChange(event) {
    // console.log(event)
    var oldValue = this.state.value;
    var newValue =  event.target.value;
    this.setState({value: newValue})
    this.props.onChange && this.props.onChange(newValue, oldValue)
  }

  render() {
  	return (
	  <form onSubmit={this.onSubmit.bind(this) }
	  	className={
        classnames(
          'searchbar', 
          this.props.className,
          {
            'searchbar-not-empty': (this.state.value !== ''),
            'searchbar-active': this.state.active
          }
        )
      } style={this.props.style}>
	    <div className="searchbar-input">
	      <input type="search" value={this.state.value} placeholder={this.props.placeholder} onFocus={this.onFocus.bind(this)} onChange={this.handleChange.bind(this)}/>
	      <a href="#" onClick={this.handleClear.bind(this)} className="searchbar-clear"></a>
	    </div>
	    {this.props.cancelButton ?  <a href="#" onClick={this.handleCancel.bind(this)} className="searchbar-cancel">取消</a> : ''}
	  </form>
	)
  }
}

Searchbar.propTypes = {
	placeholder: React.PropTypes.string.isRequired
}
Searchbar.defaultProps = {
	placeholder: '搜索',
  overlay: false,
  cancelButton: false
}

let SearchbarOverlay  = (props) => (
  <div className="searchbar-overlay"></div>
)

export{
  Searchbar,
  SearchbarOverlay

}

export default Searchbar