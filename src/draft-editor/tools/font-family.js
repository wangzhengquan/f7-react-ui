import React  from 'react';
// import classnames from 'classnames'
import List from '../../lists'
require('../../resources/less/forms.less')
// CKEDITOR.config.font_names = 'Arial/Arial, Helvetica, sans-serif;' +
//   'Comic Sans MS/Comic Sans MS, cursive;' +
//   'Courier New/Courier New, Courier, monospace;' +
//   'Georgia/Georgia, serif;' +
//   'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
//   'Tahoma/Tahoma, Geneva, sans-serif;' +
//   'Times New Roman/Times New Roman, Times, serif;' +
//   'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
//   'Verdana/Verdana, Geneva, sans-serif';
var prefix = 'fontFamily'
var fontFamilyList =  [
      {name: 'SimSun', label: '宋体', value: '宋体,SimSun'},
      {name: 'YaHei', label: '微软雅黑', value: '微软雅黑,Microsoft YaHei'},
      {name: 'SimKai', label: '楷体', value: '楷体,楷体_GB2312, SimKai'},
      {name: 'SimHei', label: '黑体', value: '黑体, SimHei'},
      {name: 'SimLi', label: '隶书', value: '隶书, SimLi'},
      {name: 'andale_mono', label: 'andale mono', value: 'andale mono'},
      {name: 'arial', label: 'arial', value: 'arial, helvetica,sans-serif'},
      {name: 'arialBlack', label: 'arial black', value: 'arial black,avant garde'},
      {name: 'comic', label: 'comic sans ms', value: 'comic sans ms'},
      {name: 'impact', label: 'impact', value: 'impact,chicago'},
      {name: 'timesNewRoman', label: 'timesNewRoman', value: 'times new roman'},
      {name: 'sans_serif', label: 'sans-serif',value:'sans-serif'}
]

var fontFamilyStyleMap = (()  => {
  return fontFamilyList.reduce( (res, item) => {
    res[prefix+item.name] = {fontFamily: item.value}
    return res
  }, {})
})();

class FontFamily extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {}
  }

   
  handleChangeFontFamily(val){
    this.setState({
      value: val
    })
    this.edit.toggleFontFamily(prefix+val)
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
                          <input type="radio" name="font-name-radio" value={item.value} checked={this.props.edit.state.editorState.getCurrentInlineStyle().has(prefix+item.name)} onChange={this.handleChangeFontFamily.bind(this, item.name)}/>
                          <div className="item-inner">
                            <div className="item-title">{item.label}</div>
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
 
export {
  fontFamilyStyleMap
}
export default FontFamily
