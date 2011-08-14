<table>
<thead>
  <tr>
    <?php
    foreach($cols as $col) {
      echo "<th>{$col['header']}</th>";
    }
    ?>
  </tr>
</thead>

<tbody>
<?php
$numRows = isset($cols['name']) ? count($cols['name']) : 0;
for ($i = 0; $i < $numRows; $i++) {
  echo "<tr>";
  foreach($cols as $col) {
    echo "<td>";
    $val = $col['rows'][$i];
    if (!is_array($val)) {
      echo $val;
    } else {
      echo "<ul>";
      foreach ($val as $elem) {
       echo "<li>{$elem}</li>";
      }
      echo "</ul>";
    }
    echo "</td>";
  }
  echo "</tr>";
}
?>
<tbody>

</table>
