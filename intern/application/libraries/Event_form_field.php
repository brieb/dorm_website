<?php
  class Event_form_field {
    private $label;
    private $inputs;

    function __construct($label, $inputs) {
      $this->label = $label;
      $this->inputs = $inputs;
    }

    function render() {
      if (count($this->inputs) == 0) {
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
