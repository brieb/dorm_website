<?php
  $this->load->view(
    'common/header',
    array(
      'page_title' => 'Event',
      'js' => 'main-event-view',
    )
  );

  $this->load->helper('remote_user');
?>

<?php
  $sidebar = array(
    array(
      array(
        'title' => 'Edit Event',
        'id' => 'eventEdit',
        'action' => array(
          'class' => 'event',
          'method' => 'edit',
          'id' => $event['id'],
        ),
      ),
      array(
        'hide' => ($event['sign_up_id'] == NULL),
        'title' => 'View Sign Ups',
        'id' => 'eventSignUps',
        'action' => array(
          'class' => 'event_sign_ups',
          'method' => 'view',
          'id' => $event['id'],
        ),
      ),
    ),
    array(
      array(
        'hide' => (
          $event['sign_up_id'] == NULL ||
          !$event['sign_up']['is_open']
        ),
        'title' => 'Sign Up',
        'id' => 'signUpResponse',
        'action' => array(
          'class' => 'sign_up_response',
          'method' => 'create',
        ),
        'isButton' => true,
      ),
    ),
  );

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

<?php

$fields_content = "";

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



<div id="container">

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
        <?php echo nl2br($event['description']); ?>
      </div>

      <div class="fields">
        <ul>
<?php

  if ($event['location'] != "") {
    echo "<li class=\"label\">Location:</li>\n";
    echo "<li class=\"value\">{$event['location']}</li>\n";
  }

  if ($event['meetup_info'] != "") {
    echo "<li class=\"label\">Meetup Info:</li>\n";
    echo "<li class=\"value\">{$event['meetup_info']}</li>\n";
  }

  if ($event['point_person'] != "") {
    echo "<li class=\"label\">Point Person:</li>\n";
    echo "<li class=\"value\">{$event['point_person']}</li>\n";
  }

  if ($event['payment_price'] != "" || $event['payment_instructions'] != "") {
    echo "<li class=\"label\">Payment:</li>\n";
    echo "<ul>";
    if ($event['payment_price'] != "") {
      echo "<li class=\"value\">Price: {$event['payment_price']}</li>\n";
    }
    if ($event['payment_instructions'] != "") {
      echo "<li class=\"value\">Insructions: {$event['payment_instructions']}</li>\n";
    }
    echo "</ul>";
  }

  ?>
        </ul>

      </div>
    </div>
  </div>

</div>

<?php
  $this->load->view('common/footer');
?>

