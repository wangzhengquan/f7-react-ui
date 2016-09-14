import Util from './util'

var _INLINE_TAG_MAP = Util.toMap('a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var')
var _BLOCK_TAG_MAP = Util.toMap('address,applet,blockquote,body,center,dd,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul')
var _SINGLE_TAG_MAP = Util.toMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed')
var _STYLE_TAG_MAP = Util.toMap('b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u')
var _CONTROL_TAG_MAP = Util.toMap('img,table,input,textarea,button')
var _PRE_TAG_MAP = Util.toMap('pre,style,script')
var _NOSPLIT_TAG_MAP = Util.toMap('html,head,body,td,tr,table,ol,ul,li')
var _AUTOCLOSE_TAG_MAP = Util.toMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr')
var _FILL_ATTR_MAP = Util.toMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected')
var _VALUE_TAG_MAP = Util.toMap('input,button,textarea,select')


var _INPUT_KEY_MAP = Util.toMap('8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222');
// 移动光标的键值
var _CURSORMOVE_KEY_MAP = Util.toMap('33..40');
// 输入文字或移动光标的键值
var _CHANGE_KEY_MAP = {};
Util.each(_INPUT_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});
Util.each(_CURSORMOVE_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});

var map = {}
Object.assign(map, {
 	INLINE_TAG_MAP: _INLINE_TAG_MAP,
 	BLOCK_TAG_MAP: _BLOCK_TAG_MAP,
 	SINGLE_TAG_MAP: _SINGLE_TAG_MAP,
 	STYLE_TAG_MAP: _STYLE_TAG_MAP,
 	CONTROL_TAG_MAP: _CONTROL_TAG_MAP,
 	PRE_TAG_MAP: _PRE_TAG_MAP,
 	NOSPLIT_TAG_MAP: _NOSPLIT_TAG_MAP,
 	AUTOCLOSE_TAG_MAP: _AUTOCLOSE_TAG_MAP,
 	FILL_ATTR_MAP: _FILL_ATTR_MAP,
 	VALUE_TAG_MAP: _VALUE_TAG_MAP,

 	INPUT_KEY_MAP: _INPUT_KEY_MAP,
 	CURSORMOVE_KEY_MAP: _CURSORMOVE_KEY_MAP,
 	CHANGE_KEY_MAP: _CHANGE_KEY_MAP
 })

export default map;
