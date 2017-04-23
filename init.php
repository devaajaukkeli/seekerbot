<?php
session_start();
function init_variables()
{
	$_SESSION["x"] = array();
	$_SESSION["y"] = array();
	$_SESSION["ctr"] = 0;
	$_SESSION["newctr"] = 0;
	$_SESSION["totalctr"] = 0;
	$_SESSION["idnro"] = 1;
	echo "kalkkuna";
}
init_variables();
?>