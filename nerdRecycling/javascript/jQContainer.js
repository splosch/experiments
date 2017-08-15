/* following the jQuery Pluginpattern : http://www.learningjquery.com/2007/10/a-plugin-development-pattern
and http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
*/
;(function($) {

  $.containerize = function(el, options) {
    var defaults = {
          propertyName: 'value',
          onSomeEvent:  function() {}
        },

    container = this;
    container.settings = {}

    /* Private Methods */
    var init = function() {
      container.settings = $.extend({}, defaults, options);
      container.el = el;
      container.items = container.el.children();
    },

    updateItemCount = function (cont) {
      cont.items = container.el.children();

      return cont.items.length;
    },

    hasItems = function (cont) {
      return cont.items.length > 0;
    },

    isjQItem = function (item) {
      return item instanceof jQuery;
    },

    // check if it belongs to the containers children
    hasItem = function (cont, item) {
      // must be jQuery Object otherwise can't perform check (for now)
      if ( !isjQItem(item) ) {
        return false;
      }

      return item.parent(cont).length > 0
    },

    deleteItem = function(cont, item) {
      var isDeleted = false;

      if ( hasItem(cont, item) ) {
        isDeleted = item.remove();
        updateItemCount(cont);
      }

      return isDeleted;
    },

    addItem = function ( cont, item) {
      if ( !isjQItem(item) ) {
        return false;
      }
      cont.el.prepend(item);
    },

    getLastItemOf = function(cont) {
      var lastItem = cont.el.children().filter(":last");

      if ( lastItem.length > 0 ) {
        return lastItem;
      }

      return false;
    };


    /* Public Plugin Methods */

    // push jq item to container
    container.addItem = function (item) {
      var isAdded = false,
          count   = this.items.length;

      addItem(this, item);
      // compare itemcount before < after
      isAdded = count < updateItemCount(this);

      return isAdded;
    }

    // container kicks out the last item to the world for further usage
    container.dropLast = function() {
      var lastItem = getLastItemOf(this),
          elCopy;

      // empty stack ?
      if ( !lastItem ) {
        return false;
      }

      elCopy = lastItem.clone();
      deleteItem(this, lastItem);

      return elCopy;
    }

    // continue to kick out items as long are any
    container.dropAll = function() {
      while ( hasItems(this)) {
        this.dropLast();
      }
    }

    // continue to kick out items as long are any
    container.hasItems = function() {
      return hasItems(this);
    }

    init();
  }

})(jQuery);
