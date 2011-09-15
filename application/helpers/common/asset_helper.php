<?php

function includeJS($filename) {
  echo '
    <script
      type="text/javascript"
      src="'.base_url().'assets/'.$filename.'">
    </script>
  ';
}

function includeCSS($filename) {
  echo '
    <link
      href="'.base_url().'assets/'.$filename.'"
      rel="stylesheet" />
  ';
}
