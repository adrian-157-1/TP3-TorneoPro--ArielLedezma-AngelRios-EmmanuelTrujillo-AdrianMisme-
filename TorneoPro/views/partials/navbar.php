<?php
if (session_status() === PHP_SESSION_NONE) session_start();
 
$logueado = isset($_SESSION['usuario_id']);
$nombre   = $logueado ? htmlspecialchars($_SESSION['usuario_nombre']) : '';
?>
<header class="encabezado">
 
    <a href="../home.html" class="logo">
        <!-- LOGO: poné el enlace de tu imagen en src -->
        <img src="" alt="Logo de Torneo Pro">
        <span>Torneo Pro</span>
    </a>
 
    <nav class="menu">
        <a href="../home.html">Home</a>
        <a href="tienda.php">Tienda</a>
        <a href="torneos.php">Torneos</a>
 
        <?php if ($logueado): ?>
            <span>Hola, <?= $nombre ?></span>
            <a href="../controllers/authController.php?accion=logout">Salir</a>
            <a href="perfil.php" class="avatar">
                <img src="../img/iconos/avatar.jpg" alt="Mi perfil">
            </a>
        <?php else: ?>
            <a href="login.php">Iniciar sesión</a>
            <a href="registro.php">Registrarse</a>
            <a href="login.php" class="avatar">
                <img src="../img/iconos/avatar.jpg" alt="Iniciar sesión">
            </a>
        <?php endif; ?>
    </nav>
 
</header>