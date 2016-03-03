<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn =new mysqli("localhost", "root", "", "zobhub");

// EXAMPLE GET URL
//http://localhost/getTables.php?tables=consultants||doctors

$email = $_GET['userEmail'];
$pwd = $_GET['userPwd'];



$result = $conn->query("SELECT * FROM users WHERE email=$email AND password=$pwd");


$conn->close();


if (!$result->num_rows) {
	echo 'false';
	die;
}

$temp = array();
$temp = $result->fetch_assoc();
/*while ($row = $result->fetch_assoc()) {
			$temp[] = $row;
		}*/
echo $json_response = json_encode($temp);
/*foreach ($result as $key => $value) {
	echo print_r($value) . "<br>";
}*/

//PREVIOUS QUERRY
/*
echo json_encode($result);

if (!$result || empty($result)) {
	echo 'false';
	die;
}

echo 'true';
$conn->close();*/
?>