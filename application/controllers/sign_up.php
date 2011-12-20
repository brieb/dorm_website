<?php
  class Sign_up extends CI_Controller {

    function __construct() {
      parent::__construct();
      $this->load->model('Sign_up_model');
    }

  function view($id) {
    $sign_up = $this->Sign_up_model->read($id);

    $sign_up_form = unserialize($sign_up['form']);
    if ($sign_up_form != NULL) {
      $this->load->view('sign_up/form_fields/fields',
        array(
          'fields' => $sign_up_form
        )
      );
    }
  }

  //TODO delete??
  function create() {
    $form_data = $this->input->post();
    if (!$form_data) {
      echo 'Error: no post data';
      return;
    }
    $this->load->library('form_validation');
    $form_data_ser = serialize($form_data);
    $response = $this->Sign_up_model->create(array(
      'form' => $form_data_ser
    ));

    echo $response;
  }

  function delete() {
    $form_data = $this->input->post();
    if (!$form_data) return;
    echo $this->Sign_up_model->delete($form_data['id']);
  }

}
