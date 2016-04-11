<?php

require 'conexion.php';

$id = $_POST['id'];
$name =  $_POST['name'];
$apellido =  $_POST['apellido'];
$titulo =  $_POST['titulo'];
$cargo =  $_POST['cargo'];
$especialidad = $_POST['especialidad'];
$specialty =  $_POST['specialty'];
$email =  $_POST['email'];
$foto =  $_POST['foto_nombre'];
$cv = $_POST['cv_nombre'];
$filtro = $_POST['filtro'];
$adicional = $_POST['adicionales'];

function Editar_Personal($id,$name,$apellido,$titulo,$cargo,$especialidad,$specialty,
                           $email,$foto,$cv,$filtro,$adicional) {

	$name = '"' . $name . '"';
	$apellido = '"' . $apellido . '"';
	$titulo = '"' . $titulo . '"';
	$cargo = '"' . $cargo . '"';
	$especialidad = '"' . $especialidad . '"';
	$specialty = '"' . $specialty . '"';
	$email = '"' . $email . '"';
	$foto = '"' . $foto . '"';
	$cv = '"' . $cv . '"';
	$filtro = '"' . $filtro . '"';
	$adicional = '"' . $adicional . '"';

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "UPDATE `pesonal` SET ";
    $sql .= "nombre = $name, apellido = $apellido, titulo = $titulo, cargo = $cargo, ";
    $sql .= "especialidad = $especialidad, email = $email, cv = $cv, foto = $foto, ";
    $sql .= "adicional = $adicional, filtro = $filtro, specialty = $specialty WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Editar_Personal($id,$name,$apellido,$titulo,$cargo,$especialidad,
                         $specialty,$email,$foto,$cv,$filtro,$adicional);

echo $rta;
?>