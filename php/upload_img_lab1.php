<?php

//comprobamos que sea una petición ajax
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
{
    var_dump($_FILES);
    //obtenemos el archivo a subir
    $file_image = $_FILES['archivo_img_gral']['name']; 

    echo $file_image;
    
    //comprobamos si existe un directorio para subir el archivo
    //si no es así, lo creamos
    if(!is_dir("../images/laboratorios/palinologia/")) 
        mkdir("../images/laboratorios/palinologia/", 0777);
     
    //comprobamos si el archivo ha subido
    if ($file_image && move_uploaded_file($_FILES['archivo_img_gral']['tmp_name'],"../images/laboratorios/palinologia/".$file_image))
    {
       sleep(3);//retrasamos la petición 3 segundos
       echo $file_image;//devolvemos el nombre del archivo para pintar la imagen
    }

    //echo "string";
}else{
    throw new Exception("Error Processing Request", 1);   
}
?>