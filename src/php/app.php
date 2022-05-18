<?php

/**
 * validate string with trim, strip and specialchars
 * @param string $string string to validate
 * @return string validated string 
 */
function validateString($string) {
    return htmlspecialchars(stripslashes(trim($string)));
}

/**
 * get user id from session
 * @return int|false user id
 */
function getUserID(){
    if(isset($_SESSION['userID'])){
        return $_SESSION['userID'];
    }
    return false;
}

/**
 * get all lists from user from db
 * @param int $userID user id
 * @return bool|mysqli_result all lists from user
 */
function getAllLists($userID) {
    $sql = "SELECT * FROM TodoApp.Lists WHERE listUserID = $userID";
    return SQLQuery($sql);
}

/**
 * get all tasks from list from db
 * @param int $listID list id
 * @return bool|mysqli_result all tasks from list
 */
function getAllTasks($listID) {
    $sql = "SELECT * FROM TodoApp.Tasks WHERE taskListID = $listID";
    return SQLQuery($sql);
}

/**
 * get single task from db
 * @param int $taskID task id
 * @return bool|mysqli_result task with task id
 */
function getTask($taskID) {
    $sql = "SELECT * FROM TodoApp.Tasks WHERE taskID = $taskID";
    return SQLQuery($sql);
}    

/**
 * format all lists for output
 * @param object $lists array of lists
 * @return array of formatted lists
 */
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
            'tasks' => formatTasks(getAllTasks($listID)),
        ];
        array_push($formatedLists, $lists);
    }
    return $formatedLists;
}

/**
 * format all tasks from list for output
 * @param object $allTasks all tasks from list
 * @return array formated tasks
 */
function formatTasks($allTasks) {
    $formatedTasks = [];
    while ($row = $allTasks->fetch_assoc()) {
        $taskID = $row['taskID'];
        $taskName = $row['taskName'];
        $taskStatus = $row['taskStatus'];
        $lastSaved = $row['lastSaved'];

        $tasks = [
            'taskID' => intval($taskID),
            'taskName' => $taskName,
            'taskStatus' => intval($taskStatus),
            'lastSaved' => $lastSaved,
        ];    
        array_push($formatedTasks, $tasks);
    }    
    return $formatedTasks;
}    

/**
 * format single task for output
 * @param mixed $task task item from db
 * @return array|false as json object
 */
function formatTask($task) {
    while ($row = $task->fetch_assoc()) {
        $taskID = $row['taskID'];
        $taskName = $row['taskName'];
        $taskStatus = $row['taskStatus'];
        $lastSaved = $row['lastSaved'];

        $tasks = [
            'taskID' => intval($taskID),
            'taskName' => $taskName,
            'taskStatus' => intval($taskStatus),
            'lastSaved' => $lastSaved,
        ];    
        return $tasks;
    }
    return false;
}    

?>
