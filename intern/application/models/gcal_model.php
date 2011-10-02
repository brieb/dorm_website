<?php

class Gcal_model extends CI_Model {
  private $service;
  private $calUri;

  function __construct() {
    parent::__construct();

    require(CONFPATH.'google_credentials.php');
    $this->calUri = $GCAL_CAL_URI;

    $oldPath = set_include_path(
      get_include_path() . PATH_SEPARATOR .
      realpath(dirname(__FILE__) . '/../../assets/third_party/zend')
    );
    require_once('Zend/Loader.php');

    Zend_Loader::loadClass('Zend_Gdata');
    Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
    Zend_Loader::loadClass('Zend_Gdata_Calendar');

    $serviceName = Zend_Gdata_Calendar::AUTH_SERVICE_NAME;
    try {
      $client = Zend_Gdata_ClientLogin::getHttpClient(
        $GCAL_USER, $GCAL_PASS, $serviceName
      );
    } catch (Exception $e) {
      // prevent Google username and password from being displayed
      // if a problem occurs
      echo "Could not connect to calendar.";
      die();
    }

    $this->service = new Zend_Gdata_Calendar($client);
  }

  public function create($data) {
    $id = $data['event_id'];
    $title = $data['title'];
    $time_start = $data['time_start'];
    $time_end = $data['time_end'];


    $desc = "<a href='" .
            site_url('event/view/' . $id) .
            "'>Click here for event info and sign ups</a>";

    $event = $this->service->newEventEntry();

    $event->title = $this->service->newTitle($title);
    //TODO location
    //$event->where = array($this->service->newWhere($where));
    $event->content = $this->service->newContent("$desc");

    $when = $this->service->newWhen();
    $when->startTime = "{$time_start}";
    $when->endTime = "{$time_end}";
    $event->when = array($when);

    $createdEvent = $this->service->insertEvent($event, $this->calUri);
    $gcalUrl = $createdEvent->id->text;

    //TODO move this to event model??? - setGcalUrl - and call from event controller
    $this->db->query(
      "
      UPDATE event SET gcal_url = ?
      WHERE id = ?
    ", array($gcalUrl, $id)
    );
  }

  public function read($id) {
    return $this->service->getCalendarEventEntry($id);
  }

  public function update($id, $data) {
    if (!$id) {
      return false;
    }

    $title = $data['title'];
    $time_start = $data['time']['start'];
    $time_end = $data['time']['end'];

    $event = $this->service->getCalendarEventEntry($id);
    if (!$event) {
      return false;
    }

    $event->title = $this->service->newTitle($title);

    $when = $this->service->newWhen();
    $when->startTime = "{$time_start}";
    $when->endTime = "{$time_end}";
    $event->when = array($when);

    try {
      $event->save();
      return true;
    } catch (Zend_Gdata_App_Exception $e) {
      //var_dump($e);
      return false;
    }
  }

  public function delete($id) {
    if (!$id) {
      return TRUE;
    }
    $event = $this->service->getCalendarEventEntry($id);
    return $event->delete();
  }

  public function listCalUris() {
    $calFeed = $this->service->getCalendarListFeed();
    foreach ($calFeed as $calendar) {
      error_log($calendar->title->text . " " . $calendar->content->src);
    }
  }
}
