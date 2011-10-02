Event.Fieldset = function(name, label, fields, id_container) {
  this.name = name;
  this.label = label;
  this.fields = fields;
  this.container = $('#' + id_container);

  this.isSet = false;

  this.initButtonAdd();
  this.initButtonRemove();
  this.initFieldsetElem();
};

Event.Fieldset.prototype.setAppendTo = function(appendTo) {
  this.appendTo = appendTo;
};

Event.Fieldset.prototype.getName = function() {
  return this.name;
};

Event.Fieldset.prototype.getElem = function() {
  return this.fieldsetElem;
};

Event.Fieldset.prototype.getButtonAdd = function() {
  return this.buttonAdd;
};

Event.Fieldset.prototype.getFields = function() {
  return this.fields;
};

Event.Fieldset.prototype.getIsSet = function() {
  return this.isSet;
};


Event.Fieldset.prototype.initFieldsetElem = function() {
  this.fieldsetElem = $('<fieldset>');

  var legend = $('<legend/>')
    .text(this.label);
  this.fieldsetElem.append(legend);

  this.fieldsetElem.append(this.buttonRemove);

  var i;
  for (i = 0; i < this.fields.length; i++) {
    this.fieldsetElem.append(this.fields[i].getElem());
  }
};

Event.Fieldset.prototype.initButtonRemove = function() {
  var self = this;
  this.buttonRemove = $('<button/>')
    .button({
              icons: {
                primary: 'ui-icon-trash'
              }
            })
    .click(function() {
             self.fieldsetElem.remove();
             self.buttonAdd
               .blur()
               .mouseleave()
               .button('enable');
             self.isSet = false;
           });
};

Event.Fieldset.prototype.initButtonAdd = function() {
  var self = this;
  this.buttonAdd = $('<button/>')
    .text(this.label)
    .button()
    .click(function() {
             var target = $(this);
             target
               .blur()
               .mouseleave()
               .button('disable');
             self.appendTo.append(self.getElem());
             self.isSet = true;
           });
};
