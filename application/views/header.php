<?php $this->load->helper('url'); ?>

<html>
  <head>

    <title><?= $page_title ?></title>

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

    <link
      rel="stylesheet"
      href="/dorm_website/assets/css/Aristo/jquery-ui-1.8.7.custom.css">

  </head>

  <body>
  <div id="header">
    <ul>
      <li><?php echo anchor('calendar/index', 'Calendar'); ?></li>
      <li><?php echo anchor('user_directory/index', 'People'); ?></li>
    </ul>
  </div>
