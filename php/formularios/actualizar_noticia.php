<?php

require '..\conexion.php';

$id = $_POST['id'];
$titulo =  $_POST['titulo'];
$cuerpo =  $_POST['cuerpo'];
$fecha = $_POST['fecha'];
$imagen = $_POST['img'];

function Editar_Noticia($id,$titulo,$cuerpo,$fecha,$imagen) {

	$titulo = '"' . $titulo . '"';
    $cuerpo = '"' . $cuerpo . '"';
    $fecha = '"' . $fecha . '"';
    $imagen = '"' . $imagen . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "UPDATE `noticias` SET ";
    $sql .= "titulo = $titulo, cuerpo = $cuerpo, fecha = $fecha, imagen = $imagen WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Editar_Noticia($id,$titulo,$cuerpo,$fecha,$imagen);

echo $rta;
?>