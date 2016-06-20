import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List, ContentBlockTitle, ItemDivider, ListGroupTitle} from 'react-ui/lists'

require('react-ui/resources/less/forms.less')
class FormsElementsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classNames( "page", this.props.className)}>
	    <div className="page-content">
        <div className="content-block-title">Full Layout</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-name"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Name</div>
                  <div className="item-input">
                    <input type="text" placeholder="Your name" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-email"></i></div>
                <div className="item-inner">
                  <div className="item-title label">E-mail</div>
                  <div className="item-input">
                    <input type="email" placeholder="E-mail" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-url"></i></div>
                <div className="item-inner">
                  <div className="item-title label">URL</div>
                  <div className="item-input">
                    <input type="url" placeholder="URL" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-password"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Password</div>
                  <div className="item-input">
                    <input type="password" placeholder="Password" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-tel"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Phone</div>
                  <div className="item-input">
                    <input type="tel" placeholder="Phone" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-gender"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Gender</div>
                  <div className="item-input">
                    <select>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-calendar"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Birth date</div>
                  <div className="item-input">
                    <input type="date" placeholder="Birth day" value="2014-04-30" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-calendar"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Date time</div>
                  <div className="item-input">
                    <input type="datetime-local" placeholder="Birth day" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-toggle"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Switch</div>
                  <div className="item-input">
                    <label className="label-switch">
                      <input type="checkbox" />
                      <div className="checkbox"></div>
                    </label>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-settings"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Slider</div>
                  <div className="item-input">
                    <div className="range-slider">
                      <input type="range" min="0" max="100" value="50" step="0.1" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="align-top">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-comment"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Textarea</div>
                  <div className="item-input">
                    <textarea></textarea>
                  </div>
                </div>
              </div>
            </li>
            <li className="align-top">
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-comment"></i></div>
                <div className="item-inner">
                  <div className="item-title label">Resizeable</div>
                  <div className="item-input">
                    <textarea className="resizable"></textarea>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Icons and inputs</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-name"></i></div>
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Your name" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-email"></i></div>
                <div className="item-inner">
                  <div className="item-input">
                    <input type="email" placeholder="E-mail" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-gender"></i></div>
                <div className="item-inner">
                  <div className="item-input">
                    <select>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-calendar"></i></div>
                <div className="item-inner">
                  <div className="item-input">
                    <input type="date" placeholder="Birth day" value="2014-04-30" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-form-toggle"></i></div>
                <div className="item-inner">
                  <div className="item-input">
                    <label className="label-switch">
                      <input type="checkbox" />
                      <div className="checkbox"></div>
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Labels and inputs</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title label">Name</div>
                  <div className="item-input">
                    <input type="text" placeholder="Your name" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title label">E-mail</div>
                  <div className="item-input">
                    <input type="email" placeholder="E-mail" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title label">Gender</div>
                  <div className="item-input">
                    <select>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title label">Birth date</div>
                  <div className="item-input">
                    <input type="date" placeholder="Birth day" value="2014-04-30" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title label">Switch</div>
                  <div className="item-input">
                    <label className="label-switch">
                      <input type="checkbox" />
                      <div className="checkbox"></div>
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Just inputs</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Your name" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="email" placeholder="E-mail" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <select>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="date" placeholder="Birth day" value="2014-04-30" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Inset, just inputs</div>
        <div className="list-block inset">
          <ul>
            <ul></ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Your name" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="email" placeholder="E-mail" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <select>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="date" placeholder="Birth day" value="2014-04-30" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = FormsElementsPage
