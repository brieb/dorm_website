<div id="sidebar">
  <ul id="navigation">
    <li>
      <?php
        echo anchor(
          "calendar/index",
          "Calendar",
          array(
            'class' => 'calendar'
          )
        );
      ?>
    </li>
    <li>
      <?php
        echo anchor(
          "event/view",
          "Event List",
          array(
            'class' => 'event_list'
          )
        );
      ?>
    </li>
    <li>
      <?php
        echo anchor(
          "event/create",
          "Create an Event",
          array(
            'class' => 'event_create'
          )
        );
      ?>
    </li>
  </ul>
</div>
