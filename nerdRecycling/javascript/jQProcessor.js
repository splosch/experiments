/* following the jQuery Pluginpattern : http://www.learningjquery.com/2007/10/a-plugin-development-pattern
and http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
*/
;(function($) {

  $.processInOut = function(pEl, inEl, outEl, options) {

    var defaults = {
          propertyName: 'value',
          onSomeEvent: function() {}
        },
        processor = this;

    processor.settings = {}

    /* Private Methods */
    var init = function() {
        processor.settings = $.extend({}, defaults, options);

        // make sure in & out are container objects
        // if (inEl instanceof container ... )
        processor.cIN = inEl;
        processor.cOUT= outEl;
      };

    /* Public Plugin Methods */

    // push jq item to container
    processor.move = function () {
      var item = this.cIN.dropLast();

      if(!item){
        // nothing to move
        return false;
      }

      this.cOUT.addItem(item);
    }

    init();
  }

})(jQuery);
