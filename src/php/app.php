<?php

/**
 * validate string with trim, strip and specialchars
 * @param string $string string to validate
 * @return string validated string 
 */
function validateString($string) {
    return htmlspecialchars(stripslashes(trim($string)));
}

function getAllLists($userID) {
    $sql = "SELECT listID, listName, listUserID FROM TodoApp.Lists WHERE listUserID = $userID";
    return SQLQuery($sql);
}

function getAllTasks($listID) {
    $sql = "SELECT taskID, taskName, taskStatus FROM TodoApp.Tasks WHERE taskListID = $listID";
    return SQLQuery($sql);
}

?>
