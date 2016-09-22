/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/
import $ from '../../dom'
window.KindEditor.plugin('image', function(K) {
	var self = this, name = 'image';
	self.plugin.image = {
		edit : function() {
			console.log('edit')
			// var inpuFile = $('<input type="file"/>');
			// $(document.body).append(inpuFile)
			// inpuFile.trigger('click')
			// inpuFile.on('change', function(event) {
			// 	 var files =[].slice.call(event.target.files, 0),
   //      			file = files[0],
   //      			url =  URL.createObjectURL(file),
   //      			title = 'title',
   //      			width = '100%',
   //      			height = '',
   //      			border = 0,
   //      			align = 'center';
   //      		self.exec('insertimage', url, title, width, height, border, align);	
			// })
		}
		 
	};
	self.clickToolbar(name, self.plugin.image.edit);
});
