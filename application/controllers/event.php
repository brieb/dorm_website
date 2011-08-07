<?php
class Event extends CI_Controller {
  function getFieldByType($type) {
    $this->load->library('form_validation');
    $this->load->helper('event/form_builder');
    switch ($type) {
      case "sign_up":
        echo genFieldSignUp();
        break;
      case "payment":
        echo genFieldPayment();
        break;
      case 'event_location':
        echo genFieldEventLocation();
        break;
      case 'meetup_info':
        echo genFieldMeetupInfo();
        break;
    }
  }

  function create() {
    $this->load->library('form_validation');
    $form_data = $this->input->post();

    $this->load->helper('event/form_builder');

    $display_fields = array();
    if (isset($form_data['form_builder'])) {
      foreach ($form_data['form_builder'] as $key => $value) {
        $display_fields[] = $key;
      }
    }
    $data['display_fields'] = $display_fields;
    echo "display_fields";
    var_dump($display_fields);

    if(!$form_data) {
      $this->load->view('header',
        array('page_title' => 'Create an Event')
      );
      $this->load->view('calendar/sidebar');
      $this->load->view('event/create', $data);
      $this->load->view('footer');
    }
    else {
      //echo '<pre>';
      //$form_data_ser = serialize($form_data);
      //var_dump(unserialize($form_data_ser));
      //return;
      var_dump($form_data);

      $this->form_validation->set_rules('default[title]'      , 'Title'        , 'required|min_length[6]');
      $this->form_validation->set_rules('default[datetime]'   , 'Date and time', 'required');
      $this->form_validation->set_rules('default[description]', 'Description'  , 'required');
      if (isset($form_data['payment'])) {
        $this->form_validation->set_rules('payment[price]'       , 'Price'       , 'required');
        $this->form_validation->set_rules('payment[instructions]', 'Instructions', 'required');
      }
      if (isset($form_data['event_location'])) {
        $this->form_validation->set_rules('event_location[location]', 'Event Location', 'required');
      }
      if (isset($form_data['meetup_info'])) {
        $this->form_validation->set_rules('meetup_info[info]', 'Meetup Info', 'required');
      }

      if ($this->form_validation->run() == FALSE) {
        $this->load->view('header',
          array('page_title' => 'Create an Event')
        );
        $this->load->view('calendar/sidebar');
        $this->load->view('event/create', $data);
        $this->load->view('footer');
      }
      else {
        $this->load->model('Event_model');
        $event_id = $this->Event_model->create($form_data);
        if($event_id) {
          $this->load->helper('url');
          redirect('/event/view/'.$event_id);
        }
        else {
          echo 'db fail - try again';
        }
      }
    }
  }

  function view($id) {
    $this->load->database();
    $query = $this->db->query("
      SELECT
        title,
        description,
        time
      FROM event
      WHERE id = ?
    ", array(
      $id
    ));
    $event = $query->row();
    var_dump($event);
  }

}
