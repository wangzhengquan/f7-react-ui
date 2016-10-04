import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import ReactQuill from 'react-quill'

require('../../resources/less/quill-snow.less')
class EditorPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {

    }
  }
   
  componentDidMount(){
  }
  
  render() {
    return (
      <div className={classnames( 'page', this.props.className)}>
        <div className="page-content">
           <ReactQuill value={this.state.value} />
        </div>
      </div>
     
    );
  }
}

module.exports = EditorPage
