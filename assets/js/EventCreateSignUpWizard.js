var EventCreateSignUpWizard = {};

EventCreateSignUpWizard = {
  container: null,
  init: function() {
    this.container = $('<div/>');
    this.container.dialog({
      modal: true,
      autoOpen: true,
      height: 600,
      width: 600,
      draggable: false
    }); 
    this.loadNextPane();
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
    if (this.curPane >= this.panes.length) {
      this.container.dialog('close');
    } else {
      this.genPrompt();
      this.curPane++;
    }
  },
  genPrompt: function(message, callbackIfYes) {
    var curPane = this.panes[this.curPane];
    this.container.empty();
    this.container.dialog("option", "title", curPane.title);
    this.container.dialog("option", "buttons", [
      {
        text: 'Yes',
        click: $.proxy(this['loadPane'+curPane.name], this)
      },
      {
        text: 'No',
        click: $.proxy(this.loadNextPane, this)
      }
    ]);
    this.container.append(
      $('<div/>')
        .text(curPane.prompt)
    );
  },
  loadPaneQuestions: function() {
    //$.getScript(
      //'../../assets/js/SignUpFormBuilder.js',
      //$.proxy(function() {
        this.container.dialog("option", "buttons", [
        {
          text: 'Create Sign Up Form',
          click: $.proxy(function () {
            SignUpFormBuilder.form.submitHandler();
            //TODO validation
            //TODO form preview
            this.loadNextPane(); 
          }, this),
        },
        {
          text: 'Clear',
          click: function () {
            $('#sign_up_form_create').html('');
          }
        },
        {
          text: 'Cancel',
          click: $.proxy(this.loadNextPane, this)
        }
        ]);
        SignUpFormBuilder.init(this.container);
      //},
      //this)
    //);
  },
  loadPaneWaitlist: function() {
    this.container.empty();
    this.container.append(
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
    this.container.dialog("option", "buttons", [
      {
        text: 'Add Waitlist',
        click: $.proxy(function () {
          //TODO save count
          EventCreate.field.setHiddenSignUpField(
            'capacity',
            $('#waitlist_capacity').val()
          );
          this.loadNextPane(); 
        }, this),
      },
      {
        text: 'Cancel',
        click: $.proxy(function () {
          this.loadNextPane(); 
        }, this),
      }
    ]);
  }

};
