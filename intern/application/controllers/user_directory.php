<?php

/**
 * @property User_model $User_model
 * @property CI_Loader $load
 */
class User_directory extends CI_Controller {

  public function index() {
    if (ENVIRONMENT == 'development') {
      $this->output->enable_profiler(TRUE);
    }

    $this->load->model('User_model');
    $users = $this->User_model->getUsersAsJSON();
    $this->load->view(
      'user_directory/index',
      array(
        'users' => $users,
      )
    );
    // TODO this mechanism caches the menu for all users..partial instead
    // $this->output->cache(60*24*365);
  }

}
