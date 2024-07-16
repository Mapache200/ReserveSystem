<?php
    require '../../modelo/model_conductor.php';
    $MU = new Modelo_Conductor();//Instaciamos
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $estatus = strtoupper(htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Modificar_Conductor_Estado($id,$estatus);
    echo $consulta;

?>