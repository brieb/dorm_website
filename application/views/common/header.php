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

function genMenuContent(&$links) {
  $content = "";

  foreach ($links as $key => $value) {
    $content .= "<li class='{$key}'>";

    if (isset($value['menuitem'])) {
      if (isset($value['menuitem']['action'])) {
        $content .= anchor(
          $value['menuitem']['action'],
          $value['menuitem']['title'],
          array('class' => 'menuitem')
        );
      } else {
        $content .=
          "<a class='menuitem'>".
          $value['menuitem']['title'].
          "</a>";
      }
    }

    if (isset($value['submenu'])) {
      $content .= "<ul class='submenu'>";
      foreach ($value['submenu'] as $submenuElem) {
        $content .= "<li>";
        $content .= anchor(
          $submenuElem['action'],
          $submenuElem['title'],
          $submenuElem['attr']
        );
        $content .= "</li>";
      }
      $content .= "</ul>";
    }

    $content .= "</li>";
  }

  return $content;
}

?>

<div id="header">
  <div id="logo">
    <?php echo anchor('/', 'FroSoCo'); ?>
  </div>
  <div id="links">
    <ul class="menu">
      <?php echo genMenuContent($links); ?>
    </ul>
  </div>
</div>

<div id="main">
