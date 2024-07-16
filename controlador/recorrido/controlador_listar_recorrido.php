<?php
    require '../../modelo/model_recorrido.php';
    $MU = new Modelo_Recorrido();//Instaciamos
    $consulta = $MU->Listar_Recorrido();
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