<?php

require 'conexion.php';

$id =  $_POST['id'];

function Eliminar_Noticia($id) {

    $conexion = connectDB();
    mysqli_set_charset($conexion, "utf8");
    $sql  = "DELETE FROM `noticias` WHERE id= $id";

    $result = mysqli_query($conexion, $sql);
    return $sql;
}

$rta = Eliminar_Noticia($id);

echo $rta;
?>