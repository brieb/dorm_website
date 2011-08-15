<?php
$this->load->view('header', array('page_title' => 'Create an Event'));
$this->load->view('calendar/sidebar');
?>

<div id="event_create_buttons"></div>

<?php
$this->load->helper('form');

echo form_open('event/create', array('id' => 'event_create_form'));

echo form_submit('submit', 'Create Event');
echo form_close();
?>

<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/EventCreate.js">
</script>
<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/SignUpFormBuilder.js">
</script>
<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/EventCreateSignUpWizard.js">
</script>

<?php
$this->load->view('footer');
?>
