<?php

function registrarUsuario($conexion, $nombre, $email, $contraseña, $tipo_usuario)
{
    $sql = "INSERT INTO usuario
            (nombre, email, contraseña, tipo_usuario)
            VALUES (?, ?, ?, ?)";

    $stmt = mysqli_prepare($conexion, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "ssss",
        $nombre,
        $email,
        $contraseña,
        $tipo_usuario
    );

    return mysqli_stmt_execute($stmt);
}

?>