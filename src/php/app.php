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

function getAllLists($userID) {
    $sql = "SELECT listID, listName, listUserID FROM TodoApp.Lists WHERE listUserID = $userID";
    return SQLQuery($sql);
}

function getAllTasks($listID) {
    $sql = "SELECT taskID, taskName, taskStatus FROM TodoApp.Tasks WHERE taskListID = $listID";
    return SQLQuery($sql);
}    

function formatLists($allLists){
    $formatedLists = [];
    while ($row = $allLists->fetch_assoc()) {
        $listID = $row['listID'];
        $listName = $row['listName'];
        $listUserID = $row['listUserID'];
        $lists = [
            'listID' => intval($listID),
            'listName' => $listName,
            'listUserID' => intval($listUserID),
            'tasks' => formatTasks(getAllTasks($listID))
        ];
        array_push($formatedLists, $lists);
    }
    return $formatedLists;
}

function formatTasks($allTasks) {
    $formatedTasks = [];
    while ($row = $allTasks->fetch_assoc()) {
        $taskID = $row['taskID'];
        $taskName = $row['taskName'];
        $taskStatus = $row['taskStatus'];
        $tasks = [
            'taskID' => intval($taskID),
            'taskName' => $taskName,
            'taskStatus' => intval($taskStatus)
        ];    
        array_push($formatedTasks, $tasks);
    }    
    return $formatedTasks;
}    

?>
