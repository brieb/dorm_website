<?php
$this->load->view('header', array('page_title' => 'Event'));
$this->load->view('calendar/sidebar');
$this->load->helper('event/form_builder');
?>

<div class="event_view_title">
  <?php echo $event['title']; ?>
</div>
<div class="event_view_time">
  <?php
    echo $event['time_pretty'];
  ?>
</div>
<div class="event_view_description">
  <?php echo $event['description']; ?>
</div>
<?php
renderFields($event['fields']);
?>

<?php
$this->load->view('footer');
?>