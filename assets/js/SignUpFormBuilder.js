var SignUpFormBuilder = {};

//$(document).ready(function () {
  //$('button[name="button_field_add[sign_up]"]')
    //.click(function () {
      //$("#sign_up_form_dialog").dialog("open");
    //})
    //.button();

  //SignUpFormBuilder.init('sign_up_form_dialog');
//});

SignUpFormBuilder = {
  init: function (container/*Id*/) {
    //SignUpFormBuilder.dialog.container = $("#" + containerId);
    SignUpFormBuilder.dialog.container = container;
    SignUpFormBuilder.buttons.setUp();
    SignUpFormBuilder.dialog.setUp();
    SignUpFormBuilder.form.container = $("#sign_up_form_create");
  },
  form: {
    container: null,
    submitHandler: function() {
      var questions = [];
      SignUpFormBuilder.form.container
        .find('fieldset')
        .each(function (i, value) {
          value = $(value);
          var question = {};
          question.id = value.find('input[name="question[id]"]').val();
          question.type = value.find('input[name="question[type]"]').val();
          question.text = value.find('input[name="question[text]"]').val();
          question.help = value.find('input[name="question[help]"]').val();
          question.required = value.find('input[name="question[required]"]').val();

          var choices = value.find('input[name="question[choice][]"]');
          question.choices = [];
          choices.each(function (j, choice) {
            choice = $(choice);
            question.choices.push(choice.val());
          });
          questions.push(question);
        });

      return questions;

      //TODO moved to EventCreate instead
      //$.post(
        //window.location.pathname.replace(/(.*index\.php).*/, "$1/sign_up/create"),
        //{
          //questions: questions
        //}, function (response) {
          //console.log(response);
        //});
    }
  },
  dialog: {
    container: null,
    setUp: function () {
      SignUpFormBuilder.dialog.container.append(
      $('<form />').attr({
        id: 'sign_up_form_create'
      }).addClass('ui-form'));
      //SignUpFormBuilder.dialog.container.dialog({
        ////TODO change to false
        ////autoOpen: false,
        //autoOpen: true,
        //height: 760,
        //width: 600,
        //modal: true,
        //draggable: false,
        //buttons: {
          //'Create Sign Up Form': function () {
            //SignUpFormBuilder.form.submitHandler();
            ////TODO validation
            ////TODO form preview
            //$(this).dialog("close");
          //},
          //'Clear': function () {
            //$('#sign_up_form_create').html('');
          //},
          //'Close': function () {
            //$(this).dialog("close");
          //}
        //},
        //close: function () {}
      //});
    }
  },
  buttons: {
    types:[
      'text',
      'paragraph_text',
      'multiple_choice',
      'checkboxes',
      'choose_from_a_list'
    ],
    setUp: function () {
      SignUpFormBuilder.buttons.types.map(function (type) {
        $('<button />')
          .attr({
            name: 'sign_up_form_create[' + type + ']'
          })
          .text(SignUpFormBuilder.buttons.convertToPrettyText(type))
          .button()
          .click(function () {
            var content = SignUpFormBuilder.field.genType(type);
            SignUpFormBuilder.form.container.append(content);
          })
          .appendTo(SignUpFormBuilder.dialog.container);
      });
    },
    convertToPrettyText: function (type) {
      return type.replace(/(^|_)\w/g, function (x) {
        return x.toUpperCase();
      }).replace(/_/g, ' ');
    }
  },
  field: {
    curId: 0,
    genType: function (type) {
      SignUpFormBuilder.field.curId++;

      var typeFn = type.replace(/((^|\_)[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('_', '');
      });

      var fieldset = $('<fieldset />');
      fieldset.append(
        $('<input />').attr({
          type: 'hidden',
          name: 'question[id]',
          value: SignUpFormBuilder.field.curId
        }), $('<input />').attr({
          type: 'hidden',
          name: 'question[type]',
          value: type
        }), $('<input />').attr({
          type: 'text',
          name: 'question[text]',
          placeholder: 'Enter question text here...'
        }), $('<input />').attr({
          type: 'text',
          name: 'question[help]',
          placeholder: 'Optional question help'
        }),
        $('<br/ >'),
        SignUpFormBuilder.field['genType' + typeFn](),
        $('<button />').attr({
          type: 'button'
        }).text('Remove').button().click(function (event) {
          var target = $(event.target);
          target.parents('fieldset').remove();
        })
      );

      return fieldset;
    },
    genTypeText: function () {
      return $('<input />').attr({
        type: 'text',
        placeholder: 'The question answer will go here...',
        disabled: 'disabled'
      });
    },
    genTypeParagraphText: function () {
      return $('<textarea />').attr({
        disabled: 'disabled'
      }).text('The response will go here...');
    },
    genTypeMultipleChoice: function () {
      var elemChoiceDummy = SignUpFormBuilder.field.genDummyField(
        'radio',
        'Click here to add another choice',
        SignUpFormBuilder.field.genMultipleChoiceChoice
      );
      return SignUpFormBuilder.field.genMultipleChoiceChoice()
        .after(elemChoiceDummy);
    },
    genMultipleChoiceChoice: function () {
      var elemChoice = $('<input />').attr({
        type: 'radio',
        disabled: 'disabled'
      }).after($('<input />').attr({
        type: 'text',
        name: 'question[choice][]',
        placeholder: 'Enter Choice Text Here'
      })).after($('<br />'));
      return elemChoice;
    },
    genTypeCheckboxes: function () {
      var elemChoiceDummy = SignUpFormBuilder.field.genDummyField(
        'checkbox',
        'Click here to add another checkbox',
        SignUpFormBuilder.field.genCheckbox
      );
      return SignUpFormBuilder.field.genCheckbox().after(elemChoiceDummy);
    },
    genCheckbox: function () {
      var elemChoice = $('<input />').attr({
        type: 'checkbox',
        disabled: 'disabled'
      }).after($('<input />').attr({
        type: 'text',
        name: 'question[choice][]',
        placeholder: 'Enter Choice Text Here'
      })).after($('<br />'));
      return elemChoice;
    },
    genTypeChooseFromAList: function () {
      var elemChoiceDummy = SignUpFormBuilder.field.genDummyField(
        'none',
        'Click here to add another choice',
        SignUpFormBuilder.field.genChooseFromAListChoice
      );
      return SignUpFormBuilder.field.genChooseFromAListChoice()
        .after(elemChoiceDummy);
    },
    genChooseFromAListChoice: function () {
      var elemChoice = $('<input />').attr({
        type: 'text',
        name: 'question[choice][]',
        placeholder: 'Enter choice text here'
      }).after($('<br />'));
      return elemChoice;
    },
    newChoiceClickHandler: function (event, genFn) {
      var target = $(event.target);
      var elemNew = genFn();
      target.parent().before(elemNew);
      for (var i = 0; i < elemNew.length; i++) {
        console.log(elemNew[i]);
        if ($(elemNew[i]).attr('type') === 'text') {
          elemNew[i].focus();
          break;
        }
      }
    },
    genDummyField: function (inputType, inputText, genFn) {
      var elemChoiceDummy = $('<span />').css({
        'position': 'relative'
      });
      if (inputType !== 'none') {
        elemChoiceDummy.append(
        $('<input />').attr({
          type: inputType,
          disabled: 'disabled'
        }));
      }
      elemChoiceDummy.append(
      $('<input />').attr({
        type: 'text',
        disabled: 'disabled',
        value: inputText
      }), $('<span />').css({
        'z-index': '100',
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'top': 0,
        'left': 0
      }).click(function (event) {
        SignUpFormBuilder.field.newChoiceClickHandler(event, genFn);
      }));
      return elemChoiceDummy;
    }
  }
};
