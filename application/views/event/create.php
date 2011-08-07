<?php
$this->load->view('header', array('page_title' => 'Create an Event'));
$this->load->view('calendar/sidebar');
?>

<button id='button_sign_up' class='button_event_builder' type='button'>Sign Up</button>
<button id='button_sign_up_questions' class='button_event_builder' type='button'>Sign Up Questions</button>
<button id='button_payment' class='button_event_builder' type='button'>Payment</button>
<button id='button_event_location' class='button_event_builder' type='button'>Event Location</button>
<button id='button_meetup_info' class='button_event_builder' type='button'>Meetup Info</button>

<?php
$this->load->helper('form');

echo form_open('event/create', array('id' => 'event_create_form'));
echo form_error('title');
echo form_input(array(
  'name' => 'title',
  'placeholder' => 'Event Title',
  'value' => set_value('title')
));
echo form_error('datetime');
echo form_input(array(
  'name' => 'datetime',
  'value' => set_value('datetime')
));
echo form_error('description');
echo form_textarea(array(
  'name' => 'description',
  'value' => set_value('description')
));

if(isset($display_fields)) {
  foreach($display_fields as $display_field) {
    echo genFieldForType($display_field);
  }
}

echo form_submit('submit', 'Create Event');
echo form_close();
?>

<script type="text/javascript">
$(document).ready(function() {
  $('#event_create_form_dis').submit(function(eventData) {
    console.log(eventData);
    return false;
  });

  $('.button_event_builder').click(function() {
    var target = $(this);
    target.attr('disabled', 'disabled');
    var type = target.attr('id').replace(/button_/, '');

    var content_sign_up = <?php echo json_encode(genFieldSignUp()); ?>;
    var content_meetup_info = <?php echo json_encode(genFieldMeetupInfo()); ?>;

    //TODO preload field types?
    $.get("<?php echo site_url('event/getFieldByType'); ?>/"+type,
      function(data) {
        console.log(data);
        var insertBeforeElem = $('#event_create_form input[type=submit]');
        insertBeforeElem.before(data);
      }
    );

  });

});
</script>

<?php
$this->load->view('footer');
?>
