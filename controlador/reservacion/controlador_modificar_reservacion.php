<?php
    require '../../modelo/model_reservacion.php';
    $MU = new Modelo_Reservacion();//Instaciamos
    $cli = (htmlspecialchars($_POST['cli'],ENT_QUOTES,'UTF-8')); 
    $rec  = (htmlspecialchars($_POST['rec'],ENT_QUOTES,'UTF-8'));
    $fec = (htmlspecialchars($_POST['fec'],ENT_QUOTES,'UTF-8')); 
    $obs = (htmlspecialchars($_POST['obs'],ENT_QUOTES,'UTF-8')); 
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'));
    $consulta = $MU->Modificar_Reservacion($cli,$rec,$fec,$obs,$id);
    echo $consulta;
?>