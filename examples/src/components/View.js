import React from 'react'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'
import ReactUI from 'react-ui/react-ui'
import classNames from 'classnames';

class View extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    let navbar = this.props.navbar
    let page = this.props.page
    let toolbar =this.props.toolbar

    return (

        <div className={classNames('view view-main', this.props.className)} >
          {/*-----navbar------*/}
          <ReactTransitionGroup component="div" className={classNames('navbar', {'navbar-hidden': !!!navbar})}>
             {navbar ? React.cloneElement(navbar, {
                key: (this.props.location ? this.props.location.pathname.concat('/navbar') : ReactUI.guid() ),
                pageName: location.pathname==='/' ? 'index' : location.pathname.charAt(0) === '/' ? location.pathname.substring(1) : location.pathname
              }) : '' }
          </ReactTransitionGroup>

          {/*-----pages-------*/}
          <ReactTransitionGroup className={classNames('pages')} component="div">
            {React.cloneElement(page, {
              className: {'navbar-through': !!navbar, 'toolbar-through': !!toolbar, 'tabbar-labels-through': !!toolbar},
              key: (this.props.location ? this.props.location.pathname : ReactUI.guid() ),
              pageName: location.pathname==='/' ? 'index' : location.pathname.charAt(0) === '/' ? location.pathname.substring(1) : location.pathname
            })}
          </ReactTransitionGroup>

          {/*-----Toobar-------*/}
          
          { toolbar ? toolbar : ''}
          {/*-----toolbar end -------*/}
        </div>
    );
  }
  
}

module.exports = View



