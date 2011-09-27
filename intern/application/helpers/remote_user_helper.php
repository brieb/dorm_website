<?php  if (!defined('BASEPATH')) {
  exit('No direct script access allowed');
}

require_once(dirname(__FILE__) . "/access_helper.php");

session_start();

if (!function_exists('get_remote_user')) {
  function get_remote_user() {
    $is_logged_in = isset($_SERVER['REMOTE_USER']) ||
                    (
                      ENVIRONMENT == "development" &&
                      (
                        isset($_SERVER['PHP_AUTH_USER']) ||
                        isset($_SESSION['REMOTE_USER'])
                      )
                    );

    if (!$is_logged_in) {
      return NULL;
    }

    $CI =& get_instance();
    $CI->load->library('session');
    $is_set_session_user = $CI->session->userdata('user_id') != FALSE;

    if (!$is_set_session_user) {
      set_session_user();
    }

    $user = array();
    $user['id'] = $CI->session->userdata('user_id');
    $user['sunetid'] = $CI->session->userdata('user_sunetid');
    $user['access_group'] = $CI->session->userdata('user_access_group');

    return $user;
  }
}

if (!function_exists('set_session_user')) {
  function set_session_user() {
    $CI =& get_instance();
    $CI->load->model('User_model');

    $user = array();

    $user['user_sunetid'] = "";
    if (isset($_SERVER['REMOTE_USER'])) {
      $user['user_sunetid'] = $_SERVER['REMOTE_USER'];
    } elseif (
      ENVIRONMENT == "development"
    ) {
      if (isset($_SERVER['PHP_AUTH_USER'])) {
        $user['user_sunetid'] = $_SERVER['PHP_AUTH_USER'];
      } elseif (isset($_SESSION['REMOTE_USER'])) {
        $user['user_sunetid'] = $_SESSION['REMOTE_USER'];
      }
    }

    $user['user_id'] =
      $CI->User_model->getIdBySunetid($user['user_sunetid']);
    $user['user_access_group'] =
      $CI->User_model->getAccessGroup($user['user_id']);

    if (!$user['user_access_group']) {
      $user['user_access_group'] = 'PUBLIC';
    }

    $CI->session->set_userdata($user);
    log_message(
      'info',
      'Session Initialized' .
      ' sunetid:' . $user['user_sunetid'] .
      ' user_access_group:' . $user['user_access_group'] .
      ' user_id:' . $user['user_id']
    );
    $log_msg =
      date('Ymd-H:i:s') .
      ' Session Initialized' .
      ' sunetid:' . $user['user_sunetid'] .
      ' user_access_group:' . $user['user_access_group'] .
      ' user_id:' . $user['user_id'];
    `echo $log_msg >> user_access.log`;
  }
}

if (!function_exists('remote_user_can_do')) {
  function remote_user_can_do($action) {
    $remote_user = get_remote_user();

    if ($remote_user == NULL) {
      $remote_user = array('access_group' => 'PUBLIC');
    }

    return can_do($remote_user['access_group'], $action);
  }
}
