<?php
    require '../../modelo/model_ruta.php';
    $MU = new Modelo_Ruta();//Instaciamos
    $consulta = $MU->Listar_Ruta();
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