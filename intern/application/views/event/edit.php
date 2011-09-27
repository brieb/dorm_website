<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Edit Event',
    'js' => 'main-event-edit',
  )
);
?>

<div id="main">
  <div id="sidebar"></div>
  <div id="content"></div>
</div>

<script type="text/javascript">
require.ready(function() {
  EventEdit.init(
    'sidebar', 'content', <?php echo $eventJSON ?>
  );
});
</script>


<?php
$this->load->view('common/footer');
?>
