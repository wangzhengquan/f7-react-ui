import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import nature1Img from '../../resources/img/nature-1000x600-3.jpg';
import nature8Img from '../../resources/img/nature-1000x700-8.jpg';
import people6Img from '../../resources/img/people-1000x600-6.jpg';
import people1Img from '../../resources/img/people-68x68-1.jpg';

import fashion4Img from '../../resources/img/fashion-88x88-4.jpg';
import fashion5Img from '../../resources/img/fashion-88x88-5.jpg';
import fashion6Img from '../../resources/img/fashion-88x88-6.jpg';




require('react-ui/resources/less/cards.less');

class CardsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <div data-page="cards" className="page">
          <div className="page-content">
            <div className="content-block">
              <p>Cards, along with List View, is a one more great way to contain and orginize your information. Cards contains unique related data, for example, a photo, text, and link all about a single subject. Cards are typically an entry point to more complex and detailed information.</p>
            </div>
            <div className="content-block-title">Simple Cards</div>
            <div className="card">
              <div className="card-content">
                <div className="card-content-inner">This is simple card with plain text. But card could contain its own header, footer, list view, image, and any elements inside.</div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">Card header</div>
              <div className="card-content">
                <div className="card-content-inner">Card with header and footer. Card header is used to display card title and footer for some additional information or for custom actions.</div>
              </div>
              <div className="card-footer">Card Footer</div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-content-inner">Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. </div>
              </div>
            </div>
            <div className="content-block-title">Styled Cards</div>
            <div className="card ks-card-header-pic">
              <div style={{ backgroundImage: `url(${nature1Img})`, verticalAlign: 'bottom'}}   className="card-header color-white no-border">Journey To Mountains</div>
              <div className="card-content">
                <div className="card-content-inner">
                  <p className="color-gray">Posted on January 21, 2015</p>
                  <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
                </div>
              </div>
              <div className="card-footer"><a href="#" className="link">Like</a><a href="#" className="link">Read more</a></div>
            </div>
            <div className="card ks-card-header-pic">
              <div style={{backgroundImage:`url(${people6Img})`, verticalAlign: 'bottom'}}   className="card-header color-white no-border">Lorem Ipsum</div>
              <div className="card-content">
                <div className="card-content-inner">
                  <p className="color-gray">Posted on January 21, 2015</p>
                  <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
                </div>
              </div>
              <div className="card-footer"><a href="#" className="link">Like</a><a href="#" className="link">Read more</a></div>
            </div>
            <div className="content-block-title">Facebook Cards</div>
            <div className="card ks-facebook-card">
              <div className="card-header no-border">
                <div className="ks-facebook-avatar"><img src={people1Img} width="34" height="34"/></div>
                <div className="ks-facebook-name">John Doe</div>
                <div className="ks-facebook-date">Monday at 3:47 PM</div>
              </div>
              <div className="card-content"> <img src={nature8Img} width="100%"/></div>
              <div className="card-footer no-border"><a href="#" className="link">Like</a><a href="#" className="link">Comment</a><a href="#" className="link">Share</a></div>
            </div>
            <div className="card ks-facebook-card">
              <div className="card-header">
                <div className="ks-facebook-avatar"><img src={people1Img} width="34" height="34"/></div>
                <div className="ks-facebook-name">John Doe</div>
                <div className="ks-facebook-date">Monday at 2:15 PM</div>
              </div>
              <div className="card-content"> 
                <div className="card-content-inner">
                  <p>What a nice photo i took yesterday!</p><img src="http://lorempixel.com/1000/700/nature/8/" width="100%"/>
                  <p className="color-gray">Likes: 112 &nbsp;&nbsp; Comments: 43</p>
                </div>
              </div>
              <div className="card-footer"><a href="#" className="link">Like</a><a href="#" className="link">Comment</a><a href="#" className="link">Share</a></div>
            </div>
            <div className="content-block-title">Cards With List View</div>
            <div className="card">
              <div className="card-content"> 
                <div className="list-block">
                  <ul>
                    <li><a href="#" className="item-link item-content">
                        <div className="item-media"><i className="icon icon-f7"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Link 1</div>
                        </div></a></li>
                    <li><a href="#" className="item-link item-content">
                        <div className="item-media"><i className="icon icon-f7"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Link 2</div>
                        </div></a></li>
                    <li><a href="#" className="item-link item-content">
                        <div className="item-media"><i className="icon icon-f7"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Link 3</div>
                        </div></a></li>
                    <li><a href="#" className="item-link item-content">
                        <div className="item-media"><i className="icon icon-f7"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Link 4</div>
                        </div></a></li>
                    <li><a href="#" className="item-link item-content">
                        <div className="item-media"><i className="icon icon-f7"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Link 5</div>
                        </div></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">New Releases:</div>
              <div className="card-content"> 
                <div className="list-block media-list">
                  <ul>
                    <li className="item-content">
                      <div className="item-media"><img src={fashion4Img} width="44"/></div>
                      <div className="item-inner">
                        <div className="item-title-row">
                          <div className="item-title">Yellow Submarine</div>
                        </div>
                        <div className="item-subtitle">Beatles</div>
                      </div>
                    </li>
                    <li className="item-content">
                      <div className="item-media"><img src={fashion5Img} width="44"/></div>
                      <div className="item-inner">
                        <div className="item-title-row">
                          <div className="item-title">Don't Stop Me Now</div>
                        </div>
                        <div className="item-subtitle">Queen</div>
                      </div>
                    </li>
                    <li className="item-content">
                      <div className="item-media"><img src={fashion6Img} width="44"/></div>
                      <div className="item-inner">
                        <div className="item-title-row">
                          <div className="item-title">Billie Jean</div>
                        </div>
                        <div className="item-subtitle">Michael Jackson</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-footer"> <span>January 20, 2015</span><span>5 comments</span></div>
            </div>
          </div>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = CardsPage
