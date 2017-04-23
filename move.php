<?php
$direction = $_POST["direction"];

//echo "python gpio_control.py ";
//echo $direction;
$execution_line = "sudo python gpio_ctrl.py ".$direction;
//echo "kala";

shell_exec($execution_line);

?>