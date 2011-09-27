<?php

function renderFields($fields) {
  if (!isset($fields)) {
    return;
  }
  $fields = unserialize($fields);
  renderFieldsRecursive($fields);
}

function renderFieldsRecursive($fields) {
  foreach ($fields as $key => $value) {
    $key = preg_replace('/_/', ' ', $key);
    $key = ucwords($key);

    echo "<ul>\n";
    if (!is_array($value)) {
      echo "<li class=\"value\">$key: $value</li>\n";
    } else {
      echo "<li class=\"label\">$key:</li>";

      echo "<li>\n";
      renderFieldsRecursive($value);
      echo "</li>\n";
    }
    echo "</ul>\n";
  }
}
