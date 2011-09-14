<?php
//TODO remove this used for testing
$this->load->view('common/header');
?>
<script
  type="text/javascript"
  src="<?php $this->load->helper('url'); echo base_url(); ?>assets/js/SignUpFormBuilder.js">
</script>

<button name="button_field_add[sign_up]" type="button">Sign Up</button>

<div id='sign_up_form_dialog'>
<?php

//$buttons = array(
  //'text',
  //'paragraph_text',
  //'multiple_choice',
  //'checkboxes',
  //'choose_from_a_list',
//);

//foreach($buttons as $button) {
  //echo form_button('sign_up_form_create['.$button.']',
    //ucwords(preg_replace('/_/', ' ', $button)));
//}

//echo form_open('',
  //array(
    //'id' => 'sign_up_form_create',
    //'class' => 'ui-form'
  //));

//echo form_close();

?>
</div>
