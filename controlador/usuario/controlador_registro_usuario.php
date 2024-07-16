<?php
    require '../../modelo/model_usuario.php';
    $MU = new Modelo_Usuario();//Instaciamos
    $dni = (htmlspecialchars($_POST['dni'],ENT_QUOTES,'UTF-8')); 
    $pass  = password_hash(htmlspecialchars($_POST['pass'],ENT_QUOTES,'UTF-8'),PASSWORD_DEFAULT,['cost'=>12]);
    $nom = strtoupper(htmlspecialchars($_POST['nom'],ENT_QUOTES,'UTF-8')); 
    $apa = strtoupper(htmlspecialchars($_POST['apa'],ENT_QUOTES,'UTF-8')); 
    $ama = strtoupper(htmlspecialchars($_POST['ama'],ENT_QUOTES,'UTF-8')); 
    $email = (htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8'));
    $tel = (htmlspecialchars($_POST['tel'],ENT_QUOTES,'UTF-8'));
    $consulta = $MU->Registrar_Usuario($dni,$nom,$apa,$ama,$email,$tel,$pass);
    echo $consulta;
?>