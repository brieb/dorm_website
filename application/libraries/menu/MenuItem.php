<?php

require_once(dirname(__FILE__) . "/../../helpers/remote_user_helper.php");

class MenuItem {
  /**
   * @var string
   */
  private $identifier;
  /**
   * @var string
   */
  private $title;
  /**
   * @var string[]
   */
  private $action;
  /**
   * @var string
   */
  private $url;
  /**
   * @var \Access
   */
  private $access;

  public function __construct(
    $identifier = "", $title, $action = null, $url = "") {

    $this->identifier = $identifier;
    $this->title = $title;
    $this->action = $action;
    $this->url = $url;
  }

  public function canDo() {
    if ($this->action) {
      return remote_user_can_do($this->action);
    }
    return false;
  }

  public function disable() {
    $this->action = null;
    $this->url = "";
  }

  /**
   * @return string
   */
  public function getIdentifier() {
    return $this->identifier;
  }

  public function render() {
    $anchor_class = "class='{$this->identifier}'";
    $anchor_href = "";
    $span_sprite = "<span class='sprite'></span>";
    $span_text = "<span class='text'>{$this->title}</span>";

    if ($this->action || $this->url) {
      $uri = $this->url ? $this->url : site_url($this->action);
      $anchor_href .= "href='{$uri}'";
    }

    return
      '<a ' . $anchor_class . ' ' . $anchor_href . ' >'.
        $span_sprite . $span_text .
      '</a>';
  }

}
