import React  from 'react';
import {Link} from 'react-router'
import {InfiniteScroll, InfiniteScrollPreloader} from 'react-ui/infinite-scroll'
import $ from 'react-ui/dom'
import Page from '../Page'
import classNames from 'classnames';
import {List, ContentBlockTitle, ItemDivider, ListGroupTitle} from 'react-ui/lists'

var params = {
  limit : 20,
  maxItems: 60
}
class InfiniteScrollPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
    	data : []

    }
  }
   

  componentDidMount(){
  	super.componentDidMount()
    var loading = true;
     

  	var infiniteScroll = new InfiniteScroll({infiniteContent: this.refs.pageContent, distance: 50})
    this.destroyList.push(function(){
      infiniteScroll.destroy()
    })
    infiniteScroll.on('infinite', () => {
      if (loading) return;
      loading = true;

      if(this.state.data.length >= params.maxItems){
        this.setState({
          loadOver: true
        })
        return
      }
      

      this.load(() => {
        loading = false
      })
    })

  	this.load(() => {
      loading = false
    })
  }

  load ( cb ) {
    return setTimeout(() => {
      console.log('====loading=====')
      var data = []
      for(var i = 0; i < params.limit; i++){
        data.push(this.state.data.length + i)
      }
      this.setState({
        data:  this.state.data.concat(data)
      }) 
      cb && cb()
    }, 1000)
  
  }

  
  
  render(){
  	return (
  	<div className={classNames( "page", this.props.className)}>
	    <div className="page-content  infinite-scroll" ref="pageContent">
	    	<div className="content-block-title">Scroll bottom</div>
	        <List style={{marginBottom: 0}}>
	        {
	            React.Children.map(this.state.data, function (child) {
		  	        return (
                <div className="item-content">
  		  	        <div className="item-inner">
  		              <div className="item-title">Item {child}</div>
  		            </div>
                </div>
		            );
	  	       })
	        }
	          	
	        </List>

	        {this.state.loadOver ? '' : <InfiniteScrollPreloader/>}
	    </div>
	  </div>
  	)
  }
}

module.exports = InfiniteScrollPage
