<?php
include(dirname(__FILE__).'/../conf/config.php');

session_start();
$_SESSION['REMOTE_USER'] = $_SERVER['REMOTE_USER'];
header('Location: '.$BASE_URL.'index.php/event/view') ;
