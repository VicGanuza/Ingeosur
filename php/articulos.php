<?php
require 'conexion.php';

$year = $_POST['year'];

function Buscar_Articulos($year){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM articulos WHERE anio=$year";
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $rawdata[$i] = array('autores' => $row['autores'],
                             'titulo' => $row['titulo'],
                             'lugar' => $row['lugar_publicacion'],
                             'anio' => $row['anio'],
                             'tipo' => $row['tipo']
                             );
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Buscar_Articulos($year);

echo json_encode($myArray);
?>