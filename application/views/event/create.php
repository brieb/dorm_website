<?php
$this->load->view('header', array('page_title' => 'Create an Event'));
$this->load->view('calendar/sidebar');
?>

<div id="container"></div>

<div id="event_create_buttons"></div>
<form id="event_create_form"></form>


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
  EventCreate.init();
});
</script>


<?php
$this->load->view('footer');
?>
