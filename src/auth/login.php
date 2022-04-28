<?php 

include "../php/db.php";
include "../php/auth.php";

// check if post request and authenticate user
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // redirect if authenticated
    if (authenticate($email, $password)){
        header('Location: ../app.php');
    } else {
        echo "deine E-Mail oder Passwort ist falsch";
    }
}

?>

<!DOCTYPE html>
<html lang="de-CH">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/main.css" />
    <link rel="stylesheet" href="../css/auth.css" />
    <link rel="shortcut icon" href="../assets/favicon.svg" />
    <title>Login | Todo list | chraebsli.dev</title>
</head>

<body onload="setEventListener('pe')">
    <p>Login <a href="./register.php">/ Register</a></p>
    <form action="./login.php" method="post" id="form">
        <input placeholder="E-Mail Address" autocomplete="email" type="email" name="email" id="email">
        <input placeholder="Password" autocomplete="current-password" type="password" name="password" id="password"
            minlength="6">
        <button type="button" onclick="validation('login')" id="btn">Login</button>
        <button type="button" onclick="window.location.href='../'">cancel</button>
    </form>
</body>

<script src="../js/auth.js"></script>

</html>
