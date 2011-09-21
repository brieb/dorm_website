<?php

require_once('MenuItem.php');

class Menu {
  /**
   * @var MenuItem
   */
  private $mainMenuItem;
  /**
   * @var MenuItem[]|null
   */
  private $subMenuItems;

  public function __construct(
    $mainMenuItem = null,
    $subMenuItems = null
  ) {
    $this->mainMenuItem = $mainMenuItem;
    $this->subMenuItems = $subMenuItems;
  }

  public function render() {
    $this->filterMenuItems();

    if (!$this->mainMenuItem) {
      return "";
    }

    $content = "";

    $content .= "<li>";

    $content .= $this->mainMenuItem->render();

    if ($this->subMenuItems) {
      $content .= "<ul class='submenu'>";
      foreach ($this->subMenuItems as $subMenuItem) {
        $content .= "
          <li>
            {$subMenuItem->render()}
          </li>
        ";
      }
      $content .= "</ul>";
    }

    $content .= "</li>";

    return $content;
  }

  private function filterMenuItems() {
    $this->filterSubMenuItems();

    if (!$this->mainMenuItem->canDo()) {
      if ($this->subMenuItems != NULL) {
        $this->mainMenuItem->disable();
      } else {
        $this->mainMenuItem = NULL;
      }
    }
  }

  private function filterSubMenuItems() {
    $accessibleMenuItems = array();

    if ($this->subMenuItems) {
      foreach ($this->subMenuItems as $subMenuItem) {
        if ($subMenuItem->canDo()) {
          $accessibleMenuItems[] = $subMenuItem;
        }
      }
    }

    if (count($accessibleMenuItems) == 0) {
      $this->subMenuItems = NULL;
    } else {
      $this->subMenuItems = $accessibleMenuItems;
    }
  }

  /**
   * @param \MenuItem $mainMenuItem
   */
  public function setMainMenuItem($mainMenuItem) {
    $this->mainMenuItem = $mainMenuItem;
  }

  /**
   * @return \MenuItem
   */
  public function getMainMenuItem() {
    return $this->mainMenuItem;
  }

  public function addSubMenuItem($menuItem) {
    $this->subMenuItems[] = $menuItem;
  }
}
