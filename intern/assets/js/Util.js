var Util = {};

Util = {
  button : {
    addLoadingIndicator: function(button) {
      button.mouseleave();
      button.append(
        $('<span/>')
        .attr({
          'class': 'loading_indicate'
        })
      );
    },

    removeLoadingIndicator: function(button) {
      button.remove('.loading_indicate');
    }
  }

};
