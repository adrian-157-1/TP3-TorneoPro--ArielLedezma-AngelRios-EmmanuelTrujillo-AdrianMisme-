<?php

require_once "../includes/config.php";

if (isset($_POST["registrar"])) {

    $nombre = trim($_POST["nombre"]);
    $email = trim($_POST["email"]);
    $contraseña = $_POST["contraseña"];

    $tipo_usuario = "usuario";

    // Comprobar que los campos estén completos
    if ($nombre == "" || $email == "" || $contraseña == "") {
        die("Todos los campos son obligatorios.");
    }

    // Comprobar si el email ya existe
    $sql = "SELECT id_usuario FROM usuario WHERE email = ?";

    $stmt = mysqli_prepare($conexion, $sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);

    $resultado = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($resultado) > 0) {
        die("Ese email ya está registrado.");
    }

    // Encriptar/hashear la contraseña
    $contraseñaHash = password_hash(
        $contraseña,
        PASSWORD_DEFAULT
    );

    // Insertar el usuario
    $sql = "INSERT INTO usuario
            (nombre, email, contraseña, tipo_usuario)
            VALUES (?, ?, ?, ?)";

    $stmt = mysqli_prepare($conexion, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "ssss",
        $nombre,
        $email,
        $contraseñaHash,
        $tipo_usuario
    );

    if (mysqli_stmt_execute($stmt)) {
        echo "Usuario registrado correctamente.";
    } else {
        echo "Error al registrar el usuario.";
    }

    mysqli_stmt_close($stmt);
}

?>