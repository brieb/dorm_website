<html>
  <head>

    <title><?php echo $page_title; ?></title>

    <script
      type="text/javascript"
      src="<?php echo base_url(); ?>assets/third_party/jquery.js">
    </script>
    <script
      type="text/javascript"
      src="<?php echo base_url(); ?>assets/third_party/jquery-ui.js">
    </script>
    <script type="text/javascript">
        var BASE_URL = "<?php echo base_url(); ?>";
        var SITE_URL = "<?php echo site_url(); ?>";
    </script>
    <script
      type="text/javascript"
      src="<?php echo base_url(); ?>assets/js/Setup.js">
    </script>

    <link href="<?php echo base_url(); ?>assets/css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url(); ?>assets/css/print.css" media="print" rel="stylesheet" type="text/css" />
    <!--[if IE]>
        <link href="<?php echo base_url(); ?>assets/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]-->

    <link
      rel="stylesheet"
      href="<?php echo base_url(); ?>assets/third_party/jquery-ui-themes/Absolution/jquery.ui.all.css">

    <link
      rel="stylesheet"
      href="<?php echo base_url(); ?>assets/css/style.css">

  </head>

  <body>
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
