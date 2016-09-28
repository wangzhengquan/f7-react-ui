import React from 'react'
import List from '../../lists'
require('../../resources/less/forms.less')

const headLineList = [
  {label: 'AaBb(正文)', value: 'unstyled'},
  {label: 'AaBb(标题一)', value: 'header-one'},
  {label: 'AaBb(标题二)', value: 'header-two'},
  {label: 'AaBb(标题三)', value: 'header-three'},
  {label: 'AaBb(标题四)', value: 'header-four'}
 
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
    this.edit.toggleBlockType(val)
  	// $('.public-DraftEditor-content[contenteditable=true]')[0].blur()
  }

  render() {
    var selection =  this.edit.state.editorState.getSelection();
    var blockType = this.edit.state.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
     
    return (
		<div className="tool-block">
      <div className="tool-name">样式</div>
      <div className="tool-buttons scroll">
        <div className="tool-buttons-inner scroll-inner">
          <List className="font-family-list" style={{width: '100%', margin: '0', borderRadius: '5px'}}>
            {
              headLineList.map((item) => (
                  <label className="label-radio item-content" style={{fontFamily: item.value}} key={item.value}>
                    <input type="radio" name="headline-radio" value={item.value} checked={blockType===item.value} onChange={this.handleChange.bind(this, item.value)}/>
                    <div className="item-inner">
                      <div className="item-title">
                      {
                        (() => {
                          switch (item.value) {
                            case 'header-one': return <h1 style={{margin: 0}}>{item.label}</h1>
                            case 'header-two': return <h2 style={{margin: 0}}>{item.label}</h2>
                            case 'header-three': return <h3 style={{margin: 0}}>{item.label}</h3>
                            case 'header-four': return <h4 style={{margin: 0}}>{item.label}</h4>
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