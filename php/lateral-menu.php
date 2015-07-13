<?php
require 'conexion.php';

$id = $_POST['id'];

function Buscar_Investigacion($id){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdata = array(); //creamos un array

    if ($id=='Articulos'){
        $sql  = "SELECT anio FROM $id GROUP BY anio ORDER BY anio ASC";

        mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

        //if(!$result = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa
        $result = mysqli_query($conexion, $sql); 

        //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;

        while($row = @mysqli_fetch_array($result))
        {
            $rawdata[$i] = array('anio' => $row['anio']);
            $i++;

        }
    }

    if ($id=='Proyectos'){
        
        $sqlDesde = 'SELECT DISTINCT extract(year from desde) yearDesde FROM proyectos ORDER BY yearDesde ASC';
        $sqlHasta = 'SELECT DISTINCT extract(year from hasta) yearHasta FROM proyectos ORDER BY yearHasta ASC';

        mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

        //if(!$result = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa
        $resultD = mysqli_query($conexion, $sqlDesde); 
               
        //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;

        while($row = @mysqli_fetch_array($resultD))
        {   
            $rawdata[$i] = array('anio' => $row['yearDesde']);
            $i++;

        }

        $resultH = mysqli_query($conexion, $sqlHasta); 

        
        while($row = @mysqli_fetch_array($resultH))
        {   $cant= count($rawdata);
            $elemento = $row['yearHasta'];
            $k=0;
            $enc = 'false';

            while (($k<$cant) && ($enc=='false')) {
                if ($elemento == $rawdata[$k]['anio']) {
                    $enc = 'true';
                }
                $k++;
            }

            if ($enc=='false') {
                $rawdata[$i] = array('anio' => $elemento);
                $i++;
            }
        }
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}


$myArray = Buscar_Investigacion($id);

echo json_encode($myArray);

?>