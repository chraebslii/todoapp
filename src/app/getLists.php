<?php 

include "../php/db.php";
include "../php/app.php";

// check if get request and go on if so
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    //$userID = intval($_SESSION['userID']);
    $userID = 1;
    $JSON = json_encode(formatLists(getAllLists($userID)));
    echo $JSON;
}

?>
