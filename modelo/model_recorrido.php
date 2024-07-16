<?php
    require_once  'model_conexion.php';

    class Modelo_Recorrido extends conexionBD{
    
        public function Listar_Recorrido(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTA_RECORRIDO()";
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

        public function Registrar_Recorrido($rut,$bus,$con,$fec,$hor,$mon){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_RECORRIDO(?,?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$rut);
            $query -> bindParam(2,$bus);
            $query -> bindParam(3,$con);
            $query -> bindParam(4,$fec);
            $query -> bindParam(5,$hor);
            $query -> bindParam(6,$mon);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Recorrido($rut,$bus,$con,$fec,$hor,$mon,$id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_RECORRIDO(?,?,?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$rut);
            $query -> bindParam(3,$bus);
            $query -> bindParam(4,$con);
            $query -> bindParam(5,$fec);
            $query -> bindParam(6,$hor);
            $query -> bindParam(7,$mon);

            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Recorrido_Estado($id,$estado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_RECORRIDO_ESTADO(?,?)";
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