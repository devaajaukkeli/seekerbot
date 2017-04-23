<?php
//getting one coordinate from DB
//require_once ("connect.php");
session_start();

echo json_encode([$_SESSION["x"],$_SESSION["y"],$_SESSION["newctr"]]);

?>