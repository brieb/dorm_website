<?php

class Event_sign_ups_model extends CI_Model {
  var $eventId;

  function read($event_id) {
    $this->eventId = $event_id;
    return array(
      'form' => $this->getForm(),
      'responses' => $this->getResponses()
    );
  }

  private function getResponses() {
    $sql = "SELECT
        CONCAT(user.first_name, ' ', user.last_name) AS 'name',
        user.email,
        sign_up_response.form_response,
        sign_up_response.created
      FROM
        sign_up_response
        JOIN user ON sign_up_response.user_id = user.id
        JOIN sign_up ON sign_up_response.sign_up_id = sign_up.id
      WHERE sign_up.event_id = ?";
    $query = $this->db->query($sql, array($this->eventId));

    $results = array();
    foreach ($query->result_array() as $result) {
      $result['form_response'] =
        unserialize($result['form_response']);
      $results[] = $result;
    }
    return $results;
  }

  private function getForm() {
    $sql = "SELECT
        form
      FROM
        sign_up
      WHERE event_id = ?";
    $query = $this->db->query($sql, array($this->eventId));
    $result = $query->row_array();
    return unserialize($result['form']);
  }

}
