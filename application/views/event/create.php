<?php
$this->load->view('header', array('page_title' => 'Create an Event'));
$this->load->view('calendar/sidebar');
?>

<div id="event_create_buttons"></div>
<form
  id="event_create_form"
  action="<?php echo site_url('event/create'); ?>"
  method="post">
</form>

<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/EventCreate.js">
</script>
<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/SignUpFormBuilder.js">
</script>
<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/EventCreateSignUpWizard.js">
</script>
<script type="text/javascript">
$(document).ready(function() {
  $('button')
  EventCreate.init('event_create_buttons', 'event_create_form');
});
</script>

<?php
$this->load->view('footer');
?>
