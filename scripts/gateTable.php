<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn =new mysqli("localhost", "root", "", "zobhub");



$result = $conn->query("SELECT * FROM slides");


$conn->close();

var_dump($result);


$temp = array();
$temp = $result->fetch_assoc();

echo $json_response = json_encode($temp);
?>