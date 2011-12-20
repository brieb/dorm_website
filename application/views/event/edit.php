<?php
  $this->load->view(
    'common/header',
    array(
      'page_title' => 'Edit Event',
      'js' => 'main-event-form',
    )
  );
?>

<div class="layout_full">
  <div id="content" class="content nosidebar nopadding">
    <div class="heading">Edit Event</div>
    <button id="event_delete" type="button">Delete Event</button>

    <form id="event_create_fields" method="POST">
      <?php echo $this->event_form->render(); ?>
      <input type="submit" value="Finish Editing Event"/>
    </form>
  </div>
</div>

<script>
  //TODO get event id for delete
  require.ready(function () {
      $('#event_delete').click(function() {
          $('<div/>')
            .html(
              '<p>\
              <span class="ui-icon ui-icon-alert" \
                style="float:left; margin:0 7px 20px 0;"></span>\
              The Event and all data will be\
              permanently deleted and cannot be recovered.\
              Are you sure?\
              </p>\
              ')
              .dialog({
                  title: 'Delete Event',
                  resizable: false,
                  modal: true,
                  width: 350,
                  draggable: false,
                  buttons: {

                      'Cancel': function(){
                          $(this).dialog('close');
                      },

                      'Delete Event': function() {
                          var dialog = $(this);
                          dialog.dialog('close');

                          $.post(
                            SITE_URL+'/event/delete/<?php echo $event_id; ?>',
                            function(r) {
                                console.log(r);
                                window.location = SITE_URL + '/event/view';
                            });
                        }
                    }
                });
            });
        });

      </script>

      <?php
        $this->load->view('common/footer');
      ?>
