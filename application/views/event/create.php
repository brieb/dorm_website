<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Create an Event',
    'js' => 'main-event-create'
  )
);
?>

<?php
  array_map(
    "includeCSS",
    array(
      "third_party/jquery-ui-timepicker-addon",
    )
  );
?>

<div id="main">
  <div id="sidebar"></div>
  <div id="content"></div>
</div>

<?php
$this->load->view('common/footer');
?>
