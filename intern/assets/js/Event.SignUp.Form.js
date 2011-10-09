EventSignUp.Form = function(id_container) {
  this.container = $('#' + id_container);

  this.cur_field = null;

  this.container_tabs = $('<div/>')
    .attr({
            id: 'event_sign_up_tabs'
          });

  this.container_content = $('<div/>')
    .attr({
            id: 'event_sign_up_content'
          });

  this.container.append(this.container_tabs, this.container_content);

  var self = this;
  this.button_add = $('<button/>')
    .button({
              label: 'Add Question'
            })
    .addClass('button_add')
    .click(function() {
             var field = new EventSignUp.Field();
             self.fields.push(field);
             self.addField(field, true);
           });
  this.container_tabs.append(this.button_add);

  this.fields_fixed = [
    new EventSignUp.FieldFixed(
      'Name & Email Address',
      'Names and email addresses are automatically collected.'
    )
  ];

  for (var i = 0; i < this.fields_fixed.length; i++) {
    this.addField(this.fields_fixed[i], i === 0);
  }

  this.fields = [];

  var field = new EventSignUp.Field();
  self.fields.push(field);
  self.addField(field, true);
};

$.extend(EventSignUp.Form.prototype, {

  addField: function(field, is_active) {
    var content = field.getContent();
    this.container_content.append(content);
    content.hide();

    var self = this;
    var tab = $('<div/>')
      .addClass('tab')
      .html(field.getTab())
      .click(function() {
               if (self.cur_field !== null) {
                 self.cur_field.hide();
               }
               self.cur_field = content;
               self.cur_field.show();

               $('.tab').removeClass('active');
               $(this).addClass('active');
             });

    this.button_add.before(tab);

    if (is_active) {
      tab.click();
    }
  }

//  addField: function(field) {
//    this.fields.push(field);
//  }

});


//
//
// Event.SignUp.Form.prototype.genButtons = function() {
//   var self = this;
//   var types = [
//     {
//       type: 'Text',
//       label: 'Text'
//     },
//     {
//       type: 'ParagraphText',
//       label: 'Paragraph Text'
//     },
//     {
//       type: 'MultipleChoice',
//       label: 'Multiple Choice'
//     },
//     {
//       type: 'Checkboxes',
//       label: 'Checkboxes'
//     },
//     {
//       type: 'ChooseFromAList',
//       label: 'Choose From a List'
//     }
//   ];
//
//   var buttons = [];
//
//   types.map(function(type) {
//     $('<button />')
//       .button({
//                 'label': type.label
//               })
//       .click(function() {
//                self.addField(new self.Field[type.type]());
//              })
//   });
//
//   return buttons;
// };
//
// var SignUpFormBuilder = {};
//
// SignUpFormBuilder = {
//   init: function (container/*Id*/) {
//     //SignUpFormBuilder.dialog.container = $("#" + containerId);
//     SignUpFormBuilder.dialog.container = container;
//     SignUpFormBuilder.dialog.setUp();
//     SignUpFormBuilder.buttons.setUp();
//     SignUpFormBuilder.form.container = $("#sign_up_form_create");
//   },
//   form: {
//     container: null,
//
//     submitHandler: function() {
//       var questions = [];
//       SignUpFormBuilder.form.container
//         .find('fieldset')
//         .each(function (i, value) {
//                 value = $(value);
//                 var question = {};
//                 question.id = value.find('input[name="question[id]"]').val();
//                 question.type = value.find('input[name="question[type]"]').val();
//                 question.text = value.find('input[name="question[text]"]').val();
//                 question.help = value.find('input[name="question[help]"]').val();
//                 question.required = value.find('input[name="question[required]"]').val();
//
//                 var choices = value.find('input[name="question[choice][]"]');
//                 question.choices = [];
//                 choices.each(function (j, choice) {
//                   choice = $(choice);
//                   question.choices.push(choice.val());
//                 });
//                 questions.push(question);
//               });
//
//       return questions;
//
//       //TODO moved to EventCreate instead
//       //$.post(
//       //window.location.pathname.replace(/(.*index\.php).*/, "$1/sign_up/create"),
//       //{
//       //questions: questions
//       //}, function (response) {
//       //console.log(response);
//       //});
//     }
//   },
//   dialog: {
//     container: null,
//     containerButtons: null,
//
//     setUp: function () {
//       SignUpFormBuilder.dialog.container.append(
//         $('<form />').attr({
//                              id: 'sign_up_form_create'
//                            }).addClass('ui-form'));
//       SignUpFormBuilder.dialog.containerButtons = $('<div />')
//         .attr({
//                 'class': 'sign_up_form_builder_buttons_container'
//               });
//
//     }
//   },
// //  buttons: {
// //    types:[
// //      'text',
// //      'paragraph_text',
// //      'multiple_choice',
// //      'checkboxes',
// //      'choose_from_a_list'
// //    ],
// //    setUp: function () {
// //      SignUpFormBuilder.buttons.types.map(function (type) {
// //        $('<button />')
// //          .attr({
// //            name: 'sign_up_form_create[' + type + ']'
// //          })
// //          .text(SignUpFormBuilder.buttons.convertToPrettyText(type))
// //          .button()
// //          .click(function () {
// //            var content = SignUpFormBuilder.field.genType(type);
// //            SignUpFormBuilder.form.container.append(content);
// //          })
// //          .appendTo(SignUpFormBuilder.dialog.containerButtons);
// //
// //        $('<br />').appendTo(SignUpFormBuilder.dialog.containerButtons);
// //      });
// //      SignUpFormBuilder.dialog.container.append(
// //        SignUpFormBuilder.dialog.containerButtons);
// //    },
// //    convertToPrettyText: function (type) {
// //      return type.replace(/(^|_)\w/g, function (x) {
// //        return x.toUpperCase();
// //      }).replace(/_/g, ' ');
// //    }
// //  },
//   field: {
//     curId: 0,
//     genType: function (type) {
//       SignUpFormBuilder.field.curId++;
//
//       var typeFn = type.replace(/((^|\_)[a-z])/g, function ($1) {
//         return $1.toUpperCase().replace('_', '');
//       });
//
//       var fieldset = $('<fieldset />');
//       fieldset.append(
//         $('<legend />')
//           .text(SignUpFormBuilder.buttons.convertToPrettyText(type)),
//         $('<input />').attr({
//                               type: 'hidden',
//                               name: 'question[id]',
//                               value: SignUpFormBuilder.field.curId
//                             }),
//         $('<input />').attr({
//                               type: 'hidden',
//                               name: 'question[type]',
//                               value: type
//                             }),
//         $('<div />')
//           .attr({
//                   'class': 'label'
//                 })
//           .text('Question Text:'),
//         $('<input />').attr({
//                               type: 'text',
//                               name: 'question[text]',
//                               placeholder: 'Enter question text here...'
//                             }),
//         $('<br />'),
//         $('<div />')
//           .attr({
//                   'class': 'label'
//                 })
//           .text('Question Help:'),
//         $('<input />').attr({
//                               type: 'text',
//                               name: 'question[help]',
//                               placeholder: 'Optional question help'
//                             }),
//         $('<div />')
//           .attr({
//                   'class': 'field'
//                 })
//           .append(
//           SignUpFormBuilder.field['genType' + typeFn]()
//         ),
//         $('<button />')
//           .attr({
//                   'class': 'button_remove'
//                 })
//           .button({
//                     icons: {
//                       primary: "ui-icon-trash"
//                     },
//                     text: false
//                   })
//           .click(function (event) {
//                    var target = $(event.target);
//                    target.parents('fieldset').remove();
//                  })
//       );
//
//       return fieldset;
//     },
//     genTypeText: function () {
//       //return $('<input />').attr({
//       //type: 'text',
//       //placeholder: 'The question answer will go here...',
//       //disabled: 'disabled'
//       //});
//       return null;
//     },
//     genTypeParagraphText: function () {
//       //return $('<textarea />').attr({
//       //disabled: 'disabled'
//       //}).text('The response will go here...');
//       return null;
//     },
//     genTypeMultipleChoice: function () {
//       var elemChoiceDummy = SignUpFormBuilder.field.genDummyField(
//         'radio',
//         'Click here to add another choice',
//         SignUpFormBuilder.field.genMultipleChoiceChoice
//       );
//       return SignUpFormBuilder.field.genMultipleChoiceChoice()
//         .after(elemChoiceDummy);
//     },
//     genMultipleChoiceChoice: function () {
//       var elemChoice = $('<input />').attr({
//                                              type: 'radio',
//                                              disabled: 'disabled'
//                                            }).after($('<input />').attr({
//                                                                           type: 'text',
//                                                                           name: 'question[choice][]',
//                                                                           placeholder: 'Enter Choice Text Here'
//                                                                         })).after($('<br />'));
//       return elemChoice;
//     },
//     genTypeCheckboxes: function () {
//       var elemChoiceDummy = SignUpFormBuilder.field.genDummyField(
//         'checkbox',
//         'Click here to add another checkbox',
//         SignUpFormBuilder.field.genCheckbox
//       );
//       return SignUpFormBuilder.field.genCheckbox().after(elemChoiceDummy);
//     },
//     genCheckbox: function () {
//       var elemChoice = $('<input />').attr({
//                                              type: 'checkbox',
//                                              disabled: 'disabled'
//                                            }).after($('<input />').attr({
//                                                                           type: 'text',
//                                                                           name: 'question[choice][]',
//                                                                           placeholder: 'Enter Choice Text Here'
//                                                                         })).after($('<br />'));
//       return elemChoice;
//     },
//     genTypeChooseFromAList: function () {
//       var elemChoiceDummy = SignUpFormBuilder.field.genDummyField(
//         'none',
//         'Click here to add another choice',
//         SignUpFormBuilder.field.genChooseFromAListChoice
//       );
//       return SignUpFormBuilder.field.genChooseFromAListChoice()
//         .after(elemChoiceDummy);
//     },
//     genChooseFromAListChoice: function () {
//       var elemChoice = $('<input />').attr({
//                                              type: 'text',
//                                              name: 'question[choice][]',
//                                              placeholder: 'Enter choice text here'
//                                            }).after($('<br />'));
//       return elemChoice;
//     },
//     newChoiceClickHandler: function (event, genFn) {
//       var target = $(event.target);
//       var elemNew = genFn();
//       target.parent().before(elemNew);
//       for (var i = 0; i < elemNew.length; i++) {
//         console.log(elemNew[i]);
//         if ($(elemNew[i]).attr('type') === 'text') {
//           elemNew[i].focus();
//           break;
//         }
//       }
//     },
//     genDummyField: function (inputType, inputText, genFn) {
//       var elemChoiceDummy = $('<span />').css({
//                                                 'position': 'relative'
//                                               });
//       if (inputType !== 'none') {
//         elemChoiceDummy.append(
//           $('<input />').attr({
//                                 type: inputType,
//                                 disabled: 'disabled'
//                               }));
//       }
//       elemChoiceDummy.append(
//         $('<input />').attr({
//                               type: 'text',
//                               disabled: 'disabled',
//                               value: inputText
//                             }), $('<span />').css({
//                                                     'z-index': '100',
//                                                     'width': '100%',
//                                                     'height': '100%',
//                                                     'position': 'absolute',
//                                                     'top': 0,
//                                                     'left': 0
//                                                   }).click(function (event) {
//                                                              SignUpFormBuilder.field.newChoiceClickHandler(event, genFn);
//                                                            }));
//       return elemChoiceDummy;
//     }
//   }
// };
