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

    <form id="event_create_fields">

      <div class="field">
        <label class="label" for="title">Title: </label>
        <input
          id="title" name="title"
          placeholder="ex: End of the Year Banquet"
          type="text"
          class="width_full"/>
      </div>

      <div class="field">
        <label class="label" for="start_date">Start: </label>
        <input
          id="start_date" name="start_date"
          type="text"
          class="date width_half"/>
        <input
          type="text"
          id="start_time" name="start_time"
          class="time width_half last"/>
      </div>

      <div class="field">
        <label class="label" for="end_date">End: </label>
        <input
          type="text"
          id="end_date" name="end_date"
          class="date width_half"/>
        <input
          type="text"
          id="end_time" name="end_time"
          class="time width_half last"/>
      </div>

      <div class="field">
        <label
          class="label"
          for="description">Description: </label>
        <textarea
          name="description" id="description"
          placeholder=""
          class="width_full"></textarea>
      </div>


      <fieldset class="event_specific">
        <legend>Event-Specific Information</legend>

        <fieldset>
          <legend>Location</legend>
          <div class="field">
            <label class="label" for="location">Location: </label>

            <input
              type="text" id="location" name="location"
              placeholder=""
              class="width_full"/>
          </div>
        </fieldset>

        <fieldset>
          <legend>Meetup Info</legend>
          <div class="field">
            <label class="label" for="info">Info: </label>
            <input
              type="text" id="info" name="info"
              placeholder="ex: Schaddify at 10pm"
              class="width_full"/>
          </div>
        </fieldset>

        <fieldset>
          <legend>Payment</legend>

          <div class="field">
            <label class="label" for="price">Price: </label>

            <input
              type="text" id="price" name="price"
              placeholder="ex: $10.00"
              class="width_full"/>
          </div>

          <div class="field">
            <label
              class="label"
              for="instructions">Instructions: </label>

            <input type="text"
                   id="instructions"
                   name="instructions"
                   placeholder="ex: Slide it under [Staff Memeber]'s door"
                   class="width_full"/>
          </div>
        </fieldset>

        <fieldset>
          <legend>Point Person</legend>
          <div class="field">
            <label class="label" for="point_person">Point Person: </label>

            <input type="text" id="point_person"
                   name="point_person" placeholder=""
                   class="width_full"/>
          </div>
        </fieldset>
      </fieldset>

      <fieldset>
        <legend>Sign Up</legend>

        <div class="field">
          <div class="label">Enabled:</div>

          <div id="sign_up_enabled" class="buttonset">
            <input type="radio"
                   id="sign_up_enabled_yes"
                   name="sign_up_enabled"
                   value="1"/>
            <label for="sign_up_enabled_yes">Yes</label>
            <input type="radio"
                   id="sign_up_enabled_no"
                   name="sign_up_enabled"
                   checked="checked"
                   value="0"/>
            <label for="sign_up_enabled_no">No</label>
          </div>
        </div>

        <div class="field">
          <label class="label" for="sign_up_capacity">Event Capacity: </label>
          <input type="text"
                 id="sign_up_capacity"
                 name="sign_up_capacity"
                 placeholder=""
                 class="width_full"/>
        </div>

        <fieldset>
          <legend>Questions</legend>
          <div id="sign_up_form"></div>
        </fieldset>

      </fieldset>

      <input type="submit" value="Create Event"/>
    </form>
  </div>
</div>

<?php
$this->load->view('common/footer');
?>
