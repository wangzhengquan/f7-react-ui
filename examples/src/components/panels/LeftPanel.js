import React  from 'react'
import ReactDOM from 'react-dom';

import Panels from 'react-ui/panels'
import RightPanel from './RightPanel'
require('react-ui/resources/less/lists.less')
require('react-ui/resources/less/content-block.less')

export default class LeftPanel extends React.Component{
  handleClickOpenRightPanel(event){
    event.preventDefault()
    var panel = Panels.openPanel({position: 'right', className: 'layout-dark'})
    console.log("panel===", panel)
    var onClose = (event) => {
      event.preventDefault()
      Panels.closePanel(panel)
    }
    ReactDOM.render(<RightPanel onClose={onClose}/>, panel)
  }
  render(){
    return (
    <span>
      <div className="content-block-title">Left Panel</div>
      <div className="content-block">
        <p>This is a side panel. You can close it by clicking outsite or on this link: 
          <a href="#" onClick={this.props.onClose} className="close-panel">close me</a>. 
          You can put here anything, even another isolated view like in 
          <a href="#" onClick={this.handleClickOpenRightPanel.bind(this)} className="open-panel">Right Panel</a>
        </p>
      </div>
      <div className="content-block-title">Framework7 Kitchen Sink</div>
      <div className="list-block">
        <ul>
          <li>
            <a href="forms.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Forms</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="list-view.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">List View</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="media-lists.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Media Lists</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="modals.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Modals</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="bars.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Navbars And Toolbars</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="popover.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Popover</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="panels.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Side Panels</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="swipe-delete.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swipe To Delete</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="swiper.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Swiper Slider</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="tabs.html" className="item-link close-panel">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Tabs</div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="content-block">
        <p>Long text block goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sem urna, gravida non scelerisque id, fringilla ac velit. Phasellus elementum a ipsum at ornare. Mauris sagittis rhoncus euismod. Integer convallis augue eu lacus ultrices, in dictum elit consequat. Nulla faucibus massa id felis egestas eleifend. Proin consequat dignissim magna ut scelerisque. Vestibulum ac lorem semper, posuere sapien nec, pharetra massa. Nulla a tellus facilisis, sollicitudin quam porta, aliquam lorem. Fusce dignissim eros ac diam molestie, ut ultrices lorem tristique. Ut facilisis augue ac nisi egestas malesuada. Nunc posuere tortor quis eleifend mollis. Aliquam erat volutpat. Donec feugiat elit tellus, nec convallis orci elementum in. Sed urna mi, vestibulum id tempus id, pretium et ante. Pellentesque eget sollicitudin ligula. Phasellus pellentesque velit eu porta suscipit.</p>
      </div>
    </span>
    )
  }
}