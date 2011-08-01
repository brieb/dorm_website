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
  }

  function getUsers() {
    $this->load->database();
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
}
