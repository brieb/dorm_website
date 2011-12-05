<?php
if (!defined('BASEPATH')) {
  exit('No direct script access allowed');
}

if (!function_exists('get_permissions')) {
  function get_permissions() {
    if (!isset($GLOBALS['FSC_PERMISSIONS'])) {
      $public = array(
        'welcome' => array(
          'index' => TRUE,
          'home' => TRUE,
        ),
        'access_denied' => array(
          'index' => TRUE
        ),
        'auth' => array(
          'index' => TRUE
        ),
        'note' => array(
          'index' => TRUE,
        ),
      );
      $stanford = array_merge_recursive($public, array());

      $resident = array_merge_recursive(
        $stanford,
        array(
          'event' => array(
            'view' => true,
          ),
          'calendar' => array(
            'index' => true,
          ),
          'sign_up_response' => array(
            'create' => true,
            'delete' => true,
            'getForUser' => true,
          ),
          'sign_up' => array(
            'view' => true,
          ),
          'user_directory' => array(
            'index' => true,
          ),
          'facebook' => array(
            'frosoco' => true
          ),
        )
      );

      $staff = array_merge_recursive(
        $resident,
        array(
          'event' => array(
            'create' => true,
            'edit' => true,
            'delete' => true,
          ),
          'event_sign_ups' => array(
            'view' => true,
            'view_csv' => true,
            'set_is_open' => true,
          ),
          'sign_up' => array(
            'create' => true,
            'delete' => true,
          ),
          'wiki' => array(
            'staff' => true,
            'basecamp' => true,
          ),
          'facebook' => array(
            'frosoco_staff' => true
          ),
        )
      );

      $confi = array_merge_recursive(
        $staff,
        array(
          'wiki' => array(
            'confi' => true,
          ),
        )
      );

      $permissions = array(
        'PUBLIC' => $public,
        'STANFORD' => $stanford,
        'RESIDENT' => $resident,
        'STAFF' => $staff,
        'CONFI' => $confi,
      );

      $GLOBALS['FSC_PERMISSIONS'] = $permissions;
    }

    return $GLOBALS['FSC_PERMISSIONS'];
  }
}

if (!function_exists('can_do')) {
  function can_do($user_access_group, $action) {
    if ($user_access_group == 'SUDO') {
      return true;
    }

    $permissions = get_permissions();

    return
      isset(
      $permissions
      [$user_access_group]
      [$action['class']]
      [$action['method']]
      ) ?
        $permissions
        [$user_access_group]
        [$action['class']]
        [$action['method']]
        : false;
  }
}

if (!function_exists('is_action_public')) {
  function is_action_public($action) {
    return can_do('PUBLIC', $action);
  }
}
