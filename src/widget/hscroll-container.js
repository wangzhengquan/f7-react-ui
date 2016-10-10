import React  from 'react';
import classnames from 'classnames'
require('../resources/less/widget/hscroll-container.less')

class HScrollContainer extends React.Component{
  constructor(props) {
    super(props);
    
  }
  componentWillUnmount() {

  }

  componentDidMount() {
  }

  render(){
    return (
      <div className={classnames('hscroll-container no-scrollbar', this.props.className)}>
        <div className="hscroll-content">
          {
            this.props.children && this.props.children.map((child, index) => {
              return (
                <div className="hscroll-item" key={index}>
                   {child}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default HScrollContainer