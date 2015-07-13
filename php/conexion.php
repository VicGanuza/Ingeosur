<?php
function connectDB(){

   $conexion = new mysqli('localhost', 'Vitito', 'Vitit081', 'ingeosur');
    if($conexion){
        //echo 'La conexión de la base de datos se ha hecho satisfactoriamente \n';
    }else{
       echo 'Ha sucedido un error inesperado en la conexión de la base de datos \n';
    }   
    return $conexion;
}

function disconnectDB($conexion){

    $close = mysqli_close($conexion);

    if($close){
       // echo 'La desconexión de la base de datos se ha hecho satisfactoriamente \n';
    }else{
        echo 'Ha sucedido un error inesperado en la desconexión de la base de datos \n';
    }   

    return $close;
}
?>