<?php
$this->load->view('common/header', array('page_title' => 'Create an Event'));
?>

<?php
  array_map(
    "includeCSS",
    array(
      "third_party/jquery-ui-timepicker-addon",
    )
  );

  array_map(
    "includeJS",
    array(
      "third_party/jquery-ui-timepicker-addon",
      "EventCreate",
      "SignUpFormBuilder",
      "EventCreateSignUpWizard",
    )
  );
?>


<script type="text/javascript">
$(document).ready(function() {
  EventCreate.init("sidebar", "content");
});
</script>


<div id="main">
  <div id="sidebar"></div>
  <div id="content"></div>
</div>

<?php
$this->load->view('common/footer');
?>
