<?php
class Event extends CI_Controller {

  function create() {
    $form_data = $this->input->post();

    if(!$form_data) {
      $this->load->view('header',
        array('page_title' => 'Create an Event')
      );
      $this->load->view('calendar/sidebar');
      $this->load->view('event/create');
      $this->load->view('footer');
    }
    else {
      $this->load->library('form_validation');
      $form_validation_rules = array(
        array(
          'field'   => 'title',
          'label'   => 'Title',
          'rules'   => 'required|min_length[6]'
        ),
        array(
          'field'   => 'datetime',
          'label'   => 'Date',
          'rules'   => 'required'
        ),
        //array(
          //'field'   => 'description',
          //'label'   => 'Description',
          //'rules'   => 'required'
        //)
      );
      $this->form_validation->set_rules($form_validation_rules);

      if ($this->form_validation->run() == FALSE) {
        $this->load->view('header',
          array('page_title' => 'Create an Event')
        );
        $this->load->view('calendar/sidebar');
        $this->load->view('event/create');
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
