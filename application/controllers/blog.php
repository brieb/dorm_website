<?php
class Blog extends CI_Controller {
 
 public function index() {
   $data['title'] = "My Real Title";
   $data['heading'] = "My Real Heading";
   
   $this->load->view('blogview', $data);
 }

}
?>