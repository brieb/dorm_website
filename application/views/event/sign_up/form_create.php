<?php
//TODO remove
$this->load->view('header');
?>
<?php

$buttons = array(
  'text',
  'paragraph_text',
  'multiple_choice',
  'checkboxes',
  'choose_from_a_list',
);

foreach($buttons as $button) {
  echo form_button('sign_up_form_create['.$button.']',
    ucwords(preg_replace('/_/', ' ', $button)));
}

echo form_open('', array('id' => 'sign_up_form_create'));

echo form_submit('submit', 'Create Sign Up Form');
echo form_close();

?>

<script
  type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/jquery.serialize-list.js">
</script>
<script
  type="text/javascript"
  src="<?php echo base_url(); ?>assets/js/SignUpFormBuilder.js">
</script>

