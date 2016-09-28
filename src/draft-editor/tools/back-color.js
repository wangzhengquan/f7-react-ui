import React  from 'react';
import classnames from 'classnames'
require('../../resources/less/grid.less')
var prefix = 'backColor'
var backColorList = [
	['#E53333', '#E56600', '#FF9900', '#64451D'],
	['#DFC5A4', '#FFE500', '#009900', '#006600'],
	['#99BB00', '#B8D100', '#60D978', '#00D5FF'],
	['#337FE5', '#003399', '#4C33E5', '#9933E5'], 
	['#CC33E5', '#EE33EE', '#FFFFFF', '#CCCCCC'], 
	['#999999', '#666666', '#333333', '#000000']
];

var backColorStyleMap = (function(){
  var styleMap = {}
  backColorList.forEach((list) => {
    list.forEach(color => {
      styleMap[prefix+color] = {backgroundColor: color};
    })
  })
  return styleMap;
})()

class BackColor extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
    }
  }

   
  componentDidMount(){
  }

  

  handleChangeBackColor(value){
     
    this.setState({
      value: value
    })
    this.edit.toggleBackColor(prefix+value)
    // this.doc.execCommand('forecolor', false, value)
  }
  
  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">突出显示</div>
      <div className="tool-buttons" style={{padding: '8px'}}>
        <div className="tool-buttons-inner">
          {
          	backColorList.map((list, index) =>  {
          		return (
          		<div className="row no-gutter" key={index}>	
          		{
          			list.map((val) => (
          				<div className={classnames('col-25 font-color-col', {'active': this.edit.state.editorState.getCurrentInlineStyle().has(prefix+val)})} key={val}>
          					<div className="btn font-color-btn" style={{backgroundColor: val, border: val==='#FFFFFF' ? '1px solid #c8c7cc' : 'none'}}>
          						<input type="radio" value={val} name="fontcolor" onChange={this.handleChangeBackColor.bind(this, val)}/>
          					</div>
          				</div>
          			))
          		}
          		</div>
          		)
          	})
          }
        </div>
      </div>
    </div>
  	)
  }
}
 
export {
  backColorStyleMap
}
export default BackColor
