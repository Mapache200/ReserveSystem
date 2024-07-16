<?php
    require '../../modelo/model_administrativo.php';
    $MU = new Modelo_Administrativo();//Instaciamos
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');   
    $consulta = $MU->Traer_Administrativo($id);
    if(count($consulta)>0){
        echo json_encode($consulta);
    }else{
        echo 0;
    }

?>