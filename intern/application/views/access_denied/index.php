<?php
$this->load->view(
  'common/assets',
  array(
    'page_title' => 'Access Denied',
  )
);
?>

<div id="access_denied">
  <div id="nav">
  </div>

  <div id="top">
    <div id="top_content">
      <div class="content_inner">
        <div class="image">
          <img
            src="<?php echo base_url() . 'assets/img/access_denied/sad_face.png'; ?>"
            alt="">
        </div>
        <div class="text">
          <div class="header">Sorry...</div>
          <div class="content">
            At this time, only FroSoCo Residents and Staff can<br/>
            access this part of the web site.<br/>
            If you feel as though you should have access,<br/>
            please email <a href="mailto:bbunge@stanford.edu">Brie Bunge</a>.
          </div>
          <div class="footer">
            Thank you for your interest!
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


