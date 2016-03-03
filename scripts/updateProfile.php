<?php
$servername="localhost";
$username = "root";
$password = "";
$dbname = "zobhub";

$conn = mysqli_connect($servername, $username, $password, $dbname);


$phone = $_POST['phone'];
$description = $_POST['desc'];
$skills = $_POST['skills'];
$experience = $_POST['experience'];
$availability = $_POST['availability'];
$id = $_POST['id'];

// $sql = "INSERT INTO `zobhub`.`users` (`id`, `userName`, `password`, `phone`, `email`, `description`, `resume`, `first_name`, `last_name`, `passport_number`, `skills`, `experience`, `availability`) VALUES (NULL, '', '$password', '$phone', '$email', '$description', '$destination', '$firstName', '$lastName', '$passport', '$skills', '$experience', '$availability')";
$sql = "UPDATE users SET phone='".$phone."', description='".$description."', skills='".$skills."', experience='".$experience."', availability='".$availability."' WHERE id='".$id."'";
// $sql = "UPDATE users SET phone='$phone' WHERE id=19";
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (mysqli_query($conn, $sql)){
	echo "Record updated successfully";
	//echo json_encode($mailResp);
} else{
	echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);