var EventCreate = {};

EventCreate = {
  urlEventCreate: SITE_URL+'/event/create',

  container: null,
  containerButtons: null,
  containerFields: null,
  containerSignUp: null,

  signUpEnabled: false,
  signUpForm: null,
  setSignUpForm: function(form) {
    this.signUpForm = form;
  },
  signUpCapacity: 0,
  setSignUpCapacity: function(capacity) {
    this.signUpCapacity = capacity;
  },

  init: function() {
    console.log(this.fieldTypes);

    this.container = $('#container');
    this.containerButtons = $('<div/>');
    this.containerFields = $('<form/>');
    this.containerSignUp = $('<div/>')
      .attr({ id: 'event_create_signup' });
    
    this.container.append(
      this.containerButtons,
      this.containerSignUp,
      this.containerFields
    );

    this.containerFields.append(
      $('<input>')
        .attr({
          type: 'submit'
        })
        .text('Create Event')
        .button()
    );

    this.containerFields.submit(function() {
      var eventData = $(this.containerFields).serialize();

      if (this.signUpEnabled) {
        eventData += '&' + $.param({
          'sign_up[enabled]': true
        });
        eventData += '&' + $.param({
          'sign_up[capacity]': this.signUpCapacity
        });
      }
      if (this.signUpForm !== null) {
        eventData += '&' + $.param({
            'sign_up[form]': this.signUpForm
          });
      }

      eventData.replace(/%5B%5D/g, '[]');
      $.post(
        this.urlEventCreate,
        eventData,
        function(response) {
          console.log(response);
        }
      );
      return false;
    }.bind(this));

    this.containerButtons.append(
      $('<button/>')
        .attr({
          name: 'button_field_add[SignUp]'
        })
        .text('SignUp')
        .button()
        .click(function() {
          this.signUpCreate();
        }.bind(this))
    );

    $.each(this.fieldTypes, function(key, type) {
      var fieldContent = this.genFieldType(type);
      if (type.isDefault) {
         this.containerFields.find('input:submit')
          .before(
              fieldContent
           ); 
      } else {
        this.containerButtons.append(
          $('<button/>')
            .attr({
              name: 'button_field_add['+type.name+']'
            })
            .text(type.pretty)
            .button()
            .click(function() {
              var target = $(this);
              target
                .blur()
                .mouseleave()
                .button('disable');
              this.containerFields.find('input:submit')
               .before(fieldContent); 
            }.bind(this))
        );
      }
    }.bind(this));

  },
  signUpCreate: function() {
    EventCreateSignUpWizard.init();

    this.containerSignUp
      .append(
        $('<button/>')
          .text('Remove Sign Up')
          .button()
          .click(function(event) {
            var target = $(event.target);
            target.parent().empty();

            this.signUpEnabled = false;
            this.signUpForm = null;
            this.signUpCapacity = 0;
            EventCreateSignUpWizard.reset();

            $('button[name="button_field_add[SignUp]"]')
              .blur()
              .mouseleave()
              .button('enable');
          }.bind(this))
      );
  },
  fieldTypes: {
    title: {
      name: 'Title',
      pretty: 'Title',
      isDefault: true,
      fields: [
        {
          identifier: 'Title',
          label: 'Title: ', 
          placeholder: 'End of the Year Banquet'
        }
      ]
    },
    //TODO datepicker
    datetime: {
      name: 'Datetime',
      pretty: 'Time and Date',
      isDefault: true,
      fields: [
        {
          identifier: 'Datetime',
          label: 'When: ',
          placeholder: ''
        }
      ]
    },
    description: {
      name: 'Description',
      pretty: 'Description',
      isDefault: true,
      fields: [
        {
          identifier: 'Description',
          label: 'Description: ',
          inputType: 'textarea',
          placeholder: ''
        }
      ]
    },
    meetupInfo: {
      name: 'MeetupInfo',
      pretty: 'Meetup Info',
      isDefault: false,
      fields: [
        {
          identifier: 'form_builder[meetup_info][info]',
          label: 'Info: ',
          placeholder: 'ex: Schaddify at 10pm'
        }
      ]
    },
    eventLocation: {
      name: 'EventLocation',
      pretty: 'Event Location',
      isDefault: false,
      fields:  [
        {
          identifier: 'form_builder[event_location][location]',
          label: 'Location: ',
          placeholder: ''
        }
      ]
    },
    payment: {
      name: 'Payment',
      pretty: 'Payment',
      isDefault: false,
      fields: [
        {
          identifier: 'form_builder[payment][price]',
          label: 'Price: ',
          placeholder: '$10.00'
        },
        {
          identifier: 'form_builder[payment][instructions]',
          label: 'Instructions: ',
          placeholder: 'ex: Slide it under [Staff Memeber]\'s door'
        }
      ]
    },
    pointPerson: {
      name: 'PointPerson',
      pretty: 'Point Person',
      isDefault: false,
      fields: [
        {
          identifier: 'form_builder[point_person][person]',
          label: 'Person: ',
          placeholder: ''
        }
      ]
    }
  },
  genFieldset: function(field, content) {
    return $('<fieldset/>')
      .append(
        $('<legend/>')
          .text(field.pretty),
        content,
        $('<button/>')
          .attr({
            name: 'button_field_remove['+field.name+']'
          })
          .text('Remove')
          .button()
          .click(function(event) {
            var target = $(event.target);
            target.parent().remove();
            $('button[name="button_field_add['+field.name+']"]')
              .blur()
              .mouseleave()
              .button('enable');
          })
      );
  },
  genFieldType: function(type) {
    var content = this.genFormInput(type.fields);
    if (type.isDefault === true) {
      return content;
    }
    return this.genFieldset(type, content);
  },
  genFormInput: function(elems) {
    var inputs = elems.map(function(elem) {
      if (elem.inputType === undefined) {
        elem.inputType = 'input';
      }
      var label = $('<label/>').attr({
        for: elem.identifier
      }).text(elem.label);
      var input = $('<'+elem.inputType+'/>').attr({
        name: elem.identifier,
        id: elem.identifier,
        placeholder: elem.placeholder
      });
      return $('<div/>').append(label, input);
    });

    var container = $('<div/>');
    inputs.map(function(input) {
      container.append(input);
    });
    return container;
  }

};

