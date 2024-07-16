<?php
    require '../../modelo/model_reservacion.php';
    $MU = new Modelo_Reservacion();//Instaciamos
    $consulta = $MU->Listar_Reservacion();
    if($consulta){
        echo json_encode($consulta);
    }else{ 
        echo '{  
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }

?>