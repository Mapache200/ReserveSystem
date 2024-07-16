<?php
   require '../../modelo/model_recorrido.php';
   $MU = new Modelo_Recorrido();//Instaciamos
   $rut = (htmlspecialchars($_POST['rut'],ENT_QUOTES,'UTF-8')); 
   $bus  = (htmlspecialchars($_POST['bus'],ENT_QUOTES,'UTF-8'));
   $con = (htmlspecialchars($_POST['con'],ENT_QUOTES,'UTF-8')); 
   $fec = (htmlspecialchars($_POST['fec'],ENT_QUOTES,'UTF-8')); 
   $hor = (htmlspecialchars($_POST['hor'],ENT_QUOTES,'UTF-8')); 
   $mon = (htmlspecialchars($_POST['mon'],ENT_QUOTES,'UTF-8')); 
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'));
    $consulta = $MU->Modificar_Recorrido($rut,$bus,$con,$fec,$hor,$mon,$id);
    echo $consulta;
?>