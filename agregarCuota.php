<?php

    include_once 'db.php';

    if ( isset($_POST['fecha'])  ) {
        $fecha = $_POST['fecha'];
        $descripcion = $_POST['descripcion'];
        $valor = $_POST['valor'];
        $tipoPrestamo = $_POST['tipoPrestamo'];
        $sql = "INSERT INTO $tipoPrestamo VALUES(null, '$fecha', '$descripcion', $valor)";
        $guardar = mysqli_query($db, $sql);
        if ( !$guardar ) {
            die('Query Failed');
        }
        echo $tipoPrestamo;
    }

?>