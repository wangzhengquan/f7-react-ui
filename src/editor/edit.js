
import $ from '../dom'
require('./node')
var html, _direction = '';
if ((html = document.getElementsByTagName('html'))) {
	_direction = html[0].dir;
}
function _getInitHtml(themesPath, bodyClass, cssPath, cssData) {
	var arr = [
		(_direction === '' ? '<html>' : '<html dir="' + _direction + '">'),
		'<head><meta charset="utf-8" /><title></title>',
		'<style>',
		'html {margin:0;padding:0;}',
		'body {margin:0;padding:5px;}',
		'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}',
		'body, p, div {word-wrap: break-word;}',
		'p {margin:5px 0;}',
		'table {border-collapse:collapse;}',
		'img {border:0;}',
		'noscript {display:none;}',
		'table.ke-zeroborder td {border:1px dotted #AAA;}',
		'img.ke-flash {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/flash.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-rm {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/rm.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-media {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/media.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-anchor {',
		'	border:1px dashed #666;',
		'	width:16px;',
		'	height:16px;',
		'}',
		'.ke-script, .ke-noscript, .ke-display-none {',
		'	display:none;',
		'	font-size:0;',
		'	width:0;',
		'	height:0;',
		'}',
		'.ke-pagebreak {',
		'	border:1px dotted #AAA;',
		'	font-size:0;',
		'	height:2px;',
		'}',
		'</style>'
	];
	if (!Array.isArray(cssPath)) {
		cssPath = [cssPath];
	}
	cssPath.forEach(function( path) {
		if (path) {
			arr.push('<link href="' + path + '" rel="stylesheet" />');
		}
	});
	if (cssData) {
		arr.push('<style>' + cssData + '</style>');
	}
	arr.push('</head><body contenteditable="true" ' + (bodyClass ? 'class="' + bodyClass + '"' : '') + '></body></html>');
	return arr.join('\n');
}

class Edit{
	constructor(options) {
		this.el = $('<div style="display:block;height: 100%;" class="ke-edit"  ></div>');
		if (options.src) {
			$(options.src).replaceWith(this.el);
		} else {
			$(this.doc.body).append(this.el);
		}
		this.srcElement = $(options.srcElement);
		var themesPath = options.themesPath,
			bodyClass = options.bodyClass,
			cssPath = options.cssPath,
			cssData = options.cssData,
			isDocumentDomain = location.protocol != 'res:' && location.host.replace(/:\d+/, '') !== document.domain;
			 
		this.iframe = $('<iframe class="ke-edit-iframe" hidefocus="true" allowfullscreen="true" frameborder="0"></iframe>').css({
			'width': '100%',
			'height': '100%'

		});
		this.textarea = $('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css({
			'width': '100%',
			'height': '100%',
			'display': 'none'

		});

		this.el.append(this.iframe);
		this.el.append(this.textarea);
		this.srcElement.hide();

		var ready = () =>  {
			console.log('iframe' ,this.iframe[0])
			var doc = this.doc = this.iframe[0].contentDocument || this.iframe[0].contentWindow.document;

			doc.open();
			if (isDocumentDomain) {
				doc.domain = document.domain;
			}
			doc.write(_getInitHtml(themesPath, bodyClass, cssPath, cssData));
			doc.close();
		}
		!isDocumentDomain && ready();
	}

}

export default Edit