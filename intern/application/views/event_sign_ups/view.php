<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'View Event Sign Ups',
    'js' => 'main-event_sign_ups-view',
  )
);
?>

<div id="sidebar">
  <input
    id="search"
    type="text"
    name="filter"
    value=""
    placeholder="Search any field..."
  />
  <?php echo anchor('event_sign_ups/view_csv/'.$event_id, 'Export to Spreadsheet'); ?>
</div>

<div id="content">
  <div id="event_sign_ups">
  <table cellpadding="1" cellspacing="1">

  <thead>
    <tr>
      <th><input type="checkbox" /></th>
      <?php
      foreach($cols as $col) {
        echo "<th>{$col['header']}</th>";
      }
      ?>
    </tr>
  </thead>

  <tbody>
  <?php
  $numRows = count($cols['name']['rows']);
  for ($i = 0; $i < $numRows; $i++) {
    echo '<tr>';
    echo '<td><input type="checkbox" /></td>';
    foreach($cols as $col) {
      echo '<td>';
      $val = $col['rows'][$i];
      if (!is_array($val)) {
        echo $val;
      } else {
        echo '<ul>';
        foreach ($val as $elem) {
         echo "<li>{$elem}</li>";
        }
        echo '</ul>';
      }
      echo '</td>';
    }
    echo '</tr>';
  }
  ?>
  </tbody>

  </table>
  </div>
</div>
