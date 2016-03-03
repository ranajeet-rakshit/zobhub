<?php
$servername="localhost";
$username = "root";
$password = "";
$dbname = "zobhub";

$conn = mysqli_connect($servername, $username, $password, $dbname);

$filename = $_FILES['file']['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$phone = $_POST['phone'];
$passport = $_POST['passport'];
$skills = $_POST['skills'];
$experience = $_POST['experience'];
$availability = $_POST['availability'];
$description = $_POST['description'];
/*
$check = "SELECT email FROM users WHERE email='".$email."'";



$emailCheck = mysqli_query($conn, $check);

echo json_encode($emailCheck);

if (!$emailCheck->) {
	echo "DUPLICATE";
	die();
}
die();*/
/*
$to = 'ranajeetster@gmail.com';
$subject = 'New user registration';
$message = 'New user registered'."\r\n"."'".$email."'";
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$mailResp = mail($to, $subject, $message, $headers);*/

$destination = $_SERVER['DOCUMENT_ROOT'] . "/zobhub/uploads/resumes/".$passport."_". basename($_FILES['file']['name']);

$sql = "INSERT INTO `zobhub`.`users` (`id`, `userName`, `password`, `phone`, `email`, `description`, `resume`, `first_name`, `last_name`, `passport_number`, `skills`, `experience`, `availability`) VALUES (NULL, '', '$password', '$phone', '$email', '$description', '$destination', '$firstName', '$lastName', '$passport', '$skills', '$experience', '$availability')";

move_uploaded_file($_FILES['file']['tmp_name'],$destination);


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