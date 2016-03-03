<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'zobhub';

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}else {
	echo "Connection Successful";
}

mysqli_close($conn);