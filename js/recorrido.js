var  tbl_recorrido;

function listar_recorridos(){
    tbl_recorrido = $("#tabla_recorrido").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/recorrido/controlador_listar_recorrido.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_recorrido"},
            {"data":"rut_origen"},
            {"data":"rut_destino"},
            {"data":"bus_placa"},
            {"data":"con_nombre"},
            {"data":"rec_fecha"},
            {"data":"rec_horasalida"},
            {"data":"rec_monto"},
            {"data":"rec_disponibilidad"},
            {"data":"rec_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"rec_estado",
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
    tbl_recorrido.on('draw.td',function(){
      var PageInfo = $("#tabla_recorrido").DataTable().page.info();
      tbl_recorrido.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};


$('#tabla_recorrido').on('click','.editar',function(){
	var data = tbl_recorrido.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_recorrido.row(this).child.isShown()){
		var data = tbl_recorrido.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('recorrido_ed').value=data.id_recorrido;
    document.getElementById('select_bus_ed').value=data.rec_bus;
    document.getElementById('select_ruta_ed').value=data.rec_ruta;
    document.getElementById('select_conductor_ed').value=data.rec_conductor;
    document.getElementById('fecha_ed').value=data.rec_fecha;
    const datetime = new Date(data.rec_horasalida);  
            // Extraer la parte de time (HH:MM)
            const hours = String(datetime.getHours()).padStart(2, '0');
            const minutes = String(datetime.getMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`;           
    document.getElementById('hora_ed').value = time;
    document.getElementById('monto_ed').value=data.rec_monto;

})

$('#tabla_recorrido').on('click', '.desactivar', function () {
    var data = tbl_recorrido.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_recorrido.row(this).child.isShown()) {
        var data = tbl_recorrido.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Inhabilitar el recorrido ' + data.rut_origen + ' a ' + data.rut_destino +'?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Ruta(parseInt(data.id_recorrido), 'INACTIVO', data.rut_origen + ' a ' + data.rut_destino);
        }
    })
})

$('#tabla_recorrido').on('click', '.activar', function () {
    var data = tbl_recorrido.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_recorrido.row(this).child.isShown()) {
        var data = tbl_recorrido.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar el recorrido ' + data.rut_origen + ' a ' + data.rut_destino + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Ruta(parseInt(data.id_recorrido), 'ACTIVO', data.rut_origen + ' a ' + data.rut_destino);
        }
    })

})
function Modificar_Estado_Ruta(id, estado, user) {
    let estatus = 0;
    if (estado == 'INACTIVO') {
        estatus = 0;
        estado = "desactivó";
    } else {
        estatus = 1;
        estado = "activó";
    }
    $.ajax({
        "url": "controlador/recorrido/controlador_modificar_recorrido_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito el recorrido " + user + "!", "success").then((value) => {
                tbl_recorrido.ajax.reload();
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })
}



function Registrar_Recorrido() {
    let rut = document.getElementById('select_ruta').value;
    let bus = document.getElementById('select_bus').value;
    let con = document.getElementById('select_conductor').value;
    let fec = document.getElementById('fecha').value;
    let hor = document.getElementById('hora').value;
    let mon = document.getElementById('monto').value;

    //verificar datos
    if (rut.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Ruta no puede estar vacio!", "warning");
    }
    if (bus.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Bus no puede estar vacio!", "warning");
    }
    if (con.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Conductor Paterno no puede estar vacio!", "warning");
    }
    if (fec.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Fecha no puede estar vacio!", "warning");
    }
    if (hor.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Hora no puede estar vacio!", "warning");
    }
    if (mon.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Monto Paterno no puede estar vacio!", "warning");
    }

    $.ajax({
        "url": "controlador/recorrido/controlador_registro_recorrido.php",
        type: 'POST',
        data: {
            rut: rut,
            bus: bus,
            con: con,
            fec: fec,
            hor: fec + " " + hor,
            mon: mon
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nuevo Recorrido Registrado!", "success").then((value) => {
                    document.getElementById('select_ruta').value = "";
                    document.getElementById('select_bus').value = "";
                    document.getElementById('select_conductor').value = "";
                    document.getElementById('fecha').value = "";
                    document.getElementById('hora').value = "";
                    document.getElementById('monto').value = "";
                    tbl_recorrido.ajax.reload();
                    $("#modal_registro").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡El Recorrido ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Recorrido() {
    let rut = document.getElementById('select_ruta_ed').value;
    let bus = document.getElementById('select_bus_ed').value;
    let con = document.getElementById('select_conductor_ed').value;
    let fec = document.getElementById('fecha_ed').value;
    let hor = document.getElementById('hora_ed').value;
    let mon = document.getElementById('monto_ed').value;
    let id = document.getElementById('recorrido_ed').value;
    //verificar datos
    if (rut.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Ruta no puede estar vacio!", "warning");
    }
    if (bus.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Bus no puede estar vacio!", "warning");
    }
    if (con.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Conductor Paterno no puede estar vacio!", "warning");
    }
    if (fec.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Fecha no puede estar vacio!", "warning");
    }
    if (hor.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Hora no puede estar vacio!", "warning");
    }
    if (mon.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Monto Paterno no puede estar vacio!", "warning");
    }

    $.ajax({
        "url": "controlador/recorrido/controlador_modificar_recorrido.php",
        type: 'POST',
        data: {
            rut: rut,
            bus: bus,
            con: con,
            fec: fec,
            hor: fec + " " + hor,
            mon: mon,
            id:id
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nuevo Recorrido Registrado!", "success").then((value) => {
                    document.getElementById('select_ruta_ed').value = "";
                    document.getElementById('select_bus_ed').value = "";
                    document.getElementById('select_conductor_ed').value = "";
                    document.getElementById('fecha_ed').value = "";
                    document.getElementById('hora_ed').value = "";
                    document.getElementById('monto_ed').value = "";
                    tbl_recorrido.ajax.reload();
                    $("#modal_editar").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡El Recorrido ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}





function Cargar_Select_Rutas() {
    $.ajax({
        "url": "controlador/ruta/controlador_listar_ruta.php",
        type: 'POST'
    }).done(function (resp) {
        let data = JSON.parse(resp).data;
            if (data.length > 0){
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_rutas"] + "'>" + data[i]["rut_origen"] + " - " + data[i]["rut_destino"] + "</option>";
                }
                document.getElementById('select_ruta').innerHTML = cadena;
                document.getElementById('select_ruta_ed').innerHTML = cadena;
            }else {
                let cadena = "";
                cadena += "<option value=''>No hay rutas disponibles</option>";
                document.getElementById('select_ruta').innerHTML = cadena;
                document.getElementById('select_ruta_ed').innerHTML = cadena;
    
            }
    });
}

function Cargar_Select_Buses() {
    $.ajax({
        "url": "controlador/bus/controlador_listar_bus.php",
        type: 'POST'
    }).done(function (resp) {
        let data = JSON.parse(resp).data;
            if (data.length > 0){
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_bus"] + "'>" + data[i]["bus_modelo"] + " - " + data[i]["bus_placa"] + "</option>";
                }
                document.getElementById('select_bus').innerHTML = cadena;
                document.getElementById('select_bus_ed').innerHTML = cadena;
            }else {
                let cadena = "";
                cadena += "<option value=''>No hay buses disponibles</option>";
                document.getElementById('select_bus').innerHTML = cadena;
                document.getElementById('select_bus_ed').innerHTML = cadena;
    
            }
    });
}

function Cargar_Select_Conductores() {
    $.ajax({
        "url": "controlador/conductor/controlador_listar_conductor.php",
        type: 'POST'
    }).done(function (resp) {
        let data = JSON.parse(resp).data;
            if (data.length > 0){
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_conductor"] + "'>" + data[i]["con_ap"] + " " + data[i]["con_am"] + " " + data[i]["con_nombre"] + "</option>";
                }
                document.getElementById('select_conductor').innerHTML = cadena;
                document.getElementById('select_conductor_ed').innerHTML = cadena;
            }else {
                let cadena = "";
                cadena += "<option value=''>No hay conductores disponibles</option>";
                document.getElementById('select_conductor').innerHTML = cadena;
                document.getElementById('select_conductor_ed').innerHTML = cadena;
    
            }
    });
}


