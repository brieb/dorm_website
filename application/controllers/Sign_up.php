<?php
class Sign_up extends CI_Controller {

  function view($id) {
    $this->load->model('Sign_up_model');
    $sign_up = $this->Sign_up_model->read($id);

    $sign_up_form = unserialize($sign_up->form);

    foreach ($sign_up_form['questions'] as $sign_up_form_question) {
      $this->load->view(
        'sign_up/form_fields/'.$sign_up_form_question['type'],
        array(
          'field' => $sign_up_form_question
        )
      );
      //$this->{'renderFormField_'.$sign_up_form_question['type']}(
        //$sign_up_form_question);
    }
  }

  private function renderFormField_text($field) {
    var_dump($field);
  }

  private function renderFormField_paragraph_text($field) {
    $this->load->view('sign_up/form_fields/paragraph_text');
  }

  private function renderFormField_multiple_choice($field) {
    var_dump($field);
  }

  private function renderFormField_checkboxes($field) {
    var_dump($field);
  }

  private function renderFormField_choose_from_a_list($field) {
    var_dump($field);
  }
')
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
