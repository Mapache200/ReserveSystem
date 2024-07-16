<script src="js/cliente.js?rev=<?php echo time(); ?>"></script>
<!-- Begin Page Content -->
<div class="container-fluid">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Estado de Clientes</h6>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="button" data-toggle="modal" data-target="#modal_registro">Agregar</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="tabla_cliente" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombres</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>DNI</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- /.container-fluid -->
</div>
<!-- End of Main Content -->

<!-- Modal -->
<div class="modal fade" id="modal_registro" tabindex="-1" role="dialog" aria-labelledby="modalregistrar" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_registro_Label">Agregar Cliente</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form here -->
                <div id="add-client-form">
                    <div class="form-group">
                        <label for="nombre" aria-label="Nombre">Nombre</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre" required aria-describedby="nombre-error">
                        <div id="nombre-error" class="invalid-feedback">Por favor, ingrese un nombre válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="apellido_paterno" aria-label="ApellidoPat">Apellido Paterno</label>
                        <input type="text" class="form-control" id="ApellidoPat" placeholder="Apellido Paterno" required aria-describedby="apellido-paterno-error">
                        <div id="apellido-paterno-error" class="invalid-feedback">Por favor, ingrese un apellido válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="apellido_materno" aria-label="ApellidoMat">Apellido Materno</label>
                        <input type="text" class="form-control" id="ApellidoMat" placeholder="Apellido Materno" required aria-describedby="apellido-materno-error">
                        <div id="apellido-materno-error" class="invalid-feedback">Por favor, ingrese un apellido válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="dni" aria-label="DNI">DNI</label>
                        <input type="text" class="form-control" id="dni" placeholder="DNI" required pattern="[0-9]{8,12}" aria-describedby="dni-error">
                        <div id="dni-error" class="invalid-feedback">Por favor, ingrese un DNI válido (8-12 dígitos).</div>
                    </div>
                    <div class="form-group">
                        <label for="contacto" aria-label="Contacto">Contacto</label>
                        <input type="text" class="form-control" id="contacto" placeholder="Contacto" required aria-describedby="contacto-error">
                        <div id="contacto-error" class="invalid-feedback">Por favor, ingrese un contacto válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="email" aria-label="Email">Email</label>
                        <input type="text" class="form-control" id="email" placeholder="Email" required aria-describedby="email-error">
                        <div id="email-error" class="invalid-feedback">Por favor, ingrese su Email.</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" type="submit" onclick="Registrar_Cliente()">Agregar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_registro_Label">Editar Cliente</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form here -->
                <div id="add-client-form">
                    <div class="form-group">
                        <input type="text" style="display: block;" id="txt_id_ed">
                        <label for="nombre" aria-label="Nombre">Nombre</label>
                        <input type="text" class="form-control" id="nombre_ed" placeholder="Nombre" required aria-describedby="nombre-error">
                        <div id="nombre-error" class="invalid-feedback">Por favor, ingrese un nombre válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="apellido_paterno" aria-label="ApellidoPat">Apellido Paterno</label>
                        <input type="text" class="form-control" id="ApellidoPat_ed" placeholder="Apellido Paterno" required aria-describedby="apellido-paterno-error">
                        <div id="apellido-paterno-error" class="invalid-feedback">Por favor, ingrese un apellido válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="apellido_materno" aria-label="ApellidoMat">Apellido Materno</label>
                        <input type="text" class="form-control" id="ApellidoMat_ed" placeholder="Apellido Materno" required aria-describedby="apellido-materno-error">
                        <div id="apellido-materno-error" class="invalid-feedback">Por favor, ingrese un apellido válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="dni" aria-label="DNI">DNI</label>
                        <input type="text" class="form-control" id="dni_ed" placeholder="DNI" required pattern="[0-9]{8,12}" aria-describedby="dni-error">
                        <div id="dni-error" class="invalid-feedback">Por favor, ingrese un DNI válido (8-12 dígitos).</div>
                    </div>
                    <div class="form-group">
                        <label for="contacto" aria-label="Contacto">Contacto</label>
                        <input type="text" class="form-control" id="contacto_ed" placeholder="Contacto" required aria-describedby="contacto-error">
                        <div id="contacto-error" class="invalid-feedback">Por favor, ingrese un contacto válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="email" aria-label="Email">Email</label>
                        <input type="text" class="form-control" id="email_ed" placeholder="Email" required aria-describedby="email-error">
                        <div id="email-error" class="invalid-feedback">Por favor, ingrese su Email.</div>
                    </div>      
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" type="submit" onclick="Modificar_Cliente()">Modificar</button>
            </div>
        </div>
    </div>
</div>

<!-- Custom scripts for pages that need user js-->

<script>
    $(document).ready(function() {
        listar_cliente();
    });
</script>