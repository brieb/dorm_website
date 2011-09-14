<?php
$this->load->view('common/header',
  array('page_title' => 'Calendar')
);
$this->load->view('calendar/sidebar');
?>

<iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=frosoco.stanford%40gmail.com&amp;color=%23182C57&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23691426&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="800" height="600" frameborder="0" scrolling="no"></iframe>

<?php
$this->load->view('common/footer');
?>
