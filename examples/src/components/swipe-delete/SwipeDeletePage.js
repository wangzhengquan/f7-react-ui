import React  from 'react';
import SwipeOut from 'react-ui/swipeout'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import MessageBox from 'react-ui/message-box'
import ActionSheet from 'react-ui/action-sheet'
require('react-ui/resources/less/lists.less')
class SwipeDeletePage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
    SwipeOut.initSwipeout()
  }

  handleClickDeleteBtn(e){
    e.preventDefault()
    var clicked = $(e.target)
    MessageBox.confirm('Are you sure you want to delete this item?', '', function(){
       SwipeOut.swipeoutDelete(clicked.parents('.swipeout'));
    }, function(){
      SwipeOut.swipeoutClose(clicked.parents('.swipeout'));
    })

  }

  handleClickDeleteWithOutConfirmBtn(e){
    e.preventDefault()
    SwipeOut.swipeoutDelete($(e.target).parents('.swipeout'));
  }

  handleClickCallbackDeleteBtn(e){
    e.preventDefault()
    var clicked = $(e.target)
    var swipeoutEl = clicked.parents('.swipeout')
    swipeoutEl.on('deleted', function () {
        MessageBox.alert('Thanks, item removed!');
    });
    SwipeOut.swipeoutDelete(swipeoutEl);
  }

  handleClickMoreBtn(e){
    e.preventDefault()
    var actionSheetButtons = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Here comes some optional description or warning for actions below',
                label: true
            },
            // First button
            {
                text: 'Alert',
                onClick: function () {
                    MessageBox.alert('He Hoou!');
                }
            },
            // Another red button
            {
                text: 'Nice Red Button ',
                color: 'red',
                onClick: function () {
                    MessageBox.alert('You have clicked red button!');
                }
            }
        ],
        // Second group
        [
            {
                text: 'Cancel',
                bold: true
            }
        ]
    ];

    ActionSheet.open(actionSheetButtons);
   
  }

  handleClickReplyBtn(e){
    e.preventDefault()
    MessageBox.alert('Reply');
  }

  handleClickForwardBtn(e){
    e.preventDefault()
    MessageBox.alert('Forward');
  }

  handleClickMarkBtn(e){
    e.preventDefault()
    MessageBox.alert('Mark');
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
  	    <div className="content-block">
          <p>Swipe out actions on list elements is one of the most awesome F7 features. It allows you to call hidden menu for each list element where you can put default ready-to use delete button or any other buttons for some required actions. </p>
        </div>
        <div className="content-block-title">Swipe to delete with confirm modal</div>
        <div className="list-block">
          <ul>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swipe left on me please</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a href="#" onClick={this.handleClickDeleteBtn.bind(this)}  className="swipeout-delete">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swipe left on me too</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a href="#" onClick={this.handleClickDeleteBtn.bind(this)}  className="swipeout-delete">Delete</a></div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">I am not removable</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="content-block-title">Swipe to delete without confirm</div>
        <div className="list-block">
          <ul>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-inner">
                  <div className="item-title">Swipe left on me please</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickDeleteWithOutConfirmBtn.bind(this)} className="swipeout-delete">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-inner">
                  <div className="item-title">Swipe left on me too</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickDeleteWithOutConfirmBtn.bind(this)}  className="swipeout-delete">Delete</a></div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">I am not removable</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="content-block-title">Swipe for actions</div>
        <div className="list-block">
          <ul>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swipe left on me please</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickMoreBtn.bind(this)} className="demo-actions">More</a><a onClick={this.handleClickDeleteWithOutConfirmBtn.bind(this)}  className="swipeout-delete">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swipe left on me too</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickMoreBtn.bind(this)} className="demo-actions">More</a><a onClick={this.handleClickDeleteWithOutConfirmBtn.bind(this)}  className="swipeout-delete">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">You can't delete me</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickMoreBtn.bind(this)} className="demo-actions">More</a></div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">With callback on remove</div>
        <div className="list-block">
          <ul>
            <li className="swipeout demo-remove-callback">
              <div className="item-content swipeout-content">
                <div className="item-inner">
                  <div className="item-title">Swipe left on me please</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickCallbackDeleteBtn.bind(this)} className="swipeout-delete">Delete</a></div>
            </li>
            <li className="swipeout demo-remove-callback">
              <div className="item-content swipeout-content">
                <div className="item-inner">
                  <div className="item-title">Swipe left on me too</div>
                </div>
              </div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickCallbackDeleteBtn.bind(this)} className="swipeout-delete">Delete</a></div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">I am not removable</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">With actions on left side (swipe to right)</div>
        <div className="list-block">
          <ul>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swipe right on me please</div>
                </div>
              </div>
              <div className="swipeout-actions-left"><a onClick={this.handleClickReplyBtn.bind(this)} className="bg-green demo-reply">Reply</a><a onClick={this.handleClickForwardBtn.bind(this)} className="bg-blue demo-forward">Forward</a></div>
            </li>
            <li className="swipeout">
              <div className="item-content swipeout-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swipe right on me too</div>
                </div>
              </div>
              <div className="swipeout-actions-left"><a onClick={this.handleClickReplyBtn.bind(this)} className="bg-green demo-reply">Reply</a><a onClick={this.handleClickForwardBtn.bind(this)} className="bg-blue demo-forward">Forward</a></div>
            </li>
          </ul>
        </div>

        <div className="content-block-title">On both sides with overswipes</div>
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
              <div className="swipeout-actions-left"><a onClick={this.handleClickReplyBtn.bind(this)} className="bg-green swipeout-overswipe demo-reply">Reply</a><a onClick={this.handleClickForwardBtn.bind(this)} className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickMoreBtn.bind(this)} className="demo-actions">More</a><a onClick={this.handleClickMarkBtn.bind(this)} className="demo-mark bg-orange">Mark</a><a onClick={this.handleClickDeleteBtn.bind(this)} className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="swipeout-content"><a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">John Doe (via Twitter)</div>
                      <div className="item-after">17:11</div>
                    </div>
                    <div className="item-subtitle">John Doe (@_johndoe) mentioned you on Twitter!</div>
                    <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                  </div></a></div>
              <div className="swipeout-actions-left"><a onClick={this.handleClickReplyBtn.bind(this)} className="bg-green swipeout-overswipe demo-reply">Reply</a><a onClick={this.handleClickForwardBtn.bind(this)} className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickMoreBtn.bind(this)} className="demo-actions">More</a><a onClick={this.handleClickMarkBtn.bind(this)} className="demo-mark bg-orange">Mark</a><a onClick={this.handleClickDeleteBtn.bind(this)} className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="swipeout-content"><a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">Facebook</div>
                      <div className="item-after">16:48</div>
                    </div>
                    <div className="item-subtitle">New messages from John Doe</div>
                    <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                  </div></a></div>
              <div className="swipeout-actions-left"><a onClick={this.handleClickReplyBtn.bind(this)} className="bg-green swipeout-overswipe demo-reply">Reply</a><a onClick={this.handleClickForwardBtn.bind(this)} className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickMoreBtn.bind(this)} className="demo-actions">More</a><a onClick={this.handleClickMarkBtn.bind(this)} className="demo-mark bg-orange">Mark</a><a onClick={this.handleClickDeleteBtn.bind(this)} className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
            <li className="swipeout">
              <div className="swipeout-content"><a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">John Doe (via Twitter)</div>
                      <div className="item-after">15:32</div>
                    </div>
                    <div className="item-subtitle">John Doe (@_johndoe) mentioned you on Twitter!</div>
                    <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                  </div></a></div>
              <div className="swipeout-actions-left"><a href="#" className="bg-green swipeout-overswipe demo-reply">Reply</a><a onClick={this.handleClickForwardBtn.bind(this)} className="demo-forward bg-blue">Forward</a></div>
              <div className="swipeout-actions-right"><a onClick={this.handleClickMoreBtn.bind(this)} className="demo-actions">More</a><a onClick={this.handleClickMarkBtn.bind(this)} className="demo-mark bg-orange">Mark</a><a onClick={this.handleClickDeleteBtn.bind(this)} className="swipeout-delete swipeout-overswipe">Delete</a></div>
            </li>
          </ul>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = SwipeDeletePage
