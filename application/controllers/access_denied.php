<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Access_denied extends CI_Controller {

	public function index() {
		$this->load->view('access_denied/index.php');
	}

}

/* End of file access_denied.php */
/* Location: ./application/controllers/access_denied.php */
