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
/*$ruta = './Files/'; //Decalaramos una variable con la ruta en donde almacenaremos los archivos
$mensage = '';//Declaramos una variable mensaje quue almacenara el resultado de las operaciones.
foreach ($_FILES as $key) //Iteramos el arreglo de archivos
{
    if($key['error'] == UPLOAD_ERR_OK )//Si el archivo se paso correctamente Ccontinuamos 
        {
            $NombreOriginal = $key['name'];//Obtenemos el nombre original del archivo
            $temporal = $key['tmp_name']; //Obtenemos la ruta Original del archivo
            $Destino = $ruta.$NombreOriginal;   //Creamos una ruta de destino con la variable ruta y el nombre original del archivo 
            
            move_uploaded_file($temporal, $Destino); //Movemos el archivo temporal a la ruta especificada       
        }

    if ($key['error']=='') //Si no existio ningun error, retornamos un mensaje por cada archivo subido
        {
            $mensage .= '-> Archivo <b>'.$NombreOriginal.'</b> Subido correctamente. <br>';
        }
    if ($key['error']!='')//Si existio algún error retornamos un el error por cada archivo.
        {
            $mensage .= '-> No se pudo subir el archivo <b>'.$NombreOriginal.'</b> debido al siguiente Error: \n'.$key['error']; 
        }
    
}
echo $mensage;// Regresamos los mensajes generados al cliente
*/?>