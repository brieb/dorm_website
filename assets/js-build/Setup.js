$(document).ready(function(){$("#links li").hover(function(){var a=$(this);a.addClass("hover"),a.find(".submenu").show()},function(){var a=$(this);a.removeClass("hover"),a.find(".submenu").hide()}),$("#links .submenu li").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})})