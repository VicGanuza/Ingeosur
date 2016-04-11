<?php

require 'conexion.php';

$lugar =  $_POST['lugar'];
$imagen = $_POST['img'];
$url =  $_POST['url'];

function Insertar_Personal($lugar,$imagen,$url) {

	$imagen = '"' . $imagen . '"';
    $url = '"' . $url . '"';

    if ($lugar == "2") {
        $lugar = "palinologia";
    }
    else {
        $lugar = "petrotomia";
    }

    $lugar = '"' . $lugar .'"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "INSERT INTO `lab-imagenes` (lab,nombre,url)";
    $sql .= " VALUES ($lugar,$imagen,$url)";

    $result = mysqli_query($conexion, $sql);

    return $sql;
}

$rta = Insertar_Personal($lugar,$imagen,$url);

echo $rta;
?>