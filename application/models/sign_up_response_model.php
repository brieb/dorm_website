<?php
class Sign_up_response_model extends CI_Model {
  var $sign_up_id;
  var $user_id;
  var $form_response;

  function __construct(){
    parent::__construct();

    $this->load->database();
  }

  function create($data) {
    $sql = "INSERT INTO sign_up_response
      (user_id, sign_up_id, form_response)
      VALUES (?, ?, ?)";
    $query = $this->db->query($sql,
      array(
        //TODO user id
        2,
        $data['sign_up_id'],
        $data['form_response']
      ));
    if($query) {
      $query = $this->db->query("SELECT LAST_INSERT_ID() AS id");
      $result = $query->row_array();
      return $result['id'];
    }
    return $query;
  }

  function read($id) {
    $sql = "SELECT user_id, form_response
      FROM sign_up_response
      WHERE id = ?";
    $query = $this->db->query($sql, array($id));
    $result = $query->row();
    return $result;
  }

  function update($id) {

  }

  function delete($id) {
    $sql = "DELETE
      FROM sign_up_response
      WHERE id = ?
    ";
    echo $this->db->query($sql, array($id));
  }
}
