<?php

require 'conexion.php';

$imagen = $_POST['img'];
$url =  $_POST['url'];

function Insertar_Personal($imagen,$url) {

	$imagen = '"' . $imagen . '"';
    $url = '"' . $url . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "INSERT INTO `inicio_img` (nombre,url)";
    $sql .= " VALUES ($imagen,$url)";

    $result = mysqli_query($conexion, $sql);

    return $sql;
}

$rta = Insertar_Personal($imagen,$url);

echo $rta;
?>