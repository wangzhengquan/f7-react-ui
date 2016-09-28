import React  from 'react';
import {Link} from 'react-router'
import AnimationPage from '../Page'
import classnames from 'classnames';

class SwiperPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <div className="content-block">
          <p>Framework7 comes with powerful and most modern touch slider ever - <Link to="http://idangero.us/swiper" className="external" target="_blank">Swiper Slider</Link> with super flexible configuration and lot, lot of features. Just check the following demos:</p>
        </div>
        <div className="content-block-title">Swiper Examples</div>
        <div className="list-block">
          <ul>
            <li>
              <Link to="swiper-horizontal" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Swiper Horizontal</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-vertical" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Swiper Vertical</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-space-between" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Space Between Slides</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-multiple" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Multiple Per Page</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-nested" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Nested Swipers</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-loop" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Infinite Loop Mode</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-3d-cube" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">3D Cube Effect</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-3d-coverflow" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">3D Coverflow Effect</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-3d-flip" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">3D Flip Effect</div>
                  <div className="item-after"><span className="badge bg-green">NEW</span></div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-fade" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Fade Effect</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-scrollbar" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">With Scrollbar</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-gallery" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Two Way Control Gallery</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-custom" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Custom Controls</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-parallax" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Parallax</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-lazy" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Lazy Loading</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-pagination-progress" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Progress Pagination</div>
                  <div className="item-after"><span className="badge bg-green">NEW</span></div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="swiper-pagination-fraction" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Fraction Pagination</div>
                  <div className="item-after"><span className="badge bg-green">NEW</span></div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
  
	    </div>
	  </div>
  	)
  }
}

module.exports = SwiperPage
