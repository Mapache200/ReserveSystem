<?php
    require_once  'model_conexion.php';

    class Modelo_Ruta extends conexionBD{
    
        public function Listar_Ruta(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTA_RUTAS()";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query->execute();
            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]=$resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Registrar_Ruta($ori,$des,$dis){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_RUTA(?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$ori);
            $query -> bindParam(2,$des);
            $query -> bindParam(3,$dis);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Ruta($ori,$des,$dis,$obs,$id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_RUTA(?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$ori);
            $query -> bindParam(3,$des);
            $query -> bindParam(4,$dis);
            $query -> bindParam(5,$obs);

            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Ruta_Estado($id,$estado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_RUTA_ESTADO(?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$estado);
            $resul = $query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();
        }

    }