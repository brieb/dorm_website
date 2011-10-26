<?php
$this->load->view('common/header',
  array(
    'page_title' => 'Notes'
  )
);
?>

<div id="content" class="nosidebar nopadding">
  <div class="note_doc">
    <iframe
      width="100%"
      height="100%"
      src="https://docs.google.com/document/pub?id=1pGzTKnwMSSdJQBt0yWuost9nvhbmJ29ZQfteraqYefY&amp;embedded=true">
    </iframe>
  </div>
</div>

<?php
$this->load->view('common/footer');
?>
