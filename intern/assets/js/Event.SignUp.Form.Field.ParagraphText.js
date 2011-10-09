EventSignUp.FieldTextArea = function() {
  EventSignUp.Field.apply(this, [
    name, label, prefill
  ]);
};

EventSignUp.FieldTextArea.prototype = new EventSignUp.Field();
$.extend(EventSignUp.FieldTextArea.prototype, {
  
  initInput: function() {
    this.input = $('<textarea>')
      .attr({
              'id': this.name,
              'name': this.name
            });
  }
  
});
