import React  from 'react'
import ReactDOM from 'react-dom';
import Navbar from '../Navbar'
import $ from 'react-ui/dom'
import Panels from 'react-ui/panels'
import LeftPanelContent from '../panels/LeftPanel'
class HomeNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    handleClickOpenLeftPanel(event){
      event.preventDefault()
       //panel-reveal
      var panel = Panels.openPanel({position: 'left', className: 'layout-dark'})
      console.log("panel===", panel)
      var onClose = (event) => {
        event.preventDefault()
        Panels.closePanel(panel)
      }
      ReactDOM.render(<LeftPanelContent onClose={onClose}/>, panel)
    }
     
    render(){
      return  (
      <div className="navbar-inner navbar-on-center">
        <div className="left"></div>
        <div className="center sliding">ReactUI</div>
        <div className="right">
          <a href="#" onClick={this.handleClickOpenLeftPanel.bind(this)} className="open-panel link icon-only"><i className="icon icon-bars"></i></a>
        </div>
      </div>
      )
    }
}


module.exports = HomeNavBar