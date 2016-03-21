<?php
require 'conexion.php';

$id = $_POST['id'];

function Buscar_Personal($id){

    $filtro = "'".$id."'";
    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta


    $sql  = "SELECT * FROM pesonal WHERE filtro=$filtro ORDER BY apellido ASC";

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    //if(!$result = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa
    $result = mysqli_query($conexion, $sql); 
   
    $rawdata = array(); //creamos un array

    //guardamos en un array multidimensional todos los datos de la consulta
    $i=0;

    while($row = @mysqli_fetch_array($result))
    {   $nombre = $row['apellido']." ".$row['nombre'];

        $rawdata[$i] = array('Id' => $row['id'],
                             'Nombre' => $nombre,
                             'Titulo' => $row['titulo'],
                             'Cargo' => $row['cargo'],
                             'Adicional' => $row['adicional'],
                             'Imagen' => $row['foto']
                             );
        $i++;

    }


    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}


$myArray = Buscar_Personal($id);

echo json_encode($myArray);

?>