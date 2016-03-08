<?php
require 'conexion.php';

$id = $_POST['id'];

function Buscar_Proyecto($id){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM proyectos WHERE id=$id";
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $desde = $row['desde'];
        $hasta = $row['hasta'];

        $rawdata[$i] = array('id' => $row['id'],
                             'titulo' => $row['titulo'],
                             'participantes' => $row['participantes'],
                             'tipo' => $row['tipo'],
                             'desde' => $desde,
                             'hasta' => $hasta,
                             'especialidad' => $row['especialidad'],
                             'claves' => $row['claves']
                             );
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Buscar_Proyecto($id);

echo json_encode($myArray);
?>