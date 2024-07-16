var tbl_usuario;

function Iniciar_Sesion() {
    recuerdame();
    let usu = document.getElementById('txt_usuario').value;
    let con = document.getElementById('txt_contra').value;
    if (usu.length == 0 || con.length == 0) {
        return Swal.fire({
            icon: 'warning',
            title: 'Mensaje de Advertencia',
            text: '¡Completar los campos vacíos!',
            heightAuto: false
        });
    }

    $.ajax({
        url: 'controlador/usuario/controlador_iniciar_sesion.php',
        type: 'POST',
        data: {
            u: usu,
            c: con
        }
    }).done(function (resp) {
        let data = JSON.parse(resp);
        if (data.length > 0) {
            if (data[0][7] == "INACTIVO") {
                return Swal.fire({
                    icon: 'warning',
                    title: 'Mensaje de Advertencia',
                    text: '¡El usuario ' + usu + ' se encuentra inactivo!',
                    heightAuto: false
                });
            }
            $.ajax({
                url: 'controlador/usuario/controlador_crear_sesion.php',
                type: 'POST',
                data: {
                    idusuario: data[0][0],
                    usuario: data[0][1],
                    nombre: data[0][6],
                    rol: data[0][7]               
                }
            }).done(function (r) {
                let timerInterval
                Swal.fire({
                    title: '¡Bienvenido al sistema!',
                    html: 'Seras redireccionado en <b></b> milisegundos.',
                    timer: 1000,
                    timerProgressBar: true,
                    heightAuto: false,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        location.reload();
                    }
                })
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mensaje de Advertencia',
                text: '¡Usuario o contraseña incorrecta!',
                heightAuto: false
            });
        }
    })
}

function recuerdame() {
    if (rmcheck.checked && usuarioInput.value != "" && passInput.value != "") {
        localStorage.usuario = usuarioInput.value;
        localStorage.pass = passInput.value;
        localStorage.checkbox = rmcheck.value;
    } else {
        localStorage.usuario = "";
        localStorage.pass = "";
        localStorage.checkbox = "";
    }
}

function CerrarSesion(){
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Cerraras Sesión, tendras que volver a ingresar tus credenciales.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continuar"
    }).then((isConfirm) => {
        if (isConfirm) {
            window.location.href = 'controlador/usuario/controlador_cerrar_sesion.php';
        }
    });
}

function RegistrarExterno() {
    let dni = document.getElementById('DNI_EXT').value;
    let nom = document.getElementById('NOM_EXT').value;
    let apa = document.getElementById('AP_EXT').value;
    let ama = document.getElementById('AM_EXT').value;
    let email = document.getElementById('EMAIL_EXT').value;
    let tel = document.getElementById('TEL_EXT').value;
    let pass = document.getElementById('PASS_EXT').value;
    let pass2 = document.getElementById('PASS_EXT_2').value;

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
    if (pass.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Contraseña no puede estar vacio!", "warning");
    }
    if (pass2.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Repetir Contraseña no puede estar vacio!", "warning");
    }

    if (pass2.length != pass.length ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Repetir Contraseña no puede estar vacio!", "warning");
    }


    $.ajax({
        "url": "controlador/usuario/Controlador_registro_usuario.php",
        type: 'POST',
        data: {
            dni: dni,
            nom: nom,
            apa: apa,
            ama: ama,
            email: email,
            tel: tel,
            pass: pass
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Te registraste Correctamente!", "success").then((value) => {
                    window.location.href = 'Login.php';
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡El usuario ingresado ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function Registrar_Cliente() {
    let dni = document.getElementById('dni').value;
    let nom = document.getElementById('nombre').value;
    let apa = document.getElementById('ApellidoPat').value;
    let ama = document.getElementById('ApellidoMat').value;
    let email = document.getElementById('email').value;
    let tel = document.getElementById('contacto').value;
    let pass = document.getElementById('dni').value;

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
    if (pass.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Contraseña no puede estar vacio!", "warning");
    }

    $.ajax({
        "url": "controlador/cliente/controlador_registro_cliente.php",
        type: 'POST',
        data: {
            dni: dni,
            nom: nom,
            apa: apa,
            ama: ama,
            email: email,
            tel: tel,
            pass: pass
        }
    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "¡Nuevo Usuario Registrado!", "success").then((value) => {
                    document.getElementById('nombre').value = "";
                    document.getElementById('ApellidoPat').value = "";
                    document.getElementById('ApellidoMat').value = "";
                    document.getElementById('dni').value = "";
                    document.getElementById('contacto').value = "";
                    document.getElementById('email').value = "";
                    tbl_cliente.ajax.reload();
                    $("#modal_registro").modal('hide');
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "¡El usuario ingresado ya se encuentra en la base de datos!", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
        }
    })
}

function TraerDatos(id,rol){
    if (rol == 'ADMINISTRADOR') {
        $.ajax({
            "url": "controlador/administrativo/controlador_traer_datos_adm.php",
            type: 'POST',
        data: {
            id:id
        }
        }).done(function (resp) {
            let data = JSON.parse(resp);
            document.getElementById('usuario_ed').value=data[0][0];
            document.getElementById('nombre_perf').value=data[0][1];
            document.getElementById('ap_perf').value=data[0][2];
            document.getElementById('am_perf').value=data[0][3];
            document.getElementById('dni_perf').value=data[0][4];
            document.getElementById('correo_perf').value=data[0][5];
            document.getElementById('telefono_perf').value=data[0][6];
        });
    } else {
        $.ajax({
            "url": "controlador/cliente/controlador_traer_datos_cli.php",
            type: 'POST',
            data: {
                id:id
            }
        }).done(function (resp) {
            let data = JSON.parse(resp);
            document.getElementById('usuario_ed').value=data[0][0];
            document.getElementById('nombre_perf').value=data[0][1];
            document.getElementById('ap_perf').value=data[0][2];
            document.getElementById('am_perf').value=data[0][3];
            document.getElementById('dni_perf').value=data[0][4];
            document.getElementById('correo_perf').value=data[0][5];
            document.getElementById('telefono_perf').value=data[0][6];
        });
    }
}


function Modificar_Perfil() {
    let id = document.getElementById('usuario_ed').value;
    let dni = document.getElementById('dni_perf').value;
    let nom = document.getElementById('nombre_perf').value;
    let apa = document.getElementById('ap_perf').value;
    let ama = document.getElementById('am_perf').value;
    let email = document.getElementById('correo_perf').value;
    let tel = document.getElementById('telefono_perf').value;
    let rol = document.getElementById('SESSION_ROL').value;

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

    if (rol == 'ADMINISTRADOR') {
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
                        document.getElementById('nombre_perf').value = "";
                        document.getElementById('ap_perf').value = "";
                        document.getElementById('am_perf').value = "";
                        document.getElementById('dni_perf').value = "";
                        document.getElementById('telefono_perf').value = "";
                        document.getElementById('correo_perf').value = "";
                        cargar_contenido('contenido_principal','profile.php','Profile');
                    });
                } else {
                    Swal.fire("Mensaje de Advertencia", "¡EL DNI SE ENCUENTRA REGISTRADO EN OTRO USUARIO!", "warning");
                }
            } else {
                return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
            }
        });

    } else {
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
                    Swal.fire("Mensaje de Confirmación", "¡El Administrador se modifico Correctamente!", "success").then((value) => {
                        document.getElementById('nombre_perf').value = "";
                        document.getElementById('ap_perf').value = "";
                        document.getElementById('am_perf').value = "";
                        document.getElementById('dni_perf').value = "";
                        document.getElementById('telefono_perf').value = "";
                        document.getElementById('correo_perf').value = "";
                        cargar_contenido('contenido_principal','profile.php','Profile');
                    });
                } else {
                    Swal.fire("Mensaje de Advertencia", "¡EL DNI SE ENCUENTRA REGISTRADO EN OTRO USUARIO!", "warning");
                }
            } else {
                return Swal.fire("Mensaje de Error", "¡No se completo el registro!", "error");
            }
        });
    }  
}


function Cambiar_Pass(){
    let id = document.getElementById('SESSION_ID').value;
    let now = document.getElementById('nueva_contrasena').value;
    let now2 = document.getElementById('confirmar_contrasena').value;
    if (now.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo contraseña no puede estar vacio!", "warning");
    }
    if (now2.length == 0 ){
        return Swal.fire("Mensaje de Advertencia", "¡El Campo Confirmar contraseña no puede estar vacio!", "warning");
    }
    if (now != now2 ){
        return Swal.fire("Mensaje de Advertencia", "¡Las contraseñas no son las mismas!", "warning");
    }
    $.ajax({
        "url": "controlador/usuario/controlador_modificar_usuario_contra.php",
        type: 'POST',
    data: {
        id:id,
        con:now
    }
    }).done(function (resp) {
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmación", "¡Se cambio con exito la contraseña !", "success").then((value) => {
                cargar_contenido('contenido_principal','profile.php','Profile');
            });
        } else {
            return Swal.fire("Mensaje de Error", " ¡No se completo la actualización! ", "error");
        }
    })

}