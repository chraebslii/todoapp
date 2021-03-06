<?php 

include "../php/db.php";
include "../php/auth.php";
include "../php/app.php";

// check if user is logged in
startSessionWithTimeout();
if (validateCurrentSession()){
    validateCurrentSessionTimeout();
    updateCurrentSessionTimeout();
} else { 
    header('Location: ./auth/login.php');
    exit;
}

?>

<!DOCTYPE html>
<html lang="de-CH">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/main.css" />
    <link rel="stylesheet" href="../css/elements.css" />
    <link rel="stylesheet" href="../css/app.css" />
    <link rel="shortcut icon" href="../assets/favicon.svg" />
    <title>Todo list | chraebsli.dev</title>
</head>

<body>
    <header id="header"></header>

    <main id="main" class="f col">
        <div class="app" id="app">
            <div class="list-cont" id="list-cont">
                <!-- list container 
                    <div class="list" id="list-1">
                        <div class="header f a row">
                            <span class="list-title f20">Liste 1</span>
                        </div>

                        <div class="content open f col">
                            <div class="items-cont-open">
                                <div class="items task f a row">
                                    <input type="checkbox" id="li-1-1" name="li-1-1" />
                                    <span for="li-1-1">List Item 1</span>
                                </div>
                                <div class="items task f a row">
                                    <input type="checkbox" id="li-1-2" name="li-1-2" />
                                    <span for="li-1-2">List Item 2</span>
                                </div>
                                <div class="items task f a row">
                                    <input type="checkbox" id="li-1-3" name="li-1-3" />
                                    <span for="li-1-3">List Item 3</span>
                                </div>
                                <div class="items task f a row">
                                    <input type="checkbox" id="li-1-4" name="li-1-4" />
                                    <span for="li-1-4">List Item 4</span>
                                </div>
                            </div>
                        </div>

                        <div class="add-task">
                            <img src="../assets/i/plus.svg" alt="plus icon" class="i" onclick="addTask(this)" />
                        </div>

                        <div class="content done f col" data-toggle="closed">
                            <div class="toggle-header f a row" onclick="toggleDoneTasks(this)">
                                <span>abgehakte </span>
                                <img src="../assets/i/expand-more.svg" alt="expand icon" class="i toggle-tasks-icon" />
                            </div>
                            <div class="items-cont-done">
                                <div class="items task f a row">
                                    <input checked type="checkbox" id="li-1-5" name="li-1-5" />
                                    <span for="li-1-5">List Item 5</span>
                                </div>
                                <div class="items task f a row">
                                    <input checked type="checkbox" id="li-1-6" name="li-1-6" />
                                    <span for="li-1-6">List Item 6</span>
                                </div>
                                <div class="items task f a row">
                                    <input checked type="checkbox" id="li-1-7" name="li-1-7" />
                                    <span for="li-1-7">List Item 7 </span>
                                </div>
                                <div class="items task f a row">
                                    <input checked type="checkbox" id="li-1-8" name="li-1-8" />
                                    <span for="li-1-8">List Item 8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                -->
            </div>
        </div>
    </main>

    <footer id="footer"></footer>
</body>

<script src="../js/init.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/elements.js"></script>
<script src="../js/app.js"></script>

</html>
