var SignUpFormRenderer = {};

SignUpFormRenderer = {
  init: function(signUpFormUrl, signUpResponseCreateUrl, signUpId) {
    SignUpFormRenderer.form.signUpId = signUpId;
    SignUpFormRenderer.form.responseCreateUrl =
      signUpResponseCreateUrl;

    if (SignUpFormRenderer.form.content === null) {
      $.get(signUpFormUrl, function(response) {
        SignUpFormRenderer.form.content = response;
        SignUpFormRenderer.form.render();
      });
    } else {
      SignUpFormRenderer.form.render();
    }
    
    //SignUpFormBuilder.dialog.container = $("#" + containerId);
  },
  form: {
    responseCreateUrl: null,
    signUpId: null,
    content: null,
    container: null,
    render: function() {
      SignUpFormRenderer.form.container = $('<div />');
      SignUpFormRenderer.form.container.html(SignUpFormRenderer.form.content);
      SignUpFormRenderer.form.container.dialog({
        autoOpen: true,
        modal: true,
        draggable: false,
        buttons: {
          'Sign Up': function () {
            SignUpFormRenderer.form.submitHandler();
            //TODO validation
            //TODO form preview
            $(this).dialog("close");
          },
          'Cancel': function () {
            $(this).dialog("close");
          }
        },
        close: function () {}
      });
    },
    submitHandler: function() {
      $.post(
        SignUpFormRenderer.form.responseCreateUrl,
        //{
          //sign_up_id: SignUpFormRenderer.form.signUpId,
          //form_response: SignUpFormRenderer.form.container.find('form')
            //.serialize().replace(/%5B%5D/g, '[]')
        //},
        SignUpFormRenderer.form.container.find('form')
          .serialize().replace(/%5B%5D/g, '[]')
          +"&sign_up_id="+SignUpFormRenderer.form.signUpId,
        function(response) {
          console.log(response)
        }
      );
    }
  }
};
