import React from 'react'
import List from '../../lists'
require('../../resources/less/forms.less')

const headLineList = [
  {label: 'AaBb(正文)',   value: 'p'},
  {label: 'AaBb(标题一)', value: 'h1'},
  {label: 'AaBb(标题二)', value: 'h2'},
  {label: 'AaBb(标题三)', value: 'h3'},
  {label: 'AaBb(标题四)', value: 'h4'}
 
]
class HeadLine extends React.Component {
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
    	value: props.value
    }
  }

   
  handleChange(val){
    this.setState({
      value: val
    })
    this.edit.execCommand('paragraph', val)
  	// $('.public-DraftEditor-content[contenteditable=true]')[0].blur()
  }

  render() {
     
    return (
		<div className="tool-block">
      <div className="tool-name">样式</div>
      <div className="tool-buttons scroll">
        <div className="tool-buttons-inner scroll-inner">
          <List className="font-family-list" style={{width: '100%', margin: '0', borderRadius: '5px'}}>
            {
              headLineList.map((item) => (
                  <label className="label-radio item-content" style={{fontFamily: item.value}} key={item.value}>
                    <input type="radio" name="headline-radio" value={item.value} checked={false} onChange={this.handleChange.bind(this, item.value)}/>
                    <div className="item-inner">
                      <div className="item-title">
                      {
                        (() => {
                          switch (item.value) {
                            case 'h1': return <h1 style={{margin: 0}}>{item.label}</h1>
                            case 'h2': return <h2 style={{margin: 0}}>{item.label}</h2>
                            case 'h3': return <h3 style={{margin: 0}}>{item.label}</h3>
                            case 'h4': return <h4 style={{margin: 0}}>{item.label}</h4>
                            default: return item.label
                          }
                          
                        })()
                        
                      }
                      </div>
                    </div>
                  </label>
              ))
            }
          </List>
        </div>
      </div>
    </div>
	)
  }
}

export default HeadLine;