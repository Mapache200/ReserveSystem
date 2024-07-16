<?php
    require '../../modelo/model_conductor.php';
    $MU = new Modelo_Conductor();//Instaciamos
    $consulta = $MU->Listar_Conductor();
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