<?php
    require_once  'model_conexion.php';

    class Modelo_Bus extends conexionBD{

        public function Listar_Bus(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTA_BUSES()";
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

        public function Registrar_Bus($placa,$mod,$cap){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_BUS(?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$placa);
            $query -> bindParam(2,$mod);
            $query -> bindParam(3,$cap);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function MODIFICAR_Bus($placa,$mod,$cap,$id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_BUS(?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$placa);
            $query -> bindParam(3,$mod);
            $query -> bindParam(4,$cap);

            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Bus_Estado($id,$estado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_BUS_ESTADO(?,?)";
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