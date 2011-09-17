<?php

  function minIfProd($filename, $ext) {
    $fileMin = "assets/{$ext}/{$filename}-min.{$ext}";
    if (defined('ENVIRONMENT') && ENVIRONMENT == 'production'
      && file_exists($fileMin)
    ) {
      $filename .= "-min";
    }

    return $filename . '.' . $ext;
  }

  function includeJS($filename) {
    $filename = minIfProd($filename, "js");

    echo '<script
      type="text/javascript"
      src="' . base_url() . 'assets/js/' . $filename . '">
    </script>';
  }

  function includeCSS($filename) {
    $filename = minIfProd($filename, "css");

    echo '<link
      href="' . base_url() . 'assets/css/' . $filename . '"
      rel="stylesheet" />';
  }
