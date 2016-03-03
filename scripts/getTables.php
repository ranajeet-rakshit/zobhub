<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn =new mysqli("localhost", "root", "", "zobhub");

// EXAMPLE GET URL
//http://localhost/getTables.php?tables=consultants||doctors

$tables = $_GET['tables'];

$tableArr = explode('||', $tables);
$finalArray = array();

for ($i=0; $i < count($tableArr); $i++) { 

	$result = $conn->query("SELECT * FROM " . $tableArr[$i]);
	$tempArray=array();
	if($result->num_rows>0){
		while ($row = $result->fetch_assoc()) {
			$tempArray[] = $row;
		}
	}
	$finalArray[$tableArr[$i]] = $tempArray;
}
echo $json_response = json_encode($finalArray);
$conn->close();
?>