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

$allLists = getAllLists($userID);
while($row = $allLists->fetch_assoc()) {
    $listID = $row['listID'];
    $listName = $row['listName'];
    $listUserID = $row['listUserID'];

    //echo "$listName ($listID) <br>";
    $allTasks = getAllTasks($listID);
    while($row = $allTasks->fetch_assoc()) {
        $taskID = $row['taskID'];
        $taskName = $row['taskName'];
        $taskStatus = $row['taskStatus'];

        //echo "$taskStatus $taskName ($taskID) <br>";
    }
    //echo "<br><br>";
}

?>

<!DOCTYPE html>
<html lang="de-CH">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/main.css" />
    <link rel="stylesheet" href="./css/elements.css" />
    <link rel="shortcut icon" href="./assets/favicon.svg" />
    <title>Todo list | chraebsli.dev</title>
</head>

<body>
    <header id="header"></header>

    <main id="main" class="main-l main-fh f c a col">

    </main>

    <footer id="footer"></footer>
</body>

<script src="./js/elements.js"></script>

</html>
