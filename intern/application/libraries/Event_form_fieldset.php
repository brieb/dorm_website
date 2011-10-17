<?php
  class Event_form_fieldset {
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

