<?php

/**
 * validate string with trim, strip and specialchars
 * @param string $string string to validate
 * @return string validated string 
 */
function validateString($string) {
    return htmlspecialchars(stripslashes(trim($string)));
}

function getUserID(){
    if(isset($_SESSION['userID'])){
        return $_SESSION['userID'];
    }
    return false;
}

function getAllLists() {
    $userID = getUserID();
    $sql = "SELECT listID, listName, listUserID FROM TodoApp.Lists WHERE listUserID = $userID";
    return SQLQuery($sql);
}

function getAllTasks($listID, $status) {
    if ($status == 'open') {
        $statusID = 0;
    } else if ($status == 'done') {
        $statusID = 1;
    }
    $sql = "SELECT taskID, taskName, taskStatus FROM TodoApp.Tasks WHERE taskListID = $listID AND taskStatus = $statusID";
    return SQLQuery($sql);
}

?>
