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
          type: 'submit',
          value: 'Create Event'
        })
        .button()
    );

    this.containerFields.submit(function() {
      $.post(
        this.urlEventCreate,
        this.serialize(),
        function(response) {
          //TODO handle
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
        .click(function(event) {
          var target = $(event.target);
          target.button('disable');
          this.signUpCreate();
        }.bind(this))
    );

    $.each(this.fieldTypes, function(key, type) {
      if (type.isDefault) {
        var fieldContent = this.genFieldType(type);
        this.containerFields.find('input:submit')
          .before(fieldContent); 
      } else {
        this.containerButtons.append(
          $('<button/>')
            .attr({
              name: 'button_field_add['+type.name+']'
            })
            .text(type.pretty)
            .button()
            .click(function(event) {
              var target = $(event.target);
              target
                .blur()
                .mouseleave()
                .button('disable');
              var fieldContent = this.genFieldType(type);
              this.containerFields.find('input:submit')
               .before(fieldContent); 
            }.bind(this))
        );
      }
    }.bind(this));

  },
  serialize: function() {
    var eventData = $(this.containerFields).serialize();

    if (this.signUpEnabled) {
      eventData += '&' + $.param({
        'SignUp[enabled]': true
      });
      eventData += '&' + $.param({
        'SignUp[capacity]': this.signUpCapacity
      });
    }
    if (this.signUpForm !== null) {
      eventData += '&' + $.param({
        'SignUp[form]': this.signUpForm
      });
    }

    eventData.replace(/%5B%5D/g, '[]');

    return eventData;
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
            this.signUpClear();
            EventCreateSignUpWizard.reset();

            $('button[name="button_field_add[SignUp]"]')
              .blur()
              .mouseleave()
              .button('enable');
          }.bind(this))
      );
  },
  signUpClear: function() {
    this.signUpEnabled = false;
    this.signUpForm = null;
    this.signUpCapacity = 0; 
  },
  fieldTypes: {
    title: {
      name: 'title',
      pretty: 'Title',
      isDefault: true,
      fields: [
        {
          identifier: 'title',
          label: 'Title: ', 
          placeholder: 'End of the Year Banquet'
        }
      ]
    },
    //TODO datepicker
    datetime: {
      name: 'time',
      pretty: 'Time and Date',
      isDefault: true,
      fields: [
        {
          inputType: 'datetimepicker',
        }
      ]
    },
    description: {
      name: 'description',
      pretty: 'Description',
      isDefault: true,
      fields: [
        {
          identifier: 'description',
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
          identifier: 'form_builder[MeetupInfo][info]',
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
          identifier: 'form_builder[EventLocation][location]',
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
          identifier: 'form_builder[Payment][price]',
          label: 'Price: ',
          placeholder: '$10.00'
        },
        {
          identifier: 'form_builder[Payment][instructions]',
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
          identifier: 'form_builder[PointPerson][person]',
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
          .button({
            label: 'Remove'
          })
          .click(function(event) {
            var target = $(event.target);
            target.parent().remove();
            $('button[name="button_field_add['+field.name+']"]')
              .blur()
              .mouseleave()
              .button('enable');
          }.bind(this))
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

      if (elem.inputType === 'datetimepicker') {
        var datepickerOptions = {
          ampm: true,
          stepHour: 1,
          stepMinute: 10,
        };
        var defaultStart = new Date();
        var defaultEnd = new Date(defaultStart.getTime() + 30*60000);
        var content = $('<div/>').append(
          $('<span/>')
            .text('From '),
          $('<input/>')
            .attr({ type: 'text', name: 'time[start]' })
            .datetimepicker(datepickerOptions)
            .datetimepicker('setDate', defaultStart),
          $('<span/>')
            .text('to '),
          $('<input/>')
            .attr({ type: 'text', name: 'time[start]' })
            .datetimepicker(datepickerOptions)
            .datetimepicker('setDate', defaultEnd)
        );
        $('#ui-datepicker-div').hide();
        return content;
      } else {
        var label = $('<label/>').attr({
          for: elem.identifier
        }).text(elem.label);
        var input = $('<'+elem.inputType+'/>').attr({
          name: elem.identifier,
          id: elem.identifier,
          placeholder: elem.placeholder
        });

        if (elem.inputType === 'input') {
          input.attr({ type: 'text' });
        }
        return $('<div/>').append(label, input);
      }
    });

    var container = $('<div/>');
    inputs.map(function(input) {
      container.append(input);
    });
    return container;
  }

};

