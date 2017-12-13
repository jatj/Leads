<?php
	require_once('DBQueries.php');
	$data = getAcciones();

	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>