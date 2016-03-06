<?php

require '..\conexion.php';

$id = $_POST['id'];
$autores =  $_POST['autores'];
$titulo =  $_POST['titulo'];
$lugar =  $_POST['lugar'];
$anio = $_POST['anio'];

function Editar_Articulo($id,$autores,$titulo,$lugar,$anio) {

	$autores = '"' . $autores . '"';
	$titulo = '"' . $titulo . '"';
	$lugar = '"' . $lugar . '"';
	$anio = '"' . $anio . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "UPDATE `articulos` SET ";
    $sql .= "autores = $autores, titulo = $titulo, lugar_publicacion = $lugar, anio = $anio WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Editar_Articulo($id,$autores,$titulo,$lugar,$anio);

echo $rta;
?>