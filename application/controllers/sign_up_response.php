<?php
class Sign_up_response extends CI_Controller {

  public function __construct() {
    parent::__construct();
    $this->load->model('Sign_up_response_model');
  }

  function index() {
    //var_dump($this->input->server('REQUEST_METHOD'));
  }

  function view($id) {
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

  function getForUser($sign_up_id) {
    $this->load->library('Access');
    $user_id = $this->access->getLoggedInUserId();

    echo $this->Sign_up_response_model->
      getByUserIdSignUpId($user_id, $sign_up_id);
  }

  function create() {
    $form_data = $this->input->post();
    if (!$form_data) {
      return;
    }

    //TODO validation & required fields
    //$this->load->library('form_validation');

    //TODO username
    $this->load->library('access');
    $user_id = $this->access->getLoggedInUserId();

    $sign_up_id = $form_data['sign_up_id'];
    unset($form_data['sign_up_id']);
    $form_response_ser = serialize($form_data);

    $response = $this->Sign_up_response_model->create(
      array(
        'sign_up_id' => $sign_up_id,
        'user_id' => $user_id,
        'form_response' => $form_response_ser
      )
    );
    echo $response;
  }

  function delete() {
    $formData = $this->input->post();
    error_log(var_export($formData, true));

    $id = $formData['id'];
    //TODO check user permission
    echo $this->Sign_up_response_model->delete($id);
  }

}
