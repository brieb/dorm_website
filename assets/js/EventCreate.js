var EventCreate = {};

$(document).ready(function() {
  EventCreate.init(
    'event_create_buttons', 'event_create_form'
  ); 
});

EventCreate = {
  init: function(containerButtons, containerFields) {
    EventCreate.button.container = $('#'+containerButtons);
    EventCreate.field.container = $('#'+containerFields);

    EventCreate.field.container.submit(function() {
      var eventData = $(this).serialize().replace(/%5B%5D/g, '[]');
      //eventData.push({
        //name: 'sign_up',
        //value: [
          //{
            //name: 'capacity',
            //value: EventCreate.signUp.capacity
          //},
          //{
            //name: 'form',
            //value: EventCreate.signUp.form
          //}
        //]
      //});
      $.post(
        window.location.pathname,
        { data: eventData },
        function(response) {
          console.log(response);
        }
      );
      return false;
    });

    $.each(EventCreate.field.types, function(key, type) {
      var genFn = EventCreate.field.genType(type);
      if (type.isDefault) {
         EventCreate.field.container.find('input:submit')
          .before(
              genFn()
           ); 
      } else {
        EventCreate.button.container.append(
          $('<button/>')
            .attr({
              name: 'button_field_add['+type.name+']'
            })
            .text(type.pretty)
            .click(function() {
              var target = $(this);
              target.attr('disabled', 'disabled');
              EventCreate.field.container.find('input:submit')
               .before(
                   genFn()
                ); 
            })
        );
      }
    });
  },
  button: {
    container: null
  },
  field: {
    container: null,
    types: {
      title: {
        name: 'Title',
        pretty: 'Title',
        isDefault: true
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
            .click(function(event) {
              var target = $(event.target);
              target.parent().remove();
              $('button[name="button_field_add['+field.name+']"]')
                .removeAttr('disabled');
            })
        );
    },
    genType: function(type) {
      return EventCreate.field['genType'+type.name];
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
    genTypeTitle: function() {
      return EventCreate.field.genFormInput([
        {
          identifier: EventCreate.field.types.title.name,
          label: EventCreate.field.types.title.pretty,
          placeholder: 'End of the Year Banquet'
        }
      ]);
    },
    genTypeDatetime: function() {
      //TODO datepicker
      return EventCreate.field.genFormInput([
        {
          identifier: EventCreate.field.types.datetime.name,
          label: EventCreate.field.types.datetime.pretty,
          placeholder: ''
        }
      ]);
    },
    genTypeDescription: function() {
      return $('<div/>').append(
        $('<label/>')
          .attr({
            for: EventCreate.field.types.description.name
          })
          .text(EventCreate.field.types.description.pretty),
        $('<textarea/>').attr({
          id: EventCreate.field.types.description.name,
          name: EventCreate.field.types.description.name
        })
      );
    },
    genTypeSignUp: function() {
      //TODO display wizard
      //$.getScript(
        //'../../assets/js/EventCreateSignUpWizard.js',
        //function() {
          //EventCreateSignUpWizard.init();
        //}
      //);
      EventCreateSignUpWizard.init();
    },
    genTypeMeetupInfo: function() {
      var content = EventCreate.field.genFormInput([
        {
          identifier: 'form_builder[meetup_info][info]',
          label: 'Info: ',
          placeholder: 'ex: Schaddify at 10pm'
        }
      ]);
      return EventCreate.field.genFieldset(
        EventCreate.field.types.meetupInfo,
        content
      );
    },
    genTypeEventLocation: function() {
      var content = EventCreate.field.genFormInput([
        {
          identifier: 'form_builder[event_location][location]',
          label: 'Location: ',
          placeholder: ''
        }
      ]);
      return EventCreate.field.genFieldset(
        EventCreate.field.types.eventLocation,
        content
      );
    },
    genTypePayment: function() {
      var content = EventCreate.field.genFormInput([
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
      return EventCreate.field.genFieldset(
        EventCreate.field.types.payment,
        content
      );
    },
    setHiddenSignUpField: function(name, data) {
      var elem = EventCreate.field.container
        .find('input:hidden[name="sign_up['+name+']"]');
      if (elem.length === 0) {
         EventCreate.field.container.append(
           $('<input/>')
             .attr({
               type: 'hidden',
               name: 'sign_up['+name+']',
               value: data
             })
         );
      } else {
        elem.val(data);
      }
    }
  },
  signUp: {
    capacity: 0,
    form: null,
    setCapacity: function(capacity) {
      this.capacity = capacity;
    },
    setForm: function(form) {
      this.form = form;
    }
  }
};

