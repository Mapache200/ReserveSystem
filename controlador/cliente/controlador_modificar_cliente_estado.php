<?php
    require '../../modelo/model_cliente.php';
    $MU = new Modelo_Cliente();//Instaciamos
    $id = strtoupper(htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8')); 
    $estatus = strtoupper(htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Modificar_Cliente_Estado($id,$estatus);
    echo $consulta;

?>