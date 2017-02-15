import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import PullToRefresh from 'react-ui/pull-to-refresh'
import $ from 'react-ui/dom'

class PullToRefreshPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          song: 'Yellow Submarine',
          author: 'Beatles',
          picURL: 'http://lorempixel.com/88/88/abstract/1'
        },
        {
          song: 'Don\'t Stop Me Now',
          author: 'Queen',
          picURL: 'http://lorempixel.com/88/88/abstract/2'
        },
        {
          song: 'Billie Jean',
          author: 'Michael Jackson',
          picURL: 'http://lorempixel.com/88/88/abstract/3'
        }
      ]
    }
  }
   
  componentDidMount(){
    PullToRefresh.initPullToRefresh(this.refs.page)

    // Dummy Content
    var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
    var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
    // Pull to refresh content
    var ptrContent = $(this.refs.page).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh',   () => {
        // Emulate 2s loading
        setTimeout( () => {
            var picURL = 'http://lorempixel.com/88/88/abstract/' + Math.round(Math.random() * 10);
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
            
            this.setState((prestate) => {
              return {items: [{song: song, author: author, picURL: picURL}, ...prestate.items]}
            })
            // When loading done, we need to "close" it
            PullToRefresh.pullToRefreshDone();
        }, 2000);
    });
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)} ref="page">
	    <div className="page-content pull-to-refresh-content">
        <div className="pull-to-refresh-layer">
          <div className="preloader"></div>
          <div className="pull-to-refresh-arrow"></div>
        </div>
        <div className="list-block media-list">
          <ul>
          {
            this.state.items.map((item, index) => (
              <li className="item-content" key={this.state.items.length - index}>
                <div className="item-media"><img src={item.picURL} width="44"/></div>
                <div className="item-inner">
                  <div className="item-title-row">
                    <div className="item-title">{item.song}</div>
                  </div>
                  <div className="item-subtitle">{item.author}</div>
                </div>
              </li>

            ))
          }
          </ul>
          <div className="list-block-label">
            <p>Just pull page down to let the magic happen.<br/>Note that pull-to-refresh feature is optimised for touch and native scrolling so it may not work on desktop browser. </p>
          </div>
        </div>
      </div>
	  </div>
  	)
  }
}

module.exports = PullToRefreshPage
