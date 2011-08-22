<?php
class Gcal_model extends CI_Model {
  private
    $service;

  function __construct(){
    parent::__construct();

    $oldPath = set_include_path(get_include_path() . PATH_SEPARATOR .
      realpath(dirname(__FILE__).'/../../assets/third_party/zend'));
    require_once 'Zend/Loader.php';

    Zend_Loader::loadClass('Zend_Gdata');
    Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
    Zend_Loader::loadClass('Zend_Gdata_Calendar');

    require_once('google_credentials.secret.php');

    $serviceName = Zend_Gdata_Calendar::AUTH_SERVICE_NAME;
    try {
      $client = Zend_Gdata_ClientLogin::getHttpClient(
        $user, $pass, $serviceName);
    } catch(Exception $e) {
      // prevent Google username and password from being displayed
      // if a problem occurs
      echo "Could not connect to calendar.";
      die();
    }
    $this->service = new Zend_Gdata_Calendar($client);
  }

  public function create($data) {
    $newEvent = $this->service->newEventEntry();

    $newEvent->title = $this->service->newTitle($data['title']);
    //$newEvent->where = array($this->service->newWhere($where));
    $newEvent->content = $this->service->newContent("{$data['description']}");

    $when = $this->service->newWhen();
    $when->startTime = "{$data['time']}.000";
    $when->endTime = "{$data['time_end']}.000";
    $newEvent->when = array($when);

    $createdEvent = $this->service->insertEvent($newEvent);
    echo $createdEvent->id->text;
  }
}
