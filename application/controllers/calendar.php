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
    $test_data_elem = array(
        'title' => 'Dinner at the Dean\'s',
        'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id metus ac tellus tempus scelerisque et sed massa. Mauris leo massa, malesuada quis pellentesque vel, lobortis vitae massa. Aenean aliquet ultrices tempor. Quisque dolor sapien, semper vitae semper vitae, ullamcorper eu tortor. Duis bibendum venenatis metus nec volutpat. Nam aliquet porta aliquet. In at elit dolor. Pellentesque pulvinar nulla vitae metus lobortis vestibulum gravida felis auctor. Quisque adipiscing mollis placerat. Phasellus pharetra enim at felis sagittis cursus. Cras pulvinar massa ac mi interdum in elementum ipsum suscipit. Aliquam vestibulum porta velit. Pellentesque at neque erat.',
        'date' => '07.30.11',
        'time' => '3:50 pm',
    );

    $letters = array('z', 'c', 'z', 'd', 'x', 'q');
    $date= array(
      '07.30.11',
      '03.20.11',
      '04.24.11',
      '07.01.11',
      '06.30.11',
      '07.30.11',
      '08.31.11',
      '07.21.11',
      '07.30.11',
      '07.20.11',
      '08.30.11'
    );

    $test_data = array();
    for($i = 0; $i < 20; $i++) {
      $test_data_elem['title'] = $letters[$i % count($letters)];
      $test_data_elem['title'] .= $letters[$i % count($letters)];
      $test_data_elem['date'] = $date[$i % count($date)];
      $test_data[] = $test_data_elem;
    }

    $this->load->view('header',
      array('page_title' => 'Event List')
    );
    $this->load->view('calendar/sidebar');
    $this->load->view('calendar/event_list',
      array('events' => json_encode($test_data))
    );
    $this->load->view('footer');
  }

}
