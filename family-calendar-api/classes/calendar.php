<?php
require_once('database.php');

class Calendar {
    private $id;

    public function __construct($id = "")
    {   
        $this->id = $id;
    }

    public function create_calendar(): array {
        $db = Database::getInstance();
        $hash = $this->create_hash();
        $sql = "INSERT INTO calendars (id) VALUES ('".$hash."')";

        if($db->query($sql)) {
            return ["is_ok" => true, "hash" => $hash];
        }
        return ["is_ok" => false];
    }

    public function does_it_exist(): bool {
        $db = Database::getInstance();
        $sql = "SELECT * FROM calendars WHERE id = '".$this->id."' LIMIT 1";

        if($db->rows($db->query($sql)) === 1) {
            return true;
        } 

        return false;
    }

    private function create_hash($length = 7) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }
}