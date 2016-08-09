import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Swiper from 'react-ui/swiper'

class SwiperPaginationProgressPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
    let slider = new Swiper(this.refs.slider, {pagination:'.swiper-pagination', paginationType: 'progress'})
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <div ref="slider"  className="swiper-container swiper-init ks-demo-slider">
          <div className="swiper-pagination"></div>
          <div className="swiper-wrapper">
            <div className="swiper-slide">Slide 1</div>
            <div className="swiper-slide">Slide 2</div>
            <div className="swiper-slide">Slide 3</div>
            <div className="swiper-slide">Slide 4</div>
            <div className="swiper-slide">Slide 5</div>
            <div className="swiper-slide">Slide 6</div>
            <div className="swiper-slide">Slide 7</div>
            <div className="swiper-slide">Slide 8</div>
            <div className="swiper-slide">Slide 9</div>
            <div className="swiper-slide">Slide 10</div>
          </div>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = SwiperPaginationProgressPage
