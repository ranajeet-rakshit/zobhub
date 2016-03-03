<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn =new mysqli("localhost", "root", "", "zobhub");

// EXAMPLE GET URL
//http://localhost/getTables.php?tables=consultants||doctors

$applicantID = $_GET['applicantID'];
$job = $_GET['jobID'];


$sql = 'INSERT INTO jobapplications (jobID, applicantUserID, applicationDate)
VALUES ('.$job.', '.$applicantID.', NOW())';

//$result = $conn->query($sql);

if ($conn->query($sql) === TRUE) {
    return true;
} else {
    return false;
}

$conn->close();
?>