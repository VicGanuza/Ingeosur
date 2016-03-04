<?php
require 'conexion.php';

$id = $_POST['id'];

function Biografia_Personal($id){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta

    $sql  = "SELECT * FROM pesonal WHERE id=$id";

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    //if(!$result = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa
    $result = mysqli_query($conexion, $sql); 

    $rawdata = array(); //creamos un array

    //guardamos en un array multidimensional todos los datos de la consulta
    $i=0;

    while($row = @mysqli_fetch_array($result))
    {
        $nombre = $row['apellido']." ".$row['nombre'];

        $rawdata[$i] = array('Id' => $row['id'],
                            'Nombre' => $row['nombre'],
                            "Apellido" => $row['apellido'],
                            'Titulo' => $row['titulo'],
                            'Cargo' => $row['cargo'],
                            'Adicional' => $row['adicional'],
                            'Especialidad' => $row['especialidad'],
                            'Specialty' => $row['specialty'],
                            'Cv' => $row['cv'],
                            'Imagen' => $row['foto'],
                            'Email' => $row['email']
                        );

        $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos
    return $rawdata; //devolvemos el array
}

$myArray = Biografia_Personal($id);
echo json_encode($myArray);

?>