import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Notifications from 'react-ui/notifications'

require('react-ui/resources/less/forms.less')
class NotificationsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  notificationSimple(e){
    e.preventDefault()
    Notifications.addNotification({
        title: 'Framework7',
        message: 'This is a simple notification message with title and message',
        hold: 2000
    });
  }

  notificationFull(e){
    e.preventDefault()
    Notifications.addNotification({
        title: 'Framework7',
        subtitle: 'Notification subtitle',
        message: 'This is a simple notification message with custom icon and subtitle',
        media: '<i class="icon icon-f7"></i>'
    });
  }

  notificationCustom(e){
    e.preventDefault()
    Notifications.addNotification({
        title: 'My Awesome App',
        subtitle: 'New message from John Doe',
        message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
        media: '<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">'
    });
  }

  notificationCallback(e){
    e.preventDefault()
    Notifications.addNotification({
        title: 'My Awesome App',
        subtitle: 'New message from John Doe',
        message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
        media: '<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">',
        onClose: function () {
          alert('Notification closed');
        }
    });
  }
  
  render(){
  	return (
  	<div className={classnames('page', this.props.className)}>
	    <div className="page-content">
        <div className="content-block">
          <p>Framework7 comes with simple Notifications component that allows you to show some useful messages to user.</p>
          <p><a onClick={this.notificationSimple.bind(this)} className="button ks-notification-simple">Default notification</a></p>
          <p><a onClick={this.notificationFull.bind(this)} className="button ks-notification-full">Full-layout notification</a></p>
          <p><a onClick={this.notificationCustom.bind(this)} className="button ks-notification-custom">With custom image</a></p>
          <p><a onClick={this.notificationCallback.bind(this)} className="button ks-notification-callback">With callback on close</a></p>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = NotificationsPage
