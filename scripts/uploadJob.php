<?php
$servername="localhost";
$username = "root";
$password = "";
$dbname = "zobhub";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$title = $_POST['title'];
$description = $_POST['description'];
$company = $_POST['company'];
$location = $_POST['location'];
$experience = $_POST['experience'];
$basic = $_POST['basic'];
$position = $_POST['position'];
$jobCode = $_POST['jobCode'];
$interviewDate = $_POST['interviewDate'];
$qualification = $_POST['qualification'];

// $sql = "INSERT INTO `zobhub`.`jobs` (`id`, `company`, `jobTitle`, `location`, `experience`, `basic_salary`, `open_position`, `job_code`, `interview_date`, `qualification`) VALUES (NULL, '$company', '$title', '$location', '$experience', '$basic', '$position', '$jobCode', '$interviewDate', '$qualification')";
$sql = "INSERT INTO `zobhub`.`jobs` (`company`, `jobTitle`, `jobDesc`, `location`, `experience`, `basic_salary`, `open_position`, `job_code`, `interview_date`, `qualification`) VALUES ('$company', '$title', '$description', '$location', '$experience', '$basic', '$position', '$jobCode', '$interviewDate', '$qualification')";

if (mysqli_query($conn, $sql)){
	echo "Record updated successfully";
	//echo json_encode($mailResp);
} else{
	echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);