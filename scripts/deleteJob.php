<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn =new mysqli("localhost", "root", "", "zobhub");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// EXAMPLE GET URL
//http://localhost/getTables.php?tables=consultants||doctors

$jobID = $_GET['jobID'];



$result = $conn->query("DELETE FROM jobs WHERE jobID=$jobID");


$conn->close();

if ($result) {
    echo true;
} else {
    echo "Error deleting record: " . $conn->error;
}

?>