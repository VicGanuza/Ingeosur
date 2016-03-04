<?php
require 'conexion.php';

function Inicio_imagenes(){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM inicio_img";
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $rawdata[$i] = array('nombre' => $row['nombre'],
                             'url' => $row['url']
                             );
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Inicio_imagenes();

echo json_encode($myArray);
?>