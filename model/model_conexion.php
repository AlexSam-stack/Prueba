<?php
/* Conectar a una base de datos de MySQL invocando al controlador */
$dsn = 'mysql:dbname=sistema_tramite;host=localhost';
$usuario = 'root';
$contraseña = '';

try {
    $gbd = new PDO($dsn, $usuario, $contraseña);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}

class conexionBD
{
    private $pdo;

    public function conexionPDO(){
        $host       = "localhost";
        $usuario    = "root";
        $contrasena = "";
        $bdName     = "sistema_tramite";

        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$bdName", $usuario, $contrasena);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->exec("set names utf8");
            return $this->pdo;
        } catch (PDOException $e) {
            echo 'Falló la conexión: ' . $e->getMessage();
        }
    }

    public function cerrar_conexion() {
        $this->pdo = null;
    }
}
?>