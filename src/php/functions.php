<?php

/**
 * save quiz data to database
 * @param string $title title of quiz
 * @param string $description description of quiz
 * @param string $userID id of user who posted
 * @return int id of quiz
 */
function saveQuiz($quizTitle, $quizDescription, $userID) {
    $quizTitle = validateString($quizTitle);
    $quizDescription = validateString($quizDescription);
    return insertSQL("INSERT INTO Quizapp.Quiz (quizName, quizDescription, userID) VALUES ('$quizTitle', '$quizDescription', $userID)");
}

/**
 * save question data to database
 * @param string $question question
 * @param string $answer1 answer 1
 * @param string $answer2 answer 2
 * @param string $answer3 answer 3
 * @param int $correct correct answer
 * @return int id of question
 */
function saveQuestion($question, $answer1, $answer2, $answer3, $correct) {
    $question = validateString($question);
    $answer1 = validateString($answer1);
    $answer2 = validateString($answer2);
    $answer3 = validateString($answer3);
    return insertSQL("INSERT INTO Quizapp.Questions (question, answer1, answer2, answer3, correctAnswer) VALUES ('$question', '$answer1', '$answer2', '$answer3', '$correct')");
}


/**
 * bind quiz with question
 * @param int $quizID id of quiz
 * @param int $questionID id of question
 * @return bool true if bind ok, false otherwise
 */
function bindQuizWithQuestion($quizID, $questionID) {
    $sql = "INSERT INTO Quizapp.Quiz_Questions (quizID, questionID) VALUES ($quizID, $questionID)";

    $con = connectToDatabase();
    if ($con->query($sql) === TRUE) {
        return true;
    } else {
        echo "Error: $sql <br> $con->error";
        return false;
    }
}

/**
 * get all questions from quiz
 * @param int $quizID id of quiz
 * @return array array of questions
 */
function getAllQuestionsFromQuiz($quizID){
    $sql = "SELECT * FROM Quizapp.Quiz_Questions INNER JOIN Quiz ON Quiz.quizID = Quiz_Questions.quizID INNER JOIN Questions ON Questions.questionID = Quiz_Questions.questionID WHERE Quiz.QuizID = $quizID";
    $data = SQLQuery($sql);
    
    // get questions to array [question1[] ...]
    $questions = array();
    while($row = $data->fetch_assoc()) {
        $question = $row['question'];
        $answer1 = $row['answer1'];
        $answer2 = $row['answer2'];
        $answer3 = $row['answer3'];
        $correct = $row['correctAnswer'];

        array_push($questions, [$question, $answer1, $answer2, $answer3, $correct]);
    }
    return $questions;
}

/**
 * get quiz info
 * @param int $quizID id of quiz
 * @return array array of quiz info
 */
function getQuizInfo($quizID){
    $sql = "SELECT * FROM Quizapp.Quiz INNER JOIN Users ON Users.userID = Quiz.userID WHERE QuizID = $quizID";
    $data = SQLQuery($sql);
    
    // get quiz info into array
    $quizInfo = array();
    while($row = $data->fetch_assoc()) {
        $quizName = $row['quizName'];
        $quizDescription = $row['quizDescription'];
        $quizUserName = $row['userName'];
        array_push($quizInfo, $quizName, $quizDescription, $quizUserName);
    }
    return $quizInfo;
}

?>
