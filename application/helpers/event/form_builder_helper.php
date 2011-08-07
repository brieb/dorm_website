<?php

function genFieldset($legend_text, $form_field_name, $content) {
  $fieldset = form_fieldset($legend_text);
  $fieldset .= $content;
  $js = 'onClick="
    var target = $(this);
    target.parent().remove();
    $(\'#button_'.$form_field_name.'\').removeAttr(\'disabled\');
   "';
  $fieldset .= form_button('', 'Remove', $js);
  $fieldset .= form_fieldset_close();
  return $fieldset;
}

function genFieldSignUp() {
  $field_content = "";

  $field_form_name = 'form_builder[sign_up][enabled]';
  $field_content .= form_error($field_form_name);
  $field_content .= form_hidden($field_form_name, 'true');

  return genFieldset('Sign Up', 'sign_up', $field_content);
}

function genFieldPayment() {
  $field_content = "";

  $field_form_name = 'form_builder[payment][price]';
  $field_content .= form_error($field_form_name);
  $field_content .= form_input(array(
    'type' => 'text',
    'name' => $field_form_name,
    'placeholder' => 'Price',
    'value' > set_value($field_form_name)
  ));

  $field_form_name = 'form_builder[payment][instructions]';
  $field_content .= form_error($field_form_name);
  $field_content .= form_input(array(
    'type' => 'text',
    'name' => $field_form_name,
    'placeholder' => 'Instructions',
    'value' => set_value($field_form_name)
  ));

  return genFieldset('Payment', 'payment', $field_content);
}

function genFieldEventLocation() {
  $field_content = "";

  $field_form_name = 'form_builder[event_location][location]';
  $field_content .= form_error($field_form_name);
  $field_content .= form_input(array(
    'type' => 'text',
    'name' => $field_form_name,
    'placeholder' => 'Event Location',
    'value' => set_value($field_form_name)
  ));
  var_dump(set_value($field_form_name));

  return genFieldset('Event Location', 'event_location', $field_content);
}

function genFieldMeetupInfo() {
  $field_content = "";

  $field_form_name = 'form_builder[meetup_info][info]';
  $field_content .= form_error($field_form_name);
  $field_content .= form_input(array(
    'type' => 'text',
    'name' => $field_form_name,
    'placeholder' => 'Meetup Info',
    'value' => set_value($field_form_name)
  ));

  return genFieldset('Meetup Info', 'meeting_info', $field_content);
}

