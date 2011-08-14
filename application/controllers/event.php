<?php
class Event extends CI_Controller {
  function create() {
    $this->load->library('form_validation');
    $this->load->helper('event/form_builder');
    $form_data = $this->input->post();
    $display_fields = array();

    if (!$form_data) {
      $this->load->view('event/create');
    }
    else {
      if (isset($form_data['form_builder'])) {
        foreach (
          $form_data['form_builder'] as $key => $value
        ) {
          $display_fields[] = $key;
        }
      }
      $data['display_fields'] = $display_fields;

      $this->form_validation->set_rules('title', 'Title', 'required|min_length[6]');
      $this->form_validation->set_rules('datetime', 'Date and time', 'required');
      $this->form_validation->set_rules('description', 'Description', 'required');
      if (isset($form_data['form_builder'])) {
        if (isset($form_data['form_builder']['payment'])) {
          $this->form_validation->set_rules('form_builder[payment][price]', 'Price', 'required');
          $this->form_validation->set_rules('form_builder[payment][instructions]', 'Instructions', 'required');
        }
        if (isset($form_data['form_builder']['event_location'])) {
          $this->form_validation->set_rules('form_builder[event_location][location]', 'Event Location', 'required');
        }
        if (isset($form_data['form_builder']['meetup_information'])) {
          $this->form_validation->set_rules('form_builder[meetup_info][info]', 'Meetup Info', 'required');
        }
      }

      if ($this->form_validation->run() == FALSE) {
        $this->load->view('event/create', $data);
      }
      else {
        if (isset($form_data['form_builder'])) {
          $form_builder_ser = serialize($form_data['form_builder']);
          unset($form_data['form_builder']);
          $form_data['fields'] = $form_builder_ser;
        } else {
          $form_data['fields'] = null;
        }
        $this->load->model('Event_model');
        $event_id = $this->Event_model->create($form_data);
        if ($event_id) {
          $this->load->helper('url');
          redirect('/event/view/' . $event_id);
        }
        else {
          echo 'db fail - try again';
        }
      }
    }
  }

  function view($id = "") {
    $this->load->model('Event_model');
    if($id != "") {
      $event = $this->Event_model->read($id);
      $data['event'] = $event;
      $this->load->view('event/view', $data);
    } else {
      $events = $this->Event_model->getEvents();
      $events = json_encode($events);
      $this->load->view('event/view_all',
                        array('events' => $events)
      );
    }
  }

}
