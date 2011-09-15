var EventEdit = {};

EventEdit = {
  data: null,
  signUpDelete: 0,
  url: SITE_URL+'/event/edit/',
  urlView: SITE_URL+'/event/view',
  urlDelete: SITE_URL+'/event/delete/',

  container: null,
  sidebar: null,

  init: function(sidebarId, contentId, data) {
    this.container = $('#'+contentId);
    this.sidebar = $('#'+sidebarId);

    this.data = data;
    this.url += this.data.id;
    this.urlDelete += this.data.id;

    EventCreate.init(sidebarId, contentId);
    this.setUpDelete();

    EventCreate.submitButton
      .button('option', 'label', 'Finish Editing Event');
    EventCreate.submitButton
      .unbind('click')
      .click(function() {
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
    this.sidebar.append(
      $('<div />')
        .attr({
          'class': 'sidebar-box'
        })
        .append(
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
                    .text(
                      'Deleting this event will delete the \
                      event information and associated sign ups. \
                      This cannot be undone.'
                    )
                )
            })
        )
    );
  },
  getObjValueByIdentifierArray: function(obj, identifier) {
    var parts = identifier.match(/\w*[^\[\]]/g);
    for (var i = 0; i < parts.length; i++) {
      obj = obj[parts[i]];
    }
    return obj;
  },
  setFieldValue: function(identifier, value) {
    //TODO make not so dependent on regexps
    var field = $(' \
      input[name="'+identifier+'"],\
      textarea[name="'+identifier+'"] \
    ');

    if (identifier.substring(0, "time".length) === "time") {
      field.datetimepicker('setDate', (new Date(value)) );
    } else {
      field.val(value); 
    }
  },
  replay: function() {
    //TODO make not so dependent on regexps
    $.each(EventCreate.fieldTypes, function(key, type) {
      type.fields.map(function(field) {
        var prefill = undefined;
        if (type.isDefault) {
          prefill =
            this.getObjValueByIdentifierArray(this.data, field.identifier);
          //prefill = this.data[this.parseIdentifierArray(field.identifier)];
        } else {
          if (this.data.fields[type.name] !== undefined) {
            $('button[name="button_field_add['+type.name+']"]').click();
            var fieldName = field.identifier.replace(
              new RegExp('form_builder\\['+type.name+'\\]\\[(.*)\\]'), '$1');
            prefill = this.data.fields[type.name][fieldName];
          }
        }  

        if (prefill !== undefined) {
          this.setFieldValue(field.identifier, prefill);
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
      .addClass('sidebar-box')
      .append(
        $('<button/>')
          .text('Remove Sign Up')
          .button()
          .click(function(event) {
            var target = $(event.target);

            $('<div/>')
              .html('\
                <p>\
                  <span class="ui-icon ui-icon-alert" \
                    style="float:left; margin:0 7px 20px 0;"></span>\
                  The sign up and all results will be\
                  permanently deleted and cannot be recovered.\
                  Are you sure?\
                </p>\
              ')
              .dialog({
                title: 'Delete Sign Up',
                resizable: false,
                modal: true,
                width: 350,
                draggable: false,
                buttons: {

                  'Cancel': function(){
                    $(this).dialog('close');
                  },

                  'Delete Sign Up': function() {
                    EventEdit.signUpDelete = 1;
                    EventCreate.containerSignUp.remove();
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
                  }
                }
              });

            
          }.bind(this))
      );
  },
  
};
