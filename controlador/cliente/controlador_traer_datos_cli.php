<?php
    require '../../modelo/model_cliente.php';
    $MU = new Modelo_Cliente();//Instaciamos
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');   
    $consulta = $MU->Traer_Cliente($id);
    if(count($consulta)>0){
        echo json_encode($consulta);
    }else{
        echo 0;
    }

?>