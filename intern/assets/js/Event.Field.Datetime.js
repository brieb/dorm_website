Event.Field.Datetime = function(name, label, prefill) {
  Event.Field.apply(this, [
    name, label, prefill
  ]);
};
Event.Field.Datetime.prototype = new Event.Field();

Event.Field.Datetime.prototype.initInput = function() {
  this.prefill = this.prefill === '' ?
                 new Date() :
                 new Date(this.prefill);

  var datepickerOptions = {
    ampm: true,
    stepHour: 1,
    stepMinute: 5
  };

  this.input = $('<input/>')
    .attr({
            type: 'text',
            id: this.name,
            name: this.name
          })
    .datetimepicker(datepickerOptions)
    .datetimepicker('setDate', this.prefill);

  //For some reason, part of the picker shows up on load
  $('#ui-datepicker-div').hide();
};

Event.Field.Datetime.prototype.setDate = function(date) {
  this.getInput().datetimepicker('setDate', date);
};

Event.Field.Datetime.prototype.getDate = function() {
  return this.getInput().datetimepicker('getDate');
};
