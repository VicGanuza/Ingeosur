<?php

require '..\conexion.php';

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

function Insertar_Personal($name,$apellido,$titulo,$cargo,$especialidad,$specialty,
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
    $sql  = "INSERT INTO `pesonal` (nombre,apellido,titulo,cargo,especialidad,email,cv,foto,adicional,filtro,specialty)";
    $sql .= " VALUES ($name,$apellido,$titulo,$cargo,$especialidad,$email,$cv,$foto,$adicional,$filtro,$specialty)";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Insertar_Personal($name,$apellido,$titulo,$cargo,$especialidad,
                         $specialty,$email,$foto,$cv,$filtro,$adicional);

echo $rta;
?>