<?php
require 'conexion.php';

$lab = $_POST['id'];

function Laboratorios($lab){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();
    $tabla ="`".'lab-'. $lab."`";

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM $tabla";

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {   
        $objs = explode(";", $row['objetivos']);

        $rawdata[$i] = array('texto' => $row['texto_ppal'],
                             'texto_obj' => $row['texto_obj'],
                             'obj' => $objs
                             );
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Laboratorios($lab);

echo json_encode($myArray);
?>