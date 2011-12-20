<?php
$this->load->view(
  'common/header',
  array(
    'page_title' => 'People',
    'js' => 'main-people'
  )
);
?>

<div id="container">

  <div id="sidebar">
    <input
      id="user_search"
      type='text'
      name='user_search'
      placeholder='Search...'>
    </input>

    <fieldset id="checkboxes_house" >
      <legend>House</legend>

      <input
        id="house_schiff"
        type="checkbox"
        name="filter_house[]" checked
        value="schiff"/>
      <label for="house_schiff">Schiff</label>
      <br/>

      <input
        id="house_adams"
        type="checkbox"
        name="filter_house[]" checked
        value="adams"/>
      <label for="house_adams">Adams</label>
      <br/>

      <input
        id="house_other"
        type="checkbox"
        name="filter_house[]" checked
        value="other"/>
      <label for="house_other">Other</label>
      <br/>
    </fieldset>

    <fieldset id="checkboxes_floor" >
      <legend>Floor</legend>

      <input
        id="floor_1"
        type="checkbox"
        name="filter_floor[]" checked
        value="1"/>
      <label for="floor_1">Floor 1</label>
      <br/>

      <input
        id="floor_2"
        type="checkbox"
        name="filter_floor[]" checked
        value="2"/>
      <label for="floor_2">Floor 2</label>
      <br/>

      <input
        id="floor_3"
        type="checkbox"
        name="filter_floor[]" checked
        value="3"/>
      <label for="floor_3">Floor 3</label>
      <br/>

      <input
        id="floor_other"
        type="checkbox"
        name="filter_floor[]" checked
        value="0"/>
      <label for="floor_other">Other</label>
      <br/>
    </fieldset>

    <fieldset id="checkboxes_role" >
      <legend>Role</legend>

      <input
        id="role_residents"
        type="checkbox"
        name="filter_role[]"
        checked="checked"
        value="residents"/>
      <label for="role_residents">Residents</label>
      <br/>

      <input
        id="role_staff"
        type="checkbox"
        name="filter_role[]"
        checked="checked"
        value="staff"/>
      <label for="role_staff">Staff</label>
      <br/>
    </fieldset>

    <fieldset id="checkboxes_class" >
      <legend>Class</legend>

      <input
        id="class_freshman"
        type="checkbox"
        name="filter_class[]"
        checked="checked"
        value="freshman"/>
      <label for="class_freshman">Freshman</label>
      <br/>

      <input
        id="class_sophomore"
        type="checkbox"
        name="filter_class[]"
        checked="checked"
        value="sophomore"/>
      <label for="class_sophomore">Sophomore</label>
      <br/>

      <input
        id="class_junior"
        type="checkbox"
        name="filter_class[]"
        checked="checked"
        value="junior"/>
      <label for="class_junior">Junior</label>
      <br/>

      <input
        id="class_senior"
        type="checkbox"
        name="filter_class[]"
        checked="checked"
        value="senior"/>
      <label for="class_senior">Senior</label>
      <br/>

      <input
        id="class_other"
        type="checkbox"
        name="filter_class[]"
        checked="checked"
        value="other"/>
      <label for="class_other">Other</label>
      <br/>
    </fieldset>

  </div>


  <div id="content">
    <div id="user_directory_listing">
    </div>

    <script type="text/javascript">
      require.ready(function () {
        People.init(<?php echo $users; ?>);
      });
    </script>
  </div>

</div>

<?php
  $this->load->view('common/footer');
?>
