<?php

require '..\conexion.php';

$titulo =  $_POST['titulo'];
$tipo =  $_POST['tipo'];
$participantes = $_POST['participantes'];
$desde = $_POST['desde'];
$imagen = $_POST['img'];

function Insertar_Personal($titulo,$tipo,$participantes,$desde,$imagen) {

	$titulo = '"' . $titulo . '"';
	$tipo = '"' . $tipo . '"';
	$participantes = '"' . $participantes . '"';
	$desde = '"' . $desde . '"';
	$imagen = '"' . $imagen . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "INSERT INTO `noticias` (titulo,tipo,participantes,desde,imagen)";
    $sql .= " VALUES ($titulo,$tipo,$participantes,$desde,$imagen)";

    $result = mysqli_query($conexion, $sql);

    return $sql;
}

$rta = Insertar_Personal($titulo,$tipo,$participantes,$desde,$imagen);

echo $rta;
?>