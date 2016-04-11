<?php 
session_start(); //session_start() crea una sesión para ser usada mediante una petición GET o POST, o pasado por una cookie 
include_once "conexion.php"; //es la sentencia q usaremos para incluir el archivo de conexión a la base de datos que creamos anteriormente.
/*Función verificar_login() --> Vamos a crear una función llamada verificar_login, esta se encargara de hacer una consulta a la base de datos para saber si el usuario ingresado es correcto o no.*/
$user= $_POST['user'];
$password= $_POST['password'];


function verificar_login($user,$password,&$result) 
    {   $conexion = connectDB();
        $user = "'".$user."'";
        $password = "'". $password."'";

        $sql = "SELECT * FROM usuarios WHERE usuario=$user and password=$password";
        $rec = mysqli_query($conexion, $sql); 
        $count = 0; 
        while($row = @mysqli_fetch_array($rec)) 
        { 
            $count++; 
            $result = $row; 
        } 
        if($count == 1) 
        { 
            $sql2  = "UPDATE usuarios SET state=1";
            $result2 = mysqli_query($conexion, $sql2);
            return 1; 
            
        } 
        else 
        { 
            return 0; 
        } 
    } 

/*Luego haremos una serie de condicionales que identificaran el momento en el boton de login es presionado y cuando este sea presionado llamaremos a la función verificar_login() pasandole los parámetros ingresados:*/

if(!isset($_SESSION['userid'])) //para saber si existe o no ya la variable de sesión que se va a crear cuando el usuario se logee
{ 
    if(verificar_login($user,$password,$result) == 1) //Si el boton fue presionado llamamos a la función verificar_login() dentro de otra condición preguntando si resulta verdadero y le pasamos los valores ingresados como parámetros.
    { 
        /*Si el login fue correcto, registramos la variable de sesión y al mismo tiempo refrescamos la pagina index.php.*/
        $_SESSION['valid'] = true;
        $_SESSION['timeout'] = time();
        $_SESSION['username'] = $user;
        echo '<div class="before">Su usuario ingreso correctamente.</div><input type="button" class="btn btn-primary ingreso_ok" value="Ok">';
        //header("location:index.php"); 
    } 
    else 
    { 
        echo "<div class='error'>Su usuario es incorrecto, intente nuevamente.</div><input type='button' class='btn btn-primary ingreso_not_ok' value='Volver'>";
    } 
} else { 
    // Si la variable de sesión ‘userid’ ya existe, que muestre el mensaje de saludo. 
    echo 'Su usuario ingreso correctamente.'; 
    echo '<a href="logout.php">Logout</a>'; 
} 

?> 