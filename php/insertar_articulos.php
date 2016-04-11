<?php

require 'conexion.php';

$autores = $_POST['autores'];
$titulo =  $_POST['titulo'];
$lugar =  $_POST['lugar'];
$anio = $_POST['anio'];
$tipo =  $_POST['tipo'];

function Insertar_Personal($autores,$titulo,$lugar,$anio,$tipo) {

	$autores = '"' . $autores . '"';
	$titulo = '"' . $titulo . '"';
	$lugar = '"' . $lugar . '"';
	$anio = '"' . $anio . '"';

	if ($tipo == "1") {
		$tipo_insert = "Articulos";
	}else {
		if ($tipo == "2"){
			$tipo_insert = "Trabajo en eventos C-T Publicados";
		}else {
			if ($tipo == "3"){
				$tipo_insert = "Partes del libro";
			}else {
				$tipo_insert = "Libros";
			}
		}
	}

	$tipo_insert = '"' . $tipo_insert . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "INSERT INTO `articulos` (autores,titulo,lugar_publicacion,anio,tipo)";
    $sql .= " VALUES ($autores,$titulo,$lugar,$anio,$tipo_insert)";

//echo $sql;
    $result = mysqli_query($conexion, $sql);

    return $tipo;
}

$rta = Insertar_Personal($autores,$titulo,$lugar,$anio,$tipo);

echo $rta;
?>