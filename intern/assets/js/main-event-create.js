require(
  [
    "jquery", "jquery-ui", "SetUp",
    "Event.Create",
    "jquery.maskedinput",
    "SignUpFormBuilder"
  ],
  function($) {

    //TODO move to own js file
    $.mask.definitions['~']='[ap]';
    $.mask.definitions['H']='[ 01]';
    $.mask.definitions['M']='[012345]';
    $('.time').mask("H9:M9 ~m");

    $.mask.definitions['D']='[ 01]';
    $.mask.definitions['M']='[ 0123]';
    $('.date').mask("D9/M9/2019");
    
    $('.buttonset').buttonset();
    
    $('#sign_up_enabled').change(function(e) {
      var val = $(e.target).val();
    });
    
    var event_sign_up = new Event.SignUp.Form('event_sign_up');
  });
