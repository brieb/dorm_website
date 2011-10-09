//Safari's bind(this) doesn't seem to work
if (!Function.prototype.bind) {

  Function.prototype.bind = function (oThis) {

    if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
    {
      throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {
      },
      fBound = function () {
        return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;

  };

}


$(document).ready(function() {

//  var adjustDimensions = function() {
//    var headerHeight = $('#header').height();
//    var remaining_height = parseInt($(window).height() - headerHeight);
//
//    var sidebar = $('#sidebar');
//    var sidebarRight = $('#sidebar-right');
//    var content = $('#content');
//
//    var sidebarHeightExtra =
//      parseInt(sidebar.css("padding-top")) +
//      parseInt(sidebar.css("padding-bottom"));
//    var contentHeightExtra =
//      parseInt(content.css("padding-top")) +
//      parseInt(content.css("padding-bottom"));
//
//    sidebar.height(remaining_height - sidebarHeightExtra);
//    content.height(remaining_height - contentHeightExtra);
//
//    //var contentWidth =
//      //$(window).width() -  sidebar.width() - 170 - 50;
//    //content.width(contentWidth);
//  };

  //adjustDimensions();
  //$(window).resize(adjustDimensions);

//  var setActiveMenuItems = function() {
//    console.log(window.location.href);
//    $("#header #links a, #sidebar a").each(function() {
//      if ($(this).attr('href') === window.location.href) {
//        $(this).addClass('active');
//      }
//    });
//  };
  //setActiveMenuItems();


});
