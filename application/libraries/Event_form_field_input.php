<?php
  class Event_form_field_input {
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

