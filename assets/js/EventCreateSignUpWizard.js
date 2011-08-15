var EventCreateSignUpWizard = {};

EventCreateSignUpWizard = {
  container: null,
  init: function() {
    EventCreateSignUpWizard.container = $('<div/>');
    EventCreateSignUpWizard.container.dialog({
      modal: true,
      autoOpen: true,
      height: 600,
      width: 600,
      draggable: false
    }); 
    EventCreateSignUpWizard.loadNextPane();
  },
  curPane: 0,
  panes: [
    {
      name: 'Questions',
      title: 'Add Questions to Sign Up',
      prompt: 'Would you like to add questions to the sign up?'
    },
    {
      name: 'Waitlist',
      title: 'Waitlist',
      prompt: 'Would you like to add a waitlist?'
    }
    
    //TODO below options
    //,
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
      EventCreateSignUpWizard.container.dialog('close');
    } else {
      EventCreateSignUpWizard.genPrompt();
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
  loadPaneQuestions: function() {
    //$.getScript(
      //'../../assets/js/SignUpFormBuilder.js',
      //$.proxy(function() {
        EventCreateSignUpWizard.container.dialog("option", "buttons", [
        {
          text: 'Create Sign Up Form',
          click: function () {
            var signUpForm = SignUpFormBuilder.form.submitHandler();
            console.log(signUpForm);
            EventCreate.signUp.setForm(signUpForm);
            //TODO validation
            //TODO form preview
            EventCreateSignUpWizard.loadNextPane(); 
          }
        },
        {
          text: 'Clear',
          click: function () {
            $('#sign_up_form_create').html('');
          }
        },
        {
          text: 'Cancel',
          click: EventCreateSignUpWizard.loadNextPane
        }
        ]);
        SignUpFormBuilder.init(EventCreateSignUpWizard.container);
      //},
      //EventCreateSignUpWizard)
    //);
  },
  loadPaneWaitlist: function() {
    EventCreateSignUpWizard.container.empty();
    EventCreateSignUpWizard.container.append(
      $('<label/>')
        .attr({
          for: 'waitlist_capacity'
        })
        .text("How many people should be accepted to the event before \
              getting put on the waiting list? (Event Capacity)"),
      $('<input/>')
        .attr({
          type: 'text',
          id: 'waitlist_capacity',
          name: 'waitlist_capacity'
        })
    );
    EventCreateSignUpWizard.container.dialog("option", "buttons", [
      {
        text: 'Add Waitlist',
        click: function () {
          //TODO save count
          EventCreate.signUp.setCapacity($('#waitlist_capacity').val());
          EventCreateSignUpWizard.loadNextPane(); 
        }
      },
      {
        text: 'Cancel',
        click: EventCreateSignUpWizard.loadNextPane 
      }
    ]);
  }

};
