<?php
    require '../../modelo/model_bus.php';
    $MU = new Modelo_Bus();//Instaciamos
    $consulta = $MU->Listar_Bus();
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