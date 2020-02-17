import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import PhotoBrowser from 'react-ui/photo-browser'
require('react-ui/resources/less/forms.less')
require('react-ui/resources/less/grid.less')

var photoBrowserPhotos = [
  {
    url: require('../../resources/img/beach.jpg'),
    caption: 'Amazing beach in Goa, India'
  },
  require('../../resources/img/placekitten-1024x1024.jpg'),
  require('../../resources/img/lock.jpg'),
  {
      url: require('../../resources/img/monkey.jpg'),
      caption: 'I met this monkey in Chinese mountains'
  },
  {
      url: require('../../resources/img/mountains.jpg'),
      caption: 'Beautiful mountains in Zhangjiajie, China'
  }

];
class PhotoBrowserPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  

  showPhotoBrowserStandalone(event){
    event.preventDefault()
    PhotoBrowser.photoBrowser({
        photos: photoBrowserPhotos,
        backLinkText: '关闭'
    }).open()
  }

  showPhotoBrowserPopup(event){
    event.preventDefault()
    PhotoBrowser.photoBrowser({
        photos: photoBrowserPhotos,
        type: 'popup'
    }).open()
  }

  showPhotoBrowserPage(event){
    event.preventDefault()
    PhotoBrowser.photoBrowser({
        photos: photoBrowserPhotos,
        type: 'page',
        backLinkText: 'Back'
    }).open()
  }

  showPhotoBrowserDark(event){
    event.preventDefault()
    PhotoBrowser.photoBrowser({
        photos: photoBrowserPhotos,
        theme: 'dark'
    }).open();
  }

  showPhotoBrowserPopupDark(event){
    event.preventDefault()
    PhotoBrowser.photoBrowser({
        photos: photoBrowserPhotos,
        theme: 'dark',
        type: 'popup'
    }).open();
  }


  showPhotoBrowserLazy(event){
    event.preventDefault()
    PhotoBrowser.photoBrowser({
      photos: photoBrowserPhotos,
      lazyLoading: true,
      theme: 'dark'
    }).open()
  }
  
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <div className="content-block">
          <p>Photo Browser is a standalone and highly configurable component that allows to open window with photo viewer and navigation elements with the following features:</p>
          <ul>
            <li>Swiper between photos</li>
            <li>Multi-gestures support for zooming</li>
            <li>Toggle zoom by double tap on photo</li>
            <li>Single click on photo to toggle Exposition mode</li>
          </ul>
          <p>Photo Browser could be opened in a three ways - as a Standalone component, in Popup, and as separate Page:</p>
          <div className="row">
            <div className="col-33"><a href="#" onClick={this.showPhotoBrowserStandalone.bind(this)} className="button ks-pb-standalone">Standalone</a></div>
            <div className="col-33"><a href="#" onClick={this.showPhotoBrowserPopup.bind(this)} className="button ks-pb-popup">Popup</a></div>
            <div className="col-33"><a href="#" onClick={this.showPhotoBrowserPage.bind(this)} className="button ks-pb-page">Page</a></div>
          </div>
        </div>
        <div className="content-block">
          <p>For Popup and Standalone types, Photo Browser suppots 2 default themes - default Light (like in previous examples) and Dark theme. Here is a Dark theme examples:</p>
          <div className="row">
            <div className="col-50"><a href="#" onClick={this.showPhotoBrowserDark.bind(this)} className="button ks-pb-standalone-dark">Standalone</a></div>
            <div className="col-50"><a href="#" onClick={this.showPhotoBrowserPopupDark.bind(this)} className="button ks-pb-popup-dark">Popup</a></div>
          </div>
        </div>
        <div className="content-block">
          <p>Photo Browser also supports lazy loading for passed images:</p>
          <p><a href="#" onClick={this.showPhotoBrowserLazy.bind(this)} className="button ks-pb-lazy">Lazy Loading Images</a></p>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = PhotoBrowserPage
