<fieldset class="form_field">

<div class="text">
<?php echo $field['text']; ?>
</div>

<div class="field">
<?php
$this->load->view(
  'sign_up/form_fields/'.$field['type'],
  array(
    'field' => $field
  )
);
?>
</div>

</fieldset>
