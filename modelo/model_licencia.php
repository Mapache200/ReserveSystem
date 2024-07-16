<?php
    require_once  'model_conexion.php';

    class Modelo_Licencia extends conexionBD{
    

        public function Listar_Licencia_por_Dni($id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_LICENCIAS_POR_DNI(?)";
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

        public function Registrar_Licencia($num,$emi,$vec,$cla,$cat,$res){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_LICENCIA(?,?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$num);
            $query -> bindParam(2,$emi);
            $query -> bindParam(3,$vec);
            $query -> bindParam(4,$cla);
            $query -> bindParam(5,$cat);
            $query -> bindParam(6,$res);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function MODIFICAR_Licencia($num,$emi,$vec,$cla,$cat,$res,$id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_LICENCIA(?,?,?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$num);
            $query -> bindParam(3,$emi);
            $query -> bindParam(4,$vec);
            $query -> bindParam(5,$cla);
            $query -> bindParam(6,$cat);
            $query -> bindParam(7,$res);

            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Licencia_Estado($id,$estado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_LICENCIA_ESTADO(?,?)";
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

    ?>  