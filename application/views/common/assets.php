<html>
  <head>

    <title>
      <?php
        echo isset($page_title) ? $page_title . ' | FroSoCo'  : 'FroSoCo';
      ?>
    </title>

    <script type="text/javascript">
        var BASE_URL = "<?php echo base_url(); ?>";
        var SITE_URL = "<?php echo site_url(); ?>";
    </script>

    <?php
      array_map(
        "includeJS",
        array(
          "third_party/jquery",
          "third_party/jquery-ui-min",
          "Setup",
        )
      );
    ?>

    <link href="<?php echo base_url(); ?>assets/css/screen-min.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url(); ?>assets/css/print-min.css" media="print" rel="stylesheet" type="text/css" />
    <!--[if IE]>
        <link href="<?php echo base_url(); ?>assets/css/ie-min.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]-->

    <link rel="icon"
      href="<?php echo base_url().'assets/img/common/favicon.ico'; ?>" />

    <?php
      array_map(
        "includeCSS",
        array(
          "reset-min",
          "third_party/Absolution/jquery.ui.all",
          "style",
        )
      );
    ?>

  </head>

  <body>
