<?php
class Sign_up_model extends CI_Model {
  var $id;
  var $event_id;
  var $form;

  function __construct() {
    parent::__construct();

    $this->load->database();
  }

  function create($data) {
    $event_id = $data['event_id'];
    $waitlist_size = $data['capacity'];
    $form = $data['form'];

    $sql = "INSERT IGNORE INTO sign_up
      (event_id, form, waitlist_size)
      VALUES (?, ?, ?)";
    $query = $this->db->query(
      $sql,
      array(
        $event_id,
        $form,
        $waitlist_size
      )
    );

    if ($query) {
      $this->clearCache();
      return $this->db->insert_id();
    }
    return $query;
  }

  function read($id) {
    $sql = "
      SELECT
        event_id, form, waitlist_size, is_open
      FROM sign_up
      WHERE id = ?
    ";
    $query = $this->db->query($sql, array($id));
    return $query->row_array();
  }

  function update($id, $data) {
  }

  function delete($id) {
    $sql = "
      DELETE
      FROM sign_up
      WHERE id = ?
    ";
    $params = array($id);

    $result = $this->db->query($sql, $params);
    $this->clearCache();
    return $result;
  }

  private function clearCache() {
    $this->db->cache_delete('sign_up', 'view');
//    $this->db->cache_delete('sign_up', 'edit');
//    $this->db->cache_delete('sign_up', 'delete');
    $this->db->cache_delete('sign_up', 'create');
  }
}
