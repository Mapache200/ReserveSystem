var  tbl_licencia;

function listar_licencias(){
    tbl_licencia = $("#tabla_licencia").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"controlador/licencias/controlador_listar_licencia.php",
            type:'POST'
        },
        "columns":[
            {"data":"id_licencia"},
            {"data":"lic_num"},
            {"data":"lic_emision"},
            {"data":"lic_vencimiento"},
            {"data":"lic_clase"},
            {"data":"lic_categoria"},
            {"data":"lic_restricciones",render: function(data,type,row){
                if(data=='' || data == null  || data=='NINGUNA' ){
                return "sin restricciones";
                }else{
                return '<span class="badge bg-danger">DATA</span>';
                }
        } },
            {"data":"lic_estado",
                render: function(data,type,row){
                        if(data=='1'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"lic_estado",
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
    tbl_licencia.on('draw.td',function(){
      var PageInfo = $("#tabla_licencia").DataTable().page.info();
      tbl_licencia.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
     });
    });
};

$('#tabla_licencia').on('click','.editar',function(){
	var data = tbl_licencia.row($(this).parents('tr')).data();//En tamaño escritorio value.tdi_id
	if(tbl_licencia.row(this).child.isShown()){
		var data = tbl_licencia.row(this).data();
	}//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    $("#modal_editar").modal('show');
    document.getElementById('licencia_ed').value=data.id_licencia;
    document.getElementById('numero_ed').value=data.lic_num;
    document.getElementById('emision_ed').value=data.lic_emision;
    document.getElementById('vencimiento_ed').value=data.lic_vencimiento;
    document.getElementById('clase_ed').value=data.lic_clase;
    document.getElementById('categoria_ed').value=data.lic_categoria;
    document.getElementById('restricciones_ed').value=data.lic_restricciones;
})

$('#tabla_licencia').on('click', '.desactivar', function () {
    var data = tbl_licencia.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_licencia.row(this).child.isShown()) {
        var data = tbl_licencia.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Inhabilitar la licencia ' + data.lic_num + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText:'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Licencia(parseInt(data.id_licencia), 'INACTIVO', data.lic_num);
        }
    })
})

$('#tabla_licencia').on('click', '.activar', function () {
    var data = tbl_licencia.row($(this).parents('tr')).data();//En tamaño escritorio
    if (tbl_licencia.row(this).child.isShown()) {
        var data = tbl_licencia.row(this).data();
    }//Permite llevar los datos cuando es tamaño celular y usas el responsive de datatable
    Swal.fire({
        title: '¿Desea Habilitar la licencia ' + data.lic_num + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
    }).then((result) => {
        if (result.isConfirmed) {
            Modificar_Estado_Licencia(parseInt(data.id_licencia), 'ACTIVO', data.lic_num);
        }
    })

})
function Modificar_Estado_Licencia(id, estado, user) {
    let estatus = 0;
    if (estado == 'INACTIVO') {
        estatus = 0;
        estado = "desactivó";
    } else {
        estatus = 1;
        estado = "activó";
    }
    $.ajax({
        "url": "controlador/licencias/controlador_modificar_licencia_estado.php",
        type: 'POST',
        data: {
            id: id,
            estado: estatus
        }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se " + estado + " con exito la licencia N° " + user + "!", "success").then((value) => {
                tbl_licencia.ajax.reload();
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })
}

function Registrar_Licencia() {
    let num = document.getElementById('numero').value;
    let emi = document.getElementById('emision').value;
    let vec = document.getElementById('vencimiento').value;
    let cla = document.getElementById('clase').value;
    let cat = document.getElementById('categoria').value;
    let res = document.getElementById('restricciones').value;

    //verificar datos
    if (num.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo numero no puede estar vacio!", "warning");
    }

    if (emi.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo emision no puede estar vacio!", "warning");
    }
    if (vec.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo vencimiento no puede estar vacio!", "warning");
    }
    if (cla.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo clase no puede estar vacio!", "warning");
    }
    if (cat.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo categoria no puede estar vacio!", "warning");
    }
    if (res.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Restricciones no puede estar vacio!", "warning");
    }


    $.ajax({
        "url": "controlador/licencias/controlador_registro_licencia.php",
        type: 'POST',
        data: {
            num: num,
            emi: emi,
            vec: vec,
            cla: cla,
            cat: cat,
            res: res
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nueva Licencia Registrado!", "success").then((value) => {
                    document.getElementById('numero').value = "";
                    document.getElementById('emision').value = "";
                    document.getElementById('vencimiento').value = "";
                    document.getElementById('clase').value = "";
                    document.getElementById('categoria').value = "";
                    document.getElementById('restricciones').value = "";
                    tbl_licencia.ajax.reload();
                    $("#modal_registro").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La licencia ingresada ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Modificar_Licencia() {
    let num = document.getElementById('numero_ed').value;
    let emi = document.getElementById('emision_ed').value;
    let vec = document.getElementById('vencimiento_ed').value;
    let cla = document.getElementById('clase_ed').value;
    let cat = document.getElementById('categoria_ed').value;
    let res = document.getElementById('restricciones_ed').value;
    let id = document.getElementById('licencia_ed').value;

    //verificar datos
    if (num.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo numero no puede estar vacio!", "warning");
    }

    if (emi.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo emision no puede estar vacio!", "warning");
    }
    if (vec.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo vencimiento no puede estar vacio!", "warning");
    }
    if (cla.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo clase no puede estar vacio!", "warning");
    }
    if (cat.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo categoria no puede estar vacio!", "warning");
    }
    if (res.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Restricciones no puede estar vacio!", "warning");
    }


    $.ajax({
        "url": "controlador/licencias/controlador_modificar_licencia.php",
        type: 'POST',
        data: {
            num: num,
            emi: emi,
            vec: vec,
            cla: cla,
            cat: cat,
            res: res,
            id:id
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Licencia Modificada exitosamente!", "success").then((value) => {
                    document.getElementById('numero_ed').value = "";
                    document.getElementById('emision_ed').value = "";
                    document.getElementById('vencimiento_ed').value = "";
                    document.getElementById('clase_ed').value = "";
                    document.getElementById('categoria_ed').value = "";
                    document.getElementById('restricciones_ed').value = "";
                    tbl_licencia.ajax.reload();
                    $("#modal_editar").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡La licencia ingresada le pertenece a otro usuario!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
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
            if (data.length > 0) {
                let cadena = "";
                cadena += "<option value=''>seleccionar</option>";
                for (let i = 0; i < data.length; i++) {
                    cadena += "<option value='" + data[i]["id_licencia"] + "'>" + data[i]["lic_num"] + "</option>";
                }
                document.getElementById('select_licencia').innerHTML = cadena;
    
            } else {
                let cadena = "";
                cadena += "<option value=''>No hay licencias disponibles</option>";
                document.getElementById('select_licencia').innerHTML = cadena;
    
            }
        })
    }

