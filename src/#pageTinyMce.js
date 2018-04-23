// var m = require("mithril")
// var tinymce = require("tinymce")
// import tinymce from '../tinymce.min.js';

export function getTinyMCEContent(ID) {
	return tinymce.get(ID).getContent();
}

export function setTinyMCEContent(ID,content,Readonly) {
	if (Readonly) { tinymce.get(ID).setMode('readonly');}
	else {tinymce.get(ID).setMode('design');}

	if( content !== undefined){
		tinymce.get(ID).setContent(content);
	}
}

export function removeTinyMCE() {
	tinymce.editors = [];
	tinymce.remove();
}

export function setupTinyMCE(ID) {
	var idHeight;
	ID == "#file" ? idHeight = 400: idHeight = 200;

	tinymce.init({
		selector: ID, height: idHeight,
		plugins: [ 'advlist autolink lists link image charmap print preview anchor',
		    'searchreplace visualblocks code fullscreen', 'insertdatetime media table contextmenu paste code'
		  ],
		toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
	});
}