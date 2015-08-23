<?php

//comprobamos que sea una petición ajax
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
{
//var_dump($_FILES);
    //obtenemos el archivo a subir
   $file_image = $_FILES['archivo_img']['name']; 
    $file_pdf = $_FILES['archivo_pdf']['name'];
 
    
    //comprobamos si existe un directorio para subir el archivo
    //si no es así, lo creamos
    if(!is_dir("../images/perfil/")) 
        mkdir("../images/perfil/", 0777);
    if(!is_dir("../pdf/")) 
        mkdir("../pdf/", 0777);
     
    //comprobamos si el archivo ha subido
    if ($file_image && move_uploaded_file($_FILES['archivo_img']['tmp_name'],"../images/perfil/".$file_image))
    {
       sleep(3);//retrasamos la petición 3 segundos
       echo $file_image;//devolvemos el nombre del archivo para pintar la imagen
    }

    if ($file_pdf && move_uploaded_file($_FILES['archivo_pdf']['tmp_name'],"../pdf/".$file_pdf))
    {
       sleep(3);//retrasamos la petición 3 segundos
       echo $file_pdf;//devolvemos el nombre del archivo para pintar la imagen
    }

    echo "string";
}else{
    throw new Exception("Error Processing Request", 1);   
}
?>