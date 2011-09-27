<?php
$opts = array();
if (isset($page_title)) {
  $opts['page_title'] = $page_title;
}
$this->load->view('common/assets', $opts);
?>

<div id="header">
  <div id="logo">
    <?php echo anchor('/', 'FroSoCo'); ?>
  </div>
  <div id="links">
    <?php
      echo $this->mainmenu->render();
    ?>
  </div>
</div>

