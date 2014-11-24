var jQuery = (function() {

var jQuery = function( selector ) {
	return new jQuery.fn.init( selector, rootjQuery );
},
	rootjQuery;

jQuery.fn = jQuery.prototype = {
	init: function( selector, rootjQuery ) {
		console.log(this);
	},
	length: 0,
	splice: [].splice
};

jQuery.fn.init.prototype = jQuery.fn;

rootjQuery = jQuery(document);

return jQuery;

})();
