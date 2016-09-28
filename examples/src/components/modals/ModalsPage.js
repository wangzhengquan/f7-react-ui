import React  from 'react';
import ReactDOM from 'react-dom';
import AnimationPage from '../Page'
import classNames from 'classnames';
import MessageBox from 'react-ui/message-box'
import ActionSheet from 'react-ui/action-sheet'
import Views from 'react-ui/views'
import Modals from 'react-ui/modals'
import Navbars from 'react-ui/navbars'
import $ from 'react-ui/dom'
require('react-ui/resources/less/content-block.less')

require('react-ui/resources/less/forms.less')
require('react-ui/resources/less/grid.less')

var dynamicPageIndex = 1;

class ModalPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   

  handleSlideInModalClick(event){
    event.preventDefault()

    var mainView = window.mainView = window.mainView || Views.addView('.view-main', {
        // Enable Dynamic Navbar for this view
        dynamicNavbar: true
    });
    this.destroyList.push(function(){
      mainView.destroy()
    })
    
    mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
  }

  handleAlertClick(event) {
    event.preventDefault()
    Modals.alert('Hello', 'ReactUI')
  }



  handleConfirmClick(event) {
    event.preventDefault()
    Modals.confirm('Are you feel good today?', 'ReactUI', function () {
        Modals.alert('Great!');
    })
  }

  handlePromptClick(event) {
    event.preventDefault()
    Modals.prompt('What is your name?', 'ReactUI', function (data) {
        // @data contains input value
        Modals.confirm('Are you sure that your name is ' + data + '?', function () {
            Modals.alert('Ok, your name is ' + data + ' ;)');
        });
    })
  }

  handleActionSheetClick(event) {
    event.preventDefault()
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

    ActionSheet.open(actionSheetButtons)
  }

  handleActionsPopoverClick(event) {
    event.preventDefault()
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
    ActionSheet.open(event.target, actionSheetButtons)
  }

  handleAlertsClick(event){
    event.preventDefault()
    Modals.alert('Alert 1');
    Modals.alert('Alert 2');
    Modals.alert('Alert 3');
    Modals.alert('Alert 4');
    Modals.alert('Alert 5');
  }

  handleCustomPickerClick(event) {
    event.preventDefault()
    let CustomPickerModalContent = (props) => (
      <span>
        <div className="toolbar">
          <div className="toolbar-inner">
            <div className="left"></div>
            <div className="right"><a href="#" onClick={props.onClose} className="link close-picker">Done</a></div>
          </div>
        </div>
        <div className="picker-modal-inner">
          <div className="content-block">
            <p>
              Integer mollis nulla id nibh elementum finibus. Maecenas eget fermentum ipsum. Sed sagittis condimentum nisl at tempus. Duis lacus libero, laoreet vitae ligula a, aliquet eleifend sapien. Nullam sodales viverra sodales. Nulla hendrerit condimentum dolor facilisis tempor. Donec at est malesuada, sagittis nisi et, accumsan enim.
            </p>
          </div>
        </div>
      </span>
    )


    var modal = Modals.pickerModal()
    var closeModal = (e) => {
        e.preventDefault()
        Modals.closeModal(modal)
    }
    ReactDOM.render(<CustomPickerModalContent onClose={closeModal}/>, modal)
  }

  handlePopupClick(event) {
    event.preventDefault()
    let PopupView = (props) => (
      <div className="view">

        <div className="navbar">
          <div className="navbar-inner">
            <div className="center">Popup Title</div>
            <div className="right"><a href="#" onClick={props.onClose} className="link close-popup">Done</a></div>
          </div>
        </div>

        <div className="pages">
          <div className="page navbar-through">
            <div className="page-content">
              <div className="content-block">
                <p>Here comes popup. You can put here anything, even independent view with its own navigation. Also not, that by default popup looks a bit different on iPhone/iPod and iPad, on iPhone it is fullscreen.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
                <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
                <p>Morbi posuere ipsum nisl, accumsan tincidunt nibh lobortis sit amet. Proin felis lorem, dictum vel nulla quis, lobortis dignissim nunc. Pellentesque dapibus urna ut imperdiet mattis. Proin purus diam, accumsan ut mollis ac, vulputate nec metus. Etiam at risus neque. Fusce tincidunt, risus in faucibus lobortis, diam mi blandit nunc, quis molestie dolor tellus ac enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum turpis a velit vestibulum pharetra. Vivamus blandit dapibus cursus. Aenean lorem augue, vehicula in eleifend ut, imperdiet quis felis.</p>
                <p>Duis non erat vel lacus consectetur ultricies. Sed non velit dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel varius mi, a tristique ante. Vivamus eget nibh ac elit tempor bibendum sit amet vitae velit. Proin sit amet dapibus nunc, non porta tellus. Fusce interdum vulputate imperdiet. Sed faucibus metus at pharetra fringilla. Fusce mattis orci et massa congue, eget dapibus ante rhoncus. Morbi semper sed tellus vel dignissim. Cras vestibulum, sapien in suscipit tincidunt, lectus mi sodales purus, at egestas ligula dui vel erat. Etiam cursus neque eu lectus eleifend accumsan vitae non leo. Aliquam scelerisque nisl sed lacus suscipit, ac consectetur sapien volutpat. Etiam nulla diam, accumsan ut enim vel, hendrerit venenatis sem. Vestibulum convallis justo vitae pharetra consequat. Mauris sollicitudin ac quam non congue.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    var modal = Modals.popup()
    $(modal).on('opened', function(){
       Navbars.sizeNavbar(modal.querySelector('.navbar-inner'))
    })
   
    var closeModal = (e) => {
      e.preventDefault()
      Modals.closeModal(modal)
    }
    ReactDOM.render(<PopupView onClose={closeModal}/>, modal)
  }

  render(){
    return (
    <div className={classNames('page', this.props.className)}>
        <div className="page-content">
          <div className="content-block">
            <div className="content-block-inner">
              <p>There are 1:1 replacements of native Alert, Prompt and Confirm modals. They support callbacks, have very easy api and can be combined with each other. Check these examples:</p>
              <p className="row">
                <span className="col-33">
                    <a href="#" onClick={this.handleAlertClick.bind(this)} className="button demo-alert">Alert</a>
                </span>
                <span className="col-33">
                    <a href="#" onClick={this.handleConfirmClick.bind(this)} className="button demo-confirm"> Confirm </a>
                </span>
                <span className="col-33">
                    <a href="#" onClick={this.handlePromptClick.bind(this)} className="button demo-prompt">Prompt</a>
                </span>
              </p>
              <p className="row"><span className="col-50"><a href="#" className="button demo-login">Login Modal</a></span><span className="col-50"><a href="#" className="button demo-password">Password Modal</a></span></p>
              <p className="row">
                <span className="col-50"><a href="#" onClick={this.handleActionSheetClick.bind(this)} className="button demo-actions">Action Sheet</a></span>
                <span className="col-50"><a href="#" onClick={this.handlePopupClick.bind(this)} className="button open-popup">Popup  </a></span>
              </p>
            </div>
          </div>
          <div className="content-block-title">Action Sheet To Popover</div>
          <div className="content-block">
            <div className="content-block-inner">
              <p>Action Sheet could be automatically converted to Popover (for tablets). This button will open Popover on tablets and Action Sheet on phones:
                <a href="#" onClick={this.handleActionsPopoverClick.bind(this)} style={{display: 'inline-block', verticalAlign: 'middle'}} className="button demo-actions-popover">Action/Popover</a>
              </p>
            </div>
          </div>
          <div className="content-block-title">Picker Modal</div>
          <div className="content-block">
            <div className="content-block-inner">
              <p>Such overlay type is similar to <a href="picker.html">Picker's</a> overlay, but also allows to create custom picker overlays</p>
              <p><a href="#" onClick={this.handleCustomPickerClick.bind(this)} className="button demo-picker-modal">Picker Modal With Custom HTML</a></p>
            </div>
          </div>
          <div className="content-block-title">Modals Stack</div>
          <div className="content-block">
            <div className="content-block-inner">
              <p>This feature doesn't allow to open multiple modals at the same time, and will automatically open next modal when you close the current one. Such behavior is similar to browser native alerts: </p>
              <p><a href="#" onClick={this.handleAlertsClick.bind(this)} className="button demo-modals-stack">Open Multiple Alerts</a></p>
            </div>
          </div>
          <div className="content-block-title">Modals Page</div>
          <div className="content-block">
            <div className="content-block-inner">
              <p>Modal slide in</p>
              <p><a href="#" onClick={this.handleSlideInModalClick.bind(this)} className="button demo-modals-stack">Open Page</a></p>
            </div>
          </div>
        </div>
    </div>

    );
  }
  
}

module.exports = ModalPage
