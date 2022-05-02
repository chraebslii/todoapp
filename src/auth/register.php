<?php 

include "../php/db.php";
include "../php/auth.php";

// check if post request and authenticate user
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // if  user is not in db
    if (checkIfUserOrEmailExists($username, $email)){
        // if registration worked
        if (registerUser($username, $password, $email)){
            // if user could be authenticated
            if (authenticate($email, $password)){
                header('Location: ../app.php');
            } else {
                echo "auth failed";
            }
        } else {
            echo 'Registration failed';
        }
    } else {
        echo 'Registration failed';
    }
}
?>

<!DOCTYPE html>
<html lang="de-CH">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/main.css" />
    <link rel="stylesheet" href="../css/elements.css" />
    <link rel="stylesheet" href="../css/auth.css" />
    <link rel="shortcut icon" href="../assets/favicon.svg" />
    <title>Register | Todo list | chraebsli.dev</title>
</head>

<body onload="setEventListener('peu')">
    <header id="header"></header>

    <main id="main" class="f c a col">
        <p class="f28">Register <a class="f18" href="./login.php">/ Login</a></p>
        <form action="./register.php" method="post" id="form">
            <div class="input full">
                <input placeholder="E-Mail Address" autocomplete="email" type="email" name="email" id="email" />
            </div>
            <div class="input half">
                <input placeholder="Username" autocomplete="username" type="text" name="username" id="username"
                    minlength="2">
                <input placeholder="Password" autocomplete="current-password" type="password" name="password"
                    minlength="6" id="password" />
            </div>
            <div class="input half">
                <button type="button" onclick="window.location.href='../'" class="btn">cancel</button>
                <button type="button" onclick="validation('register')" id="btn" class="btn">Register</button>
            </div>
        </form>
    </main>

    <footer id="footer"></footer>
</body>

<script src="../js/init.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/auth.js"></script>
<script src="../js/elements.js"></script>

</html>
