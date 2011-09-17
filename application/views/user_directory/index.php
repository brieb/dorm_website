<?php
$this->load->view(
  'common/header',
  array('page_title' => 'People')
);
?>

<div id="sidebar">
  <input
    id="user_search"
    type='text'
    name='user_search'
    placeholder='Enter a name or email...'>
  </input>

  <div id="checkboxes_house" class="sidebar-box">
    <input
      id="house_schiff"
      type="checkbox"
      name="filter_house[]" checked
      value="schiff"/>
    <label for="house_schiff">Schiff</label>
    <br/>

    <input
      id="house_adams"
      type="checkbox"
      name="filter_house[]" checked
      value="adams"/>
    <label for="house_adams">Adams</label>
    <br/>
  </div>

  <div id="checkboxes_floor" class="sidebar-box">
    <input
      id="floor_1"
      type="checkbox"
      name="filter_floor[]" checked
      value="1"/>
    <label for="floor_1">Floor 1</label>
    <br/>

    <input
      id="floor_2"
      type="checkbox"
      name="filter_floor[]" checked
      value="2"/>
    <label for="floor_2">Floor 2</label>
    <br/>

    <input
      id="floor_3"
      type="checkbox"
      name="filter_floor[]" checked
      value="3"/>
    <label for="floor_3">Floor 3</label>
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
            user['email'],
            user['house'],
            user['staff_role'],
            user['room']
          ];

          user['is_match'] =
            user['house'] !== null &&
              (user['house'].search(match_house_regex) >= 0) &&
              user['room'] !== null &&
              (user['room'].search(match_floor_regex) >= 0);

          var match_text = false;
          for (var j = 0; j < user_searchable.length; j++) {
            if (
              user_searchable[j] !== null &&
                user_searchable[j].search(search_regex) >= 0
            ) {
              match_text = true;
              break;
            }
          }
          user['is_match'] = user['is_match'] && match_text;
        }
      }

      var print_matching_users = function() {
        detect_matching_users();

        var numInCol1 = 0;
        var numInCol2 = 0;

        $("#user_directory_listing").html('');

        var content = $('<table />');
        var currentRow = $('<tr />');

        for (var i = 0; i < users.length; i++) {

          var user = users[i];
          if (user['is_match'] === true) {
            var currentCell = $('<td />');
            var currentCellContent = $('<ul />');

            currentCellContent.append(
              $('<li />')
                .attr({
                  'class': 'photo'
                })
                .append(
                $('<img />')
                  .attr({
                    'src': BASE_URL + user['photo']
                  })
              ),
              $('<li />', {
                text: user['full_name'],
                'class': 'name'
              }),
              $('<li />')
                .attr({ 'class': 'email' })
                .append(
                $('<a />')
                  .attr({ 'href': 'mailto:' + user['email'] })
                  .text(user['email'])
              ),
              $('<li />', {
                text: user['house'] + " " + user['room'],
                'class': 'room'
              })
            );

            if (user['staff_role'] !== null) {
              currentCellContent.append(
                $('<li />', {
                    text: user['staff_role'],
                    'class': 'staff_role'
                })
              );
            }

            currentCell.append(currentCellContent);
            currentRow.append(currentCell);

            if (numInCol1 <= numInCol2) {
              numInCol1++;
            } else {
              numInCol2++;
            }

            if (numInCol1 === numInCol2) {
              content.append(currentRow);
              currentRow = $('<tr />');
            }
          }
        }

        if (numInCol1 > numInCol2) {
          currentRow.append(
            $('<td />')
              .attr({ 'class': 'empty' })
          );
          content.append(currentRow);
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
