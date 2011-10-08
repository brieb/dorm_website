Event.SignUp.Form.Field = function(name, label, prefill) {
  this.name = name;
  this.label = label;

  if (typeof prefill === 'undefined') {
    this.prefill = '';
  } else {
    this.prefill = prefill;
  }

  this.initInput();
};

Event.SignUp.Form.Field.prototype.initInput = function() {
  this.input = null;
};

Event.SignUp.Form.Field.prototype.getName = function() {
  return this.name;
};

Event.SignUp.Form.Field.prototype.getInput = function() {
  return this.input;
};

Event.SignUp.Form.Field.prototype.getElem = function() {
  return this.genContainer(this.getInput());
};

Event.SignUp.Form.Field.prototype.genLabel = function() {
  return $('<label>')
    .attr({ 'for': this.name })
    .text(this.label + ': ');
};

Event.SignUp.Form.Field.prototype.genContainer = function(content) {
  return $('<div/>')
    .attr({ 'class': 'field' })
    .append(this.genLabel(), $('<br />'), content);
};
