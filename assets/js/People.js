var People = {};

People = {
  users: null,

  init: function(users) {
    this.users = users;

    $("#user_search").keyup(function(){
      this.print_matching_users();
    }.bind(this));
    $('input:checkbox').click(function(){
      this.print_matching_users();
    }.bind(this));

    this.print_matching_users();
  },
  detect_matching_users: function() {
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

    var match_role = {
      residents: false,
      staff: false
    };
    $('input[name="filter_role[]"]:checked').each(
      function() {
        match_role[this.value] = true;
      }
    );

    var match_class = {
      freshman: false,
      sophomore: false,
      junior: false,
      senior: false
    };
    $('input[name="filter_class[]"]:checked').each(
      function() {
        match_class[this.value] = true;
      }
    );

    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];

      user['is_match'] = false;

      if ($('input[name="filter_house[]"]:checked').length == 0 ||
        $('input[name="filter_floor[]"]:checked').length == 0) {
        continue;
      }

      var isStaff = (user['staff_role'] !== null);
      if (
        (!isStaff && !match_role.residents) ||
          (isStaff && !match_role.staff)
        ) {
        continue;
      }

      if (!user['class'] || !match_class[user['class'].toLowerCase()]) {
        continue;
      }


      var user_searchable = [
        user['full_name'],
        user['email'],
        user['house'],
        user['staff_role'],
        user['room'],
        user['house'] + ' ' + user['room']
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
  },
  print_matching_users: function() {
    this.detect_matching_users();

    var numInCol1 = 0;
    var numInCol2 = 0;

    $("#user_directory_listing").html('');

    var content = $('<table />');
    var currentRow = $('<tr />');

    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];

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
          }),
          $('<li />', {
            text: user['class'],
            'class': 'class'
          })
        );

        if (user['staff_role'] !== null) {
          currentCellContent.append(
            $('<li />', {
              'text': user['staff_role'],
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
        $('<td />').attr({ 'class': 'empty' })
      );
      content.append(currentRow);
    }

    $("#user_directory_listing").html(content);
  }
};
