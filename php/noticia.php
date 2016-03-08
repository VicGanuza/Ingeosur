<?php
require 'conexion.php';

$id = $_POST['id'];

function Buscar_Noticia($id){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM noticias WHERE id=$id";
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $rawdata[$i] = array('id' => $row['id'],
                             'titulo' => $row['titulo'],
                             'cuerpo' => $row['cuerpo'],
                             'fecha' => $row['fecha'],
                             'imagen' => $row['imagen']
                             );
        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Buscar_Noticia($id);

echo json_encode($myArray);
?>