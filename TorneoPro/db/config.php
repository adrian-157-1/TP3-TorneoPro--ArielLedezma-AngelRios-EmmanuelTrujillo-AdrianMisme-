<?php
// Conexión a la base de datos (valores por defecto de XAMPP)
$host = 'localhost';
$base = 'torneopro';
$user = 'root';
$pass = '';
 
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$base;charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    exit('No se pudo conectar a la base de datos.');
}
 