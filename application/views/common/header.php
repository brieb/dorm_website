<?php
$opts = array();
if (isset($page_title)) {
  $opts['page_title'] = $page_title;
}
$this->load->view('common/assets', $opts);

$links = array (
  'events' => array (
    'menuitem' => array(
      'title' => 'Events',
    ),
    'submenu' => array(
      array(
        'title' => 'Calendar',
        'action' => array(
          'class' => 'calendar',
          'method' => 'index',
        ),
        'attr' => array(
          'class' => 'calendar'
        ),
      ),
      array(
        'title' => 'Event List',
        'action' => array(
          'class' => 'event',
          'method' => 'view',
        ),
        'attr' => array(
          'class' => 'event_list'
        ),
      ),
      array(
        'title' => 'Create Event',
        'action' => array(
          'class' => 'event',
          'method' => 'create',
        ),
        'attr' => array(
          'class' => 'event_create'
        ),
      ),
    ),
  ),
  'people' => array(
    'menuitem' => array(
      'title' => 'People',
      'action' => array(
        'class' => 'user_directory',
        'method' => 'index',
      ),
    ),
  ),
  'wiki' => array(
    'menuitem' => array(
      'title' => 'Wikis',
    ),
    'submenu' => array(
      array(
        'title' => 'Basecamp',
        'action' => array(
          'class' => 'wiki',
          'method' => 'basecamp'
        ),
        'attr' => array(
          'class' => 'basecamp'
        ),
        'url' =>
          'https://frosoco.basecamphq.com',
      ),
      array(
        'title' => 'Staff Wiki',
        'action' => array(
          'class' => 'wiki',
          'method' => 'staff'
        ),
        'attr' => array(
          'class' => 'staff'
        ),
        'url' =>
          'https://www.stanford.edu/group/frosoco/cgi-bin/'.
          'staff_wiki/index.php/Main_Page',
      ),
      array(
        'title' => 'Confi Wiki',
        'action' => array(
          'class' => 'wiki',
          'method' => 'confi'
        ),
        'attr' => array(
          'class' => 'confi'
        ),
        'url' =>
          'https://www.stanford.edu/group/frosoco/cgi-bin/'.
          'confi_wiki/index.php/Main_Page',
      ),
    ),
  ),
//
//  'facebook' => array(
//    'menuitem' => array(
//
//    ),
//  ),
);

/*
 * Filter menu content
 */
foreach ($links as $key => $value) {
  if (
    isset($value['menuitem']['action']) &&
    !$this->access->canDo($value['menuitem']['action'])
  ) {
    unset($links[$key]['menuitem']);

    if (!isset($links[$key]['submenu'])) {
      unset($links[$key]);
    }
  }

  if (isset($value['submenu'])) {
    foreach ($value['submenu'] as $submenuKey => $submenuValue) {
      if (!$this->access->canDo($submenuValue['action'])) {
        unset($links[$key]['submenu'][$submenuKey]);
      }
    }

    if (
      count($links[$key]['submenu']) == 0 &&
      (
        !isset($links[$key]['menuitem']) ||
        !isset($links[$key]['menuitem']['action'])
      )
    ) {
      unset($links[$key]);
    }
  }
}

/*
 * Generate Menu Content
 */
$menuContent = "";

foreach ($links as $key => $value) {
  $menuContent .= "<li class='{$key}'>";

  if (isset($value['menuitem'])) {
    if (
      isset($value['menuitem']['url']) ||
      isset($value['menuitem']['action'])
    ) {
      $value['menuitem']['attr'] =
        array('class' => 'menuitem');
      $menuContent .= genAnchor($value['menuitem']);
    } else {
      $menuContent .=
        "<a class='menuitem'>".
          $value['menuitem']['title'].
        "</a>";
    }
  }

  if (isset($value['submenu'])) {
    $menuContent .= "<ul class='submenu'>";
    foreach ($value['submenu'] as $submenuElem) {
      $menuContent .=
        "<li>".
        genAnchor($submenuElem).
        "</li>";
    }
    $menuContent .= "</ul>";
  }

  $menuContent .= "</li>";
}

function genAnchor($elem) {
  $uri = isset($elem['url']) ?
    $elem['url'] :
    $elem['action'];
  $title = $elem['title'];
  $attr = isset($elem['attr']) ?
    $elem['attr'] : array();

  return anchor($uri, $title, $attr);
}

?>

<div id="header">
  <div id="logo">
    <?php echo anchor('/', 'FroSoCo'); ?>
  </div>
  <div id="links">
<!--    <ul class="menu">-->
      <?php //echo $menuContent;
        echo $this->mainmenu->render();
      ?>
<!--    </ul>-->
  </div>
</div>

