import React  from 'react';
import AnimationPage from '../Page'
import classNames from 'classnames';

class TmpPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classNames( 'page', this.props.className)}>
	    <div className="page-content">
	      <div className="content-block">
          <p>Framework7 allows you to be flexible with list views (table views). You can make them as navigation menus, you can use there icons, inputs, and any elements inside of the list, and even make them nested:</p>
        </div>
        <div className="content-block-title">Data list, with icons</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ivan Petrov</div>
                  <div className="item-after">CEO</div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">John Doe</div>
                  <div className="item-after"> <span className="badge">5</span></div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Jenna Smith</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Links</div>
        <div className="list-block">
          <ul>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ivan Petrov</div>
                  <div className="item-after">CEO</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">John Doe</div>
                  <div className="item-after">Cleaner</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Jenna Smith</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Links, no icons</div>
        <div className="list-block">
          <ul>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Ivan Petrov</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">John Doe</div>
                </div>
              </a>
            </li>
            <li>
              <div className="item-divider">Divider Here</div>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Ivan Petrov</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-inner">
                  <div className="item-title">Jenna Smith</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Grouped with sticky titles</div>
        <div className="list-block">
          <div className="list-group">
            <ul>
              <li className="list-group-title">A</li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Aaron </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Abbie</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Adam</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="list-group">
            <ul>
              <li className="list-group-title">B</li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Bailey</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Barclay</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Bartolo</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="list-group">
            <ul>
              <li className="list-group-title">C</li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Caiden</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Calvin</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Candy</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-block-title">Mixed and nested</div>
        <div className="list-block">
          <ul>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ivan Petrov</div>
                  <div className="item-after">CEO</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Two icons here</div>
                </div>
              </a>
            </li>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">No icons here</div>
                </div>
              </div>
              <ul>
                <li>
                  <a href="#" className="item-link item-content">
                    <div className="item-media"><i className="icon icon-f7"></i></div>
                    <div className="item-inner">
                      <div className="item-title">Ivan Petrov</div>
                      <div className="item-after">CEO</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="item-link item-content">
                    <div className="item-media"><i className="icon icon-f7"></i><i className="icon icon-f7"></i></div>
                    <div className="item-inner">
                      <div className="item-title">Two icons here</div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">No icons here</div>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#" className="item-link item-content">
                    <div className="item-media"><i className="icon icon-f7"></i></div>
                    <div className="item-inner">
                      <div className="item-title">Ultra long text goes here, no, it is really really long</div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-f7"></i></div>
                    <div className="item-inner">
                      <div className="item-title">With switch</div>
                      <div className="item-after">
                        <label className="label-switch">
                          <input type="checkbox" />
                          <div className="checkbox"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ultra long text goes here, no, it is really really long</div>
                </div>
              </a>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">With switch</div>
                  <div className="item-after">
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
        <div className="content-block-title">Mixed, inset</div>
        <div className="list-block inset">
          <ul>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ivan Petrov</div>
                  <div className="item-after">CEO</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Two icons here</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ultra long text goes here, no, it is really really long</div>
                </div>
              </a>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">With switch</div>
                  <div className="item-after">
                    <label className="label-switch">
                      <input type="checkbox" />
                      <div className="checkbox"></div>
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="list-block-label">
            <p>Here comes some useful information about list above</p>
          </div>
        </div>
        <div className="content-block-title">Tablet inset</div>
        <div className="list-block tablet-inset">
          <ul>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ivan Petrov</div>
                  <div className="item-after">CEO</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Two icons here</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="item-link item-content">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                  <div className="item-title">Ultra long text goes here, no, it is really really long</div>
                </div>
              </a>
            </li>
          </ul>
          <div className="list-block-label">
            <p>This list block will look like "inset" only on tablets (iPad)</p>
          </div>
        </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = TmpPage
