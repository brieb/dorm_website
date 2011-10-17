<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Create an Event',
    'js' => 'main-event-create'
  )
);
?>

<?php

//$fields_default = array(
//
//);
//$fields_default_content = "";
//foreach ($fields_default as $field_default) {
//  $fields_default_content .= "<div class=\"field\">"
//  $fields_default_content .= "<label for=\"{$field_default['id']}\">{$field_default['label']}:</label>";
//
//  $num_inputs = count($field_default['inputs']);
//  if ($num_inputs == 1) {
//    $fields_default_content .= "
//      <input
//          id=\"{$input['id']}\" name=\"{$input['id']}\"
//          type=\"text\"
//          placeholder=\"{$input['placeholder']}\"
//          class=\"width_full\" />
//    ";
//  }
//
//  foreach ($field_default['inputs'] as $input) {
//
//  }
//
//  $fields_default_content .= "</div>";
//}

?>

<div class="layout_full">
  <div id="content" class="content nosidebar nopadding">
    <div class="heading">Create an Event</div>

    <form id="event_create_fields" method="POST">
      <?php echo $this->event_form->render(); //echo get_event_form_content(); ?>
      <input type="submit" value="Create Event"/>
    </form>
  </div>
</div>

<?php
$this->load->view('common/footer');
?>
