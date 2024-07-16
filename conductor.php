<script src="js/conductor.js?rev=<?php echo time(); ?>"></script>
<!-- Begin Page Content -->
<div class="container-fluid">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Conductores</h6>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="button" data-toggle="modal" data-target="#modal_registro">Agregar</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="tabla_conductor" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>DNI</th>
                            <th>Licencia</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>


<!-- Add Route Modal -->
<div class="modal fade" id="modal_registro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Conductor</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addConductorForm">
                    <div class="form-group">
                        <label for="dni">Dni</label>
                        <input type="text" class="form-control" id="dni" placeholder="Ingrese el Dni" onkeyup="recargarlic()" required>
                        <!-- <a class="btn btn-secondary" href="">validar</a> -->
                    </div>
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="apellidoP">Apellido Paterno</label>
                        <input type="text" class="form-control" id="apellidop" placeholder="Ingrese el apellido paterno" required>
                    </div>
                    <div class="form-group">
                        <label for="apellidoM">Apellido Materno</label>
                        <input type="text" class="form-control" id="apellidom" placeholder="Ingrese el apellido materno" required>
                    </div>
                    <div class="form-group">
                        <label for="licencia">Licencia</label>
                        <select class="form-control" id="select_licencia"></select>
                    </div>
                    <!-- Add more form fields as needed -->
                    <button class="btn btn-primary" type="submit" onclick="Registrar_Conductor()">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modificar Conductor</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addConductorForm">
                    <div class="form-group">
                    <input type="text" style="display: block;" id="conductor_ed">
                        <label for="dni">Dni</label>
                        <input type="text" class="form-control" id="dni_ed" placeholder="Ingrese el Dni" required>
                        <!-- <a class="btn btn-secondary" href="">validar</a> -->
                    </div>
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" class="form-control" id="nombre_ed" placeholder="Ingrese el nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="apellidoP">Apellido Paterno</label>
                        <input type="text" class="form-control" id="apellidop_ed" placeholder="Ingrese el apellido paterno" required>
                    </div>
                    <div class="form-group">
                        <label for="apellidoM">Apellido Materno</label>
                        <input type="text" class="form-control" id="apellidom_ed" placeholder="Ingrese el apellido materno" required>
                    </div>
                    <div class="form-group">
                        <label for="licencia">Licencia</label>
                        <select class="form-control" id="select_licencia_ed"></select>
                    </div>
                    <!-- Add more form fields as needed -->
                    <button class="btn btn-primary" type="submit" onclick="Modificar_Conductor()">Modificar</button>
</div>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        listar_conductores();
        Cargar_Select_Licencias("");
        Cargar_Select_Licencias_ed("");
    });
</script>