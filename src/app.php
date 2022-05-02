<?php 

include "./php/db.php";
include "./php/auth.php";
include "./php/app.php";

// check if user is logged in
startSessionWithTimeout();
if (validateCurrentSession()){
    validateCurrentSessionTimeout();
    updateCurrentSessionTimeout();
} else { 
    header('Location: ./auth/login.php');
    exit;
}
$userID = intval($_SESSION['userID']);

?>

<!DOCTYPE html>
<html lang="de-CH">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/main.css" />
    <link rel="stylesheet" href="./css/elements.css" />
    <link rel="stylesheet" href="./css/app.css" />
    <link rel="shortcut icon" href="./assets/favicon.svg" />
    <title>Todo list | chraebsli.dev</title>
</head>

<body>
    <header id="header"></header>

    <main id="main" class="f col">
        <div class="app" id="app">
            <?php
                
                $allLists = getAllLists($userID);
                while($row = $allLists->fetch_assoc()) {
                    $listID = $row['listID'];
                    $listName = $row['listName'];
                    $listUserID = $row['listUserID'];

                    // list
                    echo "<div class='list' id='list-$listID'>";
                    // list header
                    echo "<div class='header f a row'><span class='list-title f20'>$listName</span></div>";

                    // open tasks
                    $allTasks = getAllTasks($listID, 'open');
                    echo "<div class='content open f col'><div class='items-cont-open'>";
                    while($row = $allTasks->fetch_assoc()) {
                        $taskID = $row['taskID'];
                        $taskName = $row['taskName'];
                        echo "<div class='items task f a row'>
                                <input type='checkbox' id='li-$listID-$taskID' name='li-$listID-$taskID' />
                                <span for='li-$listID-$taskID'>$taskName</span>
                            </div>";
                    }
                    echo "</div></div>";

                    // add task
                    echo "<div class='add-task'>
                            <img src='./assets/i/plus.svg' alt='plus icon' class='i' onclick='addTask(this)' />
                        </div>";

                    // done tasks cont
                    echo "<div class='content done f col' data-toggle='closed'>";
                    // header
                    echo "<div class='toggle-header f a row' onclick='toggleDoneTasks(this)'>
                            <span>abgehakte</span>
                            <img src='./assets/i/expand-more.svg' alt='expand icon' class='i toggle-tasks-icon' />
                        </div>";

                    // done tasks items
                    $allTasks = getAllTasks($listID, 'done');
                    echo "<div class='items-cont-done'>";
                    while($row = $allTasks->fetch_assoc()) {
                        $taskID = $row['taskID'];
                        $taskName = $row['taskName'];
                        echo "<div class='items task f a row'>
                                <input checked type='checkbox' id='li-$listID-$taskID' name='li-$listID-$taskID' />
                                <span for='li-$listID-$taskID'>$taskName</span>
                            </div>";
                    }
                    echo "</div>";

                    // close done tasks cont
                    echo "</div>";

                    // close list
                    echo "</div>";
                }
            ?>
        </div>
    </main>

    <footer id="footer"></footer>
</body>

<script src="./js/init.js"></script>
<script src="./js/elements.js"></script>
<script src="./js/app.js"></script>

</html>
