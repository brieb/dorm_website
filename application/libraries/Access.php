<?php if (!defined('BASEPATH')) {
  exit('No direct script access allowed');
}

class Access {
  private $permissions;
  private $CI;
  private $baseUrl;
  private $class;
  private $method;

  function __construct() {
    $this->baseUrl = $GLOBALS['CFG']->config['base_url'];
    $this->CI =& get_instance();

    $this->CI->load->library('session');

    $routing =& load_class('Router');
    $this->class = $routing->fetch_class();
    $this->method = $routing->fetch_method();

    if (!($this->isLoggedIn() || $this->isHomePage())) {
      $this->redirectToHomePage();
      return;
    }

    if ($this->isLoggedIn() && !$this->isSetSessionUser()) {
      $this->setSessionUser();
    }

  }

  public function canDo($action) {
    $this->initPermissions();

    $user_access_group = $this->CI->session->userdata('user_access_group');

    if ($user_access_group == 'SUDO') {
      return true;
    }

    return
      isset(
      $this->permissions
      [$user_access_group]
      [$action['class']]
      [$action['method']]
      ) ?
        $this->permissions
        [$user_access_group]
        [$action['class']]
        [$action['method']]
        : false;
  }

  public function post_controller_constructor() {
    if ($this->isLoggedIn()) error_log("is logged in");
    if ($this->isHomePage()) error_log("is home");
    if (!$this->isLoggedIn() && !$this->isHomePage()) {
      error_log("to login");
      $this->redirectToLogin();
      return true;
    }

    if ($this->isHomePage()) {
      return true;
    }

    $action = array(
      'class' => $this->class,
      'method' => $this->method,
    );

    if ($this->canDo($action)) {
      return true;
    }

    error_log("no access");
    $this->redirectToNoAccess();
    return false;
  }

  private function initPermissions() {
    $public = array();
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

    $this->permissions = array(
      'PUBLIC' => $public,
      'STANFORD' => $stanford,
      'RESIDENT' => $resident,
      'STAFF' => $staff,
      'CONFI' => $confi,
    );
  }

  private function isLoggedIn() {
    return isset($_SERVER['REMOTE_USER']) ||
           (ENVIRONMENT == "development" && isset($_SERVER['PHP_AUTH_USER']));
  }

  private function isHomePage() {
    return ($this->class == "welcome");
  }

  private function redirectToNoAccess() {
    header("Location: {$this->baseUrl}index.php/welcome/no_access");
  }

  private function redirectToLogin() {
    header("Location: {$this->baseUrl}auth/");
  }

  private function redirectToHomePage() {
    header("Location: {$this->baseUrl}index.php/welcome/home");
  }

  private function setSessionUser() {
    $this->CI->load->model('User_model');

    $user = array();

    $user['user_sunetid'] = "";
    if (isset($_SERVER['REMOTE_USER'])) {
      $user['user_sunetid'] = $_SERVER['REMOTE_USER'];
    } else if (
      ENVIRONMENT == "development" && isset($_SERVER['PHP_AUTH_USER'])){
      $user['user_sunetid'] = $_SERVER['PHP_AUTH_USER'];
    }

    $user['user_id'] =
      $this->CI->User_model->getIdBySunetid($user['user_sunetid']);
    $user['user_access_group'] =
      $this->CI->User_model->getAccessGroup($user['user_id']);

    if (!$user['user_access_group']) {
      $user['user_access_group'] = 'PUBLIC';
    }

    $this->CI->session->set_userdata($user);
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

  private function isSetSessionUser() {
    return $this->CI->session->userdata('user_id') != FALSE;
  }

}
