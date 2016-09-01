import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import SwipeOut from 'react-ui/swipeout'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

require('react-ui/resources/less/lists.less')
require('react-ui/resources/less/forms.less')
require('../../resources/less/animation-items.less')

class AnimationItemsPage extends AnimationPage{
  constructor(props) {
    super(props);
    var data = []
    for(var i=0; i<10; i++){
      data.push({
        id: Math.round(Math.random(1000) * 1e6),
        name: 'item'+i
      })
    }
    this.state = {
      data: data
    }
  }
   
  componentDidMount(){
    super.componentDidMount()
    SwipeOut.initSwipeout()
  }

  handleClickDeleteBtn(index, e){
    e.preventDefault()
    var data = this.state.data;
    data.splice(index, 1)
    this.setState({
      data: data
    })
    // SwipeOut.swipeoutDelete($(e.target).parents('.swipeout'));
  }

  handleAdd(e) {
    e.preventDefault()
    var id = Math.round(Math.random() * 1e6);
    var data = this.state.data;
    data.splice(0, 0, {
      id: id,
      name: 'item'+id
    })
    this.setState({data: data});
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
        <button className="button" onClick={this.handleAdd.bind(this)}>Add Item</button>
	      <div className="content-block-title">Swipe to delete with Animation</div>
          <div className="list-block">
            <ReactCSSTransitionGroup component="ul" transitionName="item" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {
              this.state.data.map( (item, index) => (
                <li className="swipeout" key={item.id}>
                  <div className="item-content swipeout-content">
                    <div className="item-inner">
                      <div className="item-title">{item.name}</div>
                    </div>
                  </div>
                  <div className="swipeout-actions-right"><a onClick={this.handleClickDeleteBtn.bind(this, index)} className="swipeout-delete">Delete</a></div>
                </li>
              ))
            }
            </ReactCSSTransitionGroup>
          </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = AnimationItemsPage
