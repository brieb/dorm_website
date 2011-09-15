<?php
$this->load->view(
  'common/header',
  array('page_title' => 'Create an Event')
);
?>

<div id="main">
  <div id="sidebar"></div>
  <div id="content"></div>
</div>


<link
  href="<?php
    echo base_url().
      "assets/third_party/jquery-ui-timepicker/".
      "jquery-ui-timepicker-addon.css";
  ?>"
  rel="stylesheet" />

<script
  type="text/javascript"
  src="<?php
    echo base_url().
      "assets/third_party/jquery-ui-timepicker/".
      "jquery-ui-timepicker-addon.js";
  ?>" >
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
<script type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/EventEdit.js">
</script>


<script type="text/javascript">
$(document).ready(function() {
  EventEdit.init(
    'sidebar', 'content', <?php echo $eventJSON ?>
  );
});
</script>


<?php
$this->load->view('common/footer');
?>
