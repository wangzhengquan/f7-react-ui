import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List, ContentBlockTitle, ItemDivider, ListGroupTitle} from 'react-ui/lists'

require('react-ui/resources/less/content-block.less')
require('react-ui/resources/less/forms.less')
class AboutPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   

  
  render(){
    return (
    <div className={classNames( "page", this.props.className)}>
      <div className="page-content">
        <div className="content-block-title">Welcome To ReactUI</div>
        <div className="content-block"><Link to="about.html" className="button">About ReactUI</Link></div>
        <div className="content-block-title">ReactUI Kitchen Sink</div>
        <List>
          <Link to="accordion.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Accordion</div>
              </div>
            </div>
          </Link>
          <Link to="autocomplete.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Autocomplete</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="calendar.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Calendar / Datepicker</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="cards.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Cards</div>
              </div>
            </div>
          </Link>
          <Link to="contacts.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Contacts List</div>
              </div>
            </div>
          </Link>
          <Link to="forms.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Forms</div>
              </div>
            </div>
          </Link>
          <Link to="grid.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Grid</div>
              </div>
            </div>
          </Link>
          <Link to="infinite-scroll.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Infinite Scroll</div>
              </div>
            </div>
          </Link>
          <Link to="lazy-load.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Lazy Load Images</div>
              </div>
            </div>
          </Link>
          <Link to="list-view.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">List View</div>
              </div>
            </div>
          </Link>
          <Link to="login-screen.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Login Screen</div>
              </div>
            </div>
          </Link>
          <Link to="media-lists.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Media Lists</div>
              </div>
            </div>
          </Link>
          <Link to="messages.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Messages</div>
              </div>
            </div>
          </Link>
          <Link to="modals" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Modals</div>
              </div>
            </div>
          </Link>
          <Link to="bars.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Navbars And Toolbars</div>
              </div>
            </div>
          </Link>
          <Link to="notifications.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Notifications</div>
              </div>
            </div>
          </Link>
          <Link to="photo-browser.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Photo Browser</div>
              </div>
            </div>
          </Link>
          <Link to="picker.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Picker</div>
              </div>
            </div>
          </Link>
          <Link to="popover" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Popover</div>
              </div>
            </div>
          </Link>
          <Link to="preloader.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Preloader</div>
              </div>
            </div>
          </Link>
          <Link to="progressbar.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Progress Bar</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="pull-to-refresh.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Pull To Refresh</div>
              </div>
            </div>
          </Link>
          <Link to="searchbar.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Search Bar </div>
              </div>
            </div>
          </Link>
          <Link to="panels.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Side Panels</div>
              </div>
            </div>
          </Link>
          <Link to="sortable-list.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Sortable List</div>
              </div>
            </div>
          </Link>
          <Link to="swipe-delete.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Swipe To Delete</div>
              </div>
            </div>
          </Link>
          <Link to="swiper.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Swiper Slider</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="tabs" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Tabs</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="virtual-list.html" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Virtual List</div>
              </div>
            </div>
          </Link>
        </List>
      </div>
    </div>
    );
  }
  
}

module.exports = AboutPage
