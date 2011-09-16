var SignUpFormRenderer = {};

SignUpFormRenderer = {
  formViewUrl: SITE_URL+'/sign_up/view/',
  urlResponseCreate: SITE_URL+'/sign_up_response/create',
  urlResponseDelete: SITE_URL+'/sign_up_response/delete',
  urlGetForUser: SITE_URL+'/sign_up_response/getForUser',

  buttonSignUp: null,
  signUpId: null,
  eventTitle: '',
  responseId: 0,
  content: null,
  container: null,

  init: function(signUpId, eventTitle, signUpButtonId) {
    this.signUpId = signUpId;
    this.eventTitle = eventTitle;
    this.buttonSignUp = $('#'+signUpButtonId);

    this.getSignUpResponseIdForUser();

    this.display();
  },
  getSignUpResponseIdForUser: function() {
    $.get(
      this.urlGetForUser+'/'+this.signUpId,
      function(response) {
        console.log(response);
      }
    ); 
  },
  process: function() {
    if (this.content === '') {
      $.post(
        this.urlResponseCreate,
        {
          sign_up_id: this.signUpId
        },
        function(response) {
          this.responseHandler(response);
        }.bind(this)
      );
    } else {
      this.formRender();
    }
  },
  responseHandler: function(response) {
    this.responseId = response;
    this.buttonSignUp
      .button({ label: 'Cancel Sign Up' })
      .unbind('click')
      .click(
        function() {
          this.cancel();
        }.bind(this)
      );
  },
  cancel: function() {
    $.post(
       this.urlResponseDelete,
       {
         id: this.responseId
       },
       function(response){
         if (response === '1') {
           this.buttonSignUp
              .button({ label: 'Sign Up' })
              .unbind('click')
              .click(
              function() {
                this.process();
              }.bind(this)
            );
         }
       }.bind(this)
    );
  },
  display: function() {
    if (this.content !== null) {
      this.process();
    } else {
      $.get(
        this.formViewUrl+this.signUpId,
        function(response) {
          this.content = response;
          this.process();
        }.bind(this)
      );
    }
  },
  formRender: function() {
    this.container = $('<div />');
    this.container.html(this.content);
    this.container.dialog({
      title: 'Sign Up for '+this.eventTitle,
      autoOpen: true,
      modal: true,
      draggable: false,
      width: 600,
      dialogClass: 'sign_up_form_render',
      buttons: {
        'Sign Up': function () {
          this.formSubmit();
          //TODO validation
        }.bind(this),
        'Cancel': function () {
          this.container.dialog('close');
        }.bind(this)
      },
      close: function () {}
    });
  },
  formSubmit: function() {
    $.post(
      this.urlResponseCreate,
      this.container.find('form')
        .serialize().replace(/%5B%5D/g, '[]')
        +"&sign_up_id="+this.signUpId,
      function(response) {
        //TODO handle error ''
        this.responseHandler(response);
        this.container.dialog('close');
      }.bind(this)
    );
  }
};
