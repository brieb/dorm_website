$(document).ready(function() {
  var adjustDimensions = function() {
    var headerHeight = $('#header').height();
    var remaining_height = parseInt($(window).height() - headerHeight); 

    var sidebar = $('#sidebar');
    var sidebarRight = $('#sidebar-right');
    var content = $('#content');

    var sidebarHeightExtra =
      parseInt(sidebar.css("padding-top")) +
      parseInt(sidebar.css("padding-bottom"));
    var contentHeightExtra =
      parseInt(content.css("padding-top")) +
      parseInt(content.css("padding-bottom"));

    sidebar.height(remaining_height - sidebarHeightExtra); 
    content.height(remaining_height - contentHeightExtra); 

    //var contentWidth = 
      //$(window).width() -  sidebar.width() - 170 - 50;
    //content.width(contentWidth);
  };

  //adjustDimensions();
  //$(window).resize(adjustDimensions);

  var setActiveMenuItems = function() {
    console.log(window.location.href);
    $("#header #links a, #sidebar a").each(function() {
      if ($(this).attr('href') === window.location.href) {
        $(this).addClass('active');
      }
    });
  };
  //setActiveMenuItems();

  //TODO proper icons
  //$("#sidebar a").each(function() {
    //$(this).button({
      //icons: {
        //primary: "ui-icon-locked"
      //}
    //});
  //});

  $("#links .events, #links .wiki").hover(
    function() {
      var target = $(this);
      target.addClass('hover');
      target.find(".submenu").show();
    },
    function() {
      var target = $(this);
      target.removeClass('hover');
      target.find(".submenu").hide();
    }
  );

  $("#links .submenu li").hover(
    function() {
      $(this).addClass('hover');
    },
    function() {
      $(this).removeClass('hover');
    }
  );

  $("#links .people").hover(
    function() {
      $(this).addClass('hover');
    },
    function() {
      $(this).removeClass('hover');
    }
  );
});
