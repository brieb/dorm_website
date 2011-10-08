<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'Create an Event',
    'js' => 'main-event-create'
  )
);
?>

<div class="layout_full">
  <!--  <div id="sidebar"></div>-->
  <div id="content" class="content nosidebar nopadding">
    <div class="heading">Create an Event</div>

    <form id="event_create_fields">
      <div class="field">
        <label for="title">Title: </label>
        <input
          name="title" id="title" placeholder="End of the Year Banquet"
          type="text"/>
      </div>
      <div class="field">
        <label for="time[start]">From: </label>
        <input
          type="text" id="time[start]" name="time[start]"
          class="hasDatepicker"/>
      </div>
      <div class="field">
        <label for="time[end]">To: </label>
        <input
          type="text" id="time[end]" name="time[end]" class="hasDatepicker"/>
      </div>
      <div class="field">
        <label
          for="description">Description: </label>
        <textarea
          name="description" id="description" placeholder=""></textarea>
      </div>

      <fieldset class="event_specific">
        <legend>Event-Specific Information</legend>

        <fieldset>
          <legend>Location</legend>
          <div class="field">
            <label for="location">Location: </label>

            <input
              type="text" id="location" name="location" placeholder=""/>
          </div>
        </fieldset>

        <fieldset>
          <legend>Meetup Info</legend>
          <div class="field"><label for="info">Info: </label>
            <input
              type="text" id="info" name="info"
              placeholder="ex: Schaddify at 10pm">
          </div>
        </fieldset>

        <fieldset>
          <legend>Payment</legend>

          <div class="field">
            <label for="price">Price: </label>

            <input
              type="text" id="price" name="price" placeholder="ex: $10.00"/>
          </div>

          <div class="field">
            <label
              for="instructions">Instructions: </label>

            <input type="text"
                   id="instructions"
                   name="instructions"
                   placeholder="ex: Slide it under [Staff Memeber]'s door"/>
          </div>
        </fieldset>

        <fieldset>
          <legend>Point Person</legend>
          <div class="field">
            <label for="point_person">Point Person: </label>

            <input type="text" id="point_person"
                   name="point_person" placeholder=""/>
          </div>
        </fieldset>
      </fieldset>

      <fieldset>
        <legend>Sign Up</legend>

        <div class="field">
          <label for="sign_up_capacity">Event Capacity: </label>
          <input type="text"
                 id="sign_up_capacity"
                 name="sign_up_capacity"
                 placeholder=""/>
        </div>
      </fieldset>

      <input type="submit" value="Create Event"/>
    </form>
  </div>
</div>

<?php
$this->load->view('common/footer');
?>
