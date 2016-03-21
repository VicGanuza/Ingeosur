<?php

require 'conexion.php';

$id =  $_POST['id'];

function Eliminar_Proyecto($id) {

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "DELETE FROM `proyectos` WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Eliminar_Proyecto($id);

echo $rta;
?>