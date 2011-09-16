<?php
class User_model extends CI_Model {
  var $first_name;
  var $last_name;
  var $sunetid;
  var $email;
  var $house;
  var $room;
  var $is_staff;

  function __construct() {
    parent::__construct();

    $this->load->database();
  }

  function getUsers() {
    $query = $this->db->query("
      SELECT
        CONCAT(first_name, ' ', last_name) AS full_name,
        email,
        house,
        room
      FROM user
    ");

    $users = array();
    foreach ($query->result() as $row) {
      $users[] = $row;
    }
    return $users;
  }

  function getUsersAsJSON() {
    return json_encode($this->getUsers());
  }

  public function getIdBySunetid($sunetid) {
    $q = $this->db->query(
      "SELECT id FROM user WHERE sunetid = ?",
      array($sunetid)
    );
    $result = $q->row_array();
    return $result['id'];
  }

  public function getAccessGroup($id) {
    $q = $this->db->query(
      "SELECT access_group FROM user WHERE id = ?",
      $id
    );
    $result = $q->row_array();
    return $result['access_group'];
  }
}
