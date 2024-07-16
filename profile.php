<?php
session_start();
?>
<script src="js/usuario.js?rev=<?php echo time(); ?>"></script>
<div class="container mt-5">
    <h2 class="mb-4">Datos de Contacto</h2>
    <form>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                <input type="text" style="display: none;" id="usuario_ed">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre_perf" name="nombre" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="apellido_paterno">Apellido Paterno</label>
                    <input type="text" class="form-control" id="ap_perf" name="apellido_paterno" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="apellido_materno">Apellido Materno</label>
                    <input type="text" class="form-control" id="am_perf" name="apellido_materno" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="dni">DNI</label>
                    <input type="text" class="form-control" id="dni_perf" name="dni" required pattern="\d{8}">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="email">Correo Electronico</label>
                    <input type="email" class="form-control" id="correo_perf" name="email">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="telefono">Telefono</label>
                    <input type="number" class="form-control" id="telefono_perf" name="telefono">
                </div>
            </div>



        </div>
        <div class="text-center">
            <a type="submit" class="btn btn-primary" onclick="Modificar_Perfil()">Guardar Datos</a>
        </div>
    </form>
    <h2 class="mt-5 mb-4">Cambiar Contraseña</h2>
    <form >
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="nueva_contrasena">Nueva Contraseña</label>
                    <input type="password" class="form-control" id="nueva_contrasena" name="nueva_contrasena" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="confirmar_contrasena">Confirmar Contraseña</label>
                    <input type="password" class="form-control" id="confirmar_contrasena" name="confirmar_contrasena" required>
                </div>
            </div>
        </div>
        <div class="text-center">
            <A type="submit" class="btn btn-primary" onclick="Cambiar_Pass()">Guardar Contraseña</A>
        </div>
    </form>
</div>

<input type="hidden" id="SESSION_ID" value="<?php echo $_SESSION['S_ID'] ?>">
<input type="hidden" id="SESSION_USU" value="<?php echo $_SESSION['S_USU'] ?>">
<input type="hidden" id="SESSION_ROL" value="<?php echo $_SESSION['S_ROL'] ?>">

<script>
    $(document).ready(function() {
        TraerDatos(document.getElementById('SESSION_ID').value, document.getElementById('SESSION_ROL').value);
    });
</script>