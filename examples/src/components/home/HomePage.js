import React  from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List} from 'react-ui/lists'
import Views from 'react-ui/views'
import Panels from 'react-ui/panels'
import LeftPanelContent from '../panels/LeftPanel'
require('react-ui/resources/less/content-block.less')
require('react-ui/resources/less/forms.less')

class AboutPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.dynamicPageIndex = 0;
  }

  generatePage(){
    var mainView = window.mainView = window.mainView || Views.addView('.view-main', {
        // Enable Dynamic Navbar for this view
        dynamicNavbar: true
    });
    var dynamicPageIndex = this.dynamicPageIndex
    mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner" data-page="dynamic-content-' + dynamicPageIndex + '" >' +
        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + dynamicPageIndex + '</div>' +
        '    <div class="right"><a href="#" class="open-panel open-left-panel link icon-only"><i class="icon icon-bars"></i></a></div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content-' + dynamicPageIndex + '" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + dynamicPageIndex + ' !</p>' +
        '          <p>Go <a href="#" class="back-home">back to home</a> or go '+
        '            <a href="#" class="back-first">back to first</a> or generate '+
        '            <a href="#" class="ks-generate-page">one more page</a>.'+
        '          </p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );

     dynamicPageIndex++;
     this.dynamicPageIndex= dynamicPageIndex
  }

  componentDidMount(){
    super.componentDidMount();
    var me = this;
    
    function createContentPage(event) {
      event.preventDefault();
      me.generatePage()
    }

    function backToFirst(e){
      e.preventDefault()
      me.dynamicPageIndex = 1;
      window.mainView.router.back({
          force: true,
          pageName: 'dynamic-content-0'
      });
    }

    function backToHome(e){
      e.preventDefault()
      me.dynamicPageIndex = 0
      window.mainView.router.back({
          force: true,
          pageName: me.props.pageName
      });
    }

    $(document).on('click', '.back-home', backToHome);
    $(document).on('click', '.back-first', backToFirst);
    $(document).on('click', '.ks-generate-page', createContentPage);


    function handleClickOpenLeftPanel(event){
      event.preventDefault()
       //panel-reveal
      var panel = Panels.openPanel({position: 'left', className: 'layout-dark'})
      var close = () => {
        Panels.closePanel(panel)
      }
      ReactDOM.render(<LeftPanelContent close={close}/>, panel)
    }

    $(document).on('click', '.open-left-panel', handleClickOpenLeftPanel);
  }

  render(){
    return (
    <div className={classNames('page', this.props.className)} data-page={this.props.pageName}>
      <div className="page-content">
        <div className="content-block-title">Welcome To ReactUI</div>
        <div className="content-block"><Link to="about.html" className="button">About ReactUI</Link></div>
        <div className="content-block-title">ReactUI Kitchen Sink</div>
        <List>
          <Link to="accordion" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Accordion</div>
              </div>
            </div>
          </Link>
          <Link to="autocomplete" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Autocomplete</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="calendar" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Calendar / Datepicker</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="cards" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Cards</div>
              </div>
            </div>
          </Link>
          <Link to="contacts" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Contacts List</div>
              </div>
            </div>
          </Link>
          <Link to="forms" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Forms</div>
              </div>
            </div>
          </Link>
          <Link to="grid" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Grid</div>
              </div>
            </div>
          </Link>
          <Link to="infinite-scroll" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Infinite Scroll</div>
              </div>
            </div>
          </Link>
          <Link to="lazy-load" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Lazy Load Images</div>
              </div>
            </div>
          </Link>
          <Link to="list-view" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">List View</div>
              </div>
            </div>
          </Link>
          <Link to="login-screen" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Login Screen</div>
              </div>
            </div>
          </Link>
          <Link to="media-lists" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Media Lists</div>
              </div>
            </div>
          </Link>
          <Link to="messages" className="item-link">
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
          <Link to="bars" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Navbars And Toolbars</div>
              </div>
            </div>
          </Link>
          <Link to="notifications" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Notifications</div>
              </div>
            </div>
          </Link>
          <Link to="photo-browser" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Photo Browser</div>
              </div>
            </div>
          </Link>
          <Link to="picker" className="item-link">
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
          <Link to="preloader" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Preloader</div>
              </div>
            </div>
          </Link>
          <Link to="progressbar" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Progress Bar</div>
                <div className="item-after"><span className="badge bg-green">NEW</span></div>
              </div>
            </div>
          </Link>
          <Link to="pull-to-refresh" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Pull To Refresh</div>
              </div>
            </div>
          </Link>
          <Link to="searchbar" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Search Bar </div>
              </div>
            </div>
          </Link>
          <Link to="panels" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Side Panels</div>
              </div>
            </div>
          </Link>
          <Link to="sortable-list" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Sortable List</div>
              </div>
            </div>
          </Link>
          <Link to="swipe-delete" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Swipe To Delete</div>
              </div>
            </div>
          </Link>
          <Link to="swiper" className="item-link">
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
          <Link to="virtual-list" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Virtual List</div>
              </div>
            </div>
          </Link>
          <Link to="spinners" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Spinners</div>
              </div>
            </div>
          </Link>
          <Link to="clip-image" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Clip Image</div>
              </div>
            </div>
          </Link>
          <Link to="animation-items" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Animation Items</div>
              </div>
            </div>
          </Link>

          <Link to="editor" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Editor</div>
              </div>
            </div>
          </Link>


        </List>

        <List>
          <Link to="color-themes" className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Color Themes</div>
              </div>
            </div>
          </Link>
        
          <a href="#" onClick={this.handleClickGeneratedContent.bind(this)}  className="item-link">
            <div className="item-content">
              <div className="item-media"><i className="icon icon-f7"></i></div>
              <div className="item-inner">
                <div className="item-title">Dynamically Generated Content</div>
              </div>
            </div>
          </a>
        </List>

      </div>
    </div>
    );
  }

  handleClickGeneratedContent(e){
    e.preventDefault()
    this.generatePage()
  }
  
}

module.exports = AboutPage
