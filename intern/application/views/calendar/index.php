<?php
$this->load->view('common/header',
  array(
    'page_title' => 'Calendar'
  )
);
?>

<div id="content" class="nosidebar nopadding">
  <?php
  if (ENVIRONMENT == 'development') {
    $CAL_SRC = "18oal9t6h3g9u3k1s4jigvoktk%40group.calendar.google.com";
  } else {
    $CAL_SRC = "frosoco.stanford%40gmail.com";
  }
  ?>
  <iframe id="gcal" src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=<?php echo $CAL_SRC; ?>&amp;color=%23182C57&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23691426&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " frameborder="0" scrolling="no"></iframe>
</div>

<?php
$this->load->view('common/footer');
?>
