<?php if (!defined('BASEPATH')) {
  exit('No direct script access allowed');
}

class Auth extends CI_Controller {

  function index() {

    if (!isset($_SERVER['PHP_AUTH_USER'])) {
      header('WWW-Authenticate: WebAuth realm="viiny is a tiny service"');
      header('HTTP/1.0 401 Unauthorized');
      // echo or view some message
      exit();
    }
      // also you can use your own model/library for check usename and password
    else  if ($_SERVER['PHP_AUTH_USER'] == 'user' AND $_SERVER['PHP_AUTH_PW'] == 'pass')
    {
      echo "woo";
      return true;
    }
    else
    {
      // echo or view some message
      exit();
    }
  }
}
