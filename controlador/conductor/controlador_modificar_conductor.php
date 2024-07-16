<?php
    require '../../modelo/model_conductor.php';
    $MU = new Modelo_Conductor();//Instaciamos
    $dni = (htmlspecialchars($_POST['dni'],ENT_QUOTES,'UTF-8')); 
    $nom  = (htmlspecialchars($_POST['nom'],ENT_QUOTES,'UTF-8'));
    $apa = (htmlspecialchars($_POST['apa'],ENT_QUOTES,'UTF-8')); 
    $ama = strtoupper(htmlspecialchars($_POST['ama'],ENT_QUOTES,'UTF-8')); 
    $lic = strtoupper(htmlspecialchars($_POST['lic'],ENT_QUOTES,'UTF-8'));
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'));
    $consulta = $MU->MODIFICAR_Conductor($nom,$apa,$ama,$dni,$lic,$id);
    echo $consulta;
?>