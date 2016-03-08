<?php

require '..\conexion.php';

$titulo =  $_POST['titulo'];
$tipo =  $_POST['tipo'];
$participantes = $_POST['participantes'];
$desde = $_POST['desde'];
$hasta = $_POST['hasta'];
$claves = $_POST['claves'];
$especialidad = $_POST['especialidad'];

function Insertar_Proyecto($titulo,$tipo,$participantes,$desde,$hasta,$claves,$especialidad) {

	$titulo = '"' . $titulo . '"';
	$tipo = '"' . $tipo . '"';
	$participantes = '"' . $participantes . '"';
	$desde = '"' . $desde . '"';
	$hasta = '"' . $hasta . '"';
	$claves = '"' . $claves . '"';
	$especialidad = '"' . $especialidad . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "INSERT INTO `proyectos` (titulo,tipo,participantes,desde,hasta,claves,especialidad)";
    $sql .= " VALUES ($titulo,$tipo,$participantes,$desde,$hasta,$claves,$especialidad)";

    $result = mysqli_query($conexion, $sql);

    return $sql;
}

$rta = Insertar_Proyecto($titulo,$tipo,$participantes,$desde,$hasta,$claves,$especialidad);

echo $rta;
?>