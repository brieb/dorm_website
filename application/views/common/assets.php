<?php
$this->load->helper('common/asset_helper');
?>

<html>
  <head>

    <title>
      <?php
        echo isset($page_title) ? $page_title : 'FroSoCo';
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
          "third_party/jquery.js",
          "third_party/jquery-ui.js",
          "js/Setup.js",
        )
      );
    ?>

    <link href="<?php echo base_url(); ?>assets/css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url(); ?>assets/css/print.css" media="print" rel="stylesheet" type="text/css" />
    <!--[if IE]>
        <link href="<?php echo base_url(); ?>assets/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]-->

    <link rel="icon"
      href="<?php echo base_url().'assets/img/common/favicon.ico'; ?>" />

    <?php
      array_map(
        "includeCSS",
        array(
          "third_party/jquery-ui-themes/Absolution/jquery.ui.all.css",
          "css/style.css",
        )
      );
    ?>

  </head>

  <body>
