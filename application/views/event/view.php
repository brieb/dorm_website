<?php
$this->load->view('header', array('page_title' => 'Event'));
$this->load->view('calendar/sidebar');
$this->load->helper('event/form_builder');
?>
<script
  type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/SignUpFormRenderer.js">
</script>


<?php
//TODO permissions

if (true):
?>
<button id="eventEdit">Edit Event</button>
<script>
$(document).ready(function () {
  $('#eventEdit')
    .button()
    .click(function () {
      window.location = "<?php echo site_url('/event/edit/'.$event['id']); ?>";
    });
});
</script>
<?php endif; ?>

<?php if ($event['sign_up_id'] != NULL): ?>
<button id="button_sign_up">Sign Up</button>
<script>
$(document).ready(function () {
  $('#button_sign_up')
    .button()
    .click(function () {
      SignUpFormRenderer.init(
        "<?php echo $event['sign_up_id']; ?>",
        "<?php echo $event['title']; ?>"
      );
    });
});
</script>
<?php endif; ?>

<div class="event_view_title">
  <?php echo $event['title']; ?>
</div>
<div class="event_view_time">
  <?php
    echo $event['time_pretty_start'] . " - ". $event['time_pretty_end'];
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


