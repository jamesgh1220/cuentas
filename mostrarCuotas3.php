<?php

    include_once 'db.php';

    $sql = "SELECT * FROM salud";
    $cuotas = mysqli_query($db, $sql);

    if ( !$cuotas ) {
        echo 'Query Failed !!'. mysqli_error($db);
    }

    $data = array();
    while ( $cuota = mysqli_fetch_array($cuotas) ) {
        $data[] = array(
            'cuotaId' => $cuota['id'],
            'fecha' => $cuota['fecha'],
            'descripcion' => $cuota['descripcion'],
            'valor' => $cuota['valor']
        );
    }
    $json = json_encode($data);
    echo $json;

?>