<?php
    require '../../modelo/model_administrativo.php';
    $MU = new Modelo_Administrativo();//Instaciamos
    $consulta = $MU->Listar_Administrativo();
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