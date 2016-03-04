<?php


$name = $_POST['name'];
$from = $_POST['email'];
$content = $_POST['coment'];

function Enviar_mail($name, $from, $content) {

	$para = "ingeosur@ingeosur-conicet.gob.ar";
	$de = "Consulta desde Web!";

	$headers = 'From: '. $from ."\r\n" .
		"Content-type: text/plain; charset=utf-8\r\n".
		'Reply-To: ' . $from . "\r\n" .
		'X-Mailer: PHP/' . phpversion();

	$cuerpo = "De: ".$name ." ";

	$cuerpo = $cuerpo."\nE-Mail: ".$from;
	$cuerpo = $cuerpo."\nMensaje: ".$content;

	//envio el mail
	/*if (mail($para,$de,$cuerpo, $headers)){
		return 1;
	}
	else{
		return 0;
	}*/

	return 1;
}

$rta = Enviar_mail($name,$from,$content);

echo $rta;	
?>