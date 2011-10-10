var EventSignUp = {};

EventSignUp.Form = function(id_container) {
  this.container = $('#' + id_container);

  this.cur_field_content = null;

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
    .attr({
            type: 'button'
          })
    .button({
              label: 'Add Question'
            })
    .addClass('button_add')
    .click(function() {
             var field = new EventSignUp.Field();
             self.addField(field, true, false);
           });
  this.container_tabs.append(this.button_add);

  this.fields_fixed = [
    new EventSignUp.FieldFixed(
      'Name & Email Address',
      'Names and email addresses are automatically collected.'
    )
  ];

  for (var i = 0; i < this.fields_fixed.length; i++) {
    this.addField(this.fields_fixed[i], i === 0, true);
  }

  this.fields = [];

};

$.extend(EventSignUp.Form.prototype, {

  addField: function(field, is_active, is_fixed) {
    var content = field.getContent();
    this.container_content.append(content);
    content.hide();

    var tab_text = $('<div/>').html(field.getTab());
    var tab_content = $('<div/>').append(tab_text);

    if (!is_fixed) {
      this.fields.push(field);

      var button_remove = $('<button/>')
        .attr({
                type: 'button'
              })
        .button({
                  icons: {
                    primary: "ui-icon-close"
                  },
                  text: false
                })
        .click(function() {
                 self.removeField(field, tab);
               });

      tab_content.prepend(button_remove);

      field.getQuestionTextInput().keyup(function() {
        tab_text.html(field.getTab());
      });
    }

    var self = this;
    var tab = $('<div/>')
      .addClass('tab')
      .html(tab_content)
      .click(function() {
               if (self.cur_field_content !== null) {
                 self.cur_field_content.hide();
               }
               self.cur_field_content = content;
               self.cur_field_content.show();

               if (!is_fixed) {
                 field.getQuestionTextInput().focus();
               }

               $('.tab').removeClass('active');
               $(this).addClass('active');
             });
    this.button_add.before(tab);

    if (is_active) {
      tab.click();
    }
  },
  removeField: function(field, tab) {
    tab.remove();
    field.getContent().remove();
    this.fields = $.grep(this.fields, function(e) {
      return e !== field;
    });
  },
  serialize: function() {
    var data = [];
    for (var i = 0; i < this.fields.length; i++) {
      var field = this.fields[i];
      data.push(field.serialize());
    }
    return data;
  }

});


EventSignUp.FieldFixed = function(label, content) {
  this.label = label;
  this.content = content;
};
$.extend(EventSignUp.FieldFixed.prototype, {
  getTab: function() {
    return $('<div/>')
      .text(this.label);
  },
  getContent: function() {
    return $('<div/>')
      .text(this.content);
  }
});


EventSignUp.Field = function() {
  this.content = "";
  this.content_sub_field = $('<div/>');
  this.sub_field = null;
  this.type = "";

  this.question_text_input = $('<input/>')
    .attr({
            'type': 'text',
            'class': 'width_full'
          });
  this.type_selector = $('<select/>');

  var self = this;
  var sub_field_type_map = {
    'multiple_choice': 'radio',
    'checkboxes': 'checkbox',
    'choose_from_a_list': 'list'
  };
  this.type_selector.change(function() {
    var type = $(this).val();

    self.type = type;
    self.sub_field = null;
    self.content_sub_field.empty();

    if (typeof sub_field_type_map[type] !== "undefined") {
      self.sub_field = new EventSignUp.SubFieldChoices(sub_field_type_map[type]);
      self.content_sub_field.html(self.sub_field.getContent());
    }
  });

  //TODO move to prototype
  this.types = [
    {
      'type' : 'text',
      'label' : 'Text'
    },
    {
      'type' : 'paragraph_text',
      'label' : 'Paragraph'
    },
    {
      'type' : 'multiple_choice',
      'label' : 'Multiple Choice'
    },
    {
      'type' : 'checkboxes',
      'label' : 'Checkboxes'
    },
    {
      'type' : 'choose_from_a_list',
      'label' : 'Choose from a List'
    }
  ];

  this.type_selector.append(
    $('<option/>')
      .attr({
              value: "",
              disabled: "disabled"
            })
      .text("Choose a question type...")
  );

  for (var i = 0; i < this.types.length; i++) {
    var type = this.types[i];

    this.type_selector.append(
      $('<option/>')
        .attr({
                value: type.type
              })
        .text(type.label)
    );
  }

  this.content = $('<div/>')
    .append($('<div/>')
              .attr({
                      'class': 'label'
                    })
              .text('Question: '),
            this.question_text_input,
            $('<div/>')
              .attr({
                      'class': 'label'
                    })
              .text('Type: '),
            this.type_selector,
            this.content_sub_field
  );

};

$.extend(EventSignUp.Field.prototype, {

  getTab: function() {
    var qtext = this.question_text_input.val();
    return qtext === "" ? "(untitled)" : qtext;
  },
  getContent: function() {
    this.type_selector.uniform();
    return this.content;
  },
  getQuestionTextInput: function() {
    return this.question_text_input;
  },
  serialize: function() {
    var data = {
      'text': this.question_text_input.val(),
      'type': this.type,
      'choices': ''
    };

    if (this.sub_field !== null) {
      data.choices = this.sub_field.serialize();
    }

    return data;
  }

});


EventSignUp.SubFieldChoices = function(type) {
  this.type = type;
  this.container_choices = $('<div/>');

  this.container_choices.append(
    this.genChoice()
  );
};

$.extend(EventSignUp.SubFieldChoices.prototype, {

  getContent: function() {
    return $('<div/>')
      .addClass('subfield')
      .append(this.container_choices, this.genDummy());
  },
  serialize: function() {
    var data = [];
    var choices = this.container_choices.find('input[type="text"]');
    for (var i = 0; i < choices.length; i++) {
      var choice = $(choices[i]);
      data.push(choice.val());
    }
    return data;
  },
  genDummy: function() {
    var self = this;
    return $('<button/>')
      .attr({
              type: 'button'
            })
      .addClass('sign_up_field_button')
      .button({
                label: 'Add Another Choice'
              })
      .click(function() {
               var choice = self.genChoice();
               self.container_choices.append(choice);
               choice.find('input[type="text"]').focus();
             });
  },
  genChoice: function () {
    var choice = $('<div/>')
      .addClass('width_full');

    var button_remove = $('<div/>')
      .addClass('sign_up_remove_choice')
      .append($('<button/>')
                .attr({
                        type: 'button'
                      })
                .button({
                          icons: {
                            primary: "ui-icon-close"
                          },
                          text: false
                        })
                .click(function() {
                         choice.remove();
                       }));
    choice.append(button_remove);

    var input = $('<div/>');

    if (this.type !== null && this.type !== "list") {
      input.addClass('has_input_placeholder');
      input.append(
        $('<input />')
          .attr({
                  type: this.type,
                  disabled: 'disabled'
                }));
    } else {
      input.addClass('no_input_placeholder');
    }

    input.append(
      $('<input />')
        .attr({
                type: 'text',
                placeholder: 'Enter Choice Text Here'
              })
    );
    choice.append(input);

    return choice;
  }
});
