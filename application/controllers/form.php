<?php
class Form extends CI_Controller {

  function index() {
    $this->load->helper(array('form', 'url'));
    $this->load->library('form_validation');

    $this->form_validation->set_rules('username', 'Username', 'required|min_length[5]|max_length[12]');
    $this->form_validation->set_rules('password', 'Password', 'required|matches[passconf]');
    $this->form_validation->set_rules('passconf', 'Password Confirmation', 'required');
    $this->form_validation->set_rules('email', 'Email', 'required|valid_email');

    if ($this->form_validation->run() == FALSE) {
      $this->load->view('myform');
    }
    else {
      $this->load->view('myformsuccess');
    }
  }
}
?>