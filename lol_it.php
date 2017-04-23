<?php
//UPDATING session data

require_once ("connect.php");
session_start();

function add_coordX($x)
{
	$_SESSION["x"][] = $x;
}
function add_coordY($y)
{
	$_SESSION["y"][] = $y;
}
$_SESSION["ctr"] = $_SESSION["ctr"]+1;
$qlol = $db->prepare("SELECT ncoordctr FROM counters");
$qlol->execute();
$kalkkuna;
if($qlol->rowCount() == 1){
	$kalkkuna = $qlol->fetch(PDO::FETCH_ASSOC);
}
foreach ($kalkkuna as $number) {
	echo "<br>Number: ".$number." LOL<br>";
	$_SESSION["newctr"] = $number;
}
$newCoordinate = 0;
$q = $db->prepare("SELECT * FROM newcoord WHERE id = :id");
$q->bindParam(":id",$id,PDO::PARAM_INT);
$id = $_SESSION["ctr"];//fixed id for testing purposes
$q->execute();
if($q->rowCount() == 1){
	$newCoordinate = $q->fetch(PDO::FETCH_ASSOC);
}
$x = 0;
$y = 0;
foreach ($newCoordinate as $item) {
	if($x==0)
	{
		$x = 1;
		add_coordX($item);
	}
	else if($y==0)
	{
		$y = 1;
		add_coordY($item);
	}
}
foreach ($_SESSION["x"] as $number) {
	echo "<br>CoordX: ".$number." <br>";
}

?>