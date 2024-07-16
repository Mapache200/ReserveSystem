<?php
    require_once  'model_conexion.php';

    class Modelo_Conductor extends conexionBD{
    

        public function Listar_Conductor(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTA_CONDUCTOR()";
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

        public function Registrar_Conductor($nom,$apa,$ama,$dni,$lic){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_CONDUCTOR(?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$nom);
            $query -> bindParam(2,$apa);
            $query -> bindParam(3,$ama);
            $query -> bindParam(4,$dni);
            $query -> bindParam(5,$lic);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function MODIFICAR_Conductor($nom,$apa,$ama,$dni,$lic,$id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_CONDUCTOR(?,?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$nom);
            $query -> bindParam(3,$apa);
            $query -> bindParam(4,$ama);
            $query -> bindParam(5,$dni);
            $query -> bindParam(6,$lic);

            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Conductor_Estado($id,$estado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_CONDUCTOR_ESTADO(?,?)";
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