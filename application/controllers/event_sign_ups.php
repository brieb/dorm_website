<?php
class Event_sign_ups extends CI_Controller {

  function view($event_id) {
    $this->load->model('Event_sign_ups_model');
    $event_sign_ups = $this->Event_sign_ups_model->read($event_id);

    //TODO trust that the question order matches the answer order??
    // test this ^

    $this->load->view('event_sign_ups/view',
      array(
        'cols' => $this->format($event_sign_ups)
      )
    );
  }

  private function format($event_sign_ups) {
    $form = $event_sign_ups['form'];
    $responses = $event_sign_ups['responses'];

    $cols = array();
    $cols['name'] = array(
      'header' => 'Name',
      'rows' => array()
    );
    $cols['email'] = array(
      'header' => 'Email Address',
      'rows' => array()
    );
    foreach ($form['questions'] as $question) {
      $cols[$question['id']] = array(
        'header' => $question['text'],
        'rows' => array()
      );
    }

    $colKeys = array_keys($cols);
    foreach ($responses as $response) {
      foreach ($colKeys as $colKey) {
        if ($colKey == 'name' || $colKey == 'email') {
          $cols[$colKey]['rows'][] = isset($response[$colKey]) ?
            $response[$colKey] : '';
        } else {
          $cols[$colKey]['rows'][] = isset($response['form_response'][$colKey]) ?
            $response['form_response'][$colKey] : '';
        }
      }
    }

    return $cols;
  }

}
