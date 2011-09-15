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

  <div id="login">
    <button>Login</button>
  </div>
</div>

<script>
$(document).ready(function () {
  $("#login button").button();
});
</script>

<?php
$this->load->view('common/footer');
?>
