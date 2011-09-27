require(
  [
    "jquery", "jquery-ui", "SetUp",
    "EventCreate",
    "jquery-ui-timepicker-addon",
    "SignUpFormBuilder",
    "EventCreateSignUpWizard"
  ],
  function($) {
  EventCreate.init("sidebar", "content");
});
