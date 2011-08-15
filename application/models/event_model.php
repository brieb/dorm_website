<?php
class Event_model extends CI_Model {
  var $title;
  var $description;
  var $date;
  var $time;

  function __construct() {
    parent::__construct();
  }

  function read($id) {
    $this->load->database();
    //TODO load entire sign_up form??
    $query = $this->db->query(
      "SELECT
        event.id,
        event.title,
        event.description,
        event.time,
        event.fields,
        sign_up.id AS sign_up_id
      FROM event LEFT JOIN sign_up
      ON event.id = sign_up.event_id
      WHERE event.id = ?",
      array($id)
    );
    $event = $query->row_array();
    $event['time_pretty'] = date('m.d.y \a\t g:ia', strtotime($event['time']));

    return $event;
  }

  //TODO move to controller
  function getEvents() {
    $this->load->database();
    $query = $this->db->query("
      SELECT
      id,
      title,
      description,
      time,
      fields
      FROM event
      ");

    $events = array();
    foreach ($query->result() as $row) {
      $row->time_pretty = date('m.d.y \a\t g:ia', strtotime($row->time));
      $events[] = $row;
    }
    return $events;
  }

  function create($event_data) {
    $mysqldate = date('Y-m-d H:i:s', strtotime($event_data['Datetime']));

    $this->load->database();
    $query = $this->db->query("
      INSERT INTO event
      (title, description, time, fields, has_field_payment)
      VALUES (?, ?, ?, ?, ?)
      ", array(
        $event_data['Title'],
        $event_data['Description'],
        $mysqldate,
        $event_data['fields'],
        isset($event_data['has_field_payment']) ?
          $event_data['has_field_payment'] : 0
      ));

    if($query) {
      $query = $this->db->query("SELECT LAST_INSERT_ID() AS id");
      $result = $query->row();
      return $result->id;
    }
    return $query;
  }
}
