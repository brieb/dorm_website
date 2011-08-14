<?php $this->load->helper('url'); ?>

<html>
  <head>
    <title><?= $page_title ?></title>
    <script
      type="text/javascript"
      src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js">
    </script>
    <script
      type="text/javascript"
      src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js">
    </script>
    <link rel="stylesheet" href="/dorm_website/assets/css/Aristo/jquery-ui-1.8.7.custom.css">
  </head>
  <body>
  <div id="header">
    <ul>
      <li><?php echo anchor('calendar/index', 'Calendar'); ?></li>
      <li><?php echo anchor('user_directory/index', 'People'); ?></li>
    </ul>
  </div>
