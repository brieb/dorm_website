<?php
$this->load->view(
 'common/header',
 array('page_title' => 'Directory')
);
?>

<div id="sidebar">
  <input
    id="user_search"
    type='text'
    name='user_search'
    placeholder='Enter a name or email...'>
  </input>

  <div class="sidebar-box">
    <input
      type="checkbox"
      name="filter_house[]" checked
      value="schiff" />
      Schiff
    <br/>

    <input
      type="checkbox"
      name="filter_house[]" checked
      value="adams" />
      Adams
    <br/>
  </div>

  <div class="sidebar-box">
    <input
      type="checkbox"
      name="filter_floor[]" checked
      value="1" />
      Floor 1
    <br/>

    <input
      type="checkbox"
      name="filter_floor[]" checked
      value="2" />
      Floor 2
    <br/>

    <input
      type="checkbox"
      name="filter_floor[]" checked
      value="3" />
      Floor 3
    <br/>
  </div>

</div>


<div id="content">
  <div id="user_directory_listing">
</div>

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
    if ($('input[name="filter_house[]"]:checked').length == 0 ||
      $('input[name="filter_floor[]"]:checked').length == 0) {
        continue;
      }

    var user_searchable = [
      user['full_name'],
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

  $("#user_directory_listing").html('');
  var content = $('<ul />').attr({class: 'list'});
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user['is_match'] === true) {
      content.append(
        $('<li />').append(
          $('<ul />')
            .attr({class: 'item'})
            .append(
              $('<li />', {
                text: user['full_name']
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
  $("#user_directory_listing").html(content);
}

$("#user_search").keyup(print_matching_users);
$('input:checkbox').click(print_matching_users);

print_matching_users();
});
</script>

<?php
$this->load->view('common/footer');
?>
