var EventEdit = {};

EventEdit = {
  data: null,
  signUpDelete: 0,
  url: SITE_URL+'/event/edit/',
  urlView: SITE_URL+'/event/view',
  urlDelete: SITE_URL+'/event/delete/',
  container: null,

  init: function(data) {
    this.container = $('#container');
    this.data = data;
    this.url += this.data.id;
    this.urlDelete += this.data.id;

    this.setUpDelete();

    EventCreate.init();

    EventCreate.containerFields
      .find('input:submit')
      .val('Finish Editing Event');
    EventCreate.containerFields
      .unbind('submit')
      .submit(function() {
        var eventData = EventCreate.serialize();
        //if (this.data.sign_up_id !== null) {
          eventData += '&sign_up_delete='+this.signUpDelete;
          eventData += '&sign_up_id='+this.data.sign_up_id;
          eventData += '&id='+this.data.id;
        //}
  
        $.post(
          this.url,
          eventData,
          function(response) {
            window.location = this.urlView+'/'+this.data.id;
          }.bind(this)
        );

        return false;
      }.bind(this));

    this.replay();
  },
  setUpDelete: function()  {
    this.container.append(
      $('<button/>')
        .button({
          label: 'Delete Event'
        })
        .click(function() {
          $('<div/>')
            .dialog({
              title: 'Delete Event',
              modal: true,
              buttons: {
                'Delete Event': function() {
                  $.post(
                    EventEdit.urlDelete,
                    function(response) {
                      window.location = EventEdit.urlView;
                      $(this).dialog('close');
                    }.bind(this)
                  );
                },
                'Cancel': function() {
                  $(this).dialog('close');
                }
              }
            })
            .html(
              $('<p/>')
                .text('Deleting this event will delete the event information \
                      and associated sign ups. This cannot be undone.')
            )
        })
    );
  },
  replay: function() {
    //TODO make not so dependent on regexps
    $.each(EventCreate.fieldTypes, function(key, type) {
      type.fields.map(function(field) {
        var editField = undefined;
        if (type.isDefault) {
          editField = this.data[field.identifier];
        } else {
          if (this.data.fields[type.name] !== undefined) {
            $('button[name="button_field_add['+type.name+']"]').click();
            var fieldName = field.identifier.replace(
              new RegExp('form_builder\\['+type.name+'\\]\\[(.*)\\]'), '$1');
            editField = this.data.fields[type.name][fieldName];
          }
        }  

        if (editField !== undefined) {
          $('input[name="'+field.identifier+'"]').val(editField); 
        }
      }, this);
    }.bind(this));

    if (this.data.sign_up_id !== null) {
      $('button[name="button_field_add[SignUp]"]')
        .unbind('click')
        .click(function(event) {
          var target = $(event.target);
          target.button('disable');
          this.signUpEdit();
        }.bind(this))
        .click();
    }
  },
  signUpEdit: function() {
    EventCreate.containerSignUp
    .append(
      $('<button/>')
        .text('Remove Sign Up')
        .button()
        .click(function(event) {
          var target = $(event.target);

          $('<div/>')
            .html('<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>The sign up and all results will be permanently deleted and cannot be recovered. Are you sure?</p>')
            .dialog({
              title: 'Delete Sign Up',
              resizable: false,
              modal: true,
              buttons: {
                'Delete Sign Up': function() {
                  EventEdit.signUpDelete = 1;
                  target.parent().empty();
                  EventCreate.signUpClear();

                  $('button[name="button_field_add[SignUp]"]')
                    .blur()
                    .mouseleave()
                    .button('enable')
                    .unbind('click')
                    .click(function(event) {
                      var target = $(event.target);
                      target.button('disable');
                      EventCreate.signUpCreate();
                    });

                  $(this).dialog('close');
                },
                'Cancel': function(){
                  $(this).dialog('close');
                }
              }
            });

          
        }.bind(this))
    );
  },
  
};
