/*
 * Test
 * https://github.com/gionee/grunt
 *
 * Copyright (c) 2015 lyl
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.Test = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.Test = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.Test.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.Test.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].Test = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
