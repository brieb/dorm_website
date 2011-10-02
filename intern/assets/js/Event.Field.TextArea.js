Event.Field.TextArea = function(name, label, prefill) {
  Event.Field.apply(this, [
    name, label, prefill
  ]);
};
Event.Field.TextArea.prototype = new Event.Field();

Event.Field.TextArea.prototype.initInput = function() {
  this.input = $('<textarea>')
    .attr({
            'id': this.name,
            'name': this.name
          });
};
