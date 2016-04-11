<?php

require "conexion.php";

$conexion = connectDB();

$sql = "UPDATE usuarios SET state=0";
$rec = mysqli_query($conexion, $sql);

echo "1";

?>