<input id="user_search" type='text' name='user_search' placeholder='Enter a name or house...'></input>

<input type="checkbox" name="filter_house[]" value="schiff" />Schiff
<input type="checkbox" name="filter_house[]" value="adams" />Adams

<input type="checkbox" name="filter_floor[]" value="1" />Floor 1
<input type="checkbox" name="filter_floor[]" value="2" />Floor 2
<input type="checkbox" name="filter_floor[]" value="3" />Floor 3

<div id="users_container"></div>

<script type="text/javascript">
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
  var match_floor_regex = new RegExp(match_floor);

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

  var content = $('<ul/>');
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user['is_match'] === true) {
      content.append(
        $('<li />').append(
          $('<ul />').append(
            $('<li />', {
              text: user['first_name'] + " " + user['last_name']
            }),
            $('<li />', {
              text: user['email']
            }),
            $('<li />', {
              text: user['house'] + " " + user['room']
            })
          )
        )
      )
    }
  }
  $("#users_container").html(content);
}

$("#user_search").keyup(print_matching_users);
$('input:checkbox').click(print_matching_users);

print_matching_users();
});
</script>

