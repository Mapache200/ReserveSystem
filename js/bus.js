var tbl_bus;

function listar_buses(){
    tbl_bus = $("#tabla_bus").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/bus/controlador_listar_bus.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_bus"},
            {"data":"bus_placa"},
            {"data":"bus_modelo"},
            {"data":"bus_capacidad"},
            {"data":"bus_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"bus_estado",
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
    tbl_bus.on('draw.td',function(){
      var PageInfo = $("#tabla_bus").DataTable().page.info();
      tbl_bus.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};

$('#tabla_bus').on('click','.editar',function(){
	var data = tbl_bus.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_bus.row(this).child.isShown()){
		var data = tbl_bus.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('bus_ed').value=data.id_bus;
    document.getElementById('placa_ed').value=data.bus_placa;
    document.getElementById('modelo_ed').value=data.bus_modelo;
    document.getElementById('capacidad_ed').value=data.bus_capacidad;
})

$('#tabla_bus').on('click', '.desactivar', function () {
    var data = tbl_bus.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_bus.row(this).child.isShown()) {
        var data = tbl_bus.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Inhabilitar al Bus con placa ' + data.bus_placa + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Bus(parseInt(data.id_bus), 'INACTIVO', data.bus_placa);
        }
    })
})

$('#tabla_bus').on('click', '.activar', function () {
    var data = tbl_bus.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_bus.row(this).child.isShown()) {
        var data = tbl_bus.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar al Bus con placa ' + data.bus_placa + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Bus(parseInt(data.id_bus), 'ACTIVO', data.bus_placa);
        }
    })

})

function Registrar_Bus() {
    let pla = document.getElementById('placa').value;
    let mod = document.getElementById('modelo').value;
    let cap = document.getElementById('capacidad').value;

    //verificar datos
    if (pla.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Placa no puede estar vacio!", "warning");
    }
    if (mod.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Modelo no puede estar vacio!", "warning");
    }
    if (cap.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Capacidad Paterno no puede estar vacio!", "warning");
    }

    $.ajax({
        "url": "controlador/bus/controlador_registro_bus.php",
        type: 'POST',
        data: {
            pla: pla,
            mod: mod,
            cap: cap
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nuevo Bus Registrado!", "success").then((value) => {
                    document.getElementById('placa').value = "";
                    document.getElementById('modelo').value = "";
                    document.getElementById('capacidad').value = "";
                    tbl_bus.ajax.reload();
                    $("#modal_registro").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La Placa ingresada ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Bus() {
    let pla = document.getElementById('placa_ed').value;
    let mod = document.getElementById('modelo_ed').value;
    let cap = document.getElementById('capacidad_ed').value;
    let id = document.getElementById('bus_ed').value;

    //verificar datos
    if (pla.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Placa no puede estar vacio!", "warning");
    }
    if (mod.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Modelo no puede estar vacio!", "warning");
    }
    if (cap.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Capacidad Paterno no puede estar vacio!", "warning");
    }

    $.ajax({
        "url": "controlador/bus/controlador_modificar_bus.php",
        type: 'POST',
        data: {
            pla: pla,
            mod: mod,
            cap: cap,
            id:id
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Bus Modificado con Exito!", "success").then((value) => {
                    document.getElementById('placa_ed').value = "";
                    document.getElementById('modelo_ed').value = "";
                    document.getElementById('capacidad_ed').value = "";
                    tbl_bus.ajax.reload();
                    $("#modal_editar").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La Placa ingresada le pertenece a otro bus!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Estado_Bus(id, estado, user) {
    let estatus = 0;
    if (estado == 'INACTIVO') {
        estatus = 0;
        estado = "desactivó";
    } else {
        estatus = 1;
        estado = "activó";
    }
    $.ajax({
        "url": "controlador/bus/controlador_modificar_bus_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito al Bus con placa " + user + "!", "success").then((value) => {
                tbl_bus.ajax.reload();
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })
}