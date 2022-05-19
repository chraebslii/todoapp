<?php 

include "../php/db.php";
include "../php/auth.php";
include "../php/app.php";

// check if user is logged in
startSessionWithTimeout();
validateCurrentSessionTimeout();
updateCurrentSessionTimeout();

?>

<!DOCTYPE html>
<html lang="de-CH">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/main.css" />
    <link rel="stylesheet" href="../css/elements.css" />
    <link rel="shortcut icon" href="../assets/favicon.svg" />
    <title>Todo list | chraebsli.dev</title>
</head>

<body>
    <header id="header"></header>

    <main id="main" class="main-l main-fh f c a col">
        <p class="f28">Todo list</p>

        <a href="./auth/logout.php">Logout</a>
        <a href="./auth/login.php">Login</a>
        <a href="./auth/register.php">Register</a>
        <br>
        <a href="./app.php">App</a>
    </main>

    <footer id="footer"></footer>
</body>

<script src="../js/init.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/elements.js"></script>

</html>
