<?php
    require '../../modelo/model_licencia.php';
    $MU = new Modelo_Licencia();//Instaciamos
    $consulta = $MU->Listar_Licencia_por_Dni("");
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