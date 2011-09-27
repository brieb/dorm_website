<?php

require_once(dirname(__FILE__) . '/menu/Menu.php');

class MainMenu {
  /**
   * @var Menu[]
   */
  private $menus;

  function __construct() {
    $menuEvent = new Menu(
      new MenuItem('events', 'Events'),
      array(
        new MenuItem(
          'calendar',
          'Calendar',
          array(
            'class' => 'calendar',
            'method' => 'index'
          )
        ),
        new MenuItem(
          'event_list',
          'Event List',
          array(
            'class' => 'event',
            'method' => 'view'
          )
        ),
        new MenuItem(
          'event_create',
          'Create Event',
          array(
            'class' => 'event',
            'method' => 'create'
          )
        ),
      )
    );

    $menuPeople = new Menu(
      new MenuItem(
        'people',
        'People',
        array(
          'class' => 'user_directory',
          'method' => 'index',
        )
      )
    );

    $menuWiki = new Menu(
      new MenuItem('wiki', 'Wikis'),
      array(
        new MenuItem(
          'basecamp',
          'Basecamp',
          array(
            'class' => 'wiki',
            'method' => 'basecamp'
          ),
          'https://frosoco.basecamphq.com'
        ),
        new MenuItem(
          'wiki_staff',
          'Staff Wiki',
          array(
            'class' => 'wiki',
            'method' => 'staff'
          ),
          'https://www.stanford.edu/group/frosoco/cgi-bin/' .
          'staff_wiki/index.php/Main_Page'
        ),
        new MenuItem(
          'wiki_confi',
          'Confi Wiki',
          array(
            'class' => 'wiki',
            'method' => 'confi'
          ),
          'https://www.stanford.edu/group/frosoco/cgi-bin/' .
          'confi_wiki/index.php/Main_Page'
        ),
      )
    );

    $menuFacebook = new Menu(
      new MenuItem(
        'facebook',
        'Facebook',
        array(
          'class' => 'facebook',
          'method' => 'frosoco'
        ),
        'http://www.facebook.com/groups/211176618940648/'
      ),
      array(
        new MenuItem(
          'facebook_staff',
          'Staff Group',
          array(
            'class' => 'facebook',
            'method' => 'frosoco_staff'
          ),
          'http://www.facebook.com/groups/248990468469916/'
        ),
      )
    );

    $this->menus = array(
      $menuEvent,
      $menuPeople,
      $menuWiki,
      $menuFacebook,
    );
  }

  public function render() {
    $content = "";

    $content .= "<ul class='menu'>";
    foreach ($this->menus as $menu) {
      $content .= $menu->render();
    }
    $content .= "</ul>";

    return $content;
  }

}
