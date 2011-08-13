<?php
class Sign_up extends CI_Controller {

  function view($id) {
    $this->load->model('Sign_up_model');
    $sign_up = $this->Sign_up_model->read($id);
    var_dump($sign_up);
  }

  function create() {
    $this->load->library('form_validation');
    $form_data = $this->input->post();
    if (!$form_data) {
      $this->load->view('sign_up/form_create');
    }
    else {
      var_dump($form_data);
      $form_data_ser = serialize($form_data);
      $this->load->model('Sign_up_model');
      $response = $this->Sign_up_model->create(array(
        'form' => $form_data_ser
      ));

      echo $response;
    }
  }

}
