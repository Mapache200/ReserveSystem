var  tbl_administrador;

function listar_administrativo(){
    tbl_administrador = $("#tabla_administrador").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/administrativo/controlador_listar_administrativo.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_administrador"},
            {"data":"adm_nombre"},
            {"data":"adm_ap"},
            {"data":"adm_am"},
            {"data":"adm_dni"},
            {"data":"usu_email"},
            {"data":"usu_telefono"},
            {"data":"adm_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"adm_estado",
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
    tbl_administrador.on('draw.td',function(){
      var PageInfo = $("#tabla_administrador").DataTable().page.info();
      tbl_administrador.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};

$('#tabla_administrador').on('click','.editar',function(){
	var data = tbl_administrador.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_administrador.row(this).child.isShown()){
		var data = tbl_administrador.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('txt_id_ed').value=data.id_administrador;
    document.getElementById('nombre_ed').value=data.adm_nombre;
    document.getElementById('ApellidoPat_ed').value=data.adm_ap;
    document.getElementById('ApellidoMat_ed').value=data.adm_am;
    document.getElementById('dni_ed').value=data.adm_dni;
    document.getElementById('contacto_ed').value=data.usu_telefono;
    document.getElementById('email_ed').value=data.usu_email;
})

$('#tabla_administrador').on('click', '.desactivar', function () {
    var data = tbl_administrador.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_administrador.row(this).child.isShown()) {
        var data = tbl_administrador.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Inhabilitar al Administrador ' + data.persona + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Administrador(parseInt(data.id_administrador), 'INACTIVO', data.persona);
        }
    })
})

$('#tabla_administrador').on('click', '.activar', function () {
    var data = tbl_administrador.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_administrador.row(this).child.isShown()) {
        var data = tbl_administrador.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar el Administrador ' + data.persona + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Administrador(parseInt(data.id_administrador), 'ACTIVO', data.persona);
        }
    })

})

function Modificar_Administrador() {
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
        "url": "controlador/administrativo/controlador_modificar_administrativo.php",
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
                Swal.fire("Mensaje de Confirmación", "¡El Administrador se modifico Correctamente!", "success").then((value) => {
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

function Modificar_Estado_Administrador(id, estado, user) {
    let estatus = 0;
    if (estado == 'INACTIVO') {
        estatus = 0;
        estado = "desactivó";
    } else {
        estatus = 1;
        estado = "activó";
    }
    $.ajax({
        "url": "controlador/administrativo/controlador_modificar_administrativo_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito al administrador " + user + "!", "success").then((value) => {
                tbl_administrador.ajax.reload();
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })
}

