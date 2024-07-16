<?php
    require '../../modelo/model_ruta.php';
    $MU = new Modelo_Ruta();//Instaciamos
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $estatus = strtoupper(htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Modificar_Ruta_Estado($id,$estatus);
    echo $consulta;

?>