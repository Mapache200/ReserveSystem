<?php
    require '../../modelo/model_administrativo.php';
    $MU = new Modelo_Administrativo();//Instaciamos
    $dni = (htmlspecialchars($_POST['dni'],ENT_QUOTES,'UTF-8')); 
    $ID  = (htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'));
    $nom = strtoupper(htmlspecialchars($_POST['nom'],ENT_QUOTES,'UTF-8')); 
    $apa = strtoupper(htmlspecialchars($_POST['apa'],ENT_QUOTES,'UTF-8')); 
    $ama = strtoupper(htmlspecialchars($_POST['ama'],ENT_QUOTES,'UTF-8')); 
    $email = (htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8'));
    $tel = (htmlspecialchars($_POST['tel'],ENT_QUOTES,'UTF-8'));
    $consulta = $MU->Modificar_Administrativo($dni,$nom,$apa,$ama,$email,$tel,$ID);
    echo $consulta;
?>