<?php 

include "../php/db.php";
include "../php/app.php";

// check if get request and go on if so
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    $taskID = intval($_GET['id']);

    // get task from db
    $JSON = json_encode(formatTask(getTask($taskID)));
    echo $JSON;
}

?>
