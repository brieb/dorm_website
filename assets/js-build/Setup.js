$(document).ready(function(){var a=function(){var a=$("#header").height(),b=parseInt($(window).height()-a),c=$("#sidebar"),d=$("#sidebar-right"),e=$("#content"),f=parseInt(c.css("padding-top"))+parseInt(c.css("padding-bottom")),g=parseInt(e.css("padding-top"))+parseInt(e.css("padding-bottom"));c.height(b-f),e.height(b-g)},b=function(){console.log(window.location.href),$("#header #links a, #sidebar a").each(function(){$(this).attr("href")===window.location.href&&$(this).addClass("active")})};$("#links li").hover(function(){var a=$(this);a.addClass("hover"),a.find(".submenu").show()},function(){var a=$(this);a.removeClass("hover"),a.find(".submenu").hide()}),$("#links .submenu li").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})})