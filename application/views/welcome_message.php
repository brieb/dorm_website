<?php
$this->load->view('common/assets',
  array('page_title' => 'Welcome to FroSoCo!')
);
?>

<div id="welcome">
  <div id="logo">
    Freshman Sophomore
    <br/>
    College
  </div>

  <div id="photos">
    <?php
      $this->load->helper('directory');

      $photosDir = 'assets/img/welcome/';
      $photos = directory_map($photosDir);

      foreach ($photos as $photo) {
        echo '
          <img src="'.
            base_url().$photosDir.$photo.
          '" />
        ';
      }
    ?>
  </div>


  <?php
  if (isset($show_no_access_message) && $show_no_access_message) {
    echo "
      <div id='no_access_message'>
        <p>
          Sorry. At this time, only FroSoCo Residents and Staff can
          access the web site.
        </p>
        <p>
          If you feel as though you should have
          access, please email
          <a href='mailto:bbunge@stanford.edu'>Brie Bunge</a>.
        </p>
        <p>
          Thank you!
        </p>
      </div>
    ";
  } else {
    $link_enter = anchor('event/view', 'Enter');
    echo "
      <div id='login'>
        {$link_enter}
      </div>
    ";
  }
  ?>
</div>

<?php
$this->load->view('common/footer');
?>
