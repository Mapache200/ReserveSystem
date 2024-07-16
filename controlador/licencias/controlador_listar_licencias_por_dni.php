<?php
    require '../../modelo/model_licencia.php';
    $MU = new Modelo_Licencia();//Instaciamos
    $valor = htmlspecialchars($_POST['valor'],ENT_QUOTES,'UTF-8');
    $consulta = $MU->Listar_Licencia_por_Dni($valor);
    if($consulta){
        echo json_encode($consulta);
    }else{ 
        echo '{"data":[]}';
    }

?>