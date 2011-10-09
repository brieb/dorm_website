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
