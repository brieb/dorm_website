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

echo form_submit('submit', 'Create Event');
echo form_close();
?>

<script type="text/javascript">
$(document).ready(function() {
  $('#event_create_form_dis').submit(function(eventData) {
    console.log(eventData);
    return false;
  });
});
</script>
