import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Editor from 'react-ui/umeditor/adapter/adapter'
// require('react-ui/editor/plugins/image')
// require('react-ui/editor/lang/zh_CN')

class EditorPage extends AnimationPage{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var um = window.UM.getEditor('myEditor',{
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下七个
        toolbar:['fullscreen source undo redo bold italic underline'],
        //focus时自动清空初始化时的内容
        autoClearinitialContent:true,
        //关闭字数统计
        wordCount:false,
        //关闭elementPath
        elementPathEnabled:false,
        //默认的编辑区域高度
        initialFrameHeight:300
        //更多其他参数，请参考umeditor.config.js中的配置项
    });
  }
   
   
  render(){
  	return (
  	<div className={classnames( 'page toolbar-through', this.props.className)}>

	    <div className="page-content" >
        <textarea type="text/plain" id="myEditor" style={{width:'800px', height: '240px'}} defaultValue="<p>这里我可以写一些输入提示</p>">
        </textarea>
	    </div>
      
	  </div>
  	)
  }
}

module.exports = EditorPage
