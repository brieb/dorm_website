<?php
class Sign_up_model extends CI_Model {
  var $id;
  var $event_id;
  var $form;

  function __construct(){
    parent::__construct();

    $this->load->database();
  }

  function create($data) {
    $event_id = $data['event_id'];
    $waitlist_size = $data['capacity'];
    $form = $data['form'];

    $sql = "INSERT INTO sign_up
      (event_id, form, waitlist_size)
      VALUES (?, ?, ?)";
    $query = $this->db->query($sql,
      array(
        $event_id,
        $form,
        $waitlist_size
      ));

    if($query) {
      $query = $this->db->query("SELECT LAST_INSERT_ID() AS id");
      $result = $query->row();
      return $result->id;
    }
    return $query;
  }

  function read($id) {
    $sql = "
      SELECT
        event_id, form, waitlist_size
      FROM sign_up
      WHERE id = ?
    ";
    $query = $this->db->query($sql, array($id));
    return $query->row_array();
  }

  function update($id) {

  }

  function delete($id) {

  }
}
