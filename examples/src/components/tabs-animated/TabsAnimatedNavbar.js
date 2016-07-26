import React  from 'react'
import ReactDOM from 'react-dom';
import Navbar from '../Navbar'
import $ from 'react-ui/dom'
import Panels from 'react-ui/panels'
import Tabs from 'react-ui/tabs'
import history from 'react-ui/history'

import LeftPanelContent from '../panels/LeftPanel'




class TabsNavBar extends Navbar{
  

    constructor(props) {
      super(props);

    }
     
    componentDidMount(){
      super.componentDidMount()
      var tabs = new Tabs({tabbar: this.refs.tabbar})
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
      if(this.canBack === undefined){
        this.canBack = history.canBack;
      }
      return  (
      <div className="navbar-inner">
        {
        this.canBack ? 
        <div className="left sliding" ><a onClick={this.handleBackClick.bind(this)} className="back link"><i className="icon icon-back" ></i><span>返回</span></a></div> : ''
        }
        <div className="center sliding">Tabs Animated</div>
        <div className="right">
          <a href="#" onClick={this.handleClickOpenLeftPanel.bind(this)} className="open-panel link icon-only"><i className="icon icon-bars"></i></a>
        </div>
        <div className="subnavbar sliding" ref="tabbar">
          <div className="buttons-row">
            <a href="#tab1" className="button active tab-link">Tab 1</a>
            <a href="#tab2" className="button tab-link">Tab 2</a>
            <a href="#tab3" className="button tab-link">Tab 3</a>
          </div>
        </div>
      </div>
      )
    }
}


module.exports = TabsNavBar