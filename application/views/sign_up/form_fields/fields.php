<form class="ui-form form_fields">
<?php
//TODO form action

foreach ($fields as $field) {
  $this->load->view(
    'sign_up/form_fields/field',
    array(
      'field' => $field
    )
  );
}
?>
</form>
