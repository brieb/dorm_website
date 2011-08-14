<?php
  $this->load->view('header');
?>

<style>
#search {
  -webkit-border-radius: 10px;
  background-color: white;
  padding: 10px;
  position: fixed;
  right:40px;
  display: none;
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

<script>
//$(document).ready(function() {
  //$('thead').css({backgroundColor: '#111', color: '#ffffff'});
  //$('tbody tr:odd').css({backgroundColor: '#ccc'});

  //var prevColor = '';
  //$('tbody tr').hover(function(){
    //var row = $(this);
    //prevColor = row.css('backgroundColor');
    //row.css({backgroundColor: 'blue'});
  //}, function() {
    //$(this).css({backgroundColor: prevColor});
  //});
//});

$(document).ready(function() {
	zebraRows('tr:odd td', 'odd');

	$('tbody tr').hover(function(){
	  $(this).find('td').addClass('hovered');
	}, function(){
	  $(this).find('td').removeClass('hovered');
	});

	//default each row to visible
	$('tbody tr').addClass('visible');

	//overrides CSS display:none property
	//so only users w/ JS will see the
	//filter box
	$('#search').show();

	$('#filter').keyup(function(event) {
		//if esc is pressed or nothing is entered
    if (event.keyCode == 27 || $(this).val() == '') {
			//if esc is pressed we want to clear the value of search box
			$(this).val('');

			//we want each row to be visible because if nothing
			//is entered then all rows are matched.
      $('tbody tr').removeClass('visible').show().addClass('visible');
    }

		//if there is text, lets filter
		else {
      filter('tbody tr', $(this).val());
    }

		//reapply zebra rows
		$('.visible td').removeClass('odd');
		zebraRows('.visible:even td', 'odd');
	});

	//grab all header rows
	$('thead th').each(function(column) {
		$(this).addClass('sortable')
					.click(function(){
						var findSortKey = function($cell) {
							return $cell.text().toUpperCase();
						};

						var sortDirection = $(this).is('.sorted-asc') ? -1 : 1;

						//step back up the tree and get the rows with data
						//for sorting
						var $rows		= $(this).parent()
																.parent()
																.parent()
																.find('tbody tr')
																.get();

						//loop through all the rows and find
						$.each($rows, function(index, row) {
							row.sortKey = findSortKey($(row).children('td').eq(column));
						});

						//compare and sort the rows alphabetically
						$rows.sort(function(a, b) {
							if (a.sortKey < b.sortKey) return -sortDirection;
							if (a.sortKey > b.sortKey) return sortDirection;
							return 0;
						});

            $('tbody').empty();
						//add the rows in the correct order to the bottom of the table
						$.each($rows, function(index, row) {
							$('tbody').append(row);
							row.sortKey = null;
						});

						//identify the column sort order
						$('th').removeClass('sorted-asc sorted-desc');
						var $sortHead = $('th').filter(':nth-child(' + (column + 1) + ')');
						sortDirection == 1 ? $sortHead.addClass('sorted-asc') : $sortHead.addClass('sorted-desc');

						//identify the column to be sorted by
						$('td').removeClass('sorted')
									.filter(':nth-child(' + (column + 1) + ')')
									.addClass('sorted');

						$('.visible td').removeClass('odd');
						zebraRows('.visible:even td', 'odd');
					});
	});
});


//used to apply alternating row styles
function zebraRows(selector, className)
{
	$(selector).removeClass(className)
							.addClass(className);
}

//filter results based on query
function filter(selector, query) {
	query	=	$.trim(query); //trim white space
  query = query.replace(/ /gi, '|'); //add OR for regex

  $(selector).each(function() {
    ($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');
  });
}
</script>


<div id="search">
  <label for="filter">Filter</label> <input type="text" name="filter" value="" id="filter" />
</div>

<table cellpadding="1" cellspacing="1" id="resultTable">

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
$numRows = count($cols['name']['rows']);
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
</tbody>

</table>
