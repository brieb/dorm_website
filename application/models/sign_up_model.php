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
    $sql = "INSERT INTO sign_up
      (event_id, form)
      VALUES (?, ?)";
    $query = $this->db->query($sql,
      array(
        $data['event_id'],
        $data['form']
      ));
    if($query) {
      $query = $this->db->query("SELECT LAST_INSERT_ID() AS id");
      $result = $query->row();
      return $result->id;
    }
    return $query;
  }

  function read($id) {
    $sql = "SELECT event_id, form FROM sign_up
      WHERE id = ?";
    $query = $this->db->query($sql, array($id));
    $result = $query->row();
    return $result;
  }

  function setEventCapacity($capacityCount){
    $sql = "";
  }

  function update($id) {

  }

  function delete($id) {

  }
}
