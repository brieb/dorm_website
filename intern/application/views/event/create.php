<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Create an Event',
    'js' => 'main-event-create'
  )
);
?>

<div class="layout_full">
<!--  <div id="sidebar"></div>-->
  <div id="content" class="content"></div>
</div>

<?php
$this->load->view('common/footer');
?>
