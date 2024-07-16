var  tbl_cliente;

function listar_cliente(){
    tbl_cliente = $("#tabla_cliente").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/cliente/controlador_listar_cliente.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_cliente"},
            {"data":"cli_nombre"},
            {"data":"cli_ap"},
            {"data":"cli_am"},
            {"data":"cli_dni"},
            {"data":"usu_email"},
            {"data":"usu_telefono"},
            {"data":"cli_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"cli_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return "<button class='editar btn bg-navy color-palette btn-sm'><i class='fa fa-edit'></i></button>&nbsp;<button class='btn btn-success btn-sm' disabled><i class='fa fa-check-circle'></i></button>&nbsp;<button class='desactivar btn btn-danger btn-sm'><i class='fa fa-times-circle'></i></button>";
                        }else{
                            return "<button class='editar btn bg-navy color-palette btn-sm'><i class='fa fa-edit'></i></button>&nbsp;<button class='activar btn btn-success btn-sm'><i class='fa fa-check-circle'></i></button>&nbsp;<button class=' btn btn-danger btn-sm' disabled><i class='fa fa-times-circle'></i></button>";
                        }
                }   
            }
        ],
        // "language":idioma_espanol,
        select: true
    });
    tbl_cliente.on('draw.td',function(){
      var PageInfo = $("#tabla_cliente").DataTable().page.info();
      tbl_cliente.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};

$('#tabla_cliente').on('click','.editar',function(){
	var data = tbl_cliente.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_cliente.row(this).child.isShown()){
		var data = tbl_cliente.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('txt_id_ed').value=data.id_cliente;
    document.getElementById('nombre_ed').value=data.cli_nombre;
    document.getElementById('ApellidoPat_ed').value=data.cli_ap;
    document.getElementById('ApellidoMat_ed').value=data.cli_am;
    document.getElementById('dni_ed').value=data.cli_dni;
    document.getElementById('contacto_ed').value=data.usu_telefono;
    document.getElementById('email_ed').value=data.usu_email;
})

$('#tabla_cliente').on('click', '.desactivar', function () {
    var data = tbl_cliente.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_cliente.row(this).child.isShown()) {
        var data = tbl_cliente.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Inhabilitar al Cliente ' + data.persona + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Cliente(parseInt(data.id_cliente), 'INACTIVO', data.persona);
        }
    })
})

$('#tabla_cliente').on('click', '.activar', function () {
    var data = tbl_cliente.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_cliente.row(this).child.isShown()) {
        var data = tbl_cliente.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar el Cliente ' + data.persona + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Cliente(parseInt(data.id_cliente), 'ACTIVO', data.persona);
        }
    })

})

function Modificar_Cliente() {
    let id = document.getElementById('txt_id_ed').value;
    let dni = document.getElementById('dni_ed').value;
    let nom = document.getElementById('nombre_ed').value;
    let apa = document.getElementById('ApellidoPat_ed').value;
    let ama = document.getElementById('ApellidoMat_ed').value;
    let email = document.getElementById('email_ed').value;
    let tel = document.getElementById('contacto_ed').value;

    //verificar datos
    if (dni.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo DNI no puede estar vacio!", "warning");
    }

    if (nom.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Nombres no puede estar vacio!", "warning");
    }
    if (apa.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Apellido Paterno no puede estar vacio!", "warning");
    }
    if (ama.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Apellido Materno no puede estar vacio!", "warning");
    }
    if (email.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Correo no puede estar vacio!", "warning");
    }
    if (tel.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Telefono no puede estar vacio!", "warning");
    }

    $.ajax({
        "url": "controlador/cliente/controlador_modificar_cliente.php",
        type: 'POST',
        data: {
            id:id,
            dni: dni,
            nom: nom,
            apa: apa,
            ama: ama,
            email: email,
            tel: tel
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡El Cliente se modifico Correctamente!", "success").then((value) => {
                    document.getElementById('nombre_ed').value = "";
                    document.getElementById('ApellidoPat_ed').value = "";
                    document.getElementById('ApellidoMat_ed').value = "";
                    document.getElementById('dni_ed').value = "";
                    document.getElementById('contacto_ed').value = "";
                    document.getElementById('email_ed').value = "";
                    tbl_cliente.ajax.reload();
                    $("#modal_editar").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡EL DNI SE ENCUENTRA REGISTRADO EN OTRO USUARIO!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Estado_Cliente(id, estado, user) {
    let estatus = 0;
    if (estado == 'INACTIVO') {
        estatus = 0;
        estado = "desactivó";
    } else {
        estatus = 1;
        estado = "activó";
    }
    $.ajax({
        "url": "controlador/cliente/controlador_modificar_cliente_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito al cliente " + user + "!", "success").then((value) => {
                tbl_cliente.ajax.reload();
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })
}


// function AbrirRegistro(){
//     $("#modal_registro").modal({backdrop:'static',keyboard:false})
//     $("#modal_registro").modal('show');
// }

// function Registrar_Empleado(){
//     let nombres = document.getElementById('txt_emp_nombres_registro').value;
//     let apellidos = document.getElementById('txt_emp_apellidos_registro').value;
//     let idtipodocumento = document.getElementById('select_tipodocumento_registro_empleado').value;
//     console.log(idtipodocumento);
//     let numerodocumento = document.getElementById('txt_emp_numdoc_registro').value;
//     let direccion = document.getElementById('txt_emp_direccion_registro').value;
//     let telefono = document.getElementById('txt_emp_telefono_registro').value;
//     if(nombres.length==0){
//         return Swal.fire("Mensaje de Advertencia","¡Ingrese Nombre!","warning");
//     }

//     if(apellidos.length==0){
//         return Swal.fire("Mensaje de Advertencia","¡Ingrese Apellidos!","warning");
//     }
//     if(idtipodocumento==0){
//         return Swal.fire("Mensaje de Advertencia","¡Seleccione Tipo de Documento de Identidad!","warning");
//     }
//     if(numerodocumento.length==0){
//         return Swal.fire("Mensaje de Advertencia","¡Ingrese Numero de documento !","warning");
//     }
//     if(direccion.length==0){
//         return Swal.fire("Mensaje de Advertencia","¡Ingrese Dirección!","warning");
//     }
//     if(telefono.length==0){
//         return Swal.fire("Mensaje de Advertencia","¡Ingrese Telefono!","warning");
//     }


//     $.ajax({
//         "url":"../../controlador/empleado/controlador_registro_empleado.php",
//         type:'POST',
//         data:{
//             onombres:nombres,
//             oapellidos:apellidos,
//             oidtipodocumento:idtipodocumento,
//             onumerodocumento:numerodocumento,
//             odireccion:direccion,
//             otelefono:telefono
//         }
//     }).done(function(resp){
//         console.log(resp);
//         if(resp>0){
//             if(resp==1){
//                 Swal.fire("Mensaje de Confirmación","¡Nuevo Trabajador Registrado!","success").then((value)=>{
//                     document.getElementById('txt_emp_nombres_registro').value="";
//                     document.getElementById('txt_emp_apellidos_registro').value="";
//                     document.getElementById('select_tipodocumento_registro_empleado').value;
//                     document.getElementById('txt_emp_numdoc_registro').value="";
//                     document.getElementById('txt_emp_direccion_registro').value="";
//                     document.getElementById('txt_emp_telefono_registro').value="";
//                     tbl_empleado.ajax.reload();
//                     $("#modal_registro").modal('hide');
//                 });
//             }else{
//                 Swal.fire("Mensaje de Advertencia","¡El Trabajador ingresado ya se encuentra en la base de datos!","warning");
//             }
//         }else{
//             return Swal.fire("Mensaje de Error","¡No se completo el registro!","error");            
//         }
//     })
// }

// function Modificar_empleado(){
//     let id   = document.getElementById('txt_emp_id_editar').value;
//     let nombres = document.getElementById('txt_emp_nombres_editar').value;
//     let apellidos = document.getElementById('txt_emp_apellidos_editar').value;
//     let id_tipodocumento = document.getElementById('select_tipodocumento_empleado').value;
//     let numerodocumento = document.getElementById('txt_emp_numdoc_editar').value;
//     let direccion = document.getElementById('txt_emp_direccion_editar').value;
//     let telefono = document.getElementById('txt_emp_telefono_editar').value;

//     if(id.length==0 || nombres.length==0 ||apellidos.length==0 || id_tipodocumento.length==0||numerodocumento.length==0  || direccion.length==0||telefono.length==0){
//         return Swal.fire("Mensaje de Advertencia id","¡Tiene campos vacíos!","warning");
//     }
   
//     $.ajax({
//         "url":"../../controlador/empleado/controlador_modificar_empleado.php",
//         type:'POST',
//         data:{
//             oid:id,
//             onombres:nombres,
//             oapellidos:apellidos,
//             oid_tipodocumento:id_tipodocumento,
//             onumerodocumento:numerodocumento,
//             odireccion:direccion,
//             otelefono:telefono
//         }
//     }).done(function(resp){
//         if(resp>0){
//             if(resp==1){
//                 Swal.fire("Mensaje de Confirmación","¡Datos Actualizados!","success").then((value)=>{
//                     tbl_empleado.ajax.reload();
//                     $("#modal_editar").modal('hide');
//                 });
//             }else{
//                 Swal.fire("Mensaje de Advertencia","¡El Empleado ingresado ya se encuentra en la base de datos!","warning");
//             }
//         }else{
//             return Swal.fire("Mensaje de Error","!No se completo la modificación!","error");            
//         }
//     })
// }





// $(document).ready(function() {

//     // Realiza una solicitud AJAX para obtener los datos desde el servidor
//     $.ajax({
//         url: '../../controlador/empleado/controlador_obtener_Tipodocumento.php', // Ruta al archivo PHP
//         method: 'GET', // Método de la solicitud (puede ser POST si lo prefieres)
//         dataType: 'json', // Tipo de datos esperados (JSON en este caso)
//         success: function(data) {
//             // Limpia las opciones actuales del select
//             //$("#select_tipodocumento_empleado").empty();

       
//             // Itera a través de los datos obtenidos y agrega las opciones al select
//             $.each(data.data, function(index, value) {
//                 $("#select_tipodocumento_registro_empleado").append($('<option>', {
//                     value: value.tdi_id,
//                     text: value.tdi_descripcion
//                 }));
//             });

//             $.each(data.data, function(index, value) {
//                 $("#select_tipodocumento_empleado").append($('<option>', {
//                     value: value.tdi_id,
//                     text: value.tdi_descripcion
//                 }));
//             });

    
//         },
//         error: function(xhr, status, error) {
//             console.log('Error en la solicitud AJAX: ' + status);
//         }
//     });
// });


// // function Cargar_Select_Tipo_Documento() {
// //     $.ajax({
// //         "url": "../../controlador/tipo_documento/controlador_listar_tipo.php",
// //         type: 'POST'
// //     }).done(function (resp) {
// //         let data = JSON.parse(resp).data;
// //         if (data.length > 0) {
// //             let cadena = "";
// //             cadena += "<option value=''>seleccionar</option>";
// //             for (let i = 0; i < data.length; i++) {
// //                 cadena += "<option value='" + data[i]["tdi_id"] + "'>" + data[i]["tdi_descripcion"] + "</option>";
// //             }
// //             document.getElementById('select_tipodocumento_empleado').innerHTML = cadena;

// //         } else {
// //             let cadena = "";
// //             cadena += "<option value=''>No hay tipos de documentos disponibles</option>";
// //             document.getElementById('select_tipodocumento_empleado').innerHTML = cadena;

// //         }
// //     })
// // }

