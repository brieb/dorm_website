<?php
class Calendar extends CI_Controller {

  public function index() {
    $this->load->view('calendar/index');
// TODO this mechanism caches the menu for all users..partial instead
//    $this->output->cache(60*24*365);
  }
}
