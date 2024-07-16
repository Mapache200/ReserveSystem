<?php
    require '../../modelo/model_reservacion.php';
    $MU = new Modelo_Reservacion();//Instaciamos
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $estatus = strtoupper(htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Modificar_Reservacion_Estado($id,$estatus);
    echo $consulta;

?>