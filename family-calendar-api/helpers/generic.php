<?php
function sendResponse($code, $message = '')
{
    $description = '';
    switch ($code) {
        case 400:
            $description = 'Bad Request';
            break;
        case 401:
            $description = 'Unauthorized';
            break;
        case 404:
            $description = 'Not Found';
            break;
        case 405:
            $description = 'Method Not Allowed';
            break;
        case 500:
            $description = 'Internal Server Error';
            break;
    }

    header('HTTP/1.0 ' . $code . ' ' . $description);
    $response = new stdClass();
    $response->error = $code >= 200 && $code < 300 ? false : true;
    $response->message = $message;

    echo json_encode($response);
    exit;
}
