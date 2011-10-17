<?php

/**
 * @property Event_model $Event_model
 * @property Gcal_model $Gcal_model
 * @property Sign_up_model $Sign_up_model
 * @property Sign_up_response_model $Sign_up_response_model
 */
class Event extends CI_Controller {

  function __construct() {
    parent::__construct();
  }

  function create() {
    $form_data = $this->input->post();

    if (!$form_data) {
      $this->load->library('Event_form', array());
      $this->load->view('event/create');
      return;
    }

    //TODO server-side validation

    self::format_form_data($form_data);

    $this->load->model('Event_model');
    $event_id = $this->Event_model->create($form_data);
    if (!$event_id) {
      echo 'db_fail';
      return;
    }
    $form_data['event_id'] = $event_id;

    if ($form_data['sign_up_enabled'] == "1") {
      $this->createSignUp($form_data);
    }

    $this->load->model('Gcal_model');
    $this->Gcal_model->create($form_data);

    echo $event_id;
  }

  function view($id = "") {
    $this->load->model('Event_model');

    if ($id == "") {
      $this->view_all();
      return;
    }

    $event = $this->Event_model->read($id);

    if ($event == NULL) {
      redirect('event/view');
      return;
    }

    if ($event['sign_up_id'] != NULL) {
      $this->load->model('Sign_up_model');
      $event['sign_up'] = $this->Sign_up_model->read($event['sign_up_id']);
      $event['sign_up']['form'] = unserialize($event['sign_up']['form']);
      if ($event['sign_up']['form'] != NULL) {
        $event['sign_up']['html'] = $this->load->view(
          'sign_up/form_fields/fields',
          array('fields' => $event['sign_up']['form']),
          true
        );
      }

      $user_id = $this->session->userdata('user_id');
      $this->load->model('Sign_up_response_model');

      $data['sign_up_response_id'] =
        $this->Sign_up_response_model->
          getByUserIdSignUpId($user_id, $event['sign_up_id']);
    }
    $data['event'] = $event;

    $this->load->view('event/view', $data);
  }

  private function view_all() {
    $events = $this->Event_model->read_all();
    $events = json_encode($events);
    $this->load->view(
      'event/view_all',
      array('events' => $events)
    );
  }

  function edit($id) {
    if (!$id) {
      echo "Event id needed in url";
      return;
    }

    $this->load->model('Event_model');
    $form_data = $this->input->post();
    if ($form_data) {
      $form_data['event_id'] = $id;
      $this->edit_save($form_data);
    } else {
      $this->edit_load($id);
    }
  }


  function delete($id) {
    $this->load->model('Event_model');
    $this->load->model('Gcal_model');
    $this->Gcal_model->delete($this->Event_model->readGcalUrl($id));
    $this->Event_model->delete($id);
  }


  private static function format_form_data(&$form_data) {
    $form_data['has_field_payment'] =
      (int)($form_data['payment_price'] != "" ||
            $form_data['payment_instructions'] != "");

    $form_data['time_start'] = self::formatDatetime(
      $form_data['start_date'] . ' ' . $form_data['start_time']
    );
    $form_data['time_end'] = self::formatDatetime(
      $form_data['end_date'] . ' ' . $form_data['end_time']
    );
  }

  private static function formatDatetime($datetime) {
    return date(DATE_RFC3339, strtotime($datetime));
  }


  private function createSignUp(&$form_data) {
    $event_id = $form_data['event_id'];

    $sign_up_form_ser = serialize(NULL);
    if (isset($form_data['sign_up_questions'])) {
      for($i = 0; $i < count($form_data['sign_up_questions']); $i++) {
        $form_data['sign_up_questions'][$i]['id'] = "q$i";
      }
      $sign_up_form_ser = serialize($form_data['sign_up_questions']);
    }

    $capacity = element('sign_up_capacity', $form_data, 0);

    $this->load->model('Sign_up_model');
    $sign_up_id = $this->Sign_up_model->create(
      array(
        'event_id' => $event_id,
        'form' => $sign_up_form_ser,
        'capacity' => $capacity
      )
    );

    return $sign_up_id;
  }

  //TODO unify routine with create
  private function edit_save($form_data) {
    $event_id = $form_data['event_id'];

    self::format_form_data($form_data);

    if (
      isset($form_data['sign_up_enabled']) &&
      $form_data['sign_up_enabled'] == '1'
    ) {
      $this->createSignUp($form_data, $event_id);
    }

    $this->Event_model->update($event_id, $form_data);
    $this->load->model('Gcal_model');
    $this->Gcal_model->update(
      $this->Event_model->readGcalUrl($event_id),
      $form_data
    );
  }

  private function edit_load($id) {
    $event = $this->Event_model->read($id);

    $this->load->library(
      'Event_form',
      array(
        'prefill' => $event,
        'sign_up_id' => $event['sign_up_id']
      )
    );
    //$event['time'] = $this->formatDatetime($event['time']);

    $this->load->view('event/edit', array( 'event_id' => $event['id'] ));
  }


}
