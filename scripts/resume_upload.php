<?php
$servername="localhost";
$username = "root";
$password = "";
$dbname = "zobhub";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$filename = $_FILES['file']['name'];
$id = $_POST['id'];

$destination = $_SERVER['DOCUMENT_ROOT'] . "/zobhub/uploads/resumes/".$id."_". basename($_FILES['file']['name']);

// $sql = "INSERT INTO users 'resume' VALUES ('".$destination."') WHERE id=$id";

move_uploaded_file($_FILES['file']['tmp_name'],$destination);


/*
if (mysqli_query($conn, $sql)){
	echo "Record updated successfully";
	//echo json_encode($mailResp);
} else{
	echo "Error updating record: " . mysqli_error($conn);
}*/

mysqli_close($conn);