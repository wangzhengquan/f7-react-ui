import React  from 'react';
import { Link, IndexLink } from 'react-router'
import Navbar from './Navbar'
import Page from './Page'
let classNames = require('classnames');

class Tabbar extends React.Component{
  constructor(props) {
    super(props);
  }

  handleTabClick(){
    Page.anim = false
    Navbar.anim = false
    //window.alert('cick')
  }

  render(){
    return (
   	<div className={classNames("toolbar tabbar tabbar-labels", {'toolbar-hidden': false})}>
	  <div className="toolbar-inner tabbar tabbar-labels">
	    <IndexLink to="/" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon icon-home"></i>
	      <span className="tabbar-label">首页</span>
	    </IndexLink>

	    <Link to="/groups" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon icon-category"></i>
	      <span className="tabbar-label">社团</span>
	    </Link>
	    
	    <Link to="categories" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon icon-category"></i>
	      <span className="tabbar-label">类目</span>
	    </Link>

	    <Link to="categories" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon icon-category"></i>
	      <span className="tabbar-label">动态</span>
	    </Link>
	    
	    <Link to="/setting" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon ks-tabbar-icon-2">
	        <span className="badge theme-red">4</span>
	      </i>
	      <span className="tabbar-label">设置</span>
	    </Link>
	  </div>
	</div>
    );
  }
}

module.exports = Tabbar
 