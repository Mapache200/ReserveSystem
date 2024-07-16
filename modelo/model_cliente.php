<?php
    require_once  'model_conexion.php';

    class Modelo_Cliente extends conexionBD{
    

        public function Listar_Cliente(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTA_CLIENTES()";
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

        public function Registrar_Cliente($dni,$nom,$apa,$ama,$correo,$tel,$pass){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_CLIENTE(?,?,?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$nom);
            $query -> bindParam(2,$apa);
            $query -> bindParam(3,$ama);
            $query -> bindParam(4,$dni);
            $query -> bindParam(5,$correo);
            $query -> bindParam(6,$tel);
            $query -> bindParam(7,$pass);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Cliente($dni,$nom,$apa,$ama,$correo,$tel,$ID){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_CLIENTE(?,?,?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$nom);
            $query -> bindParam(2,$apa);
            $query -> bindParam(3,$ama);
            $query -> bindParam(4,$dni);
            $query -> bindParam(5,$correo);
            $query -> bindParam(6,$tel);
            $query -> bindParam(7,$ID);
            $query->execute();
            if($row = $query->fetchColumn()){
                    return $row;
            }
            conexionBD::cerrar_conexion();
        }
        
        public function Modificar_Cliente_Estado($id,$estado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_CLIENTE_ESTADO(?,?)";
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

        public function Traer_Cliente($id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_TRAER_CLIENTE(?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query->bindParam(1,$id);
            $query->execute();
            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                $arreglo[]=$resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        // public function ObtenerTipoDocumento(){
        //     $c = conexionBD::conexionPDO();
        //     $sql = "SELECT tdi_id,tdi_descripcion FROM `tbl_tipodocumentoidentidad` WHERE tdi_estado='ACTIVO'";
        //     $arreglo = array();
        //     $query  = $c->prepare($sql);
        //     $query->execute();
        //     $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        //     foreach($resultado as $resp){
        //         $arreglo["data"][]=$resp;
        //     }
        //     return $arreglo;
        //     conexionBD::cerrar_conexion();
        // }  


    }

?>  