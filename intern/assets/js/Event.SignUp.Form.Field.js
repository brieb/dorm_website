EventSignUp.Field = function() {
  this.question_text = "no title";
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
  this.type_selector.change(function() {
    var type = $(this).val();

    self.type = type;
    self.sub_field = null;
    self.content_sub_field.html('');

    if (typeof EventSignUp.SubField[type] !== "undefined") {
      self.sub_field = new EventSignUp.SubField[type];
      self.content_sub_field.html(self.sub_field.getContent());
    }
  });

  this.types = [
    {
      'type' : 'Text',
      'label' : 'Text'
    },
    {
      'type' : 'ParagraphText',
      'label' : 'Paragraph'
    },
    {
      'type' : 'MultipleChoice',
      'label' : 'Multiple Choice'
    },
    {
      'type' : 'Checkboxes',
      'label' : 'Checkboxes'
    },
    {
      'type' : 'ChooseFromAList',
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
    .append(
    $('<div/>')
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
    return $('<div/>')
      .text(this.question_text);
  },
  getContent: function() {
    //this.type_selector.uniform();
    return this.content;
  },
//  getContentExtra: function() {
//    return null;
//  },

  initInput: function() {
    this.input = null;
  },

  getName: function() {
    return this.name;
  },

  getInput: function() {
    return this.input;
  },

  getElem: function() {
    return this.genContainer(this.getInput());
  },

  genLabel: function() {
    return $('<label>')
      .attr({ 'for': this.name })
      .text(this.label + ': ');
  },

  genContainer: function(content) {
    return $('<div/>')
      .attr({ 'class': 'field' })
      .append(this.genLabel(), $('<br />'), content);
  }

});


EventSignUp.SubField = {};

EventSignUp.SubField.MultipleChoice = function() {
  this.container_choices = $('<div/>');

  this.container_choices.append(
    this.genChoice()
  );
};

$.extend(EventSignUp.SubField.MultipleChoice.prototype, {

  getContent: function() {
    return $('<div/>').addClass('subfield').append(this.container_choices, this.genDummy());
  },
  serialize: function() {
    //TODO
    return "";
  },
  genDummy: function() {
    var self = this;

    var container = $('<span />')
      .css({
             'position': 'relative'
           });

    var input = $('<input />')
      .attr({
              type: 'radio',
              disabled: 'disabled'
            })
      .after($('<input />')
               .attr({
                       type: 'text',
                       disabled: 'disabled',
                       placeholder: 'Click Here to Add Another Choice'
                     }));

    var click_layer = $('<span />')
      .css({
             'z-index': '100',
             'width': '100%',
             'height': '100%',
             'position': 'absolute',
             'top': 0,
             'left': 0
           })
      .click(function() {
               self.container_choices.append(self.genChoice());
             });

    container.append(input, click_layer);

    return $('<button/>')
      .button({
                label: 'Click Here to Add Another Choice'
              })
      .click(function() {
               self.container_choices.append(self.genChoice());
             });
  },
  genChoice: function () {
    return $('<div/>')
      .addClass('width_full')
      .append($('<input />')
                .attr({
                        type: 'radio',
                        disabled: 'disabled'
                      }),
              $('<input />')
                .attr({
                        type: 'text',
                        placeholder: 'Enter Choice Text Here'
                      }));
  }
});

EventSignUp.SubField.Checkboxes = function() {
};
$.extend(EventSignUp.SubField.Checkboxes.prototype, {

  getContent: function() {
    return "hi!";
  },
  serialize: function() {
    //TODO
    return "";
  }

});

EventSignUp.SubField.ChooseFromAList = function() {
};
$.extend(EventSignUp.SubField.ChooseFromAList.prototype, {

  getContent: function() {
    return "hi!";
  },
  serialize: function() {
    //TODO
    return "";
  }

});
