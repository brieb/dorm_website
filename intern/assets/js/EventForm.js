var EventForm = {
  signUpId: null,
  eventId: null,
  eventSignUp: null,
  signUpToggler: null,
  signUpRemoveButton: null,

  init: function() {
    this.signUpToggler = $('#event_sign_up_toggle');
    this.signUpRemoveButton = $('#event_sign_up_remove');

    this.setUpDateFields();

    $('.buttonset').buttonset();
    $('button').button();

    this.setUpSignUpForm();
    this.setUpSignUpRemove();
  },
  setUpDateFields: function() {
    $.mask.definitions['~'] = '[ap]';
    $.mask.definitions['H'] = '[ 01]';
    $.mask.definitions['M'] = '[012345]';
    $('.time').mask("H9:M9 ~m");

    $.mask.definitions['D'] = '[ 01]';
    $.mask.definitions['M'] = '[ 0123]';
    $('.date').mask("D9/M9/2019");

    $('.date').datepicker();

    var start_date = $('#start_date');
    var end_date = $('#end_date');
    start_date.change(function() {
      var start_date_val = start_date.datepicker("getDate");
      var end_date_val = end_date.datepicker("getDate");

      if (start_date_val > end_date_val) {
        end_date_val = new Date(start_date_val);
        end_date.datepicker("setDate", end_date_val);
      }
    });
  },
  setUpSignUpForm: function() {
    var self = this;

    $('#event_sign_up_specific').hide();
    $('#sign_up_enabled').change(function(e) {
      //TODO
      var val = $(e.target).val();
      if (val === "1") {
        self.eventSignUp = new EventSignUp.Form('event_sign_up_form');
        $('#sign_up_capacity').val('').focus();
        $('#event_sign_up_specific').show();
      }
      else {
        //TODO Are you sure...?
        $('#event_sign_up_specific').hide();
        $('#sign_up_capacity').val('');
        $('#event_sign_up_form').empty();
      }
    });

    $("#event_create_fields").submit(function() {
      var data = $(this).serialize();
      if (self.eventSignUp !== null) {
        data += "&" +
          $.param({ 'sign_up_questions': self.eventSignUp.serialize() });
      }

      $.post('', data, function(r) {
        window.location = SITE_URL + '/event/view/' + self.eventId
      });

      return false;
    });
  },
  setSignUpId: function(signUpId) {
    this.signUpId = signUpId;
  },
  setEventId: function(eventId) {
    this.eventId = eventId;
  },
  setUpSignUpRemove: function() {
    var self = this;
    this.signUpRemoveButton.click(function() {
      $('<div/>')
      .html(
        '<p>\
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
              var dialog = $(this);
              $.post(
                SITE_URL+'/sign_up/delete',
                { id: self.signUpId },
                function(r) {
                  if (r === "1") {
                    $('#event_sign_up_remove_container').remove();
                    this.signUpRemoveButton = null;

                    self.signUpToggler.show();

                    dialog.dialog('close');
                  }
                });
            }
          }
        });
    });
  }
};
