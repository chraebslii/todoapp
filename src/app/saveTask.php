<?php 

include "../php/db.php";
include "../php/app.php";

// check if post request and go on if so
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $taskID = $_POST['taskID'];
    $taskName = $_POST['taskName'];
    $taskStatus = $_POST['taskStatus'];

    // save to database
    $sql = "UPDATE tasks SET taskName = '$taskName', taskStatus = '$taskStatus' WHERE taskID = '$taskID'";
    SQLQuery($sql);
}

?>
