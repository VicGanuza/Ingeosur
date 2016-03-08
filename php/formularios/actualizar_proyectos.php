<?php

require '..\conexion.php';

$id = $_POST['id'];
$titulo =  $_POST['titulo'];
$tipo =  $_POST['tipo'];
$participantes = $_POST['participantes'];
$desde = $_POST['desde'];
$hasta = $_POST['hasta'];
$claves = $_POST['claves'];
$especialidad = $_POST['especialidad'];

function Editar_Proyecto($id,$titulo,$tipo,$participantes,$desde,$hasta,$claves,$especialidad) {

	$titulo = '"' . $titulo . '"';
    $tipo = '"' . $tipo . '"';
    $participantes = '"' . $participantes . '"';
    $desde = '"' . $desde . '"';
    $hasta = '"' . $hasta . '"';
    $claves = '"' . $claves . '"';
    $especialidad = '"' . $especialidad . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "UPDATE `proyectos` SET ";
    $sql .= "titulo = $titulo, tipo = $tipo, participantes = $participantes, desde = $desde, hasta=$hasta";
    $sql .= ", claves=$claves, especialidad=$especialidad WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Editar_Proyecto($id,$titulo,$tipo,$participantes,$desde,$hasta,$claves,$especialidad);

echo $rta;
?>