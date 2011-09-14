$(document).ready(function() {
  var adjustHeights = function() {
    var headerHeight = $('#header').height();
    var remaining_height = parseInt($(window).height() - headerHeight); 

    var sidebar = $('#sidebar');
    var content = $('#content');

    var sidebarHeightExtra =
      parseInt(sidebar.css("padding-top")) +
      parseInt(sidebar.css("padding-bottom"));
    var contentHeightExtra =
      parseInt(content.css("padding-top")) +
      parseInt(content.css("padding-bottom"));

    sidebar.height(remaining_height - sidebarHeightExtra); 
    content.height(remaining_height - contentHeightExtra); 
  };

  adjustHeights();
  $(window).resize(adjustHeights);
});
