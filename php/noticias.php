<?php
require 'conexion.php';

function Buscar_Noticias(){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM noticias ORDER BY fecha";
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {   $fecha = date('d-m-y', strtotime($row['fecha']));

        $rawdata[$i] = array('id' => $row['id'],
                             'titulo' => $row['titulo'],
                             'cuerpo' => $row['cuerpo'],
                             'fecha' => $fecha,
                             'imagen' => $row['imagen']
                             );
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Buscar_Noticias();

echo json_encode($myArray);
?>