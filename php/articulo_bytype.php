<?php
require 'conexion.php';

$id = $_POST['id'];

function Buscar_Articulos($id){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array();
    $tipo = "";

    if ($id == "1"){
        $tipo = '"'.'Articulos'.'"';
    }
    else {
        if ($id == "2"){
            $tipo = '"'.'Trabajo en eventos C-T Publicados'.'"';
        }
        else {
            if ($id == "3"){
                $tipo = '"'.'Partes del libro'.'"';
            }
            else {
                if ($id == "4"){
                    $tipo = '"'.'Libros'.'"';
                }
            }
        }
    }

    $sql  = "SELECT * FROM articulos WHERE tipo=$tipo";
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $result = mysqli_query($conexion, $sql);

    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $rawdata[$i] = array('id' => $row['id'],
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