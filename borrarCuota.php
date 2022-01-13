<?php

    require_once 'db.php';

    if ( isset($_POST['cuotaId']) ) {
        $tipo = $_POST['tipoId'];
        $id = $_POST['cuotaId'];
        $tabla = '';

        if ( $tipo === 'cuotas') {
            $tabla = 'cuota';
        }elseif ($tipo === 'cuotas2') {
            $tabla = 'cuotaMama';
        }elseif ( $tipo === 'cuotas3') {
            $tabla = 'salud';
        }

        $sql = "DELETE FROM $tabla WHERE id = $id";
        $delete = mysqli_query($db, $sql);

        if ( !$delete ) {
            die('Query Failed');
        }

        echo 'Cuota eliminada';
    }

?>