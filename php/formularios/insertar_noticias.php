<?php

require '..\conexion.php';

$titulo =  $_POST['titulo'];
$cuerpo =  $_POST['cuerpo'];
$fecha = $_POST['fecha'];
$imagen = $_POST['img'];

function Insertar_Personal($titulo,$cuerpo,$fecha,$imagen) {

	$titulo = '"' . $titulo . '"';
	$cuerpo = '"' . $cuerpo . '"';
	$fecha = '"' . $fecha . '"';
	$imagen = '"' . $imagen . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "INSERT INTO `noticias` (titulo,cuerpo,fecha,imagen)";
    $sql .= " VALUES ($titulo,$cuerpo,$fecha,$imagen)";

    $result = mysqli_query($conexion, $sql);

    return $sql;
}

$rta = Insertar_Personal($titulo,$cuerpo,$fecha,$imagen);

echo $rta;
?>