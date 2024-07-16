var  tbl_reservacion;

function listar_Reservaciones(){
    tbl_reservacion = $("#tabla_reservacion").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/reservacion/controlador_listar_reservacion.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_reservacion"},
            {"data":"rut_origen"},
            {"data":"rut_destino"},
            {"data":"cli_dni"},
            {"data":"persona"},
            {"data":"rec_horasalida"},
            {"data":"res_fecha"},          
            {"data":"res_observacion"},
            {"data":"res_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"res_estado",
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
    tbl_reservacion.on('draw.td',function(){
      var PageInfo = $("#tabla_reservacion").DataTable().page.info();
      tbl_reservacion.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};

function listar_Reservaciones_Dni(id){
    tbl_reservacion2 = $("#tabla_reservacion").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/reservacion/controlador_listar_reservacion_por_dni.php",
            type:'POST',
            data:{
                id:id
            }
        },
        "columns":[
            {"data":"id_reservacion"},
            {"data":"rut_origen"},
            {"data":"rut_destino"},
            {"data":"cli_dni"},
            {"data":"persona"},
            {"data":"rec_horasalida"},
            {"data":"res_fecha"},          
            {"data":"res_observacion"},
            {"data":"res_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"res_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return "<button class='editar btn bg-navy color-palette btn-sm' disabled><i class='fa fa-edit'></i></button>&nbsp;<button class='btn btn-success btn-sm' disabled><i class='fa fa-check-circle'></i></button>&nbsp;<button class='desactivar btn btn-danger btn-sm' disabled><i class='fa fa-times-circle'></i></button>";
                        }else{
                        return "<button class='editar btn bg-navy color-palette btn-sm' disabled><i class='fa fa-edit'></i></button>&nbsp;<button class='activar btn btn-success btn-sm' disabled><i class='fa fa-check-circle'></i></button>&nbsp;<button class=' btn btn-danger btn-sm' disabled><i class='fa fa-times-circle'></i></button>";
                        }
                }   
            }
        ],
        // "language":idioma_espanol,
        select: true
    });
    tbl_reservacion2.on('draw.td',function(){
      var PageInfo = $("#tabla_reservacion").DataTable().page.info();
      tbl_reservacion2.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};


$('#tabla_reservacion').on('click','.editar',function(){
	var data = tbl_reservacion.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_reservacion.row(this).child.isShown()){
		var data = tbl_reservacion.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('reservacion_ed').value=data.id_reservacion;
    document.getElementById('select_cliente_ed').value=data.res_cliente;
    document.getElementById('select_recorrido_ed').value=data.res_recorrido;
    document.getElementById('fecha_ed').value=data.res_fecha;
    document.getElementById('observacion_ed').value=data.res_observacion;

})

$('#tabla_reservacion').on('click', '.desactivar', function () {
    var data = tbl_reservacion.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_reservacion.row(this).child.isShown()) {
        var data = tbl_reservacion.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Inhabilitar la reservacion ' + data.rut_origen + ' a ' + data.rut_destino + ' con fecha ' + data.res_fecha + ' del cliente ' + data.persona+'?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Reservacion(parseInt(data.id_reservacion), 'INACTIVO', data.rut_origen + ' a ' + data.rut_destino + ' con fecha ' + data.res_fecha + ' del cliente ' + data.persona);
        }
    })
})

$('#tabla_reservacion').on('click', '.activar', function () {
    var data = tbl_reservacion.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_reservacion.row(this).child.isShown()) {
        var data = tbl_reservacion.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar la reservacion ' + data.rut_origen + ' a ' + data.rut_destino + ' con fecha ' + data.res_fecha + ' del cliente ' + data.persona + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Reservacion(parseInt(data.id_reservacion), 'ACTIVO', data.rut_origen + ' a ' + data.rut_destino + ' con fecha ' + data.res_fecha + ' del cliente ' + data.persona);
        }
    })

})
function Modificar_Estado_Reservacion(id, estado, user) {
    let estatus = 0;
    if (estado == 'INACTIVO') {
        estatus = 0;
        estado = "desactivó";
    } else {
        estatus = 1;
        estado = "activó";
    }
    $.ajax({
        "url": "controlador/reservacion/controlador_modificar_reservacion_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito la reservacion " + user + "!", "success").then((value) => {
                tbl_reservacion.ajax.reload();
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })
}



function Registrar_Reservacion() {
    let rec = document.getElementById('select_recorrido').value;
    let cli = document.getElementById('select_cliente').value;

    const fechaActual = new Date();

        // Formatear la fecha
        const year = fechaActual.getFullYear();
        const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaActual.getDate().toString().padStart(2, '0');

        const fechaFormateada = `${year}-${month}-${day}`;

    let fec = fechaFormateada;

    //verificar datos
    if (rec.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo recorrido no puede estar vacio!", "warning");
    }
    if (cli.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo cliente no puede estar vacio!", "warning");
    }
    console.log(rec);
    $.ajax({
        "url": "controlador/reservacion/controlador_registro_reservacion.php",
        type: 'POST',
        data: {
            rec: rec,
            cli: cli,
            fec: fec
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nueva reservacion Registrada!", "success").then((value) => {
                    document.getElementById('select_recorrido').value = "";
                    document.getElementById('select_cliente').value = "";
                    tbl_reservacion.ajax.reload();
                    $("#modal_registro").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La reservacion ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Reservacion() {
    let rec = document.getElementById('select_recorrido_ed').value;
    let cli = document.getElementById('select_cliente_ed').value;
    let fec = document.getElementById('fecha_ed').value;
    let obs = document.getElementById('observacion_ed').value;
    let id = document.getElementById('reservacion_ed').value;
    //verificar datos
    if (rec.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo recorrido no puede estar vacio!", "warning");
    }
    if (cli.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo cliente no puede estar vacio!", "warning");
    }
    if (fec.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Fecha no puede estar vacio!", "warning");
    }
    if (obs.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Observacion no puede estar vacio!", "warning");
    }

    $.ajax({
        "url": "controlador/reservacion/controlador_modificar_reservacion.php",
        type: 'POST',
        data: {
            rec: rec,
            cli: cli,
            obs: obs,
            fec: fec,
            id:id
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nueva reservacion Registrada!", "success").then((value) => {
                    document.getElementById('select_recorrido_ed').value = "";
                    document.getElementById('select_cliente_ed').value = "";
                    document.getElementById('fecha_ed').value = "";
                    document.getElementById('observacion_ed').value = "";
                    tbl_reservacion.ajax.reload();
                    $("#modal_editar").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La reservacion ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}





function Cargar_Select_Recorridos() {
    $.ajax({
        "url": "controlador/recorrido/controlador_listar_recorrido.php",
        type: 'POST'
    }).done(function (resp) {
        let data = JSON.parse(resp).data;
            if (data.length > 0){
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_recorrido"] + "'>" + data[i]["rut_origen"] + " a " + data[i]["rut_destino"] + " con fecha " + data[i]["rec_horasalida"] + "</option>";
                }
                document.getElementById('select_recorrido').innerHTML = cadena;
                document.getElementById('select_recorrido_ed').innerHTML = cadena;
            }else {
                let cadena = "";
                cadena += "<option value=''>No hay rutas disponibles</option>";
                document.getElementById('select_recorrido').innerHTML = cadena;
                document.getElementById('select_recorrido_ed').innerHTML = cadena;
            }
    });
}

function Cargar_Select_Clientes() {
    $.ajax({
        "url": "controlador/cliente/controlador_listar_cliente.php",
        type: 'POST'
    }).done(function (resp) {
        let data = JSON.parse(resp).data;
            if (data.length > 0){
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_cliente"] + "'>" + data[i]["persona"] + "</option>";
                }
                document.getElementById('select_cliente').innerHTML = cadena;
                document.getElementById('select_cliente_ed').innerHTML = cadena;
            }else {
                let cadena = "";
                cadena += "<option value=''>No hay buses disponibles</option>";
                document.getElementById('select_cliente').innerHTML = cadena;
                document.getElementById('select_cliente_ed').innerHTML = cadena;
    
            }
    });
}

