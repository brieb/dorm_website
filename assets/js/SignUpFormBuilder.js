var SignUpFormBuilder = {};

$(document).ready(function() {
  SignUpFormBuilder.init();
});

SignUpFormBuilder = {
  init: function() {
    SignUpFormBuilder.setUpHandlers();
  },
  setUpHandlers: function() {
    $('button[name^="sign_up_form_create["]"').click(function() {
      var target = $(this);
      var type = target.attr('name').replace(/sign_up_form_create\[(.*)\]/, '$1');
      var insertBeforeElem = $('#sign_up_form_create input[type=submit]');
      var content = SignUpFormBuilder.field.genType(type);
      insertBeforeElem.before(content);
    });

    $('#sign_up_form_create').submit(function() {
      var questions = [];
      var form = $(this);
      form.find('fieldset').each(function(i, value) {
        value = $(value);
        var question = {};
        question.type = value.find('input[name="question[type]"]').val();
        question.text = value.find('input[name="question[text]"]').val();
        question.help = value.find('input[name="question[help]"]').val();
        question.required = value.find('input[name="question[required]"]').val();

        var choices = value.find('input[name="question[choice][]"]');
        question.choices = [];
        choices.each(function(j, choice) {
          choice = $(choice);
          question.choices.push(choice.val());
        });
        questions.push(question);
      });
      console.log(questions);
      return false;
    });
  },
  field: {
    curId: 0,
    genType: function(type) {
      SignUpFormBuilder.field.curId++;

      var typeFn = type.replace(/((^|\_)[a-z])/g, function($1) {
        return $1.toUpperCase().replace('_', '');
      });

      var content;
      content = $('<fieldset />');
      content.append(
        $('<input />').attr({
        type: 'hidden',
        name: 'question[type]',
        value: type
      }), $('<input />').attr({
        type: 'hidden',
        name: 'question[id]',
        value: SignUpFormBuilder.field.curId
      }), $('<input />').attr({
        type: 'text',
        name: 'question[text]',
        placeholder: 'Enter question text here...'
      }), $('<input />').attr({
        type: 'text',
        name: 'question[help]',
        placeholder: 'Optional question help'
      }), $('<br/ >'));

      content.append(SignUpFormBuilder.field['genType' + typeFn]);

      content.append(
        $('<button />').attr({
        type: 'button'
      }).text('Remove').click(function(event) {
        var target = $(event.target);
        target.parent().remove();
      }));

      return content;
    },
    genTypeText: function() {
      return $('<input />').attr({
        type: 'text',
        placeholder: 'The question answer will go here...',
        disabled: 'disabled'
      });
    },
    genTypeParagraphText: function() {
      return $('<textarea />').attr({
        disabled: 'disabled'
      }).text('The response will go here...');
    },
    genTypeMultipleChoice: function() {
      var elemChoiceDummy = SignUpFormBuilder.field.genDummyField('radio', 'Click here to add another choice', SignUpFormBuilder.field.genMultipleChoiceChoice);
      return SignUpFormBuilder.field.genMultipleChoiceChoice().after(elemChoiceDummy);
    },
    genMultipleChoiceChoice: function() {
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
    genTypeCheckboxes: function() {
      var elemChoiceDummy = SignUpFormBuilder.field.genDummyField('checkbox', 'Click here to add another checkbox', SignUpFormBuilder.field.genCheckbox);
      return SignUpFormBuilder.field.genCheckbox().after(elemChoiceDummy);
    },
    genCheckbox: function() {
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
    genTypeChooseFromAList: function() {
      var elemChoiceDummy = SignUpFormBuilder.field.genDummyField('none', 'Click here to add another choice', SignUpFormBuilder.field.genChooseFromAListChoice);
      return SignUpFormBuilder.field.genChooseFromAListChoice().after(elemChoiceDummy);
    },
    genChooseFromAListChoice: function() {
      var elemChoice = $('<input />').attr({
        type: 'text',
        name: 'question[choice][]',
        placeholder: 'Enter choice text here'
      }).after($('<br />'));
      return elemChoice;
    },
    newChoiceClickHandler: function(genFn) {
      var target = $(event.target);
      var elemNew = genFn();
      target.parent().before(elemNew);
      for(var i = 0; i < elemNew.length; i++) {
        console.log(elemNew[i]);
        if($(elemNew[i]).attr('type') === 'text') {
          elemNew[i].focus();
          break;
        }
      }
    },
    genDummyField: function(inputType, inputText, genFn) {
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
        value: inputText}),
        $('<span />').css({
          'z-index': '100',
          'width': '100%',
          'height': '100%',
          'position': 'absolute',
          'top': 0,
          'left': 0
        }).click(function(event) {
          SignUpFormBuilder.field.newChoiceClickHandler(genFn);
        }));
      return elemChoiceDummy;
    }
  }
};

