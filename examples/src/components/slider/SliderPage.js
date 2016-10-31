import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Slider from 'react-ui/widget/slider'
class SliderPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	         <Slider>
              <div style={{height: '300px'}}>panel-1</div>
              <div style={{height: '300px'}}>panel-2</div>
              <div style={{height: '300px'}}>panel-3</div>
           </Slider>
	    </div>
	  </div>
  	)
  }
}

module.exports = SliderPage
