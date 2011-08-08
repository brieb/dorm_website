<?php
class Event_model extends CI_Model {
  var $title;
  var $description;
  var $date;
  var $time;

  function __construct() {
    parent::__construct();
  }

  function getEvent($id) {
    $this->load->database();
    $query = $this->db->query(
      "
      SELECT
        title,
        description,
        time,
        fields
      FROM event
      WHERE id = ?
    ", array(
            $id
       )
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
    //var_dump($event_data);
    $mysqldate = date('Y-m-d H:i:s', strtotime($event_data['datetime']));

    $this->load->database();
    $query = $this->db->query("
      INSERT INTO event
        (title, description, time, fields)
      VALUES (?, ?, ?, ?)
    ", array(
      $event_data['title'],
      $event_data['description'],
      $mysqldate,
      $event_data['fields']
    ));

    if($query) {
      $query = $this->db->query("SELECT LAST_INSERT_ID() AS id");
      $result = $query->row();
      return $result->id;
    }
    return $query;
  }
}
