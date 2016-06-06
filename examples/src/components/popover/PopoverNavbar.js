import React  from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router'

import Navbar from '../Navbar'
import history from '../../history'
import Modals from 'react-ui/modals'
import List from 'react-ui/lists'

class PopoverNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    handleClickOpenPopoverMenu(e){
		e.preventDefault()
		
		var modal = Modals.popover(e.target)
		var href = function(path){
			history.push(path); 
			Modals.closeModal(modal);
		}
		let PopoverMenu = (props) => (
		<List>
			<a onClick={function(e){e.preventDefault(); href('/modals');}} className="list-button item-link">Modals</a>
            <a href="popover.html" className="list-button item-link">Popover</a>
            <a href="tabs.html" className="list-button item-link">Tabs</a>
            <a href="panels.html" className="list-button item-link">Side Panels</a>
            <a href="list-view.html" className="list-button item-link">List View</a>
            <a href="forms.html" className="list-button item-link">Forms</a>
        </List>
		)
		
		ReactDOM.render(<PopoverMenu/>, modal.querySelector('.popover-inner'));
		modal.sizePopover()
	}
     
    render(){
    	console.log('history', history)
	    if(this.canBack === undefined){
	      this.canBack = history.canBack;
	    }
	    return (
	       <div className="navbar-inner" >
	          {
	          this.canBack ? 
	          <div className="left sliding" ><a onClick={this.handleBackClick.bind(this)} className="back link"><i className="icon icon-back" ></i><span>返回</span></a></div> : ''
	          }
	            
	          <div className="center sliding">{this.props.title || ''}</div>
	          <div className="right">
	         	 <a href="#"  onClick={this.handleClickOpenPopoverMenu.bind(this)} className="link icon-only"><i className="icon icon-bars"></i></a>
	          </div>
	        </div>
	    )
	}
}

PopoverNavBar.defaultProps = {
  title: 'Popover'
}

module.exports = PopoverNavBar