<?php
    require '../../modelo/model_bus.php';
    $MU = new Modelo_Bus();//Instaciamos
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $estatus = strtoupper(htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Modificar_Bus_Estado($id,$estatus);
    echo $consulta;

?>