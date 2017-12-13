<?php
require_once('DBConnection.php');
// ######################################################## ADMINISTRADORES ########################################################
// Hace login y regresa usuario y cuenta
// Login.php
function login($usr, $password){
	
}
// ######################################################## OBTENCIÓN DE DATOS ########################################################
// Obtiene los sectores
// getSectores.php
function getSectores(){
	global $db;
	$res = $db->prepare("SELECT * FROM sectores;");
	$data = array();
	if(!$res->execute()){
		$data = $res->errorInfo();
	}else{
		while($row = $res->fetch(PDO::FETCH_ASSOC)) {
			$data[] = $row;
		}
	}
	return $data;
}
// Obtiene las acciones
// getAcciones.php
function getAcciones(){
	global $db;
	$res = $db->prepare("SELECT acciones.*, sectores.nombre nombreSector, sectores.imagen imagenSector, sectores.logo logoSector FROM acciones JOIN sectores ON sectores.idSectores = acciones.fkSectores;");
	$data = array();
	if(!$res->execute()){
		$data = $res->errorInfo();
	}else{
		while($row = $res->fetch(PDO::FETCH_ASSOC)) {
			$data[] = $row;
		}
	}
	return $data;
}
?>