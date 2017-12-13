<?php
	//Conexion
	global $db;
	try{
		$db = new PDO("mysql:host=localhost;dbname=lids", "root", "");
	}
	catch(PDOException $e){
		echo $e->getMessage();
		exit(-1);
	}
?>