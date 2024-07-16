var  tbl_ruta;

function listar_rutas(){
    tbl_ruta = $("#tabla_ruta").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/ruta/controlador_listar_ruta.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_rutas"},
            {"data":"rut_origen"},
            {"data":"rut_destino"},
            {"data":"rut_distancia"},
            {"data":"rut_observacion",render: function(data,type,row){
                if(data=='' || data == null  || data=='NINGUNA' ){
                return "sin observaciones";
                }else{
                return '<span class="badge bg-danger">DATA</span>';
                }
        } },
            {"data":"rut_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"rut_estado",
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
    tbl_ruta.on('draw.td',function(){
      var PageInfo = $("#tabla_ruta").DataTable().page.info();
      tbl_ruta.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};

$('#tabla_ruta').on('click','.editar',function(){
	var data = tbl_ruta.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_ruta.row(this).child.isShown()){
		var data = tbl_ruta.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('ruta_ed').value=data.id_rutas;
    document.getElementById('origen_ed').value=data.rut_origen;
    document.getElementById('destino_ed').value=data.rut_destino;
    document.getElementById('distancia_ed').value=data.rut_distancia;
    document.getElementById('observacion_ed').value=data.rut_observacion;

})

$('#tabla_ruta').on('click', '.desactivar', function () {
    var data = tbl_ruta.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_ruta.row(this).child.isShown()) {
        var data = tbl_ruta.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Inhabilitar la Ruta ' + data.rut_origen + ' a ' + data.rut_destino +'?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Ruta(parseInt(data.id_rutas), 'INACTIVO', data.rut_origen + ' a ' + data.rut_destino);
        }
    })
})

$('#tabla_ruta').on('click', '.activar', function () {
    var data = tbl_ruta.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_ruta.row(this).child.isShown()) {
        var data = tbl_ruta.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar la Ruta ' + data.rut_origen + ' a ' + data.rut_destino + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Ruta(parseInt(data.id_rutas), 'ACTIVO', data.rut_origen + ' a ' + data.rut_destino);
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
        "url": "controlador/ruta/controlador_modificar_ruta_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito la ruta " + user + "!", "success").then((value) => {
                tbl_ruta.ajax.reload();
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })
}

function Registrar_Ruta() {
    let ori = document.getElementById('origen').value;
    let des = document.getElementById('destino').value;
    let dis = document.getElementById('distancia').value;
    let obs = "";

    //verificar datos
    if (ori.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo origen no puede estar vacio!", "warning");
    }

    if (des.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo destino no puede estar vacio!", "warning");
    }
    if (dis.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo distancia no puede estar vacio!", "warning");
    }
   


    $.ajax({
        "url": "controlador/ruta/controlador_registro_ruta.php",
        type: 'POST',
        data: {
            ori: ori,
            des: des,
            dis: dis,
            obs: obs
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nueva Ruta Registrada!", "success").then((value) => {
                    document.getElementById('origen').value = "";
                    document.getElementById('destino').value = "";
                    document.getElementById('distancia').value = "";
                    tbl_ruta.ajax.reload();
                    $("#modal_registro").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La Ruta ingresada ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Ruta() {
    let ori = document.getElementById('origen_ed').value;
    let des = document.getElementById('destino_ed').value;
    let dis = document.getElementById('distancia_ed').value;
    let obs = document.getElementById('observacion_ed').value;
    let id = document.getElementById('ruta_ed').value;

    //verificar datos
    if (ori.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo origen no puede estar vacio!", "warning");
    }

    if (des.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo destino no puede estar vacio!", "warning");
    }
    if (dis.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo distancia no puede estar vacio!", "warning");
    }
    if (obs.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo observacion no puede estar vacio!", "warning");
    }
   


    $.ajax({
        "url": "controlador/ruta/controlador_modificar_ruta.php",
        type: 'POST',
        data: {
            ori: ori,
            des: des,
            dis: dis,
            obs: obs,
            id:id
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Ruta Modificara exitosamente!", "success").then((value) => {
                    document.getElementById('origen_ed').value = "";
                    document.getElementById('destino_ed').value = "";
                    document.getElementById('distancia_ed').value = "";
                    document.getElementById('observacion_ed').value = "";
                    document.getElementById('ruta_ed').value = "";
                    tbl_ruta.ajax.reload();
                    $("#modal_editar").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La Ruta ingresada ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}