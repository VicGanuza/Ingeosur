<?php

require 'conexion.php';

$id =  $_POST['id'];
$tipo = $_POST['tipo'];

function Eliminar_Articulo($id,$tipo) {

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");

    if ($tipo=="1"){
    	$sql  = "SELECT nombre FROM `inicio_img` WHERE id=$id";

    	$result = mysqli_query($conexion, $sql);
    	$row = @mysqli_fetch_array($result);
    	$foto = $row['nombre'];

    	$sql2  = "DELETE FROM `inicio_img` WHERE id= $id";
    	$file = "../images/inicio/" . $foto;
		$do = unlink($file);
		 
		if($do != true){
		 	echo "There was an error trying to delete the file" . $foto . "<br />";
		}
    }

    else {
    	$sql  = "SELECT nombre FROM `lab-imagenes` WHERE id=$id";

    	$result = mysqli_query($conexion, $sql);
    	$row = @mysqli_fetch_array($result);
    	$foto = $row['nombre'];

    	$sql2  = "DELETE FROM `lab-imagenes` WHERE id= $id";

    	if ($tipo == "2") {
    		$file = "../images/laboratorios/palinologia" . $foto;
			$do = unlink($file);
			 
			if($do != true){
			 	echo "There was an error trying to delete the file" . $foto . "<br />";
			}
    	}
    	else {
    		$file = "../images/laboratorios/petrotomia" . $foto;
			$do = unlink($file);
			 
			if($do != true){
			 	echo "There was an error trying to delete the file" . $foto . "<br />";
			}
    	}
    	
    }

    $result = mysqli_query($conexion, $sql2);
    return $sql2;
}

$rta = Eliminar_Articulo($id,$tipo);

echo $rta;
?>