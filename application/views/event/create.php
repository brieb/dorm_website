<button id='button_sign_up'           class='button_event_builder' type='button'>Sign Up</button>
<button id='button_sign_up_questions' class='button_event_builder' type='button'>Sign Up Questions</button>
<button id='button_payment'           class='button_event_builder' type='button'>Payment</button>
<button id='button_event_location'          class='button_event_builder' type='button'>Event Location</button>
<button id='button_meetup_info'            class='button_event_builder' type='button'>Meetup Info</button>

<?php echo validation_errors(); ?>

<?php
$this->load->helper('form');
var_dump($display_fields);

echo form_open('event/create', array('id' => 'event_create_form'));
echo form_error('default[title]');
echo form_input(array(
  'name' => 'default[title]',
  'placeholder' => 'Event Title',
  'value' => set_value('default[title]')
));
echo form_error('default[datetime]');
echo form_input(array(
  'name' => 'default[datetime]',
  'value' => set_value('default[datetime]')
));
echo form_error('default[description]');
echo form_textarea(array(
  'name' => 'default[description]',
  'value' => set_value('default[description]')
));

foreach($display_fields as $display_field) {
  switch ($display_field) {
    case "sign_up":
      echo genFieldSignUp();
      break;
    case "payment":
      echo genFieldPayment();
      break;
    case 'event_location':
      echo genFieldEventLocation();
      break;
    case 'meetup_info':
      echo genFieldMeetupInfo();
      break;
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

    $.get("<?php echo site_url('event/getFieldByType'); ?>/"+type,
      function(data) {
        console.log(data);

        var insertBeforeElem = $('#event_create_form input[type=submit]');

        var content = $(data);
        //content.append(
          //$('<button />')
            //.text('Remove')
            //.attr({
              //type: 'button'
            //})
            //.click(function(event) {
              //var target = $(event.target);
              //target.parent().remove();

              //$(this).removeAttr('disabled');
            //}.bind(this))
        //);

        insertBeforeElem.before(data);

      }.bind(this)
    );

    //var content = $('<fieldset />');
    //content.append($('<legend />').text(target.text()));

    //if (type === 'sign_up') {
      //content.append(
        //$('<input />')
          //.attr({
            //type: 'hidden',
            //name: 'sign_up[enabled]',
            //value: 'true'
          //})
      //);
    //} else if (type === 'payment') {
      //content.append(
        //$('<input />')
          //.attr({
            //type: 'text',
            //name: 'payment[price]',
            //placeholder: 'Price'
          //}),
        //$('<input />')
          //.attr({
            //type: 'text',
            //name: 'payment[instructions]',
            //placeholder: 'Instructions'
          //})
      //);
    //} else if (type === 'event_location') {
      //content.append(
        //$('<input />')
          //.attr({
            //type: 'text',
            //name: 'event_location[location]',
            //placeholder: 'Event Location'
          //})
      //);
    //} else if (type === 'meetup_info') {
      //content.append(
        //$('<input />')
          //.attr({
            //type: 'text',
            //name: 'meetup_info[info]',
            //placeholder: 'Meetup Info'
          //})
      //);
    //}

  });

});
</script>
