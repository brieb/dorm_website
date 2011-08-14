<?php
class Sign_up_response extends CI_Controller {

  function view($id) {
    $this->load->model('Sign_up_response_model');
    $sign_up_response = $this->Sign_up_response_model->read($id);
    $sign_up_form_response = unserialize(
      $sign_up_response->form_response);
    var_dump($sign_up_form_response);
    //$this->load->view('sign_up/form_fields/fields',
      //array(
        //'fields' => $sign_up_form['questions']
      //)
    //);
  }

  function create() {
    $form_data = $this->input->post();
    if (!$form_data) {
      return;
    }

    //TODO validation & required fields
    //$this->load->library('form_validation');
    $sign_up_id = $form_data['sign_up_id'];
    unset($form_data['sign_up_id']);
    $form_response_ser = serialize($form_data);
    $this->load->model('Sign_up_response_model');
    $response = $this->Sign_up_response_model->create(array(
      'sign_up_id' => $sign_up_id,
      'form_response' => $form_response_ser
    ));
    echo $response;
  }

}
