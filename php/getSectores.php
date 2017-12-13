<?php
	require_once('DBQueries.php');
	$data = getSectores();

	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>