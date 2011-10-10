<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Calendar'
  )
);

if (ENVIRONMENT == 'development') {
  $CAL_SRC = "18oal9t6h3g9u3k1s4jigvoktk%40group.calendar.google.com";
} else {
  $CAL_SRC = "frosoco.stanford%40gmail.com";
}
?>

<div id="container">
  <div id="content" class="nosidebar">

    <iframe class="gcal"
            src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23e3e3e3&amp;src=<?php echo $CAL_SRC; ?>&amp;color=%23182C57&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23691426&amp;ctz=America%2FLos_Angeles"
            style=" border-width:0 " frameborder="0" scrolling="no"></iframe>

    <iframe class="gcal"
      src="https://www.google.com/calendar/embed?showPrint=0&amp;showCalendars=0&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23e3e3e3&amp;src=jtuj4fdh2d9tdib131nte8ul7k%40group.calendar.google.com&amp;color=%238C500B&amp;ctz=America%2FLos_Angeles"
      style=" border-width:0 " frameborder="0"
      scrolling="no"></iframe>

  </div>
</div>

<?php
$this->load->view('common/footer');
?>
