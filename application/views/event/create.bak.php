<?php
$this->load->view('header', array('page_title' => 'Create an Event'));
$this->load->view('calendar/sidebar');
?>

<?php
//$fields = getFieldTypes();

//foreach($fields as $field) {
  //$button_attr = array();
  //$button_attr['name'] = 'button_field_add['.$field['name'].']';
  //$button_attr['content'] = $field['pretty'];
  //if(isset($display_fields) && in_array($field['name'], $display_fields)) {
    //$button_attr['disabled'] = 'disabled';
  //}
  //echo form_button($button_attr);
//}
?>

<?php
$this->load->helper('form');

echo form_open('event/create', array('id' => 'event_create_form'));
echo form_error('title');
echo form_input(array(
  'name' => 'title',
  'placeholder' => 'Event Title',
  'value' => set_value('title')
));
echo form_error('datetime');
echo form_input(array(
  'name' => 'datetime',
  'value' => set_value('datetime')
));
echo form_error('description');
echo form_textarea(array(
  'name' => 'description',
  'value' => set_value('description')
));

if(isset($display_fields)) {
  foreach($display_fields as $display_field) {
    echo genFieldForType($display_field);
  }
}

echo form_submit('submit', 'Create Event');
echo form_close();
?>

<script type="text/javascript"
  src="<?php echo base_url(); ?>/assets/js/EventCreate.js">
</script>
<script type="text/javascript">
$(document).ready(function() {
  $('#event_create_form_dis').submit(function(eventData) {
    console.log(eventData);
    return false;
  });

  $('button[name^="button_field_add["]').click(function() {
    var target = $(this);
    target.attr('disabled', 'disabled');
    var type = target.attr('name').replace(/button_field_add\[(.*)\]/, '$1');

    <?php
      echo "var content = [];\n";
      foreach($fields as $field) {
        echo "content['".$field['name']."'] = ".json_encode(genFieldForType($field['name'])).";\n";
      }
    ?>

    var insertBeforeElem = $('#event_create_form input[type=submit]');
    insertBeforeElem.before(content[type]);
  });
  <?php
    foreach($fields as $field):
  ?>
    $('#event_create_form').delegate(
        'button[name="button_field_remove[<?php echo $field['name']; ?>]"]',
        'click',
        function(event) {
          var target = $(event.target);
          target.parent().remove();
          $('button[name="button_field_add[<?php echo $field['name']; ?>]"]').removeAttr('disabled');
        });
  <?php
    endforeach;
?>

});
</script>

<?php
$this->load->view('footer');
?>
