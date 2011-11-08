<?php
  $this->load->view(
    'common/header',
    array(
      'page_title' => 'Event',
      'js' => 'main-event-view',
    )
  );

  $this->load->helper('event/form_builder');
  $this->load->helper('remote_user');

  var_dump($event);

?>

<?php
  $sidebar = array();

  $actions_event = array();
  $actions_event[] = array(
    'title' => 'Edit Event',
    'id' => 'eventEdit',
    'action' => array(
      'class' => 'event',
      'method' => 'edit',
      'id' => $event['id'],
    ),
  );
  $actions_event[] = array(
    'hide' => ($event['sign_up_id'] == NULL),
    'title' => 'View Sign Ups',
    'id' => 'eventSignUps',
    'action' => array(
      'class' => 'event_sign_ups',
      'method' => 'view',
      'id' => $event['id'],
    ),
  );
  if (isset($event['sign_up'])) {
    $text = $event['sign_up']['is_open'] == 1 ?
      'Close Sign Ups' : 'Open Sign Ups';
    $is_open = $event['sign_up']['is_open'] == 1 ? 0 : 1;

    $actions_event[] = array(
      'title' => $text,
      'id' => 'eventSignUpsIsOpen',
      'action' => array(
        'class' => 'event_sign_ups',
        'method' => 'set_is_open',
        'event_id' => $event['id'],
        'sign_up_id' => $event['sign_up_id'],
        'is_open' => $is_open,
      ),
    );
  }

  $actions_sign_up = array();
  $actions_sign_up[] = array(
    'hide' => (
      $event['sign_up_id'] == NULL ||
      !$event['sign_up']['is_open']
    ),
    'title' => 'Request Sign Up',
    'id' => 'signUpResponse',
    'action' => array(
      'class' => 'sign_up_response',
      'method' => 'create',
    ),
    'isButton' => true,
  );

  $sidebar[] = $actions_event;
  $sidebar[] = $actions_sign_up;

  $sidebarContent = "";

  foreach ($sidebar as $sidebarBox) {
    $sidebarBoxContent = "";
    foreach ($sidebarBox as $elem) {
      if (
        remote_user_can_do($elem['action']) &&
        !(isset($elem['hide']) && $elem['hide'])
      ) {
        if (element('isButton', $elem)) {
          $sidebarBoxContent .=
          "<button id='{$elem['id']}'>".
            $elem['title'].
            "</button>";
        } else {
          $sidebarBoxContent .= anchor(
            $elem['action'],
            $elem['title'],
            array('id' => $elem['id'])
          );
        }
        $sidebarBoxContent .= "
        <script>
          require.ready(function () {
            $('#{$elem['id']}').button();
          });
        </script>
        ";
      }
    }

    if ($sidebarBoxContent != "") {
      $sidebarContent .=
      "<div class='sidebar-box'>".
        $sidebarBoxContent.
        "</div>";
    }
  }

?>


<?php if ($event['sign_up_id'] != NULL): ?>
<script>
  require.ready(function () {
      SignUpFormRenderer.init(
        "<?php echo $event['sign_up_id']; ?>",
        "<?php echo $sign_up_response_id; ?>",
        "<?php echo $event['title']; ?>",
        "signUpResponse"
      );
  });
</script>
<?php endif; ?>



<div id="main">

  <div id="sidebar">
    <?php echo $sidebarContent; ?>
  </div>


  <div id="content">
    <div id="event_view">
      <div class="title">
        <?php echo $event['title']; ?>
      </div>
      <div class="time">
        <?php
          echo $event['time_pretty_start'] . ' - ' .
          $event['time_pretty_end'];
        ?>
      </div>

      <div class="description">
        <?php echo nl2br($event['description']) ; ?>
      </div>

      <div class="fields">
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

