var  tbl_conductor;

function listar_conductores(){
    tbl_conductor = $("#tabla_conductor").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/conductor/controlador_listar_conductor.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_conductor"},
            {"data":"con_nombre"},
            {"data":"con_ap"},
            {"data":"con_am"},
            {"data":"con_dni"},
            {"data":"lic_num",render:function(data,type,row){
                return "<center>"+data+"<button class='mas btn bg-navy color-palette btn-sm'><i class='fa fa-search'></i></button></center>"
                }
            },
            {"data":"con_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"con_estado",
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
    tbl_conductor.on('draw.td',function(){
      var PageInfo = $("#tabla_conductor").DataTable().page.info();
      tbl_conductor.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};

$('#tabla_conductor').on('click', '.mas', function () {
    var data = tbl_conductor.row($(this).parents('tr')).data(); //En tamaño escritorio
    if (tbl_conductor.row(this).child.isShown()) {
        var data = tbl_conductor.row(this).data();
    } //Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_mas").modal('show');
    document.getElementById('lbl_titulo').innerHTML = "Datos de la Licencia" + data.lic_num;
    listar_licencia_por_dni(data.iddocumento);

})

$('#tabla_conductor').on('click','.editar',function(){
	var data = tbl_conductor.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_conductor.row(this).child.isShown()){
		var data = tbl_conductor.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('conductor_ed').value=data.id_conductor;
    document.getElementById('dni_ed').value=data.con_dni;
    document.getElementById('nombre_ed').value=data.con_nombre;
    document.getElementById('apellidop_ed').value=data.con_ap;
    document.getElementById('apellidom_ed').value=data.con_am;
    $("#select_licencia_ed").val(data.con_licencia).trigger("change");
})

$('#tabla_conductor').on('click', '.activar', function () {
    var data = tbl_conductor.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_conductor.row(this).child.isShown()) {
        var data = tbl_conductor.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar el conductor ' + data.conductor + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Conductor(parseInt(data.id_conductor), 'ACTIVO', data.conductor);
        }
    })

})

$('#tabla_conductor').on('click', '.desactivar', function () {
    var data = tbl_conductor.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_conductor.row(this).child.isShown()) {
        var data = tbl_conductor.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Inhabilitar el conductor ' + data.conductor + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("d");
            Modificar_Estado_Conductor(parseInt(data.id_conductor), 'INACTIVO', data.conductor);
            console.log("e");
        }
    })
})

function Registrar_Conductor() {
    let dni = document.getElementById('dni').value;
    let nom = document.getElementById('nombre').value;
    let apa = document.getElementById('apellidop').value;
    let ama = document.getElementById('apellidom').value;
    let lic = document.getElementById('select_licencia').value;

    //verificar datos
    if (dni.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo dni no puede estar vacio!", "warning");
    }

    if (nom.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Nombre no puede estar vacio!", "warning");
    }
    if (apa.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Apellido Paterno no puede estar vacio!", "warning");
    }
    if (ama.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Apellido Materno no puede estar vacio!", "warning");
    }
    if (lic.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Licencia debe contener una licencia!", "warning");
    }

    $.ajax({
        "url": "controlador/conductor/controlador_registro_conductor.php",
        type: 'POST',
        data: {
            dni: dni,
            nom: nom,
            apa: apa,
            ama: ama,
            lic: lic
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nuevo Conductor Registrado!", "success").then((value) => {
                    document.getElementById('dni').value = "";
                    document.getElementById('nombre').value = "";
                    document.getElementById('apellidop').value = "";
                    document.getElementById('apellidom').value = "";
                    document.getElementById('select_licencia').value=0;
                    tbl_conductor.ajax.reload();
                    $("#modal_registro").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡El Dni ingresado ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Conductor() {
    let dni = document.getElementById('dni_ed').value;
    let nom = document.getElementById('nombre_ed').value;
    let apa = document.getElementById('apellidop_ed').value;
    let ama = document.getElementById('apellidom_ed').value;
    let lic = document.getElementById('select_licencia_ed').value;
    let id = document.getElementById('conductor_ed').value;


    //verificar datos
    if (dni.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo dni no puede estar vacio!", "warning");
    }

    if (nom.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Nombre no puede estar vacio!", "warning");
    }
    if (apa.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Apellido Paterno no puede estar vacio!", "warning");
    }
    if (ama.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Apellido Materno no puede estar vacio!", "warning");
    }
    if (lic.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Licencia debe contener una licencia!", "warning");
    }

    $.ajax({
        "url": "controlador/conductor/controlador_modificar_conductor.php",
        type: 'POST',
        data: {
            dni: dni,
            nom: nom,
            apa: apa,
            ama: ama,
            lic: lic,
            id:id
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Conductor Modificado con Exito!", "success").then((value) => {
                    document.getElementById('dni_ed').value = "";
                    document.getElementById('nombre_ed').value = "";
                    document.getElementById('apellidop_ed').value = "";
                    document.getElementById('apellidom_ed').value = "";
                    document.getElementById('select_licencia_ed').value=0;
                    tbl_conductor.ajax.reload();
                    $("#modal_editar").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡El Dni ingresado le pertenece a otro conductor!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Estado_Conductor(id, estado, user) {
    let estatus = 0;
    if (estado == 'INACTIVO') {
        estatus = 0;
        estado = "desactivó";
    } else {
        estatus = 1;
        estado = "activó";
    }
    $.ajax({
        "url": "controlador/conductor/controlador_modificar_conductor_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito al conductor " + user + "!", "success").then((value) => {
                tbl_conductor.ajax.reload();
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


function recargarlic(){
    let id   = document.getElementById('dni').value;
    Cargar_Select_Licencias(id)
}

function Cargar_Select_Licencias(valor) {
    $.ajax({
        "url": "controlador/licencias/controlador_listar_licencias_por_dni.php",
        type: 'POST',
        data:{
            valor:valor
        }
    }).done(function (resp) {
        let data = JSON.parse(resp).data;
            if (data.length > 0){
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_licencia"] + "'>" + data[i]["lic_num"] + "</option>";
                }
                document.getElementById('select_licencia').innerHTML = cadena;
            }else {
                let cadena = "";
                cadena += "<option value=''>No hay licencias disponibles</option>";
                document.getElementById('select_licencia').innerHTML = cadena;
    
            }
    });
}

function Cargar_Select_Licencias_ed(valor) {
    $.ajax({
        "url": "controlador/licencias/controlador_listar_licencias_por_dni.php",
        type: 'POST',
        data:{
            valor:valor
        }
    }).done(function (resp) {
        let data = JSON.parse(resp).data;
            if (data.length > 0){
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_licencia"] + "'>" + data[i]["lic_num"] + "</option>";
                }
                document.getElementById('select_licencia_ed').innerHTML = cadena;
            }else {
                let cadena = "";
                cadena += "<option value=''>No hay licencias disponibles</option>";
                document.getElementById('select_licencia_ed').innerHTML = cadena;
    
            }
    });
}

