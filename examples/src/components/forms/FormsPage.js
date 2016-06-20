import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List, ContentBlockTitle, ItemDivider, ListGroupTitle} from 'react-ui/lists'

class FormsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classNames( "page", this.props.className)}>
	    <div className="page-content">
	      <div className="content-block">
          <p>Framework7 provides very flexible forms layout, you can use it with/out icons, with/out labels, or mixed layouts.</p>
        </div>
        <div className="list-block">
          <ul>
            <li>
              <Link to="forms-elements" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Form Elements</div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="forms-checkboxes" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Checkboxes And Radios</div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="forms-selects" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Smart Selects</div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="forms-buttons" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Buttons</div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="forms-storage" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Form Storage</div>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = FormsPage
