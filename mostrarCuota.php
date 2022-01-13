<?php

    include_once 'db.php';

    $id = $_POST['cuotaId'];
    $tipo = $_POST['tipoId'];
    $tabla = '';

        if ( $tipo === 'cuotas') {
            $tabla = 'cuota';
        }elseif ($tipo === 'cuotas2') {
            $tabla = 'cuotaMama';
        }elseif ( $tipo === 'cuotas3') {
            $tabla = 'salud';
        }
    $sql = "SELECT * FROM $tabla WHERE id = $id";
    $cuota = mysqli_query($db, $sql);

    if ( !$cuota ) {
        die('Query Failed');
    }

    $data = array();
    while ( $dato = mysqli_fetch_array($cuota) ) {
        $data[] = array(
            'cuotaId' => $dato['id'],
            'fecha' => $dato['fecha'],
            'descripcion' => $dato['descripcion'],
            'valor' => $dato['valor']
        );
    }
    $json = json_encode($data[0]); //Retorno la primer posicion no mas por ser un unico cuota
    echo $json;                     //y para no tener qeue hacer el foreach en el .js

?>