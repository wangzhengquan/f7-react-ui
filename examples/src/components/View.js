import React from 'react'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'
import ReactUI from 'react-ui/ReactUI'
// import HomePage from './home/HomePage'
import classNames from 'classnames';

class App extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    // console.log("app this.props.children",  this.props.location.pathname)
  console.log("this.props", this.props, this.props.name)
    let navbar = this.props.navbar 
    let page = this.props.page
    let toolbar =this.props.toolbar

    return (

        <div className={classNames("view", this.props.className)} >
          {/*-----navbar------*/}
          <ReactTransitionGroup component="div" className={classNames("navbar", {'navbar-hidden': !!!navbar})}>
             {navbar ? React.cloneElement(navbar, {
                key: (this.props.location ? this.props.location.pathname.concat('/navbar') : ReactUI.guid() )
              }) : '' }
          </ReactTransitionGroup> 

          {/*-----pages-------*/}
          <ReactTransitionGroup className={classNames("pages")} component="div">
            {React.cloneElement(page, {
              className: {'navbar-through': !!navbar, 'toolbar-through': !!toolbar, 'tabbar-labels-through': !!toolbar},
              key: (this.props.location ? this.props.location.pathname : ReactUI.guid() )
            })}
          </ReactTransitionGroup> 

          {/*-----Toobar-------*/}
          
          { toolbar ? toolbar : ''}
          {/*-----toolbar end -------*/}
        </div>
    );
  }
  
}

module.exports = App



