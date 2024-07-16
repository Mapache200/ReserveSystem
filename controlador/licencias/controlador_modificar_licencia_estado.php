<?php
    require '../../modelo/model_licencia.php';
    $MU = new Modelo_Licencia();//Instaciamos
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $estatus = strtoupper(htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Modificar_Licencia_Estado($id,$estatus);
    echo $consulta;

?>