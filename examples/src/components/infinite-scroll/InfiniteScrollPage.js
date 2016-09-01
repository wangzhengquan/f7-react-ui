import React  from 'react';
import {InfiniteScroll, InfiniteScrollPreloader} from 'react-ui/infinite-scroll'
import Page from '../Page'
import classNames from 'classnames';
import {List} from 'react-ui/lists'

 

var limit = 20,
    maxItems = 60;
class InfiniteScrollPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
    	data : []

    }
  }
   

  componentDidMount(){
  	super.componentDidMount()
    this.init()
  }

  init(){
    this.loadFirst(()=> {
      var infiniteScroll = new InfiniteScroll({infiniteContent: this.refs.pageContent, distance: 50})
      this.destroyList.push(function(){
        infiniteScroll.destroy()
      })
      var loading = false;
      infiniteScroll.on('infinite', () => {
        if (loading || this.setState.reachLastOne) return;
        loading = true;
        this.loadMore(() => {
          loading = false
        })
      })
    })
  }

  loadMore(cb){
    this.param.start += limit
    this.query(this.param, (data) => {
      this.setState({
        data: this.state.data.concat(data)
      })
      cb && cb()
    })
  }

  loadFirst(cb){
    this.param = {
      start: 0,
      limit: limit
    }
    this.setState({
      reachLastOne: false
    })
    this.query(this.param, (data) => {
      this.setState({
        data: data
      })
      cb && cb()
    })
  }

  query (param,  cb ) {
    return setTimeout(() => {
      var data = []
      
      var end = param.start + limit;
      if(end>maxItems){
        end = maxItems;

        this.setState({
          reachLastOne: true
        })
      }

      for(var i = param.start; i < end; i++){
        data.push(i)
      }
       
      
      cb && cb(data)
    }, 1000)
  
  }

  
  
  render(){
  	return (
  	<div className={classNames( 'page', this.props.className)}>
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

	        {this.state.reachLastOne ? '' : <InfiniteScrollPreloader/>}
	    </div>
	  </div>
  	)
  }
}

module.exports = InfiniteScrollPage
