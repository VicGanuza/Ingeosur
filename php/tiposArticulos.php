<?php
require 'conexion.php';

$year = $_POST['year'];

function Buscar_Tipos($year) {

    $conexion = connectDB();
    $rawtipos = array();

    $sql = "SELECT tipo FROM articulos WHERE anio=$year GROUP BY tipo ORDER BY tipo ASC";

    mysqli_set_charset($conexion, "utf8"); 

    $result = mysqli_query($conexion, $sql); 

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {   
        $rawtipos[$i] = array('tipo' => $row['tipo']);
        $i++;

    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawtipos; //devolvemos el array
}

$tiposArray = Buscar_Tipos($year);

echo json_encode($tiposArray);

?>