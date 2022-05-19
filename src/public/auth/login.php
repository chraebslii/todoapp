<?php 

include "../../php/db.php";
include "../../php/auth.php";

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
    <link rel="stylesheet" href="../../css/main.css" />
    <link rel="stylesheet" href="../../css/elements.css" />
    <link rel="stylesheet" href="../../css/auth.css" />
    <link rel="shortcut icon" href="../../assets/favicon.svg" />
    <title>Login | Todo list | chraebsli.dev</title>
</head>

<body>
    <header id="header"></header>

    <main id="main" class="f c a col">
        <p class="f28">Login <a class="f18" href="./register.php">/ Register</a></p>
        <form action="./login.php" method="post" id="form">
            <div class="input full">
                <input placeholder="E-Mail Address" autocomplete="email" type="email" name="email" id="email" />
            </div>
            <div class="input full">
                <input placeholder="Password" autocomplete="current-password" type="password" name="password"
                    minlength="6" id="password" />
            </div>
            <div class="input half">
                <button type="button" onclick="window.location.href='../'" class="btn">cancel</button>
                <button type="button" onclick="validation('login')" id="btn" class="btn">Login</button>
            </div>
        </form>
    </main>

    <footer id="footer"></footer>
</body>

<script src="../../js/init.js"></script>
<script src="../../js/functions.js"></script>
<script src="../../js/auth.js"></script>
<script src="../../js/elements.js"></script>

</html>
