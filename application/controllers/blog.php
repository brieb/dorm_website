<?php
class Blog extends CI_Controller {

 public function index() {
   $data['title'] = "My Real Title";
   $data['heading'] = "My Real Heading";

   $this->load->view('header',
   array('page_title' => 'My Real Title'));
   $this->load->view('blogview', $data);
   $this->load->view('footer');
 }

}
?>
