<?php

/** 
 * get duration of session
 * @return int duration of session
*/
function getSessionTimeout() {
    return 3600;
}

/**
 * start session with timeout
 */
function startSessionWithTimeout(){
    $timeout = getSessionTimeout();
    ini_set('session.gc_maxlifetime', $timeout);
    session_start();
}

/**
 * check if current session is valid
 * @return bool true if session is valid, false otherwise
 */
function validateCurrentSession(){
    if (isset($_SESSION['loggedIn'])) {
        return true;
    } else {
        return false;
    }
}

/**
 * update current session timeout
 */
function updateCurrentSessionTimeout(){
    $_SESSION['valid'] = time();
}


/**
 * check if current session is valid and destroy if not
 * @return bool true if session is valid, false otherwise
 */
function validateCurrentSessionTimeout(){
    $timeout = getSessionTimeout();
    if (isset($_SESSION['valid']) && (time() - $_SESSION['valid'] > $timeout)) {
        session_unset();
        session_destroy();
        return false;
    } else {
        return true;
    }
}

/**
 * logout user
 */
function logout(){
    session_start();
    session_unset();
    session_destroy();
    header('Location: ../');
}

/**
 * authenticate user
 * @param string $email email of user
 * @param string $password password of user
 * @return bool true if user is authenticated, false otherwise
 */
function authenticate($email, $password){
    // start session 
    startSessionWithTimeout();

    // get authentication info from database
    $con = connectToDatabase();

    $con = connectToDatabase();
    $sql = "SELECT userID, userPassword FROM TodoApp.Users WHERE userEmail = '$email'";
    $data = $con->query($sql);

    // get username
    if ($data->num_rows > 0) {
        while($row = $data->fetch_assoc()) {
            $userID =  $row['userID'];
            $userPassword = $row['userPassword'];

            if (password_verify($password, $userPassword)) {
                $_SESSION['loggedIn'] = true;
                $_SESSION['userID'] = $userID;
                $_SESSION['userEmail'] = $email;
                $_SESSION['userName'] = getUserNameFromUserID($userID);
                return true;
            } else {
                return false;
            }
        }
    }
    $con->close();
}    

/**
 * register a new user
 * @param string $username username 
 * @param string $email email
 * @param string $password password
 */
function registerUser($username, $password, $email){
    $con = connectToDatabase();
    $password = password_hash($password, PASSWORD_BCRYPT);
    $sql = "INSERT INTO TodoApp.Users (userName, userEmail, userPassword) VALUES ('$username', '$email', '$password')";

    if ($con->query($sql) === TRUE) {
        return true;
    } else {
        echo "Error: $sql <br> $con->error";
        return false;
    }
}

/**
 * check if user exists
 * @param string $username username 
 * @param string $email email
 * @return bool false if user exists, true otherwise 
 */
function checkIfUserOrEmailExists($username, $email){
    $con = connectToDatabase();
    $sql = "SELECT userName, userEmail FROM TodoApp.Users";
    $data = $con->query($sql);

    $allUsers = array();
    $allEmails = array();
    if ($data->num_rows > 0) {
        // push each row to array
        while($row = $data->fetch_assoc()) {
            array_push($allUsers, $row['userName']);
            array_push($allEmails, $row['userEmail']);
        }

        // check if user or email in output array
        if (in_array($username, $allUsers) && in_array($email, $allEmails)) {
            return false;
        }
        else {
            return true;
        }
    } else {
        echo "0 results";
    }
}

/**
 * get userName from userID
 * @param string $userID userID
 * @return string username from userID
 */
function getUserNameFromUserID($userID){
    $con = connectToDatabase();
    $sql = "SELECT userName FROM TodoApp.Users WHERE userID = $userID";
    $data = $con->query($sql);

    // get username
    if ($data->num_rows > 0) {
        while($row = $data->fetch_assoc()) {
            $username =  $row['userName'];
        }
    }
    $con->close();
    return $username;
}

?>
