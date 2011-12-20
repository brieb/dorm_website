<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Create an Event',
    'js' => 'main-event-form'
  )
);
?>

<div class="layout_full">
  <div id="content" class="content nosidebar nopadding">
    <div class="heading">Create an Event</div>

    <form id="event_create_fields" method="POST">
      <?php echo $this->event_form->render(); ?>
      <input type="submit" value="Create Event"/>
    </form>
  </div>
</div>

<?php
$this->load->view('common/footer');
?>
