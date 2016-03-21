<?php
require 'conexion.php';

$id = $_POST['id'];

function Buscar_fotos($id){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();
    $tabla ="`".'lab-imagenes'."`";
    $id = "'". $id . "'";

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM $tabla WHERE lab=$id";

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {   
        $rawdata[$i] = array('nombre' => $row['nombre'],
                             'url' => $row['url'],
                             'id' => $row['id']
                             );
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Buscar_fotos($id);

echo json_encode($myArray);
?>