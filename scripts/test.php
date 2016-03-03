<?php
$servername="localhost";
$username = "root";
$password = "";
$dbname = "zobhub";

$result = mysql_query("SELECT COUNT(*) FROM users WHERE email='ranajeetster@gmail.com'");
echo json_encode($result);
/*$num_rows = mysql_num_rows($result);

if ($num_rows) {
   trigger_error('It exists.', E_USER_WARNING);
}*/
/*try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT email FROM users WHERE email='ranajeetster@gmail.com'"); 
    // WHERE email='ranajeetster@gmail.com'
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    echo json_encode($stmt);
    foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
        echo $v;
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}*/
$conn = null;

?>