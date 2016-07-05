import React  from 'react'
require('react-ui/resources/less/lists.less')
require('react-ui/resources/less/content-block.less')

export default class LeftPanel extends React.Component{
	render(){
		return (
		<div className="view view-right">
		  <div className="navbar">
		    <div className="navbar-inner">
		      <div className="center sliding">Right Panel</div>
		    </div>
		  </div>
		  <div className="pages navbar-through">
		    <div data-page="panel-right1" className="page">
		      <div className="page-content">
		        <div className="content-block">
		          <p>This is a right side panel. You can close it by clicking outsite or on this link:
		            <a href="#" onClick={this.props.onClose} className="close-panel">close me</a>.
		            You can put here anything, even another isolated view, try it:
		          </p>
		        </div>
		        <div className="list-block">
		          <ul>
		            <li>
		              <a href="panel-right2.html" className="item-link">
		                <div className="item-content">
		                  <div className="item-inner">
		                    <div className="item-title">Right panel page 2</div>
		                  </div>
		                </div>
		              </a>
		            </li>
		            <li>
		              <a href="panel-right3.html" className="item-link">
		                <div className="item-content">
		                  <div className="item-inner">
		                    <div className="item-title">Right panel page 3</div>
		                  </div>
		                </div>
		              </a>
		            </li>
		          </ul>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>

		)
	}
}