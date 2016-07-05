import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Modals from 'react-ui/modals'
require('react-ui/resources/less/grid.less')
require('react-ui/resources/less/forms.less')

class PreloaderPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  showIndicator(event) {
    event.preventDefault()
    Modals.showIndicator()
    // setTimeout(function () {
    //     Modals.hideIndicator();
    // }, 2000);
  }

   

  showPreloader(event){
    event.preventDefault()
    Modals.showPreloader();
    // setTimeout(function () {
    //     Modals.hidePreloader();
    // }, 2000);
  }

  showCustomPreloader(event){
    event.preventDefault()
    Modals.showPreloader('My text...');
    setTimeout(function () {
        Modals.hidePreloader();
    }, 2000);
  }

  render(){
    return (
    <div className={classnames( 'page', this.props.className)}>
      <div className="page-content">
        <div className="content-block">
          <p>How about an activity indicator? Framework 7 has a nice one. The F7 preloader is made with SVG and animated with CSS so it can be easily resized. Two options are available: the default is for light background and another one is for dark background. The HTML is pretty easy, just add a .preloader className to any element. For the dark background option, also add a .preloader-white className. Here are some examples:</p>
        </div>
        <div className="content-block row ks-preloaders">
          <div className="col-25">Default:
            <br/><span className="preloader"></span>
          </div>
          <div style={{backgroundColor: '#222', color:'#fff'}} className="col-25">White:
            <br/><span className="preloader preloader-white"></span></div>
          <div className="col-25">Big:
            <br/><span className="preloader ks-preloader-big"></span></div>
          <div style={{backgroundColor: '#222', color:'#fff'}} className="col-25">White:
            <br/><span className="preloader preloader-white ks-preloader-big"></span></div>
        </div>
        <div className="content-block">
          <p>With <b>Modals.showIndicator()</b> you can call small overlay with indicator:</p><a href="#" onClick={this.showIndicator.bind(this)} className="button demo-indicator">Open small indicator overlay</a>
          <p>With <b>Modals.showPreloader()</b> you can call modal window with preloader:</p><a href="#" onClick={this.showPreloader.bind(this)} className="button demo-preloader">Open preloader modal</a>
          <p>With <b>Modals.showPreloader('My text...')</b> you can call it with custom title:</p><a href="#" onClick={this.showCustomPreloader.bind(this)} className="button demo-preloader-custom">Open custom preloader</a>
        </div>
      </div>
    </div>
    )
  }
}

module.exports = PreloaderPage
