require(
  [
    "jquery", "jquery-ui", "SetUp",
    "SignUpFormRenderer"
], function($) {

  $('#eventSignUpsIsOpen').click(function() {
    var target = $(this);
    var url = target.attr('href');

    $.get(url, function(response) {
      var action_new = parseInt(url.substr(url.length-1, url.length)) === 1 ?
        0 : 1;
      var text;
      if (action_new === 1) {
        text = 'Open';
      } else {
        text = 'Close';
      }
      text += ' Sign Ups';

      target.button("option", "label", text);
      target.attr('href', url.substr(0, url.length-1) + action_new);
    });

    return false;
  });

});
