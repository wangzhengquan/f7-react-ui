import React  from 'react';
import classnames from 'classnames'
import List from '../../lists'
require('../../resources/less/forms.less')

var fontFamilyList =  [
      { name: '宋体', value: '宋体,SimSun'},
      { name: '微软雅黑', value: '微软雅黑,Microsoft YaHei'},
      { name: '楷体', value: '楷体,楷体_GB2312, SimKai'},
      { name: '黑体', value: '黑体, SimHei'},
      { name: '隶书', value: '隶书, SimLi'},
      { name: 'andale mono', value: 'andale mono'},
      { name: 'arial', value: 'arial, helvetica,sans-serif'},
      { name: 'arial black', value: 'arial black,avant garde'},
      { name: 'comic sans ms', value: 'comic sans ms'},
      { name: 'impact', value: 'impact,chicago'},
      { name: 'timesNewRoman', value: 'times new roman'},
      { name: 'sans-serif',value:'sans-serif'}
]

class FontFamily extends React.Component{
  constructor(props) {
    super(props);
    this.edit = this.props.edit
    this.doc = this.edit.doc
    this.state = {}
  }

   
  componentDidMount(){
  }

  

  handleChangeFontFamily(val){
    this.setState({
      value: val
    })
    this.doc.execCommand('fontName', false, val)
  }
  
  render(){
      return (
      <div className="tool-block">
            <div className="tool-name">字体</div>
            <div className="tool-buttons scroll">
              <div className="tool-buttons-inner scroll-inner">
                <List className="font-family-list" style={{width: '100%', margin: '0', borderRadius: '5px'}}>
                  {
                    fontFamilyList.map((item) => (
                        <label className="label-radio item-content" style={{fontFamily: item.value}} key={item.value}>
                          <input type="radio" name="ks-radio" value={item.value} checked={this.state.value===item.value} onChange={this.handleChangeFontFamily.bind(this, item.value)}/>
                          <div className="item-inner">
                            <div className="item-title">{item.name}</div>
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
 

module.exports = FontFamily
