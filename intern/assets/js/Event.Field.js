Event.Field = function(name, label, prefill) {
  this.name = name;
  this.label = label;

  if (typeof prefill === 'undefined') {
    this.prefill = '';
  } else {
    this.prefill = prefill;
  }

  this.initInput();
};

Event.Field.prototype.initInput = function() {
  this.input = null;
};

Event.Field.prototype.getName = function() {
  return this.name;
};

Event.Field.prototype.getInput = function() {
  return this.input;
};

Event.Field.prototype.getElem = function() {
  return this.genContainer(this.getInput());
};

Event.Field.prototype.genLabel = function() {
  return $('<label>')
    .attr({ 'for': this.name })
    .text(this.label + ': ');
};

Event.Field.prototype.genContainer = function(content) {
  return $('<div/>')
    .attr({ 'class': 'field' })
    .append(this.genLabel(), $('<br />'), content);
};
