<?php
  class EventFormFieldset {
    private $legend;
    private $elements;
    private $class;

    function __construct($legend, $class='') {
      $this->legend = $legend;
      $this->class = $class;

      $this->elements = array();
    }

    function add_element($element) {
      $this->elements[] = $element;
    }

    function render() {
      $content = "<fieldset class=\"{$this->class}\">";
        $content .= "<legend>{$this->legend}</legend>";

        foreach ($this->elements as $element) {
          $content .= $element->render();
        }

        $content .= "</fieldset>";
      return $content;
    }
  }

  class EventFormField {
    private $label;
    private $inputs;

    function __construct($label, $inputs) {
      $this->label = $label;
      $this->inputs = $inputs;
    }

    function render() {
      if (count($this->inputs) < 1) {
        return "";
      }

      $content = "";


      $content .= "<div class='field'>";
        $input_first_id = $this->inputs[0]->get_id();
        $content .= "<label class='label' for='{$input_first_id}'>".
          $this->label.": </label>";

        foreach ($this->inputs as $input) {
          $content .= $input->render();
        }

        $content .= "</div>";

      return $content;
    }

  }

  class EventFormFieldInput {
    private $id;
    private $placeholder;
    private $type;
    private $prefill;
    private $class;

    function __construct(
      $id,
      $prefill     = '',
      $placeholder = '',
      $class       = 'width_full',
      $type        = 'text'
    ) {
      $this->id           = $id;
      $this->placeholder  = $placeholder;
      $this->type         = $type;
      $this->prefill = $prefill;
      $this->class = $class;
    }

    function get_id() {
      return $this->id;
    }

    function render() {
      $content = "";

      $attr = "
      id          = \"{$this->id}\"
      name        = \"{$this->id}\"
      placeholder = \"{$this->placeholder}\"
      class       = \"{$this->class}\"
      ";

      if ($this->type == 'text') {
        $content .= "<input {$attr}
        type  = \"{$this->type}\"
        value = \"{$this->prefill}\"
        />";
      } else if ($this->type == 'textarea') {
        $content .= "<textarea {$attr}>{$this->prefill}</textarea>";
      }

      return $content;
    }
  }

  class EventForm {
    private $fields_common;
    private $fieldsets_specific;
    private $prefill;
    private $sign_up_id;

    function __construct($prefill = null, $sign_up_id = -1) {
      $this->prefill = $prefill;
      $this->sign_up_id = $sign_up_id;

      $this->fields_common = array();
      $this->fieldsets_specific = array();

      $this->init_fields_common();
      $this->init_fieldsets_specific();
    }

    function render_sign_up_form() {
      if ($this->sign_up_id == -1) {
        //TODO handle case with existing signup
        return "<button type='button'>Remove</button>";
      }

      $content = <<<EOT
      <fieldset>
        <legend>Sign Up</legend>

        <div class="field">
          <div class="label">Enabled:</div>

          <div id="sign_up_enabled" class="buttonset">
            <input type="radio"
            id="sign_up_enabled_yes"
            name="sign_up_enabled"
            value="1"/>
            <label for="sign_up_enabled_yes">Yes</label>
            <input type="radio"
            id="sign_up_enabled_no"
            name="sign_up_enabled"
            checked="checked"
            value="0"/>
            <label for="sign_up_enabled_no">No</label>
          </div>
        </div>

        <div id="event_sign_up_specific">
          <div class="field">
            <label class="label" for="sign_up_capacity">Event Capacity: </label>
            <input type="text"
            id="sign_up_capacity"
            name="sign_up_capacity"
            placeholder=""
            class="width_full"/>
          </div>

          <fieldset>
            <legend>Questions</legend>
            <div id="event_sign_up_form"></div>
          </fieldset>
        </div>

      </fieldset>
EOT;

      return $content;
    }

    function render() {
      $content = "";

      foreach ($this->fields_common as $elem) {
        $content .= $elem->render();
      }

      foreach ($this->fieldsets_specific as $elem) {
        $content .= $elem->render();
      }

      $content .= $this->render_sign_up_form();

      return $content;
    }

    private function get_prefill_value($id) {
      if ($this->prefill == null || !isset($this->prefill[$id])) {
        return "";
      }
      return $prefill_data[$id];
    }

    private function init_fields_common() {
      $this->fields_common = array(
        new EventFormField(
          'Title',
          array(
            new EventFormFieldInput(
              'title',
              $this->get_prefill_value('title'),
              'ex: End of year banquet'
            ),
          )
        ),
        new EventFormField(
          'Start',
          array(
            new EventFormFieldInput(
              'start_date',
              $this->get_prefill_value('start_date'),
              '',
              'date width_half'
            ),
            new EventFormFieldInput(
              'start_time',
              $this->get_prefill_value('start_time'),
              '',
              'time width_half last'
            ),
          )
        ),
        new EventFormField(
          'End',
          array(
            new EventFormFieldInput(
              'end_date',
              $this->get_prefill_value('end_date'),
              '',
              'date width_half'
            ),
            new EventFormFieldInput(
              'end_time',
              $this->get_prefill_value('end_time'),
              '',
              'time width_half last'
            ),
          )
        ),
        new EventFormField(
          'Description',
          array(
            new EventFormFieldInput(
              'description',
              $this->get_prefill_value('description'),
              '',
              'width_full',
              'textarea'
            ),
          )
        )

      );
    }

    private function init_fieldsets_specific() {
      $fieldset = new EventFormFieldset(
        'Event-Specific Information', 'event_specific');

        $fieldset->add_element(
          new EventFormField(
            'Location',
            array(
              new EventFormFieldInput(
                'location',
                $this->get_prefill_value('location')
              )
            )
          )
        );

        $fieldset->add_element(
          new EventFormField(
            'Meetup Info',
            array(
              new EventFormFieldInput(
                'meetup_info',
                $this->get_prefill_value('meetup_info'),
                'ex: Schaddify at 10pm'
              )
            )
          )
        );

        $fieldset->add_element(
          new EventFormField(
            'Point Person',
            array(
              new EventFormFieldInput(
                'point_person',
                $this->get_prefill_value('point_person')
              )
            )
          )
        );

        $fieldset_inner = new EventFormFieldset('Payment');
        $fieldset_inner->add_element(
          new EventFormField(
            'Price',
            array(
              new EventFormFieldInput(
                'payment_price',
                $this->get_prefill_value('payment_price'),
                'ex: $10'
              )
            )
          )
        );
        $fieldset_inner->add_element(
          new EventFormField(
            'Instructions',
            array(
              new EventFormFieldInput(
                'payment_instructions',
                $this->get_prefill_value('payment_instructions'),
                "ex: Slide it under Lily's door"
              )
            )
          )
        );
        $fieldset->add_element($fieldset_inner);

        $this->fieldsets_specific[] = $fieldset;
      }
    }

