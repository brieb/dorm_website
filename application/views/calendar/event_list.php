<input id="search" type="text" placeholder="Search for an event..."></input>

<button class="sort_by active asc" type="button" value="title">Title</button>
<button class="sort_by" type="button" value="date">Date</button>

<input id="only_my_sign_ups" type="checkbox">Only Show the Events that I am Signed Up For</input>

<div id="event_list"></div>

<script type="text/javascript">
$(document).ready(function () {
  var events = <?php echo $events ?>;

  var render_content = function() {
    var sort_by_elem = $('.sort_by.active');
    var sort_by = {
      field: sort_by_elem.val(),
      direction: sort_by_elem.hasClass('desc') ? 'desc' : 'asc'
    };

    var event_sort = function(event1, event2) {
      //TODO account for 'the's and stuff
      //TODO fall back to date sort when fields match
      //var str1 = event1[sort_by.field].toLowerCase();
      //var str2 = event2[sort_by.field].toLowerCase();
      var str1 = event1[sort_by.field];
      var str2 = event2[sort_by.field];

      if(sort_by.direction === 'asc') {
        return ((str1 < str2) ? -1 : ((str1 > str2) ? 1 : 0));
      } else {
        return ((str2 < str1) ? -1 : ((str2 > str1) ? 1 : 0));
      }
    };
    events.sort(event_sort);


    var container = $('#event_list');
    container.html('');
    for (var i = 0; i < events.length; i++) {
      events[i].is_match = false;

      var search_text = $('#search').val();
      var search_text_regex = new RegExp(search_text, 'i');
      events[i].is_match =
        events[i].title.search(search_text_regex) >= 0 ||
        events[i].description.search(search_text_regex) >= 0;


      if (events[i].is_match) {
        container.append(
          $('<div />').append(
            $('<h1/>', {
              text: events[i]['title']
            }),
            $('<span/>', {
              text: events[i]['date'] + ' @ ' + events[i]['time']
            }),
            $('<p/>', {
              text: events[i]['description']
            })
          )
        );
      }
    }
  };

  $('.sort_by').click(function(event) {
    var target = $(event.target);
    console.log(target);
    if (target.hasClass('active')) {
      if (target.hasClass('asc')) {
        target.removeClass('asc');
        target.addClass('desc');
      } else {
        target.removeClass('desc');
        target.addClass('asc');
      }
    } else {
      $('.sort_by').removeClass('active');
      target.addClass('active asc');
    }
    render_content();
  });

  $('#search').keyup(function() {
    render_content();
  });

  render_content();
});
</script>

