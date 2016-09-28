import React  from 'react';
import classnames from 'classnames'
require('../../resources/less/grid.less')

var fontColorList = [
  ['#E53333', '#E56600', '#FF9900', '#64451D'],
  ['#DFC5A4', '#FFE500', '#009900', '#006600'],
  ['#99BB00', '#B8D100', '#60D978', '#00D5FF'],
  ['#337FE5', '#003399', '#4C33E5', '#9933E5'], 
  ['#CC33E5', '#EE33EE', '#FFFFFF', '#CCCCCC'], 
  ['#999999', '#666666', '#333333', '#000000']
];

 

class FontColor extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {

    }
  }

   
  componentDidMount(){
    // this.edit.addListener('selectionchange',function(){
    //     var state = this.queryCommandState(name);
    //     $btn.edui().disabled(state == -1).active(state == 1)
    // });
  }

  

  handleChangeFontColor(value , event){
     
    this.setState({
      value: value
    })
    this.edit.execCommand('forecolor', value)
    // this.doc.execCommand('forecolor', false, value)
  }
  
  render(){
    return (
    <div className="tool-block">
      <div className="tool-name">字体颜色</div>
      <div className="tool-buttons" style={{padding: '8px'}}>
        <div className="tool-buttons-inner">
          {
            fontColorList.map((list, index) =>  {
              return (
              <div className="row no-gutter" key={index}> 
              {
                list.map((val) => (
                  <div className={classnames('col-25 font-color-col', {'active': this.state.value === val})} key={val}>
                    <div className="btn font-color-btn" style={{backgroundColor: val, border: val==='#FFFFFF' ? '1px solid #c8c7cc' : 'none'}}>
                      <input type="radio" value={val} name="fontcolor" onChange={this.handleChangeFontColor.bind(this, val)}/>
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
 
 
export default FontColor
