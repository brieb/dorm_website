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
      if (!isset($js)) {
        $js = "main-default";
      }
      if (ENVIRONMENT == 'development'):
    ?>
      <script
        data-main="<?php echo base_url(); ?>assets/js/<?php echo $js; ?>"
        src="<?php echo base_url(); ?>assets/js/require-jquery.js">
      </script>
    <?php
      else:
    ?>
      <script
        data-main="<?php echo base_url(); ?>assets/js-build/<?php echo $js; ?>.js"
        src="<?php echo base_url(); ?>assets/js-build/require-jquery.js">
      </script>
    <?php
      endif;
    ?>

    <link rel="icon"
      href="<?php echo base_url().'assets/img/common/favicon.ico'; ?>" />

    <?php
      array_map(
        "includeCSS",
        array(
//          "third_party/Absolution/jquery.ui.all",
          "style",
        )
      );
    ?>

  </head>

  <body>
