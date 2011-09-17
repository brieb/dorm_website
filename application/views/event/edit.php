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
      "EventEdit",
    )
  );
?>

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
