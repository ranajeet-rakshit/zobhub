<?php

$servername="localhost";
$username = "root";
$password = "";
$dbname = "cake_cms";

$req = json_decode(file_get_contents('php://input'));
$table = $req[count($req)-1]->tableName;
$arr = (array)$req[0];


$sql = "INSERT INTO $table (";
	foreach ($arr as $key => $value) {
		if (!each($arr)) {
			$sql.=$key.')';
		}else{
			$sql.=$key.', ';
		}
	}

$sql.=" VALUES(";
	foreach ($arr as $key => $value) {
		if (!each($arr)) {
			$sql.="'".$value."'".')';
		}else{
			$sql.="'".$value."'".', ';
		}
	}

	echo $sql;

$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (mysqli_query($conn, $sql)){
	echo "Record updated successfully";
} else{
	echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);
	
?>