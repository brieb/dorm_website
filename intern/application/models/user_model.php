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
        first_name,
        last_name,
        nick_name,
        email,
        class,
        house,
        room,
        staff_role,
        photo,
        phone_cell,
        phone_room,
        phone_office
      FROM user
      ORDER BY first_name, last_name
    ");

    $users = array();
    foreach ($query->result_array() as $row) {
      $row['class'] = ucfirst(strtolower($row['class']));
      $row['house'] = ucfirst(strtolower($row['house']));
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
