<?php

require_once(dirname(__FILE__) . "/../Access.php");

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

    $this->access = new Access();
  }

  public function canDo() {
    if ($this->action) {
      return $this->access->canDo($this->action);
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

  public function getAnchor() {
    if (!($this->action || $this->url)) {
      return "<a class='{$this->identifier}'>{$this->title}</a>";
    }

    $uri = $this->url ? $this->url : $this->action;
    $attr = array('class' => $this->identifier);
    return anchor($uri, $this->title, $attr);
  }

}
