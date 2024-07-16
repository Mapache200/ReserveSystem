<?php
    require '../../modelo/model_licencia.php';
    $MU = new Modelo_Licencia();//Instaciamos
    $num = (htmlspecialchars($_POST['num'],ENT_QUOTES,'UTF-8')); 
    $emi  = (htmlspecialchars($_POST['emi'],ENT_QUOTES,'UTF-8'));
    $vec = (htmlspecialchars($_POST['vec'],ENT_QUOTES,'UTF-8')); 
    $cla = strtoupper(htmlspecialchars($_POST['cla'],ENT_QUOTES,'UTF-8')); 
    $cat = strtoupper(htmlspecialchars($_POST['cat'],ENT_QUOTES,'UTF-8')); 
    $res = strtoupper(htmlspecialchars($_POST['res'],ENT_QUOTES,'UTF-8'));
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'));
    $consulta = $MU->MODIFICAR_Licencia($num,$emi,$vec,$cla,$cat,$res,$id);
    echo $consulta;
?>