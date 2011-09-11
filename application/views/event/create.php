<?php
$this->load->view('header', array('page_title' => 'Create an Event'));
$this->load->view('calendar/sidebar');
?>

<link
  href="<?php echo base_url(); ?>assets/third_party/jquery-ui-timepicker/jquery-ui-timepicker-addon.css"
rel="stylesheet" />
<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/third_party/jquery-ui-timepicker/jquery-ui-timepicker-addon.js">
</script>
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


<div id="container"></div>


<?php
$this->load->view('footer');
?>
