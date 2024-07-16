<?php
    require '../../modelo/model_reservacion.php';
    $MU = new Modelo_Reservacion();//Instaciamos
    $cli = (htmlspecialchars($_POST['cli'],ENT_QUOTES,'UTF-8')); 
    $rec  = (htmlspecialchars($_POST['rec'],ENT_QUOTES,'UTF-8'));
    $fec = (htmlspecialchars($_POST['fec'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Registrar_Reservacion($cli,$rec,$fec,"");
    echo $consulta;
?>