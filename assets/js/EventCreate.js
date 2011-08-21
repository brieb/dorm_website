var EventCreate = {};

EventCreate = {
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
      var eventData = $(this).serialize();

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
        window.location.pathname,
        eventData,
        function(response) {
          console.log(response);
        }
      );
      return false;
    }.bind(this));

    $.each(this.fieldTypes, function(key, type) {
      var genFn = this.genFieldType(type);
      if (type.isDefault) {
         this.containerFields.find('input:submit')
          .before(
              genFn()
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
               .before(
                   genFn()
                ); 
            }.bind(this))
        );
      }
    }.bind(this));
  },
  fieldTypes: {
    title: {
      name: 'Title',
      pretty: 'Title',
      isDefault: true,
      fields: [
        {
          identifier: 'Title',
          label: 'Title', 
          placeholder: 'End of the Year Banquet'
        }
      ]
    },
    datetime: {
      name: 'Datetime',
      pretty: 'Time and Date',
      isDefault: true
    },
    description: {
      name: 'Description',
      pretty: 'Description',
      isDefault: true
    },
    signUp: {
      name: 'SignUp',
      pretty: 'Sign Up',
      isDefault: false
    },
    meetupInfo: {
      name: 'MeetupInfo',
      pretty: 'Meetup Info',
      isDefault: false
    },
    eventLocation: {
      name: 'EventLocation',
      pretty: 'Event Location',
      isDefault: false
    },
    payment: {
      name: 'Payment',
      pretty: 'Payment',
      isDefault: false
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
    if (field.isDefault === true) {
      return content;
    }
    return this.genFieldset(type, content);
    //return this['genFieldType'+type.name];
  },
  genFormInput: function(elems) {
    var inputs = elems.map(function(elem) {
      var label = $('<label/>').attr({
        for: elem.identifier
      }).text(elem.label);
      var input = $('<input/>').attr({
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
  },
  genFieldTypeTitle: function() {
    return this.genFormInput(
    [
      {
        identifier: this.fieldTypes.title.name,
        label: this.fieldTypes.title.pretty,
        placeholder: 'End of the Year Banquet'
      }
    ]
    );
  },
  genFieldTypeDatetime: function() {
    //TODO datepicker
    return this.genFormInput([
      {
        identifier: this.fieldTypes.datetime.name,
        label: this.fieldTypes.datetime.pretty,
        placeholder: ''
      }
    ]);
  },
  genFieldTypeDescription: function() {
    return $('<div/>').append(
      $('<label/>')
        .attr({
          for: this.fieldTypes.description.name
        })
        .text(this.fieldTypes.description.pretty),
      $('<textarea/>').attr({
        id: this.fieldTypes.description.name,
        name: this.fieldTypes.description.name
      })
    );
  },
  genFieldTypeSignUp: function() {
    EventCreateSignUpWizard.init();

    var field = this.fieldTypes.signUp;
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

            $('button[name="button_field_add['+field.name+']"]')
              .blur()
              .mouseleave()
              .button('enable');
          }.bind(this))
      );

  },
  genFieldTypeMeetupInfo: function() {
    var content = this.genFormInput([
      {
        identifier: 'form_builder[meetup_info][info]',
        label: 'Info: ',
        placeholder: 'ex: Schaddify at 10pm'
      }
    ]);
    return this.genFieldset(
      this.fieldTypes.meetupInfo,
      content
    );
  },
  genFieldTypeEventLocation: function() {
    var content = this.genFormInput([
      {
        identifier: 'form_builder[event_location][location]',
        label: 'Location: ',
        placeholder: ''
      }
    ]);
    return this.genFieldset(
      this.fieldTypes.eventLocation,
      content
    );
  },
  genFieldTypePayment: function() {
    var content = this.genFormInput([
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
    ]);      
    return this.genFieldset(
      this.fieldTypes.payment,
      content
    );
  },
  genFieldTypePointPerson: function() {
    var content = this.genFormInput();
    return this.genFieldset(
      this.fieldTypes.pointPerson,
      content
    );
  }

};

