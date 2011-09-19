require(
  [
    "main-default",
    "EventCreate",
    "jquery-ui-timepicker-addon",
    "SignUpFormBuilder",
    "EventCreateSignUpWizard"
  ],
  function($) {
  EventCreate.init("sidebar", "content");
});
