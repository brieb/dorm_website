var People={};People={users:null,init:function(a){this.users=a,this.container=$("#user_directory_listing");var b=this;$("#user_search").keyup(function(){b.print_matching_users()}),$("input:checkbox").click(function(){b.print_matching_users()}),this.print_matching_users()},detect_matching_users:function(){var a="";$('input[name="filter_house[]"]:checked').each(function(){a+="|"+this.value}),a=a.substring(1);var b=new RegExp(a,"i"),c="";$('input[name="filter_floor[]"]:checked').each(function(){c+="|^"+this.value+".*"}),c=c.substring(1);var d=new RegExp(c),e=$("#user_search").val(),f=new RegExp(e,"i"),g={residents:!1,staff:!1};$('input[name="filter_role[]"]:checked').each(function(){g[this.value]=!0});var h={freshman:!1,sophomore:!1,junior:!1,senior:!1,other:!1};$('input[name="filter_class[]"]:checked').each(function(){h[this.value]=!0});for(var i=0;i<this.users.length;i++){var j=this.users[i];j.is_match=!1;if($('input[name="filter_house[]"]:checked').length===0||$('input[name="filter_floor[]"]:checked').length===0)continue;var k=j.staff_role!==null;if(!k&&!g.residents||k&&!g.staff)continue;if(!j["class"]||!h[j["class"].toLowerCase()])continue;var l=[j.first_name,j.nick_name,j.last_name,j.email,j.house,j.staff_role,j.room,j.house+" "+j.room];j.is_match=j.house!==null&&j.house.search(b)>=0&&j.room!==null&&j.room.search(d)>=0;var m=!1;for(var n=0;n<l.length;n++)if(l[n]!==null&&l[n].search(f)>=0){m=!0;break}j.is_match=j.is_match&&m}},print_matching_users:function(){this.detect_matching_users(),this.container.html("");var a=$("<div />"),b=function(a){if(d[a]!==null){var b=$("<li/>");b.addClass(a);var c=a.replace(/.*_(.)(.*)/,function(a,b,c){return b.toUpperCase()+c});c+=": "+d[a],b.text(c),e.append(b)}};for(var c=0;c<this.users.length;c++){var d=this.users[c];if(d.is_match===!0){var e=$("<ul />"),f=$("<li/>");f.addClass("photo"),f.append($("<img />").attr({src:BASE_URL+d.photo})),e.append(f);var g=$("<li/>");g.addClass("name");var h=d.first_name;d.nick_name!==null&&(h+=" ("+d.nick_name+")"),h+=" "+d.last_name,g.text(h),e.append(g);var i=$("<li />");i.addClass("email"),i.append($("<a />").attr({href:"mailto:"+d.email}).text(d.email)),e.append(i);var j=$("<li />"),k=d.house;d.room!=="0"&&(k+=" "+d.room),j.text(k),j.addClass("room"),e.append(j);if(d["class"]!=="Other"){var l=$("<li />");l.addClass("class"),l.text(d["class"]),e.append(l)}if(d.staff_role!==null){var m=$("<li />").text(d.staff_role).addClass("staff_role");d.staff_role.length>3&&m.addClass("small_text"),e.append(m)}["phone_cell","phone_room","phone_office"].map(b),a.append(e)}}this.container.html(a)}}