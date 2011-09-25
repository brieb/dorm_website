<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index() {
    if (ENVIRONMENT == 'development') {
      $this->output->enable_profiler(TRUE);
    }
		$this->load->view('home');
	}

}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
