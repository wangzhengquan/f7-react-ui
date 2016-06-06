import React  from 'react';
import ReactDOM from 'react-dom';
import history from './history'
import $ from 'react-ui/dom'
const transitionDuration= 400;


export default class Page extends React.Component{
  constructor(props) {
    super(props);
  }
// Set pages classess for animationEnd
  animatePages(page, action, direction, finishCallback) {
      // Loading new page
      var removeClasses = 'page-on-center page-on-right page-on-left';
      if (direction === 'to-left') {
        if(action ==='leave') {
          page.removeClass(removeClasses).addClass('page-from-center-to-left');
          page.animationEnd(function (e) {
             page.removeClass('page-from-center-to-left').addClass('page-on-left');
             finishCallback()
          });
        }
        else if(action === 'enter'){

          page.removeClass(removeClasses).addClass('page-from-right-to-center');
          page.animationEnd(function (e) {
             page.removeClass('page-from-right-to-center').addClass('page-on-center');
             finishCallback()
          });
        }

      }
      // Go inBack
      else if (direction === 'to-right') {
        if(action === 'enter'){
          page.removeClass(removeClasses).addClass('page-from-left-to-center');
          page.animationEnd(function (e) {
             page.removeClass('page-from-left-to-center').addClass('page-on-center');
             finishCallback()
          });
        }
        else if(action  === 'leave'){
          page.removeClass(removeClasses).addClass('page-from-center-to-right');
          page.animationEnd(function (e) {
             page.removeClass('page-from-center-to-right').addClass('page-on-right');
             finishCallback()
          });
        }

      }
  }

  componentWillAppear(done) {
    // console.log('componentWillAppear', this.props.location && this.props.location.pathname);
    done()

  }
  componentDidAppear () {
    // console.log('componentDidAppear', this.props.location && this.props.location.pathname);
  }
  componentWillEnter (done) {
    console.log('componentWillEnter', this.props.location && this.props.location.pathname, history.paths);
    if( !Page.anim ){
      done()
      return;
    }
    var page = $(ReactDOM.findDOMNode(this));
    if(history.inBack){
      this.animatePages(page, 'enter', 'to-right', done)
    }else{
      this.animatePages(page, 'enter', 'to-left', done)
    }
    
    
  }
  componentDidEnter () {
    // console.log('componentDidEnter', this.props.location && this.props.location.pathname);
  }
  componentWillLeave (done) {
    // console.log('componentWillLeave', this.props.location && this.props.location.pathname , history.paths);
    if( !Page.anim ){
       Page.anim = true
      done()

      
      return;
    }
    var page = $(ReactDOM.findDOMNode(this));
    if(history.inBack){
      this.animatePages(page, 'leave', 'to-right', done)

    } else {
      this.animatePages(page, 'leave', 'to-left', done)

    }
    
  }
  componentDidLeave () {
    // console.log('componentDidLeave', this.props.location && this.props.location.pathname);
  }
   

  render(){
    return (
      <div className="page groups-page" ref="page"></div>
      
    );
  }
  
}
 Page.anim = true
