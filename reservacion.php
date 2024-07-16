<?php
session_start();
?>
<script src="js/reservacion.js?rev=<?php echo time(); ?>"></script>
<!-- Begin Page Content -->
<div class="container-fluid">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Reservacion</h6>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="button" data-toggle="modal" data-target="#modal_registro">Agregar</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="tabla_reservacion" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Origen de Ruta</th>
                            <th>Destino de Ruta</th>
                            <th>Dni del Cliente</th>                            
                            <th>Nombre del Cliente</th>
                            <th>fecha del Recorrido</th>
                            <th>Fecha de reservacion</th>
                            <th>Observacion</th>
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
                <h5 class="modal-title" id="exampleModalLabel">Agregar Reservacion</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addReservacionForm">
                    <div class="form-group">
                        <div class="form-group">
                            <label for="ruta">Recorrido</label>
                            <select class="form-control" id="select_recorrido">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="bus">Cliente</label>
                            <select class="form-control" id="select_cliente">
                            </select>
                        </div>
                    </div>
                    <!-- Add more form fields as needed -->
                    <button class="btn btn-primary" type="submit" onclick="Registrar_Reservacion()">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modificar Reservacion</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addConductorForm">
                    <div class="form-group">
                        <div class="form-group">
                            <input type="text" style="display: none;" id="reservacion_ed">
                            <label for="ruta">Recorrido</label>
                            <select class="form-control" id="select_recorrido_ed">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="bus">Cliente</label>
                            <select class="form-control" id="select_cliente_ed">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fecha" aria-label="fecha">Fecha</label>
                            <input type="date" class="form-control" id="fecha_ed" placeholder="Por favor, ingrese fecha">
                        </div>
                        <div class="form-group">
                            <label for="observacion">Observacion</label>
                            <input type="text" class="form-control" id="observacion_ed" placeholder="Ingrese Observaciones" required>
                        </div>
                        <!-- Add more form fields as needed -->
                        <button class="btn btn-primary" type="submit" onclick="Modificar_Reservacion()">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="SESSION_ID" value="<?php echo $_SESSION['S_ID'] ?>">
<?php if ($_SESSION['S_ROL'] == 'ADMINISTRADOR') { ?>
    <script>
    $(document).ready(function() {
    listar_Reservaciones();
    Cargar_Select_Recorridos();
    Cargar_Select_Clientes();
    });
    </script>
<?php }else{ ?>
    <script>
    $(document).ready(function() {
    listar_Reservaciones_Dni(document.getElementById('SESSION_ID').value);
    Cargar_Select_Recorridos();
    Cargar_Select_Clientes();
    });
    </script>
<?php } ?>
    
