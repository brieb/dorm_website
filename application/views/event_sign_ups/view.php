<?php
  $this->load->view('common/header');
?>

<style>
#search {
  -webkit-border-radius: 10px;
  background-color: white;
  padding: 10px;
  position: absolute;
  left:10px;
  width: 100px;
  display: none;
}

#event_sign_ups {
  margin-left: 200px;
}

table {
  background-color: white;
  -webkit-border-radius: 10px;
  width: 100%;
  padding: 10px;
}
  th.sortable {
    color: #666;
    cursor: pointer;
    text-decoration: underline;
  }
  th.sortable:hover { color: black; }
  th.sorted-asc, th.sorted-desc  { color: black; }

  td {
    background-color: white;
  }
  td.odd {
    background-color: #666;
    color: white;
  }

  td.hovered {
    background-color: lightblue;
    color: #666;
  }
</style>

<script src="<?php echo base_url(); ?>/assets/js/EventSignUpsView.js"></script>


<div id="search">
  <label for="filter">Filter</label>
  <input type="text" name="filter" value="" id="filter" />
</div>

<div id="event_sign_ups">
<table cellpadding="1" cellspacing="1">

<thead>
  <tr>
    <th><input type="checkbox"></input></th>
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
  echo '<td><input type="checkbox"></input></td>';
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
