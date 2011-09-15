<?php
$this->load->view('common/assets',
  array('page_title' => $page_title)
);
?>

<div id="header">
  <div id="logo">
    <?php echo anchor('/', 'FroSoCo'); ?>
  </div>
  <div id="links">
    <ul class="menu">
      <li class="events">
        <a class="events_menuitem">Events</a>

        <ul class="submenu">
          <li>
            <?php
              echo anchor(
                'calendar/index',
                'Calendar',
                array('class' => 'calendar')
              );
            ?>
          </li>
          <li>
            <?php
              echo anchor(
                'event/view',
                'Event List',
                array('class' => 'event_list')
              );
            ?>
          </li>
          <li>
            <?php
              echo anchor(
                'event/create',
                'Create Event',
                array('class' => 'event_create')
              );
            ?>
          </li>
        </ul>
      </li>
      <li>
        <?php
          echo anchor(
            'user_directory/index',
            'People',
            array('class' => 'people')
          );
        ?>
      </li>
    </ul>
  </div>
</div>

<div id="main">
