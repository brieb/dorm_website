<?php

function renderFields($fields) {
  if (!isset($fields)) {
    return;
  }
  $fields = unserialize($fields);
//  echo "<pre>";
//  print_r($fields);
//  echo "</pre>";
  renderFieldsRecursive($fields);
}

function renderFieldsRecursive($fields) {
  foreach ($fields as $key => $value) {
    $key = preg_replace('/_/', ' ', $key);
    $key = ucwords($key);

    echo "<ul>\n";
    if (!is_array($value)) {
      echo "<li>$key: $value</li>\n";
    } else {
      echo "<li>$key:</li>";

      echo "<li>\n";
      renderFieldsRecursive($value);
      echo "</li>\n";
    }
    echo "</ul>\n";
  }
}
