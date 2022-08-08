<?php
require_once('database.php');

class Days {
    private $id;
    private $calendar_id;
    private $number_day;
    private $number_month;
    private $number_year;
    private $to_repeat;
    private $title;
    private $description;
    private $category_day;
    private $icon_name;
    private $icon_color;

    public function __construct(
        $id = "", 
        $calendar_id = "", 
        $number_day = "", 
        $number_month = "", 
        $number_year = "", 
        $to_repeat = "", 
        $title = "", 
        $description = "", 
        $category_day = "",
        $icon_name = "",
        $icon_color = "",
    )
    {   
        $this->id = $id;
        $this->calendar_id = $calendar_id;
        $this->number_day = $number_day;
        $this->number_month = $number_month;
        $this->number_year = $number_year;
        $this->to_repeat = $to_repeat;
        $this->title = $title;
        $this->description = $description;
        $this->category_day = $category_day;
        $this->icon_name = $icon_name;
        $this->icon_color = $icon_color;
    }

    public function create_day(): array {
        $db = Database::getInstance();
        $sql = "INSERT INTO days 
                (id, calendar_id, number_day, number_month, number_year, to_repeat, title, description, category_day, 
                icon_name, icon_color) VALUES 
                ('', '$this->calendar_id', $this->number_day, $this->number_month, $this->number_year,
                $this->to_repeat, '$this->title', '$this->description', $this->category_day, '$this->icon_name', '$this->icon_color')";

        if($db->query($sql)) {
            return ["is_ok" => true, "day" => [
                "calendar_id" => $this->calendar_id, 
                "number_day" => $this->number_day, 
                "number_month" => $this->number_month, 
                "number_year" => $this->number_year, 
                "to_repeat" => $this->to_repeat, 
                "title" => $this->title, 
                "description" => $this->description,
                "category_day" => $this->category_day,
                "icon_name" => $this->icon_name,
                "icon_color" => $this->icon_color,
            ]];
        } else {
            return ["is_ok" => false];
        }

    }

    public function give_days_of_the_month($calendar_id, $number_month): array {
        $db = Database::getInstance();
        $sql = "SELECT * FROM `days`WHERE number_month = $number_month AND calendar_id = '$calendar_id'";

        $result = $db->rows($db->query($sql));

        if($result >= 1) {
            return $db->fetchByAssoc($db->query($sql));
        } 

        return [];
    }

    public function delete_day($id): bool {
        $db = Database::getInstance();
        $sql = "DELETE FROM days WHERE id = $id";
        
        if ($db->query($sql)) {
            return true;
        }
        
        return false;
    }
}