<?php
class User_directory extends CI_Controller {

 public function index() {
   $test_data = array(
    array(
      'first_name' => 'John',
      'last_name' => 'Smith',
      'email' => 'johnsmith@stanford.edu',
      'house' => 'Schiff',
      'room' => '219',
    ),
    array(
      'first_name' => 'Jane',
      'last_name' => 'Smith',
      'email' => 'janesmith@stanford.edu',
      'house' => 'Schiff',
      'room' => '219',
    ),
    array(
      'first_name' => 'suzie',
      'last_name' => 'Smith',
      'email' => 'suziesmith@stanford.edu',
      'house' => 'Schiff',
      'room' => '219',
    ),
    array(
      'first_name' => 'Alex',
      'last_name' => 'Smith',
      'email' => 'alexsmith@stanford.edu',
      'house' => 'Schiff',
      'room' => '219',
    ),
    array(
      'first_name' => 'Bob',
      'last_name' => 'Smith',
      'email' => 'bobs@stanford.edu',
      'house' => 'Schiff',
      'room' => '219',
    ),
    array(
      'first_name' => 'John',
      'last_name' => 'Smith',
      'email' => 'johnsmith@stanford.edu',
      'house' => 'Schiff',
      'room' => '219',
    ),
   );


   $this->load->view(
     'header',
     array(
       'page_title' => 'Directory'
     )
   );
   $this->load->view(
     'user_directory/index',
     array(
      'users' => json_encode($test_data),
     )
   );
   $this->load->view('footer');
 }

}
