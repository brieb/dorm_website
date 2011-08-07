<?php
class Calendar extends CI_Controller {

  public function index() {
    $this->load->view('header',
      array('page_title' => 'Calendar')
    );
    $this->load->view('calendar/sidebar');
    $this->load->view('calendar/index');
    $this->load->view('footer');
  }

  public function event_list() {
    $this->load->model('Event_model');
    $events = $this->Event_model->getEvents();
    $events = json_encode($events);

    $this->load->view('header',
      array('page_title' => 'Event List')
    );
    $this->load->view('calendar/sidebar');
    $this->load->view('calendar/event_list',
      array('events' => $events)
    );
    $this->load->view('footer');
  }

}
