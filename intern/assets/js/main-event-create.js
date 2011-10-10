require(
  [
    "jquery", "jquery-ui", "SetUp",
    "jquery.uniform",
    "Event.Create",
    "jquery.maskedinput",
    "EventSignUp"
  ],
  function($) {

    //TODO move to own js file
    $.mask.definitions['~'] = '[ap]';
    $.mask.definitions['H'] = '[ 01]';
    $.mask.definitions['M'] = '[012345]';
    $('.time').mask("H9:M9 ~m");

    $.mask.definitions['D'] = '[ 01]';
    $.mask.definitions['M'] = '[ 0123]';
    $('.date').mask("D9/M9/2019");

    $('.buttonset').buttonset();

    var event_sign_up = null;

    $('#event_sign_up_specific').hide();
    $('#sign_up_enabled').change(function(e) {
      //TODO
      var val = $(e.target).val();
      if (val === "1") {
        event_sign_up = new EventSignUp.Form('event_sign_up_form');
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
      if (event_sign_up !== null) {
        data += "&" +
          $.param({
                    'sign_up_questions': event_sign_up.serialize()
                  });
      }

      $.post(
        '',
        data,
        function(r) {
          console.log(r);
        }
      );

      return false;
    })

  });
