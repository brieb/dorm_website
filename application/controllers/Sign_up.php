<?php
class Sign_up extends CI_Controller {

  function view($id) {
    $this->load->model('Sign_up_model');
    $sign_up = $this->Sign_up_model->read($id);
    $sign_up_form = unserialize($sign_up->form);
    $this->load->view('sign_up/form_fields/fields',
      array(
        'fields' => $sign_up_form['form']
      )
    );
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
    $this->load->model('Sign_up_model');
    $response = $this->Sign_up_model->create(array(
      'form' => $form_data_ser
    ));

    echo $response;
  }

}
