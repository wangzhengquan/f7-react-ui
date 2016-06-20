import React  from 'react';
import AnimationPage from '../Page'
import classNames from 'classnames';
require('react-ui/resources/less/grid.less')

class GridPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
  
  render(){
  	return (
  	<div className={classNames( "page", this.props.className)}>
	    <div className="page-content">
	        <div className="content-block">
            <p>Framework7 comes with flexible layout grid:</p>
          </div>
          <div className="ks-grid">
            <div className="content-block-title">Columns with gutter</div>
            <div className="content-block">
              <div className="row">
                <div className="col-50">.col-50</div>
                <div className="col-50">.col-50</div>
              </div>
              <div className="row">
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
              </div>
              <div className="row">
                <div className="col-33">.col-33</div>
                <div className="col-33">.col-33</div>
                <div className="col-33">.col-33</div>
              </div>
              <div className="row">
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
              </div>
              <div className="row">
                <div className="col-33">.col-33</div>
                <div className="col-66">.col-66</div>
              </div>
              <div className="row">
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
                <div className="col-50">.col-50</div>
              </div>
              <div className="row">
                <div className="col-75">.col-75</div>
                <div className="col-25">.col-25</div>
              </div>
              <div className="row">
                <div className="col-80">.col-80</div>
                <div className="col-20">.col-20</div>
              </div>
            </div>
            <div className="content-block-title">No gutter between columns</div>
            <div className="content-block">
              <div className="row no-gutter">
                <div className="col-50">.col-50</div>
                <div className="col-50">.col-50</div>
              </div>
              <div className="row no-gutter">
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
              </div>
              <div className="row no-gutter">
                <div className="col-33">.col-33</div>
                <div className="col-33">.col-33</div>
                <div className="col-33">.col-33</div>
              </div>
              <div className="row no-gutter">
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
                <div className="col-20">.col-20</div>
              </div>
              <div className="row no-gutter">
                <div className="col-33">.col-33</div>
                <div className="col-66">.col-66</div>
              </div>
              <div className="row no-gutter">
                <div className="col-25">.col-25</div>
                <div className="col-25">.col-25</div>
                <div className="col-50">.col-50</div>
              </div>
              <div className="row no-gutter">
                <div className="col-75">.col-75</div>
                <div className="col-25">.col-25</div>
              </div>
              <div className="row no-gutter">
                <div className="col-80">.col-80</div>
                <div className="col-20">.col-20</div>
              </div>
            </div>
            <div className="content-block-title">Nested</div>
            <div className="content-block">
              <div className="row">
                <div className="col-50">.col-50
                  <div className="row">
                    <div className="col-50">.col-50</div>
                    <div className="col-50">.col-50</div>
                  </div>
                </div>
                <div className="col-50">.col-50
                  <div className="row">
                    <div className="col-33">.col-33</div>
                    <div className="col-66">.col-66</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-block-title">Responsive Grid</div>
            <div className="content-block">
              <p>Grid cells have different size on Phone/Tablet</p>
              <div className="row">
                <div className="col-100 tablet-50">.col-100.tablet-50</div>
                <div className="col-100 tablet-50">.col-100.tablet-50</div>
              </div>
              <div className="row">
                <div className="col-50 tablet-25">.col-50.tablet-25</div>
                <div className="col-50 tablet-25">.col-50.tablet-25</div>
                <div className="col-50 tablet-25">.col-50.tablet-25</div>
                <div className="col-50 tablet-25">.col-50.tablet-25</div>
              </div>
              <div className="row">
                <div className="col-100 tablet-40">.col-100.tablet-40</div>
                <div className="col-50 tablet-60">.col-50.tablet-60</div>
                <div className="col-50 tablet-66">.col-50.tablet-66</div>
                <div className="col-100 tablet-33">.col-100.tablet-33</div>
              </div>
            </div>
          </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = GridPage
