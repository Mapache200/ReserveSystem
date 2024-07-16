<?php
    require '../../modelo/model_ruta.php';
    $MU = new Modelo_Ruta();//Instaciamos
    $ori = (htmlspecialchars($_POST['ori'],ENT_QUOTES,'UTF-8')); 
    $des  = (htmlspecialchars($_POST['des'],ENT_QUOTES,'UTF-8'));
    $dis = (htmlspecialchars($_POST['dis'],ENT_QUOTES,'UTF-8')); 
    $obs = strtoupper(htmlspecialchars($_POST['obs'],ENT_QUOTES,'UTF-8')); 
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'));
    $consulta = $MU->Modificar_Ruta($ori,$des,$dis,$obs,$id);
    echo $consulta;
?>