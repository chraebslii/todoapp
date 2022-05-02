<?php 

include "../php/db.php";

// check if post request and go on if so
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $taskID = $_POST['taskID'];
    $taskName = $_POST['taskName'];

    // save to database
    $sql = "UPDATE tasks SET taskName = '$taskName' WHERE taskID = '$taskID'";
    SQLQuery($sql);
}

?>
