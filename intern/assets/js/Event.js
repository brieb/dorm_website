var Event = function(id_form, id_sidebar) {
  this.urlEventCreate = SITE_URL + '/event/create/';
  this.urlEventView = SITE_URL + '/event/view/';

  this.commonFields = {
    title: new Event.Field.Text('title', 'Title'),
    time_start: new Event.Field.Datetime('time_start', 'Start Time'),
    time_end: new Event.Field.Datetime('time_end', 'End Time'),
    description: new Event.Field.TextArea('description', 'Description')
  };

  this.fieldsets = {
    meetup_info: new Event.Fieldset(
      'meetup_info',
      'Meetup Info',
      [
        new Event.Field.Text('info', 'Info', 'ex: Schaddify at 10pm')
      ]
    ),
    location: new Event.Fieldset(
      'location',
      'Location',
      [
        new Event.Field.Text('location', 'Location')
      ]
    ),
    payment: new Event.Fieldset(
      'payment',
      'Payment',
      [
        new Event.Field.Text('price', 'Price', '$10.00'),
        new Event.Field.Text(
          'instructions', 'Instructions',
          'ex: Slide it under [Staff Memeber]\'s door')
      ]
    ),
    point_person: new Event.Fieldset(
      'point_person',
      'Point Person',
      [
        new Event.Field.Text('point_person', 'Point Person')
      ]
    )
  };

  this.form = $('#' + id_form);
  this.sidebar = $('#' + id_sidebar);
  this.fieldsetButtonContainer = $('<div>')
    .attr({ 'class': 'sidebar-box' });
  this.buttonSubmit = this.genButtonSubmit();

  this.setUpDateListeners();
};

Event.prototype.render = function() {
  var self = this;

  $.each(
    this.commonFields,
    function(key, value) {
      self.form.append(value.getElem());
    }
  );

  this.sidebar.append(this.genButtonSubmit());
  this.sidebar.append(this.genSidebarSectionAddFields());
};

Event.prototype.genSidebarSectionAddFields = function() {
  var self = this;

  var sidebarSectionAddFields = $('<div></div>')
    .attr({
            'class': 'sidebar-box-wrapper'
          })
    .append($('<div />')
              .attr({
                      'class': 'label'
                    })
              .text('Add Fields:'));

  $.each(
    this.fieldsets,
    function(key, value) {
      value.setAppendTo(self.form);
      var button = value.getButtonAdd();
      sidebarSectionAddFields.append(button);
    }
  );

  return sidebarSectionAddFields;
};

Event.prototype.setUpDateListeners = function() {
  var self = this;
  this.commonFields.time_start.getInput().change(
    function() {
      var time_start, time_end;
      time_start = self.commonFields.time_start.getDate();
      time_end = self.commonFields.time_end.getDate();

      if (time_start > time_end) {
        time_end = new Date(time_start);
        time_end.setHours(time_end.getHours() + 1);
        self.commonFields.time_end.setDate(time_end)
      }
    }
  );
};

Event.prototype.genButtonSubmit = function() {
  var button;
  var self = this;

  button = $('<button />')
    .button({
              label: 'Create Event'
            });

  button.click(function() {
    var target = $(this);

    Util.button.addLoadingIndicator(target);
    $.post(
      self.urlEventCreate,
      self.serialize(),
      function(response) {
        Util.button.removeLoadingIndicator(target);
        window.location = self.urlEventView + response;
      }
    );
  });

  return $('<div />')
    .attr({
            'class': 'sidebar-box'
          })
    .append(button);
};

Event.prototype.serialize = function() {
  var self = this;

  var data = {};

  $.each(
    self.commonFields,
    function(key, value) {
      data[key] = value.getInput().val();
    }
  );

  data.fieldsets = {};
  $.each(
    self.fieldsets,
    function(key, value) {
      if (value.getIsSet()) {
        var name = value.getName();
        var fields = value.getFields();
        data.fieldsets[name] = {};

        var i;
        for (i = 0; i < fields.length; i++) {
          var field = fields[i];
          data.fieldsets[name][field.getName()] = field.getInput().val();
        }
      }
    }
  );

  return data;
};

//  serialize: function() {
//    var eventData = $(this.containerFields).serialize();
//
//    if (this.signUpEnabled) {
//      eventData += '&' + $.param({
//                                   'SignUp[enabled]': true
//                                 });
//      eventData += '&' + $.param({
//                                   'SignUp[capacity]': this.signUpCapacity
//                                 });
//    }
//    if (this.signUpForm !== null) {
//      eventData += '&' + $.param({
//                                   'SignUp[form]': this.signUpForm
//                                 });
//    }
//
//    eventData.replace(/%5B%5D/g, '[]');
//
//    return eventData;
//  },
