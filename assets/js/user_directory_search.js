//TODO use this instead, won't work now because it needs php data
$(document).ready(function () {

var users = <?php echo $users; ?>;

var detect_matching_users = function() {
  var match_house = "";
  $('input[name="filter_house[]"]:checked').each(
    function() {
      match_house += "|" + this.value;
    }
  );
  match_house = match_house.substring(1);
  var match_house_regex = new RegExp(match_house, 'i');

  var match_floor = "";
  $('input[name="filter_floor[]"]:checked').each(
    function() {
      match_floor += "|^" + this.value + ".*";
    }
  );
  match_floor = match_floor.substring(1);
  match_floor_regex = new RegExp(match_floor);
  console.log(match_floor_regex);

  var search_text = $('#user_search').val();
  var search_regex = new RegExp(search_text, 'i');

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    user['is_match'] = false;

    var user_searchable = [
      user['first_name'] + " " + user['last_name'],
      user['email']
    ];

    user['is_match'] = (user['house'].search(match_house_regex) >= 0);
    user['is_match'] = user['is_match'] &&
      (user['room'].search(match_floor_regex) >= 0);

    var match_text = false;
    for (var j = 0; j < user_searchable.length; j++) {
      if(user_searchable[j].search(search_regex) >= 0) {
        match_text = true;
        break;
      }
    }
    user['is_match'] = user['is_match'] && match_text;
  }
}

var print_matching_users = function() {
  detect_matching_users();

  var content = "";

  content += "<ul>";
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user['is_match'] === true) {
      content += "<li>";
        content += "<ul>";
          content += "<li>" + user['first_name'] + " " + user['last_name'] + "</li>";
          content += "<li>" + user['email'] + "</li>";
          content += "<li>" + user['house'] + " " + user['room'] + "</li>";
        content += "</ul>";
      content += "</li>";
    }
  }
  content += "</ul>";

  $("#users_container").html(content);
}

print_matching_users();

$("#user_search").keyup(print_matching_users);
$('input:checkbox').click(print_matching_users);

});
