<?php
  require_once(dirname(__FILE__) . '/Event_form_field.php');
  require_once(dirname(__FILE__) . '/Event_form_fieldset.php');
  require_once(dirname(__FILE__) . '/Event_form_field_input.php');

  class Event_form {
    private $fields_common;
    private $fieldsets_specific;
    private $prefill;
    private $event_id;
    private $sign_up_id;

    public function __construct($params) {
      $this->prefill = null;
      $this->sign_up_id = null;
      $this->event_id = null;

      if (isset($params['prefill'])) {
        $this->prefill = $params['prefill'];
        $this->sign_up_id = $params['sign_up_id'];
        $this->event_id = $params['prefill']['id'];
      }

      $this->fields_common = array();
      $this->fieldsets_specific = array();

      $this->init_fields_common();
      $this->init_fieldsets_specific();
    }

    function render_sign_up_form() {
      $content = "";
      $content .= "<script>
        require.ready(function () {
          EventForm.setEventId({$this->event_id});
        });
      </script>";
      $hide_sign_up_form = "";

      $content .= "<fieldset>";
        $content .= "<legend>Sign Up</legend>";

        if ($this->sign_up_id != NULL) {
          //TODO handle case with existing signup
          $content .= "<div id='event_sign_up_remove_container' class='field'>";
            $content .= "<button
              id='event_sign_up_remove'
              type='button'>Remove</button>";
            $content .= "<script>
              require.ready(function () {
                EventForm.setSignUpId({$this->sign_up_id});
              });
            </script>";
            $content .= "</div>";
          $hide_sign_up_form = "style='display: none;'";
        }
        $content .= "
        <div id=\"event_sign_up_toggle\" class='field' {$hide_sign_up_form} >

          <div class=\"label\">Enabled:</div>

          <div id=\"sign_up_enabled\" class=\"buttonset\">

            <input type=\"radio\"
            id=\"sign_up_enabled_yes\"
            name=\"sign_up_enabled\"
            value=\"1\"/>
            <label for=\"sign_up_enabled_yes\">Yes</label>

            <input type=\"radio\"
            id=\"sign_up_enabled_no\"
            name=\"sign_up_enabled\"
            checked=\"checked\"
            value=\"0\"/>
            <label for=\"sign_up_enabled_no\">No</label>

          </div>

        </div>

        <div id=\"event_sign_up_specific\">
          <div class=\"field\">
            <label class=\"label\"
              for=\"sign_up_capacity\">Event Capacity: </label>
            <input type=\"text\"
            id=\"sign_up_capacity\"
            name=\"sign_up_capacity\"
            placeholder=\"\"
            class=\"width_full\"/>
          </div>

          <fieldset>
            <legend>Questions</legend>
            <div id=\"event_sign_up_form\"></div>
          </fieldset>
        </div>
        ";

        $content .= "</fieldset>";

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

    private function get_prefill_value($key) {
      if ($this->prefill == null || !isset($this->prefill[$key])) {
        return "";
      }
      return $this->prefill[$key];
    }

    private function init_fields_common() {
      $this->fields_common = array(
        new Event_form_field(
          'Title',
          array(
            new Event_form_field_input(
              'title',
              $this->get_prefill_value('title'),
              'ex: End of year banquet'
            ),
          )
        ),
        new Event_form_field(
          'Start',
          array(
            new Event_form_field_input(
              'start_date',
              $this->get_prefill_value('start_date'),
              '',
              'date width_half'
            ),
            new Event_form_field_input(
              'start_time',
              $this->get_prefill_value('start_time'),
              '',
              'time width_half last'
            ),
          )
        ),
        new Event_form_field(
          'End',
          array(
            new Event_form_field_input(
              'end_date',
              $this->get_prefill_value('end_date'),
              '',
              'date width_half'
            ),
            new Event_form_field_input(
              'end_time',
              $this->get_prefill_value('end_time'),
              '',
              'time width_half last'
            ),
          )
        ),
        new Event_form_field(
          'Description',
          array(
            new Event_form_field_input(
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
      $fieldset = new Event_form_fieldset(
        'Event-Specific Information', 'event_specific');

        $fieldset->add_element(
          new Event_form_field(
            'Location',
            array(
              new Event_form_field_input(
                'location',
                $this->get_prefill_value('location')
              )
            )
          )
        );

        $fieldset->add_element(
          new Event_form_field(
            'Meetup Info',
            array(
              new Event_form_field_input(
                'meetup_info',
                $this->get_prefill_value('meetup_info'),
                'ex: Schaddify at 10pm'
              )
            )
          )
        );

        $fieldset->add_element(
          new Event_form_field(
            'Point Person',
            array(
              new Event_form_field_input(
                'point_person',
                $this->get_prefill_value('point_person')
              )
            )
          )
        );

        $fieldset_inner = new Event_form_fieldset('Payment');
        $fieldset_inner->add_element(
          new Event_form_field(
            'Price',
            array(
              new Event_form_field_input(
                'payment_price',
                $this->get_prefill_value('payment_price'),
                'ex: $10'
              )
            )
          )
        );
        $fieldset_inner->add_element(
          new Event_form_field(
            'Instructions',
            array(
              new Event_form_field_input(
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

