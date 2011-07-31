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

var detect_matching_users = function(search_regex) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    for (var property in user) {
      user['is_match'] = false;
      if(user.hasOwnProperty(property)) {
        console.log(typeof(user[property]));
        if (
          typeof(user[property]) === 'string' &&
          user[property].search(search_regex) >= 0) {
          user['is_match'] = true;
          break;
        }
      }
    }
  }
  console.log(users);
}

var print_matching_users = function(search_regex) {
  detect_matching_users(search_regex);

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

print_matching_users(new RegExp());

$("#user_search").keyup(function(event){
  var search_text = event.target.value;
  var search_regex = new RegExp(search_text, 'i');
  print_matching_users(search_regex);
});

});
</script>


<!--<ul>
<?php foreach($users as $user): ?>
  <li>
    <ul>
      <li><?php echo $user['first_name'] . " " . $user['last_name']; ?></li>
      <li><?php echo $user['email']; ?></li>
      <li><?php echo $user['house'] . " " . $user['room']; ?></li>
    </ul>
  </li>
<?php endforeach; ?>
</ul>
-->
