<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Access {
  private $permissions;
  private $CI;
  private $user;
  private $baseUrl;
  private $class;
  private $method;

  function __construct() {
    $this->baseUrl = $GLOBALS['CFG']->config['base_url'];
    $this->CI =& get_instance();

    if (ENVIRONMENT == 'development') {
      $_SERVER['REMOTE_USER'] = 'bbunge';
    }

    if (!($this->isLoggedIn() || $this->isHomePage())) {
      $this->redirectToHomePage();
      return;
    }

    if ($this->isLoggedIn()) {
      $this->initUser();
    }

  }

  public function canDo($action) {
    $this->initPermissions();

    if ($this->user['access_group'] == 'SUDO') {
      return true;
    }

    return
      isset(
        $this->permissions
          [$this->user['access_group']]
          [$action['class']]
          [$action['method']]
      ) ?
        $this->permissions
          [$this->user['access_group']]
          [$action['class']]
          [$action['method']]
      : false;
  }

  public function preController($params) {
    $routing =& load_class('Router');
    $this->class = $routing->fetch_class();
    $this->method = $routing->fetch_method();

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

    $this->redirectToHomePage();
    return false;
  }

  private function initPermissions() {
    $public = array();
    $stanford = array_merge_recursive($public, array());

    $resident = array_merge_recursive($stanford,
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

    $staff = array_merge_recursive($resident,
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

    $confi = array_merge_recursive($staff,
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

  public function getLoggedInUserId() {
    return $this->user['id'];
  }

  private function isLoggedIn() {
    return isset($_SERVER['REMOTE_USER']);
  }

  private function getLoggedInUser() {
    if ($this->isLoggedIn()) {
      return $_SERVER['REMOTE_USER'];
    }
    return NULL;
  }

  private function isHomePage() {
    return ($this->class == 'welcome' && $this->method == 'index');
  }

  private function redirectToHomePage() {
    header("Location: {$this->baseUrl}");
  }

  private function initUser() {
    $this->CI->load->model('User_model');

    $this->user['sunetid'] = $this->getLoggedInUser();
    $this->user['id'] =
      $this->CI->User_model->getIdBySunetid($this->user['sunetid']);
    $this->user['access_group'] =
      $this->CI->User_model->getAccessGroup($this->user['id']);

    if (!$this->user['access_group']) {
      $this->user['access_group'] = 'PUBLIC';
    }
  }

}
