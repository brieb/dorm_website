<?php

/**
 * @property Event_model $Event_model
 * @property Sign_up_model $Sign_up_model
 * @property Sign_up_response_model $Sign_up_response_model
 */
class Event extends CI_Controller {

  function __construct() {
    parent::__construct();
  }

  function create() {
    //$this->load->library('form_validation');

    $form_data = $this->input->post();

    if (!$form_data) {
      $this->load->helper('event/form_builder');
      $this->load->view('event/create');
      return;
    }

    //$form_data = json_decode($form_data['data']);

    //TODO server-side validation
    //if (isset($form_data['form_builder'])) {
    //foreach (
    //$form_data['form_builder'] as $key => $value
    //) {
    //$display_fields[] = $key;
    //}
    //}
    //$data['display_fields'] = $display_fields;

    //$this->form_validation->set_rules('title', 'Title', 'required|min_length[6]');
    //$this->form_validation->set_rules('datetime', 'Date and time', 'required');
    //$this->form_validation->set_rules('description', 'Description', 'required');
    //if (isset($form_data['form_builder'])) {
    //if (isset($form_data['form_builder']['payment'])) {
    //$this->form_validation->set_rules('form_builder[payment][price]', 'Price', 'required');
    //$this->form_validation->set_rules('form_builder[payment][instructions]', 'Instructions', 'required');
    //}
    //if (isset($form_data['form_builder']['event_location'])) {
    //$this->form_validation->set_rules('form_builder[event_location][location]', 'Event Location', 'required');
    //}
    //if (isset($form_data['form_builder']['meetup_information'])) {
    //$this->form_validation->set_rules('form_builder[meetup_info][info]', 'Meetup Info', 'required');
    //}
    //}

    //if ($this->form_validation->run() == FALSE) {
    //$this->load->view('event/create', $data);
    //}
    //else {


    $this->serializeFields($form_data);
    $form_data['time'] = $this->formatDatetime($form_data['time']);

    $this->load->model('Event_model');
    $event_id = $this->Event_model->create($form_data);
    if (!$event_id) {
      echo 'db fail - try again';
    }

    $form_data['event_id'] = $event_id;
    $this->load->model('Gcal_model');
    $this->Gcal_model->create($form_data);
    //TODO use form_data event id instead
    $this->createSignUp($form_data, $event_id);

    echo $event_id;
    //}
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


  private function formatDatetime($time) {
    return
      array_map(
        create_function(
          '$date',
          'return date(DATE_RFC3339, strtotime($date));'
        ),
        $time
      );
  }

  private function serializeFields(&$form_data) {
    if (isset($form_data['form_builder'])) {
      if (isset($form_data['form_builder']['Payment'])) {
        $form_data['has_field_payment'] = 1;
      } else {
        $form_data['has_field_payment'] = 0;
      }
      $form_builder_ser = serialize($form_data['form_builder']);
      unset($form_data['form_builder']);
      $form_data['fields'] = $form_builder_ser;
    } else {
      $form_data['fields'] = null;
      $form_data['has_field_payment'] = 0;
    }
  }

  private function createSignUp(&$form_data, $event_id) {
    if (!isset($form_data['SignUp'])) {
      return -1;
    }

    $sign_up_form_ser = isset($form_data['SignUp']['form']) ?
      serialize($form_data['SignUp']['form']) : serialize(NULL);
    $capacity = isset($form_data['SignUp']['capacity']) ?
      $form_data['SignUp']['capacity'] : 0;
    unset($form_data['SignUp']);

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
    $event['time'] = $this->formatDatetime($event['time']);

    $event['fields'] = unserialize($event['fields']);
    $this->load->view(
      'event/edit',
      array('eventJSON' => json_encode($event))
    );
  }
}
