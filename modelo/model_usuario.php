<?php
    require_once  'model_conexion.php';

    class Modelo_Usuario extends conexionBD{
        
        /* public function Listar_Usuario(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_USUARIO()";
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
*/
        public function Registrar_Usuario($dni,$nom,$apa,$ama,$correo,$tel,$pass){
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
        /*
        public function Modificar_Usuario($id,$tdi,$di,$rol,$idempleado){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_USUARIO(?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$tdi);
            $query -> bindParam(3,$di);
            $query -> bindParam(4,$rol);
            $query -> bindParam(5,$idempleado);
            $resul = $query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();
        } 
*/
        public function Modificar_Usuario_Contra($id,$con){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_USUARIO_CONTRA(?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$con);
            $resul = $query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();
        }    
        /*
        public function Modificar_Usuario_Estado($id,$estatus){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_USUARIO_ESTADO(?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$estatus);
            $resul = $query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();
        } */
        
        public function Verificar_Usuario($usu,$con){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_VERIFICAR_USUARIO(?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query->bindParam(1,$usu);
            $query->execute();
            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                if(password_verify($con,$resp['usu_contra'])){
                    $arreglo[]=$resp;                 
                }
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Obtener_contrasena($usu){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_OBTENER_CONTRASENA(?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query->bindParam(1,$usu);
            $query->execute();
            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                    $arreglo[]=$resp;                         
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }


}
?>