<?php 

include "../php/db.php";
include "../php/app.php";

// check if post request and go on if so
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $taskName = $_POST['taskName'];
    $listID = $_POST['listID'];
    $taskStatus = $_POST['taskStatus'];

    // save to database
    $sql = "INSERT INTO tasks (taskName, listID, taskStatus) VALUES ('$taskName', '$listID', '$taskStatus')";
    SQLQuery($sql);
}

?>
