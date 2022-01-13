<?php

    include_once 'db.php';

    $id = $_POST['cuotaId'];
    $fecha = $_POST['fecha'];
    $valor = $_POST['valor'];
    $descripcion = $_POST['descripcion'];
    $tipoPrestamo = $_POST['tipoPrestamo'];

    $sql = "UPDATE $tipoPrestamo SET fecha = '$fecha', descripcion = '$descripcion', valor = $valor WHERE id = $id";
    $edit = mysqli_query($db, $sql);

    if ( !$edit ) {
        die('Query failed');
    }

    echo 'Cuota editada';

?>