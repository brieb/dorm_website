<?php
class Calendar extends CI_Controller {

  public function index() {
    $this->load->view('header',
      array('page_title' => 'Calendar')
    );
    $this->load->view('calendar/sidebar');
    $this->load->view('calendar/index');
    $this->load->view('footer');
  }
}
