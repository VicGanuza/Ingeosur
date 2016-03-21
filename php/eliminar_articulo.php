<?php

require 'conexion.php';

$id =  $_POST['id'];

function Eliminar_Articulo($id) {

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "DELETE FROM `articulos` WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Eliminar_Articulo($id);

echo $rta;
?>