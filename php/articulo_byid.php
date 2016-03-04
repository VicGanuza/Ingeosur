<?php
require 'conexion.php';

$id = $_POST['id'];

function Buscar_Articulos($id){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();

    $sql  = "SELECT * FROM articulos WHERE id=$id";
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $rawdata[$i] = array('id' => $id,
                             'autores' => $row['autores'],
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

$myArray = Buscar_Articulos($id);

echo json_encode($myArray);
?>