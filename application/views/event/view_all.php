<?php
$this->load->view(
  'header',
  array('page_title' => 'Event List')
);
$this->load->view('calendar/sidebar');
?>
<input id="search" type="text" placeholder="Search for an event..."></input>

<button class="sort_by active asc" type="button" value="title">Title</button>
<button class="sort_by" type="button" value="time">Time</button>

<input id="only_my_sign_ups"
       type="checkbox">Only Show the Events that I am Signed Up For</input>

<div id="event_list"></div>

<script type="text/javascript">
  $(document).ready(function () {
    var events = <?php echo $events ?>;

    for (var i = 0; i < events.length; i++) {
      events[i].time = new Date(events[i].time);
    }

    var render_content = function() {
      var sort_by_elem = $('.sort_by.active');
      var sort_by = {
        field: sort_by_elem.val(),
        direction: sort_by_elem.hasClass('desc') ? 'desc' : 'asc'
      };

      var event_sort = function(event1, event2) {
        //TODO account for 'the's and stuff
        //TODO fall back to date sort when fields match
        var elem1, elem2;
        if (typeof(event1[sort_by.field]) === 'string') {
          elem1 = event1[sort_by.field].toLowerCase();
          elem2 = event2[sort_by.field].toLowerCase();
        } else {
          elem1 = event1[sort_by.field];
          elem2 = event2[sort_by.field];
        }
        if (sort_by.direction === 'asc') {
          return ((elem1 < elem2) ? -1 : ((elem1 > elem2) ? 1 : 0));
        } else {
          return ((elem2 < elem1) ? -1 : ((elem2 > elem1) ? 1 : 0));
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
                $('<h1/>').append(
                  $('<a/>').attr({
                    href: "<?php echo site_url('event/view'); ?>/"+events[i].id
                  }).text(events[i].title)),
                  $('<span/>', {
                    text: events[i].time_pretty
                  }),
                  $('<p/>', {
                    text: events[i].description
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

<?php
$this->load->view('footer');
?>
