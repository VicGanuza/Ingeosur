<?php
require 'conexion.php';

$year = $_POST['year'];

function Buscar_Proyectos($year){

    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta
    $rawdataH = array();
    $rawdata = array();

    $fecha_desde = "'". $year . "-01-01" . "'";
    $fecha_hasta = "'". $year . "-12-31" . "'";


    $sqlD  = "SELECT * FROM proyectos WHERE desde BETWEEN $fecha_desde AND  $fecha_hasta";
    $sqlH  = "SELECT * FROM proyectos WHERE hasta BETWEEN $fecha_desde AND  $fecha_hasta";
    $sqlB  = "SELECT * FROM proyectos WHERE $year BETWEEN extract(year from desde) AND extract(year from hasta)" ;
    
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $resultD = mysqli_query($conexion, $sqlD);
    $resultH = mysqli_query($conexion, $sqlH);
    $resultB = mysqli_query($conexion, $sqlB);

    $i=0;

    while($row = @mysqli_fetch_array($resultD))
    {   $desde = $row['desde'];
        $desdeConv = date('d-m-y', strtotime($desde));

        $hasta = $row['hasta'];
        $hastaConv = date('d-m-y', strtotime($hasta));

        $rawdata[$i] = array('id' => $row['id'],
                             'titulo' => $row['titulo'],
                             'participantes' => $row['participantes'],
                             'tipo' => $row['tipo'],
                             'desde' => $desdeConv,
                             'hasta' => $hastaConv
                             );
        $i++;
    }

    while($rowH = @mysqli_fetch_array($resultH))
    {   
        $cant= count($rawdata);
        $j = 0;
        $enc = 'False';
        $id = $rowH['id'];

        while (($j < $cant)&&($enc=='False')) {
            if ($id==$rawdata[$j]['id']) {
                $enc = 'true';
            }
            $j++;
        }

        if ($enc == 'False') {
            $desde = $rowH['desde'];
            $desdeConv = date('d-m-y', strtotime($desde));

            $hasta = $rowH['hasta'];
            $hastaConv = date('d-m-y', strtotime($hasta));
            
            $rawdata[$i] = array('id' => $id,
                                  'titulo' => $rowH['titulo'],
                                  'participantes' => $rowH['participantes'],
                                  'tipo' => $rowH['tipo'],
                                  'desde' => $desdeConv,
                                  'hasta' => $hastaConv
                                  );
             $i++;
        }

    }

    while($rowB = @mysqli_fetch_array($resultB))
    {   
        $cant= count($rawdata);
        $j = 0;
        $enc = 'False';
        $id = $rowB['id'];

        while (($j < $cant)&&($enc=='False')) {
            if ($id==$rawdata[$j]['id']) {
                $enc = 'true';
            }
            $j++;
        }
        

        if ($enc == 'False') {
            $desde = $rowB['desde'];
            $desdeConv = date('d-m-y', strtotime($desde));

            $hasta = $rowB['hasta'];
            $hastaConv = date('d-m-y', strtotime($hasta));
            
            $rawdata[$i] = array('id' => $id,
                                  'titulo' => $rowB['titulo'],
                                  'participantes' => $rowB['participantes'],
                                  'tipo' => $rowB['tipo'],
                                  'desde' => $desdeConv,
                                  'hasta' => $hastaConv
                                  );
            $i++;
        }

        
    }


    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

$myArray = Buscar_Proyectos($year);

echo json_encode($myArray);
?>