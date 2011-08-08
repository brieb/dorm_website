<?php

function getFieldTypes() {
  return array(
    array(
      'name' => 'sign_up',
      'pretty' => 'Sign Up'
    ),
    array(
      'name' => 'event_location',
      'pretty' => 'Event Location'
    ),
    array(
      'name' => 'payment',
      'pretty' => 'Payment'
    ),
    array(
      'name' => 'meetup_info',
      'pretty' => 'Meetup Info'
    )
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
  $fieldset .= form_button(
    'button_field_remove[' . $form_field_name . ']', 'Remove'
  );
  $fieldset .= form_fieldset_close();
  return $fieldset;
}

function genFormInput($placeholder_text, $field_form_name) {
  $field_content = "";
  $field_content .= form_error($field_form_name);
  $field_content .= form_input(
    array(
         'type' => 'text',
         'name' => $field_form_name,
         'placeholder' => $placeholder_text,
         'value' => set_value($field_form_name)
    )
  );
  return $field_content;
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
  $field_content .= genFormInput('Price', 'form_builder[payment][price]');
  $field_content .= genFormInput(
    'Instructions', 'form_builder[payment][instructions]'
  );
  return genFieldset('Payment', 'payment', $field_content);
}

function genFieldEventLocation() {
  $field_content = "";
  $field_content .= genFormInput(
    'Event Location', 'form_builder[event_location][location]'
  );
  return genFieldset('Event Location', 'event_location', $field_content);
}

function genFieldMeetupInfo() {
  $field_content = "";
  $field_content .= genFormInput(
    'Enter meetup info (ex: Schaddify at 10pm)',
    'form_builder[meetup_info][info]'
  );
  return genFieldset('Meetup Info', 'meetup_info', $field_content);
}

function renderFields($fields) {
  if (!isset($fields)) {
    return;
  }
  $fields = unserialize($fields);
//  echo "<pre>";
//  print_r($fields);
//  echo "</pre>";
  renderFieldsRecursive($fields);
}

function renderFieldsRecursive($fields) {
  foreach ($fields as $key => $value) {
    $key = preg_replace('/_/', ' ', $key);
    $key = ucwords($key);

    echo "<ul>\n";
    if (!is_array($value)) {
      echo "<li>$key: $value</li>\n";
    } else {
      echo "<li>$key:</li>";

      echo "<li>\n";
      renderFieldsRecursive($value);
      echo "</li>\n";
    }
    echo "</ul>\n";
  }
}