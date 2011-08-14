<?php
$this->load->view('header', array('page_title' => 'Event'));
$this->load->view('calendar/sidebar');
$this->load->helper('event/form_builder');
?>
<script
  type="text/javascript"
  src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js">
</script>
<script
  type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/SignUpFormRenderer.js">
</script>
<script>
$(document).ready(function () {
  $('#button_sign_up')
    .button()
    .click(function () {
      SignUpFormRenderer.init(
        "<?php echo site_url("sign_up/view/".$event['sign_up_id']); ?>",
        "<?php echo site_url('sign_up_response/create'); ?>",
        "<?php echo $event['sign_up_id']; ?>"
      );
    });


});
</script>

<?php if ($event['sign_up_id'] != NULL): ?>
<button id="button_sign_up">Sign Up</button>
<?php endif; ?>

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


