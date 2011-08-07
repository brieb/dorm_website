<?php
class User_directory extends CI_Controller {

 public function index() {
  $this->load->model('User_model');
  $users = $this->User_model->getUsersAsJSON();

   $this->load->view(
     'header',
     array('page_title' => 'Directory')
   );
   $this->load->view(
     'user_directory/index',
     array(
      'users' => $users,
     )
   );
   $this->load->view('footer');
 }

}
