import React  from 'react';
import ReactDOM from 'react-dom';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Modals from 'react-ui/modals'
import List from 'react-ui/lists'


import peopleImg88_1 from '../../resources/img/people-88x88-1.jpg';
import peopleImg88_2 from '../../resources/img/people-88x88-1.jpg';
import peopleImg88_3 from '../../resources/img/people-88x88-1.jpg';

import peopleImg160_1 from '../../resources/img/people-160x160-1.jpg';
import peopleImg160_2 from '../../resources/img/people-160x160-2.jpg';
import peopleImg160_3 from '../../resources/img/people-160x160-3.jpg';

import fashionImg4 from '../../resources/img/fashion-88x88-4.jpg';
import fashionImg5 from '../../resources/img/fashion-88x88-5.jpg';
import fashionImg6 from '../../resources/img/fashion-88x88-6.jpg';

class MediaListsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }

  handleOpenMusicPopover(e) {
    e.preventDefault()
    var modal = Modals.popover(e.target)
     
    
    let PopoverBody = () => (
       
      <div className="list-block media-list">
        <ul>
          <li><a href="#" className="item-link item-content">
              <div className="item-media"><img src={peopleImg88_1} width="44"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">Yellow Submarine</div>
                </div>
                <div className="item-subtitle">Beatles</div>
              </div></a></li>
          <li><a href="#" className="item-link item-content">
              <div className="item-media"><img src={peopleImg88_2} width="44"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">Don't Stop Me Now</div>
                </div>
                <div className="item-subtitle">Queen</div>
              </div></a></li>
          <li><a href="#" className="item-link item-content">
              <div className="item-media"><img src={peopleImg88_3} width="44"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">Billie Jean</div>
                </div>
                <div className="item-subtitle">Michael Jackson</div>
              </div></a></li>
        </ul>
      </div>
    )
    
    ReactDOM.render(<PopoverBody/>, modal.querySelector('.popover-inner'));
    modal.sizePopover()
    
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <div className="content-block">
          <p>Media Lists are almost the same as Data Lists, but with a more flexible layout for visualization of more complex data, like products, services, userc, etc. You can even use them in 
            <a onClick={this.handleOpenMusicPopover.bind(this)} className="open-popover">popovers</a>
          </p>
        </div>
        <div className="content-block-title">Songs</div>
        <div className="list-block media-list">
          <ul>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><img src={peopleImg160_1} width="80" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Yellow Submarine</div>
                    <div className="item-after">$15</div>
                  </div>
                  <div className="item-subtitle">Beatles</div>
                  <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><img src={peopleImg160_2} width="80" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Don't Stop Me Now</div>
                    <div className="item-after">$22</div>
                  </div>
                  <div className="item-subtitle">Queen</div>
                  <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><img src={peopleImg160_3} width="80" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Billie Jean</div>
                    <div className="item-after">$16</div>
                  </div>
                  <div className="item-subtitle">Michael Jackson</div>
                  <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Mail App (With Swipe to delete and overswipes)</div>
        <div className="list-block media-list">
          <ul>
            <li className="swipeout">
              <div className="swipeout-content">
                <a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">Facebook</div>
                      <div className="item-after">17:14</div>
                    </div>
                    <div className="item-subtitle">New messages from John Doe</div>
                    <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                  </div>
                </a>
              </div>
              <div className="swipeout-actions-left"><a href="#" className="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a href="#" className="demo-actions">More</a><a href="#" className="demo-mark bg-orange">Mark</a><a href="#" data-confirm="Are you sure you want to delete this item?" className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="swipeout-content">
                <a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">John Doe (via Twitter)</div>
                      <div className="item-after">17:11</div>
                    </div>
                    <div className="item-subtitle">John Doe (@_johndoe) mentioned you on Twitter!</div>
                    <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                  </div>
                </a>
              </div>
              <div className="swipeout-actions-left"><a href="#" className="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a href="#" className="demo-actions">More</a><a href="#" className="demo-mark bg-orange">Mark</a><a href="#" data-confirm="Are you sure you want to delete this item?" className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="swipeout-content">
                <a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">Facebook</div>
                      <div className="item-after">16:48</div>
                    </div>
                    <div className="item-subtitle">New messages from John Doe</div>
                    <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                  </div>
                </a>
              </div>
              <div className="swipeout-actions-left"><a href="#" className="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a href="#" className="demo-actions">More</a><a href="#" className="demo-mark bg-orange">Mark</a><a href="#" data-confirm="Are you sure you want to delete this item?" className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="swipeout-content">
                <a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">John Doe (via Twitter)</div>
                      <div className="item-after">15:32</div>
                    </div>
                    <div className="item-subtitle">John Doe (@_johndoe) mentioned you on Twitter!</div>
                    <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                  </div>
                </a>
              </div>
              <div className="swipeout-actions-left"><a href="#" className="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a href="#" className="demo-actions">More</a><a href="#" className="demo-mark bg-orange">Mark</a><a href="#" data-confirm="Are you sure you want to delete this item?" className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Something more simple</div>
        <div className="list-block media-list">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-media"><img src={fashionImg4} width="44" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Yellow Submarine</div>
                  </div>
                  <div className="item-subtitle">Beatles</div>
                </div>
              </div>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><img src={fashionImg5} width="44" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Don't Stop Me Now</div>
                  </div>
                  <div className="item-subtitle">Queen</div>
                </div>
              </a>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><img src={fashionImg6} width="44" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Billie Jean</div>
                  </div>
                  <div className="item-subtitle">Michael Jackson</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Inset</div>
        <div className="list-block media-list inset">
          <ul>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><img src={fashionImg4} width="44" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Yellow Submarine</div>
                  </div>
                  <div className="item-subtitle">Beatles</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><img src={fashionImg5} width="44" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Don't Stop Me Now</div>
                  </div>
                  <div className="item-subtitle">Queen</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><img src={fashionImg6} width="44" /></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">Billie Jean</div>
                  </div>
                  <div className="item-subtitle">Michael Jackson</div>
                </div>
              </a>
            </li>
          </ul>
        </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = MediaListsPage
