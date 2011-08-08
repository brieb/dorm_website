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
      console.log($(this).serializeArray());
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
        name: 'question_type[][' + type + ']'
      }), $('<input />').attr({
        type: 'text',
        placeholder: 'Enter question text here...',
        name: 'question[]'
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
        name: 'field[' + SignUpFormBuilder.field.curId + '][]'
      }).after($('<input />').attr({
        type: 'text',
        name: '',
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
        name: 'field[' + SignUpFormBuilder.field.curId + '][]'
      }).after($('<input />').attr({
        type: 'text',
        name: '',
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
        name: '',
        placeholder: 'Enter choice text here'
      }).after($('<br />'));
      return elemChoice;
    },
    newChoiceClickHandler: function(genFn) {
      var target = $(event.target);
      var elemNew = genFn();
      target.parent().before(elemNew);
      elemNew[1].focus();
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

