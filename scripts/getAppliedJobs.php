<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn =new mysqli("localhost", "root", "", "zobhub");

// EXAMPLE GET URL
//http://localhost/getTables.php?tables=consultants||doctors

$applicantID = $_GET['applicantID'];


$result = $conn->query("SELECT * FROM jobapplications WHERE applicantUserID=$applicantID");


$conn->close();

//echo $result->num_rows;

if (!$result->num_rows) {
	echo 'false';
	die;
}

$temp = array();

foreach ($result as $res) {
	$temp[] = $res;
}

echo $json_response = json_encode($temp);
?>