<?php
    require '../../modelo/model_reservacion.php';
    $MU = new Modelo_Reservacion();//Instaciamos
    $dni = (htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Listar_Reservacion_dni($dni);
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