$(document).ready(function(){var a=function(){var d=$("#header").height();var h=parseInt($(window).height()-d);var g=$("#sidebar");var e=$("#sidebar-right");var f=$("#content");var c=parseInt(g.css("padding-top"))+parseInt(g.css("padding-bottom"));var i=parseInt(f.css("padding-top"))+parseInt(f.css("padding-bottom"));g.height(h-c);f.height(h-i)};var b=function(){console.log(window.location.href);$("#header #links a, #sidebar a").each(function(){if($(this).attr("href")===window.location.href){$(this).addClass("active")}})};$("#links .events, #links .wiki").hover(function(){var c=$(this);c.addClass("hover");c.find(".submenu").show()},function(){var c=$(this);c.removeClass("hover");c.find(".submenu").hide()});$("#links .submenu li").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")});$("#links .people").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})});