<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Create an Event',
    'js' => 'main-event-create'
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
