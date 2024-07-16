<?php
    require '../../modelo/model_recorrido.php';
    $MU = new Modelo_Recorrido();//Instaciamos
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $estatus = strtoupper(htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Modificar_Recorrido_Estado($id,$estatus);
    echo $consulta;

?>