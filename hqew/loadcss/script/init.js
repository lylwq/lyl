seajs.config({
	alias:{
		'jquery':'jQuery'
	}
});

define(function(require){
	var $ = require('jquery');
	$(function(){
		$('#status').html("JQuery loaded!");
	});
					
});