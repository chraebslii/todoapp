<?php

/**
 * connect to database
 * @return mysqli connection to database
 */
function connectToDatabase() {
    $con = new mysqli('127.0.0.1', 'web', '123456','TodoApp', 12345);
    if ($con->connect_error) {
        die("con failed: " . $con->connect_error);
    }
    return $con;
}

/**
 * create an sql query and get result
 * @param string $sql sql query
 * @return mysqli_result|bool result of query
 */
function SQLQuery($sql){
    return connectToDatabase()->query($sql);
}

/**
 * execute SQL query and return inserted ID
 * @param string $sql sql query
 * @return int|false id of inserted row
 */
function insertSQL($sql){
    $con = connectToDatabase();
    if ($con->query($sql) === TRUE) {
        return $con->insert_id;
    } else {
        echo "Error: $sql <br> $con->error";
        return false;
    }
}

?>
