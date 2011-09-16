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
    if (isset($value['menuitem']['action'])) {
      $menuContent .= anchor(
        $value['menuitem']['action'],
        $value['menuitem']['title'],
        array('class' => 'menuitem')
      );
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
      $menuContent .= "<li>";
      $menuContent .= anchor(
        $submenuElem['action'],
        $submenuElem['title'],
        $submenuElem['attr']
      );
      $menuContent .= "</li>";
    }
    $menuContent .= "</ul>";
  }

  $menuContent .= "</li>";
}

?>

<div id="header">
  <div id="logo">
    <?php echo anchor('/', 'FroSoCo'); ?>
  </div>
  <div id="links">
    <ul class="menu">
      <?php echo $menuContent; ?>
    </ul>
  </div>
</div>

