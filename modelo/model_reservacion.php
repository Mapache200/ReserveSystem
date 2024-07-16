<?php
    require_once  'model_conexion.php';

    class Modelo_Reservacion extends conexionBD{

        public function Listar_Reservacion(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTA_RESERVACION()";
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

        public function Listar_Reservacion_dni($id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTA_RESERVACION_ID(?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query->execute();
            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]=$resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        
        public function Registrar_Reservacion($cli,$rec,$fec,$obs){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_RESERVACION(?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$rec);
            $query -> bindParam(2,$cli);
            $query -> bindParam(3,$fec);
            $query -> bindParam(4,$obs);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Reservacion($cli,$rec,$fec,$obs,$id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_RESERVACION(?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$rec);
            $query -> bindParam(3,$cli);
            $query -> bindParam(4,$fec);
            $query -> bindParam(5,$obs);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Reservacion_Estado($id,$estado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_RESERVACION_ESTADO(?,?)";
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