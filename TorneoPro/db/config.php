<?php

$conexion = mysqli_connect(
    "localhost",
    "root",
    "",
    "torneoPro"
);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

?>