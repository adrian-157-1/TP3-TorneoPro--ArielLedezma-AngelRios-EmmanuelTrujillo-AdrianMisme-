<?php
?>

<h2>Registro de usuario</h2>

<form action="torneoProController.php" method="POST">

    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required>

    <br><br>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <br><br>

    <label for="contraseña">Contraseña:</label>
    <input type="password" id="contraseña" name="contraseña" required>

    <br><br>

    <button type="submit" name="registrar">
        Registrarme
    </button>

</form>