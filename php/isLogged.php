<?php

require "conexion.php";

$conexion = connectDB();

$sql = "SELECT state FROM usuarios";
$rec = mysqli_query($conexion, $sql);

while($row = @mysqli_fetch_array($rec)) 
{ 
    $result = $row['state']; 
} 

echo $result;

?>