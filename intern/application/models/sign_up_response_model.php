<?php
class Sign_up_response_model extends CI_Model {
  var $sign_up_id;
  var $user_id;
  var $form_response;

  function __construct() {
    parent::__construct();
  }

  function create($data) {
    $sql = "INSERT INTO sign_up_response
      (user_id, sign_up_id, form_response)
      VALUES (?, ?, ?)";
    $query = $this->db->query(
      $sql,
      array(
        $data['user_id'],
        $data['sign_up_id'],
        $data['form_response']
      )
    );
    if ($query) {
      $this->clearCache();
      return $this->db->insert_id();
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

  function getByUserIdSignUpId($user_id, $sign_up_id) {
    $sql = "
      SELECT id
      FROM sign_up_response
      WHERE
        user_id = ?
        AND sign_up_id = ?
    ";
    $result = $this->db
      ->query(
      $sql,
      array(
        $user_id,
        $sign_up_id,
      )
    )
      ->row_array();

    return element('id', $result, NULL);
  }

  function delete($id) {
    $sql = "DELETE
      FROM sign_up_response
      WHERE id = ?
    ";
    $params = array($id);
    $result = $this->db->query($sql, $params);
    $this->clearCache();
    return $result;
  }

  private function clearCache() {
    $this->db->cache_delete('sign_up_response', 'view');
//    $this->db->cache_delete('sign_up_response', 'edit');
//    $this->db->cache_delete('sign_up_response', 'delete');
//    $this->db->cache_delete('sign_up_response', 'create');
  }
}
