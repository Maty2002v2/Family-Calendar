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
    
    case 'add-day':
        $calendar_id = $request->get('calendar_id');
        $number_day = $request->get('number_day');
        $number_month = $request->get('number_month');
        $number_year = $request->get('number_year');
        $to_repeat = $request->get('to_repeat');
        $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS);
        $description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_SPECIAL_CHARS);
        
        $days = new Days('', $calendar_id, $number_day, $number_month, $number_year, $to_repeat, $title, $description);

        $result = $days->create_day();

        if($result['is_ok']) {
            sendResponse(201, $result);
        } else {
            sendResponse(400);
        }
        break;

    case 'give-days-of-the-month':
        if ($request->get('calendar_id', false) &&  $request->get('number_month', false)) {
            $calendar_id = $request->get('calendar_id');
            $number_month = $request->get('number_month');
            $days = new Days();

            sendResponse(200, $days->give_days_of_the_month($calendar_id, $number_month));
        } else {
            sendResponse(400, "Missing or incorrect data");
        }
        break;

    case 'delete-day':
        if ($request->get('id', false)) {
            $id = $request->get('id');
            $days = new Days();

            if ($days->delete_day($id)) {
                sendResponse(201, "The day has been erased");
            } else {
                sendResponse(400, "Could not erase the day");
            }
        } else {
            sendResponse(400, "Missing or incorrect data");
        }
        break;
}