<?php
  class Event_sign_ups extends CI_Controller {

    function view($event_id) {
      $this->load->model('Event_model');
      if ($this->Event_model->getSignUpId($event_id) == NULL) {
        echo "no sign ups for event {$event_id}";
        return false;
      }

      $this->load->model('Event_sign_ups_model');
      $event_sign_ups = $this->Event_sign_ups_model->read($event_id);

      //TODO trust that the question order matches the answer order??
      // test this ^

      $this->load->view(
        'event_sign_ups/view',
        array(
          'event_id' => $event_id,
          'cols' => $this->format($event_sign_ups)
        )
      );
    }

    function view_csv($event_id) {
      $this->load->model('Event_model');
      if ($this->Event_model->getSignUpId($event_id) == NULL) {
        echo "no sign ups for event {$event_id}";
        return false;
      }

      $this->load->model('Event_sign_ups_model');
      $event_sign_ups = $this->Event_sign_ups_model->read($event_id);

      header( 'Content-Type: text/csv' );
      header( 'Content-Disposition: attachment;filename=event_sign_ups.csv');
      $fp = fopen('php://output', 'w');

      $data = $this->format($event_sign_ups);

      $headers = array();
      foreach($data as $col) {
        $headers[] = $col['header'];
      }
      fputcsv($fp, $headers);

      $numRows = count($data['name']['rows']);
      for ($i = 0; $i < $numRows; $i++) {
        $row = array();
        foreach($data as $col) {
          $val = $col['rows'][$i];
          if (!is_array($val)) {
            $row[] = $val;
          } else {
            $row[] = implode(',', $val);
          }
        }
        fputcsv($fp, $row);
      }

      fclose($fp);
    }

    function set_is_open($event_id, $sign_up_id, $is_open) {
      $sql = "
      UPDATE sign_up
      SET is_open = ?
      WHERE id = ?
      ";

      $query = $this->db->query(
        $sql,
        array($is_open, $sign_up_id)
      );
      //TODO handle case of db error
      redirect('/event/view/'.$event_id);
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

      if ($form) {
        foreach ($form as $question) {
          $cols[$question['id']] = array(
            'header' => $question['text'],
            'rows' => array()
          );
        }
      }

      $cols['created'] = array(
        'header' => 'Sign Up Time',
        'rows' => array()
      );

      $colKeys = array_keys($cols);

      foreach ($responses as $response) {
        foreach ($colKeys as $colKey) {
          if ($colKey == 'name' || $colKey == 'email') {
            $cols[$colKey]['rows'][] = isset($response[$colKey]) ?
            $response[$colKey] : '';
          } else {
            if ($colKey == 'created') {
              $cols[$colKey]['rows'][] = date(
                'Y.m.d g:i a',
                strtotime($response[$colKey])
              );
            } else {
              $cols[$colKey]['rows'][] = isset($response['form_response'][$colKey])
            ?
            $response['form_response'][$colKey] : '';
          }
        }
      }
    }

    return $cols;
  }

}
