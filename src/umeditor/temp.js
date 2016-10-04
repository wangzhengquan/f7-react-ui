import React from 'react'
import ContentEditable from 'react-contenteditable'
import Toolbar from './toolbar'
import utils from './core/utils'
import domUtils from './core/domUtils'
import UM from './um'
// import EventBase from './core/EventBase'
import Selection from './core/Selection'
import dtd from './core/dtd'
import Range from './core/Range'
import htmlparser from './core/htmlparser'
import browser from './core/browser'
import $ from '../dom'
import MicroEvent from '../microevent'

require('./plugins/inserthtml.js')
require('./plugins/image.js')
require('./plugins/justify.js')
require('./plugins/font.js')
require('./plugins/link.js')
require('./plugins/print.js')
require('./plugins/paragraph.js')
require('./plugins/horizontal.js')
require('./plugins/cleardoc.js')
// require('./plugins/undo.js')
require('./plugins/paste.js')
require('./plugins/list.js')
// require('./plugins/source.js')
// require('./plugins/enterkey.js')
// require('./plugins/preview.js')
require('./plugins/basestyle.js')
// require('./plugins/video.js')
require('./plugins/selectall.js')
// require('./plugins/removeformat.js')
// require('./plugins/keystrokes.js')
// require('./plugins/autosave.js')
// require('./plugins/autoupload.js')
// require('./plugins/formula.js')

require('../resources/less/editor.less')
require('../resources/less/umeditor.less')


class Editor extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      html: '<p>Hello <i>World</i></p>',
      collapsed: true
    }
    var me = this;
    // EventBase.call(this);
    this.commands = {};

    //快捷键
    this.shortcutkeys = {};
    this.inputRules = [];
    this.outputRules = [];

    this.plugins = {};
    this.loadPlugins()
    this.mfocus = (e) => {
      console.log(e)
      console.log(e.target)
      this.focus(true)
      //this.refs.editor.querySelector('.umeditor-area').focus()
    }
    // this.mfocus = () => this.focus(true)
    this.blur = () => this.refs.editor.querySelector('.umeditor-area').blur()
    
    //ie6下缓存图片
    browser.ie && browser.version === 6 && document.execCommand('BackgroundImageCache', false, true);


    document.body.spellcheck = false;

    me.document = document;
    me.window = document.defaultView || document.parentWindow;
   
  }

  loadPlugins(){
    //初始化插件
    for (var pi in UM.plugins) {
        UM.plugins[pi].call(this);
        this.plugins[pi] = 1;
    }
    this.langIsReady = true;

    this.fireEvent('langReady');
  }

  componentDidMount(){
    var me = this;
    this.body = this.refs.editor.querySelector('.umeditor-area');
    this.$body = $(this.body);
    this.selection = new Selection(document, this.body);

    //gecko初始化就能得到range,无法判断isFocus了
    var geckoSel;
    if (browser.gecko && (geckoSel = this.selection.getNative())) {
        geckoSel.removeAllRanges();
    }

    // this.initEvents();

     
    // var oldExecCommand = me.execCommand;
    // me.execCommand = function () {
    //     me.fireEvent('firstBeforeExecCommand');
    //     return oldExecCommand.apply(me, arguments);
    // };
    // me._bindshortcutKeys();
    // me.isReady = 1;
    me.fireEvent('ready');
    // options.onready && options.onready.call(me);
    if(!browser.ie || browser.ie9above){

      $(me.body).on( 'blur focus', function (e) {
          // var nSel = me.selection.getNative();
          // //chrome下会出现alt+tab切换时，导致选区位置不对
          // if (e.type == 'blur') {
          //     if(nSel.rangeCount > 0 ){
          //         me._bakRange = nSel.getRangeAt(0);
          //     }
          // } else {
          //   // me._bakRange && nSel.addRange(me._bakRange)
          //     try {
          //         me._bakRange && nSel.addRange(me._bakRange)
          //     } catch (e) {
          //     }
          //     me._bakRange = null;
          // }
          // 
          if(e.type === 'blur') {
            me._bakRange = me.selection.getRange()
          } else {

          }
      });
    }

    // setTimeout(function () {
    //     me.focus(true);
    //     me._selectionChange();
    // }, 0)
  }

  /**
   * 初始化UE事件及部分事件代理
   * @private
   * @ignore
   */
  initEvents () {
      var me = this,
          _proxyDomEvent = function(){
              me._proxyDomEvent.apply(me, arguments);
          };
      this.$body
          .on( 'click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart', _proxyDomEvent)
          .on( 'focus blur', _proxyDomEvent)
          .on('mouseup keydown', function (evt) {
              //特殊键不触发selectionchange
              if (evt.type == 'keydown' && (evt.ctrlKey || evt.metaKey || evt.shiftKey || evt.altKey)) {
                  return;
              }
              if (evt.button == 2)return;
              me._selectionChange(250, evt);
          });
  }

  /**
     * 触发事件代理
     * @private
     * @ignore
     */
    _proxyDomEvent (evt) {
      return this.fireEvent(evt.type.replace(/^on/, ''), evt);
    }
    /**
     * 变化选区
     * @private
     * @ignore
     */
    _selectionChange (delay, evt) {
      var me = this;
      //有光标才做selectionchange 为了解决未focus时点击source不能触发更改工具栏状态的问题（source命令notNeedUndo=1）
//            if ( !me.selection.isFocus() ){
//                return;
//            }


      var hackForMouseUp = false;
      var mouseX, mouseY;
      if (browser.ie && browser.version < 9 && evt && evt.type == 'mouseup') {
          var range = this.selection.getRange();
          if (!range.collapsed) {
              hackForMouseUp = true;
              mouseX = evt.clientX;
              mouseY = evt.clientY;
          }
      }
      if(this._selectionChangeTimer) clearTimeout(this._selectionChangeTimer);
      this._selectionChangeTimer = setTimeout(function () {
          if (!me.selection.getNative()) {
              return;
          }
          //修复一个IE下的bug: 鼠标点击一段已选择的文本中间时，可能在mouseup后的一段时间内取到的range是在selection的type为None下的错误值.
          //IE下如果用户是拖拽一段已选择文本，则不会触发mouseup事件，所以这里的特殊处理不会对其有影响
          var ieRange;
          if (hackForMouseUp && me.selection.getNative().type == 'None') {
              ieRange = me.document.body.createTextRange();
              try {
                  ieRange.moveToPoint(mouseX, mouseY);
              } catch (ex) {
                  ieRange = null;
              }
          }
          var bakGetIERange;
          if (ieRange) {
              bakGetIERange = me.selection.getIERange;
              me.selection.getIERange = function () {
                  return ieRange;
              };
          }
          me.selection.cache();
          if (bakGetIERange) {
              me.selection.getIERange = bakGetIERange;
          }
          if (me.selection._cachedRange && me.selection._cachedStartElement) {
              me.fireEvent('beforeselectionchange');
              // 第二个参数causeByUi为true代表由用户交互造成的selectionchange.
              me.fireEvent('selectionchange', !!evt);
              me.fireEvent('afterselectionchange');
              me.selection.clear();
          }
      }, delay || 50);
  }

  addshortcutkey (cmd, keys) {
      var obj = {};
      if (keys) {
          obj[cmd] = keys
      } else {
          obj = cmd;
      }
      utils.extend(this.shortcutkeys, obj)
  }

  _bindshortcutKeys () {
    var me = this, shortcutkeys = this.shortcutkeys;
    me.addListener('keydown', function (type, e) {
      var keyCode = e.keyCode || e.which;
      for (var i in shortcutkeys) {
          var tmp = shortcutkeys[i].split(',');
          for (var t = 0, ti; ti = tmp[t++];) {
              ti = ti.split(':');
              var key = ti[0], param = ti[1];
              if (/^(ctrl)(\+shift)?\+(\d+)$/.test(key.toLowerCase()) || /^(\d+)$/.test(key)) {
                  if (( (RegExp.$1 == 'ctrl' ? (e.ctrlKey || e.metaKey) : 0)
                      && (RegExp.$2 != '' ? e[RegExp.$2.slice(1) + 'Key'] : 1)
                      && keyCode == RegExp.$3
                      ) ||
                      keyCode == RegExp.$1
                      ) {
                      if (me.queryCommandState(i,param) != -1)
                          me.execCommand(i, param);
                      domUtils.preventDefault(e);
                  }
              }
          }
      }
    });
  }


  /**
   * 让编辑器获得焦点，toEnd确定focus位置
   * @name focus
   * @grammar editor.focus([toEnd])   //默认focus到编辑器头部，toEnd为true时focus到内容尾部
   */
  focus (toEnd) {
    try {
        var me = this,
            rng = me.selection.getRange();
        if (toEnd) {
            rng.setStartAtLast(me.body.lastChild).setCursor(false, true);
        } else {
            rng.select(true);
        }
        this.fireEvent('focus');
    } catch (e) {
    }
  }

  /**
   * 使编辑区域失去焦点
   */
  blur(){
      var sel = this.selection.getNative();
      sel.empty ? sel.empty() : sel.removeAllRanges();
      this.fireEvent('blur')
  }

  /**
   * 判断编辑器当前是否获得了焦点
   */
  isFocus (){
      if(this.fireEvent('isfocus')===true){
          return true;
      }
      return this.selection.isFocus();
  }

  /**
   * 执行编辑命令cmdName，完成富文本编辑效果
   * @name execCommand
   * @grammar editor.execCommand(cmdName)   => {*}
   */
  execCommand (cmdName) {
    if(!this.isFocus()){
        // var bakRange = this.selection._bakRange;
        var bakRange = this._bakRange
        // console.log('execCommand bakRange', bakRange)
        if(bakRange){
            // this.selection.getNative().addRange(this._bakRange)
            bakRange.select()
           
        }else{
            this.focus(true)
        }

    }
    cmdName = cmdName.toLowerCase();
    var me = this,
        result,
        cmd = me.commands[cmdName] || UM.commands[cmdName];
    if (!cmd || !cmd.execCommand) {
        return null;
    }
    if (!cmd.notNeedUndo && !me.__hasEnterExecCommand) {
        me.__hasEnterExecCommand = true;
        if (me.queryCommandState.apply(me,arguments) != -1) {
            me.fireEvent('saveScene');
            me.fireEvent('beforeexeccommand', cmdName);
            result = this._callCmdFn('execCommand', arguments);
            (!cmd.ignoreContentChange && !me._ignoreContentChange) && me.fireEvent('contentchange');
            me.fireEvent('afterexeccommand', cmdName);
            me.fireEvent('saveScene');
        }
        me.__hasEnterExecCommand = false;
    } else {
        result = this._callCmdFn('execCommand', arguments);
        (!me.__hasEnterExecCommand && !cmd.ignoreContentChange && !me._ignoreContentChange) && me.fireEvent('contentchange')
    }
    (!me.__hasEnterExecCommand && !cmd.ignoreContentChange && !me._ignoreContentChange) && me._selectionChange();
    return result;
  }

  /**
   * 根据传入的command命令，查选编辑器当前的选区，返回命令的状态
   * @name  queryCommandState
   * @grammar editor.queryCommandState(cmdName)  => (-1|0|1)
   * @desc
   * * ''-1'' 当前命令不可用
   * * ''0'' 当前命令可用
   * * ''1'' 当前命令已经执行过了
   */
  queryCommandState (cmdName) {
      try{
          return this._callCmdFn('queryCommandState', arguments);
      }catch(e){
          return 0
      }

  }

  /**
   * 根据传入的command命令，查选编辑器当前的选区，根据命令返回相关的值
   * @name  queryCommandValue
   * @grammar editor.queryCommandValue(cmdName)  =>  {*}
   */
  queryCommandValue (cmdName) {
      try{
          return this._callCmdFn('queryCommandValue', arguments);
      }catch(e){
          return null
      }
  }

  _callCmdFn (fnName, args) {
      args = Array.prototype.slice.call(args,0);
      var cmdName = args.shift().toLowerCase(),
          cmd, cmdFn;
      cmd = this.commands[cmdName] || UM.commands[cmdName];
      cmdFn = cmd && cmd[fnName];
      //没有querycommandstate或者没有command的都默认返回0
      if ((!cmd || !cmdFn) && fnName == 'queryCommandState') {
          return 0;
      } else if (cmdFn) {
          return cmdFn.apply(this, [cmdName].concat(args));
      }
  }

  addInputRule (rule,ignoreUndo) {
      rule.ignoreUndo = ignoreUndo;
      this.inputRules.push(rule);
  }

  filterInputRule (root,isUndoLoad) {
    for (var i = 0, ci; ci = this.inputRules[i++];) {
        if(isUndoLoad && ci.ignoreUndo){
            continue;
        }
        ci.call(this, root)
    }
  }

  addOutputRule (rule,ignoreUndo) {
      rule.ignoreUndo = ignoreUndo;
      this.outputRules.push(rule)
  }

  filterOutputRule (root,isUndoLoad) {
    for (var i = 0, ci; ci = this.outputRules[i++];) {
        if(isUndoLoad && ci.ignoreUndo){
            continue;
        }
        ci.call(this, root)
    }
  }

 

  render(){
    return (
    <div style={Object.assign({}, styles.editorWrapper, {paddingBottom: this.state.collapsed ? '44px': '260px'})}>
      <div className="umeditor" ref="editor" >
        <ContentEditable className="umeditor-area" onClick={this.mfocus}
          html={this.state.html} // innerHTML of the editable div 
          disabled={false}       // use true to disable edition 
          onChange={this.handleChange.bind(this)} // handle innerHTML change 
        />
      </div>
      <Toolbar edit={this} uploadFileFn={this.props.uploadFileFn} onCollapse={this.handleCollapse.bind(this)}/>
    </div>
    )
  }

  handleChange (evt){
    this.setState({html: evt.target.value});
  }

   

  handleCollapse(collapsed){
    this.setState({
      collapsed: collapsed
    })
  }

  // removeListener (types, listener){
  //   this._events = this._events || {};
  //   types = types.trim().split(' ')
  //   types.forEach((type) => {
  //     if( type in this._events === false  ) return;
  //     if(!listener){
  //       delete this._events[event]
  //     }else{
  //       this._events[event].splice(this._events[event].indexOf(listener), 1);
  //     }
  //   })
    
  // }

  // addListener (event, fct){
  //   this._events = this._events || {};
  //   this._events[event] = this._events[event] || [];
  //   this._events[event].push(fct);
  //   // console.log('on', this._events)
  // }

  // fireEvent (types /* , args... */){
  //   var args = Array.prototype.slice.call(arguments, 1);
  //   this._events = this._events || {};
  //   types = types.trim().split(' ')
  //   var result = []
  //   types.forEach((type) => {
  //     if( type in this._events === false  ) return;
  //     let tevents = this._events[type]
  //     for(var i = 0, len=tevents.length; i <len ; i++){
  //       let res = tevents[i].apply(this, args);
  //       if (res !== undefined) 
  //         result.push(res);
  //     }
  //   })
  //   return result.length === 1 ? result[0] : result;
    
  // }
}
 MicroEvent.mixin(Editor)
//ObjectHelper.inherits(Editor, EventBase);
const styles = {
  editorWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
    
  } 
}
export default Editor