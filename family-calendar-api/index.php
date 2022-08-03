<?php
require_once('helpers/includes.php');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, CP-Authorization, Content-Type"); //Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, , Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

$request = new Request($_REQUEST);
$serverName = 'http://localhost/projektx/api/';
$db = Database::getInstance();

$action = $request->get('action', false);
$requestMethod = $_SERVER['REQUEST_METHOD']; // rodzaj zapytania do API - GET, POST, PUT, DELETE, ... ?

switch ($action) {
    case 'add-calendar':
        $calender = new Calendar();
        $result = $calender->create_calendar();

        if($result['is_ok']) {
            sendResponse(201, $result['hash']);
        } else {
            sendResponse(400);
        }
        break;

    case 'exist-calendar':
        if ($request->get('calendar_id', false)) {
            $calendar_id = filter_input(INPUT_GET, 'calendar_id', FILTER_SANITIZE_SPECIAL_CHARS);
            $calender = new Calendar($calendar_id);
        
            if ($calender->does_it_exist()) {
                sendResponse(200);
            } else {
                sendResponse(400);
            }
        }
        break;
}