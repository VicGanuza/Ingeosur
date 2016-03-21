<?php

require 'conexion.php';

$id =  $_POST['id'];

function Eliminar_Personal($id) {

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "DELETE FROM `pesonal` WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Eliminar_Personal($id);

echo $rta;
?>