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

    $form_data['has_field_payment'] =
      (int)($form_data['payment_price'] != "" ||
            $form_data['payment_instructions'] != "");

    $form_data['time_start'] = self::formatDatetime(
      $form_data['start_date'] . ' ' . $form_data['start_time']
    );
    $form_data['time_end'] = self::formatDatetime(
      $form_data['end_date'] . ' ' . $form_data['end_time']
    );

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


  private static function formatDatetime($datetime) {
    return date(DATE_RFC3339, strtotime($datetime));
  }

  private function createSignUp(&$form_data) {
    $sign_up_form_ser = isset($form_data['sign_up_questions']) ?
      serialize($form_data['sign_up_questions']) : serialize(NULL);

    $capacity = $form_data['sign_up_capacity'];

    $this->load->model('Sign_up_model');
    $sign_up_id = $this->Sign_up_model->create(
      array(
        'event_id' => $form_data['event_id'],
        'form' => $sign_up_form_ser,
        'capacity' => $capacity
      )
    );

    return $sign_up_id;
  }

  //TODO unify routine with create
  private function edit_save($form_data) {
    $event_id = $form_data['id'];
    if (
      isset($form_data['sign_up_delete']) &&
      $form_data['sign_up_delete'] == '1'
    ) {
      $this->load->model('Sign_up_model');
      $this->Sign_up_model->delete($form_data['sign_up_id']);
      unset($form_data['sign_up_delete']);
      unset($form_data['sign_up_id']);
    }
    $this->createSignUp($form_data, $event_id);

    $this->serializeFields($form_data);
    $form_data['time'] = $this->formatDatetime($form_data['time']);

    $this->Event_model->update($event_id, $form_data);
    $this->load->model('Gcal_model');
    $this->Gcal_model->update(
      $this->Event_model->readGcalUrl($event_id),
      $form_data
    );
  }

  private function edit_load($id) {
    $event = $this->Event_model->read($id);
    var_dump($event);
    $event['time'] = $this->formatDatetime($event['time']);

    $event['fields'] = isset($event['fields']) ?
      unserialize($event['fields']) : NULL;
    $this->load->view(
      'event/edit',
      array('eventJSON' => json_encode($event))
    );
  }
}
