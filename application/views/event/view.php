<?php
$this->load->view(
  'common/header',
  array('page_title' => 'Event')
);

$this->load->helper('event/form_builder');
?>

<script
  type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/SignUpFormRenderer.js">
</script>

<div id="main">

  <div id="sidebar">

    <?php
    //TODO permissions

      if (true):
    ?>
    <div class="sidebar-box">
      <?php
        echo anchor(
          'event/edit/'.$event['id'],
          'Edit Event',
          array('id' => 'eventEdit')
        );

        if ($event['sign_up_id'] != NULL) {
          echo anchor(
            'event_sign_ups/view/'.$event['id'],
            'View Sign Ups',
            array('id' => 'eventSignUps')
          );
        }
      ?>
      <script>
      $(document).ready(function () {
        $('#eventEdit').button();
        $('#eventSignUps').button();
      });
      </script>
    </div>
    <?php endif; ?>

    <?php if ($event['sign_up_id'] != NULL): ?>
      <div class="sidebar-box">
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
      </div>
    <?php endif; ?>

  </div>


  <div id="content">
    <div id="event_view">
      <div class="event_view_title">
        <?php echo $event['title']; ?>
      </div>
      <div class="event_view_time">
        <?php
          echo $event['time_pretty_start'] . ' - '. $event['time_pretty_end'];
        ?>
      </div>

      <div class="event_view_description">
        <?php echo $event['description']; ?>
      </div>

      <div class="event_view_fields">
        <?php
          renderFields($event['fields']);
        ?>
      </div>
    </div>
  </div>

</div>

<?php
$this->load->view('common/footer');
?>


