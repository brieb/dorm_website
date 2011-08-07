<?php

function getFieldTypes() {
  return array(
    'sign_up',
    'payment',
    'event_location',
    'meetup_info',
  );
}

function genFieldForType($type) {
  switch ($type) {
    case "sign_up":
      return genFieldSignUp();
    case "payment":
      return genFieldPayment();
    case 'event_location':
      return genFieldEventLocation();
    case 'meetup_info':
      return genFieldMeetupInfo();
    default:
      return "";
  }
}

function genFieldset($legend_text, $form_field_name, $content) {
  $fieldset = form_fieldset($legend_text);
  $fieldset .= $content;
  $js = 'onClick="
    var target = $(this);
    target.parent().remove();
    $(\'#button_'.$form_field_name.'\').removeAttr(\'disabled\');
   "';
//  $button_attr_remove = array(
//    'content' => 'Remove',
//    ''
//  );
  $fieldset .= form_button('button_field_remove['.$form_field_name.']', 'Remove');
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
    'value' => set_value($field_form_name)
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

  return genFieldset('Meetup Info', 'meetup_info', $field_content);
}

