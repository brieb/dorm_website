Event.Field.Text = function(name, label, placeholder, prefill) {
  Event.Field.apply(this, [
    name, label, prefill
  ]);

  if (typeof placeholder === 'undefined') {
    this.placeholder = '';
  } else {
    this.placeholder = placeholder;
  }

  this.initInput();
};
Event.Field.Text.prototype = new Event.Field();

Event.Field.Text.prototype.initInput = function() {
  this.input = $('<input>')
    .attr({
            'type': 'text',
            'id': this.name,
            'name': this.name,
            'placeholder': this.placeholder
          });
};
