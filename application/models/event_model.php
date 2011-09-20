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
    $query = $this->db->query(
      "SELECT
        event.id,
        event.title,
        event.description,
        event.time_start,
        event.time_end,
        event.fields,
        sign_up.id AS sign_up_id
      FROM event LEFT JOIN sign_up
      ON event.id = sign_up.event_id
      WHERE event.id = ?",
      array($id)
    );

    $event = $query->row_array();

    if ($event == NULL) {
      return NULL;
    }

    $this->format($event);
    return $event;
  }

  private function format(&$event) {
    $event['time']['start'] = $event['time_start'];
    $event['time']['end'] = $event['time_end'];

    //TODO move display logic to view layer
    $event['time_pretty_start'] =
      date('m.d.y \a\t g:ia', strtotime($event['time_start']));
    $event['time_pretty_end'] =
      date('m.d.y \a\t g:ia', strtotime($event['time_end']));
  }

  //TODO move to read with no args
  function get_events($only_upcoming = TRUE, $sort = TRUE) {
    $sql = "
      SELECT
        id,
        title,
        description,
        time_start,
        time_end,
        fields
      FROM event
    ";
    if ($only_upcoming) {
      $sql .= " WHERE time_start >= CURDATE()";
    }
    if ($sort) {
      $sql .= " ORDER BY time_start, time_end";
    }
    log_message('info', $sql);

    $query = $this->db->query($sql);

    $events = array();
    foreach ($query->result_array() as $event) {
      $this->format($event);
      $events[] = $event;
    }
    return $events;
  }

  function create($event_data) {
    $mysqldate_start = date('Y-m-d H:i:s', strtotime($event_data['time']['start']));
    $mysqldate_end = date('Y-m-d H:i:s', strtotime($event_data['time']['end']));

    $query = $this->db->query(
      "
      INSERT INTO event
      (title, description, time_start, time_end, fields, has_field_payment)
      VALUES (?, ?, ?, ?, ?, ?)
      ", array(
               $event_data['title'],
               $event_data['description'],
               $mysqldate_start,
               $mysqldate_end,
               $event_data['fields'],
               isset($event_data['has_field_payment']) ?
                 $event_data['has_field_payment'] : 0
             )
    );

    if ($query) {
      $this->clearCache();
      return $this->db->insert_id();
    }
    return $query;
  }

  function update($id, $data) {
    $sql = "
      UPDATE event
      SET
        title=?,
        time_start=?,
        time_end=?,
        description=?,
        fields=?,
        has_field_payment=?
      WHERE id = ?
    ";

    $params = array(
      $data['title'],
      $data['time']['start'],
      $data['time']['end'],
      $data['description'],
      $data['fields'],
      $data['has_field_payment'],
      $id
    );
    $result = $this->db->query($sql, $params);
    $this->clearCache();
    return $result;
  }

  function delete($id) {
    $sql = "
      DELETE FROM event
      WHERE id = ?
    ";
    $result = $this->db->query($sql, array($id));
    $this->clearCache();
    return $result;
  }

  function readGcalUrl($eventId) {
    $result = $this->db
      ->query(
      "
        SELECT gcal_url
        FROM event
        WHERE id = ?
    ", array($eventId)
    )
      ->row_array();
    return $result['gcal_url'];
  }

  function getSignUpId($id) {
    $query = $this->db->query(
      "SELECT
        sign_up.id AS sign_up_id
      FROM event LEFT JOIN sign_up
        ON event.id = sign_up.event_id
      WHERE event.id = ?",
      array($id)
    );
    $result = $query->row_array();
    return $result['sign_up_id'];
  }

  private function clearCache() {
    $this->db->cache_delete('event', 'view');
    $this->db->cache_delete('event', 'edit');
    $this->db->cache_delete('event', 'delete');
    $this->db->cache_delete('event', 'create');
  }
}
