<?php
require 'conexion.php';

function Inicio(){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM inicio";
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $rawdata[$i] = array('quienes' => $row['quienes']);
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Inicio();

echo json_encode($myArray);
?>