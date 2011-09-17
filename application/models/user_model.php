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
        CONCAT(
          UPPER(SUBSTRING(house,1,1)), LOWER(SUBSTRING(house,2))
        ) AS house,
        room,
        staff_role,
        photo
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
    return element('id', $result, null);
  }

  public function getAccessGroup($id) {
    $q = $this->db->query(
      "SELECT access_group FROM user WHERE id = ?",
      array($id)
    );
    $result = $q->row_array();
    return element('access_group', $result, null);
  }
}
