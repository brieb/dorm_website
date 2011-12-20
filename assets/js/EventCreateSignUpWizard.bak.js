var EventCreateSignUpWizard = {};

EventCreateSignUpWizard = {

  container: null,

  init: function() {
//    EventCreateSignUpWizard.container = $('<div/>');
//    EventCreateSignUpWizard.container.dialog({
//      modal: true,
//      autoOpen: true,
//      draggable: false,
//      minWidth: 700,
//      minHeight: 600,
//      maxHeight: 700,
//      dialogClass: 'event_create_sign_up_wizard'
//    });
    EventCreateSignUpWizard.loadNextPane();
  },
  reset: function() {
    this.curPane = 0;
    this.container.remove();
  },
  curPane: 0,
  panes: [
    {
      name: 'Questions',
      title: 'Add Questions to Sign Up',
      help: 'These questions will show up as someone signs up.'
    }

    //TODO below options
    //,
    //{
      //name: 'Waitlist',
      //title: 'Waitlist',
      //prompt: 'This is the total number of people that can be accepted \
        //to the event before being put on the waitlist.'
    //},
    //{
      //name: 'EndTime',
      //title: 'End Time for Sign Ups',
      //prompt: 'Would you like the sign ups to end at a particular time?'
    //},
    //{
      //name: 'Reminder',
      //title: 'Send Automated Reminder',
      //prompt: 'Would you like to send an automatic event reminder?'
    //},
    //{
      //name: 'AutoAccept',
      //title: 'Auto Accept from Waitlist',
      //prompt: 'Would you like to automatically accept someone from the waitlist if an accepted person cancels his or her sign up?'
    //}
  ],
  loadNextPane: function() {
    if (EventCreateSignUpWizard.curPane >= EventCreateSignUpWizard.panes.length) {
//      EventCreateSignUpWizard.container.dialog('close');
    } else {
      //EventCreateSignUpWizard.genPrompt();
      var curPane = EventCreateSignUpWizard.panes[EventCreateSignUpWizard.curPane];
//      EventCreateSignUpWizard.container.empty();
//      EventCreateSignUpWizard.container.dialog("option", "title", curPane.title);
      EventCreateSignUpWizard['loadPane'+curPane.name]();
      EventCreateSignUpWizard.curPane++;
    }
  },
  genPrompt: function(message, callbackIfYes) {
    var curPane = EventCreateSignUpWizard.panes[EventCreateSignUpWizard.curPane];
    EventCreateSignUpWizard.container.empty();
    EventCreateSignUpWizard.container.dialog("option", "title", curPane.title);
    EventCreateSignUpWizard.container.dialog("option", "buttons", [
      {
        text: 'Yes',
        click: EventCreateSignUpWizard['loadPane'+curPane.name]
      },
      {
        text: 'No',
        click: EventCreateSignUpWizard.loadNextPane
      }
    ]);
    EventCreateSignUpWizard.container.append(
      $('<div/>')
        .text(curPane.prompt)
    );
  },
//  loadPaneQuestions: function() {
//    EventCreateSignUpWizard.container.dialog("option", "buttons", [
//      {
//        text: 'Create Sign Up Form',
//        click: function () {
//          EventCreate.signUpEnabled = true;
//          var signUpForm = SignUpFormBuilder.form.submitHandler();
//          EventCreate.setSignUpForm(signUpForm);
//          //TODO validation
//          EventCreateSignUpWizard.loadNextPane();
//        }
//      },
//      {
//        text: 'Clear',
//        click: function () {
//          $('#sign_up_form_create').empty();
//        }
//      },
//      {
//        text: 'Skip',
//        click: EventCreateSignUpWizard.loadNextPane
//      }
//    ]);
//    SignUpFormBuilder.init(EventCreateSignUpWizard.container);
//  }
  //TODO implement waitlist later...
//  loadPaneWaitlist: function() {
//    EventCreateSignUpWizard.container.empty();
//    EventCreateSignUpWizard.container.append(
//      $('<label/>')
//        .attr({
//          for: 'waitlist_capacity'
//        })
//        .text("How many people should be accepted to the event before \
//              getting put on the waiting list? (Event Capacity)"),
//      $('<br/>'),
//      $('<input/>')
//        .attr({
//          type: 'text',
//          id: 'waitlist_capacity',
//          name: 'waitlist_capacity'
//        })
//    );
//    EventCreateSignUpWizard.container.dialog("option", "buttons", [
//      {
//        text: 'Add Waitlist',
//        click: function () {
//          EventCreate.setSignUpCapacity($('#waitlist_capacity').val());
//          EventCreateSignUpWizard.loadNextPane();
//        }
//      },
//      {
//        text: 'Skip',
//        click: EventCreateSignUpWizard.loadNextPane
//      }
//    ]);
//  }

};
