<?php
    require '../../modelo/model_bus.php';
    $MU = new Modelo_Bus();//Instaciamos
    $pla = (htmlspecialchars($_POST['pla'],ENT_QUOTES,'UTF-8')); 
    $mod  = (htmlspecialchars($_POST['mod'],ENT_QUOTES,'UTF-8'));
    $cap = (htmlspecialchars($_POST['cap'],ENT_QUOTES,'UTF-8')); 

    $consulta = $MU->Registrar_Bus($pla,$mod,$cap);
    echo $consulta;
?>