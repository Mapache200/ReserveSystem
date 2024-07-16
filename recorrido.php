<script src="js/recorrido.js?rev=<?php echo time(); ?>"></script>
<!-- Begin Page Content -->
<div class="container-fluid">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Recorrido</h6>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="button" data-toggle="modal" data-target="#modal_registro">Agregar</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="tabla_recorrido" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Origen de Ruta</th>
                            <th>Destino de Ruta</th>
                            <th>Placa</th>
                            <th>Conductor</th>
                            <th>Fecha</th>
                            <th>Hora Salida</th>
                            <th>Monto</th>
                            <th>Asientos Vacios</th>
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
                <h5 class="modal-title" id="exampleModalLabel">Agregar Recorrido</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addRecorridoForm">
                    <div class="form-group">
                        <label for="ruta">Ruta</label>
                        <select class="form-control" id="select_ruta">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bus">Bus</label>
                        <select class="form-control" id="select_bus">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="conductor">Conductor</label>
                        <select class="form-control" id="select_conductor">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fecha" aria-label="Fecha">Fecha</label>
                        <input type="date" class="form-control" id="fecha" placeholder="fecha" required
                            aria-describedby="emision-error">
                        <div id="emision-error" class="invalid-feedback">Por favor, ingrese emision</div>
                    </div>
                    <div class="form-group">
                        <label for="hora" aria-label="Hora">Hora</label>
                        <input type="time" class="form-control" id="hora">
                    </div>
                    <div class="form-group">
                        <label for="monto">Monto</label>
                        <input type="text" class="form-control" id="monto" placeholder="Ingrese el monto" required>
                    </div>
                </div>
                    <!-- Add more form fields as needed -->
                    <button class="btn btn-primary" type="submit" onclick="Registrar_Recorrido()">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modificar Recorrido</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addRecorridoForm">
                    <div class="form-group">
                        <input type="text" style="display: none;" id="recorrido_ed">
                        <label for="ruta">Ruta</label>
                        <select class="form-control" id="select_ruta_ed">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bus">Bus</label>
                        <select class="form-control" id="select_bus_ed">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="conductor">Conductor</label>
                        <select class="form-control" id="select_conductor_ed">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fecha" aria-label="Fecha">Fecha</label>
                        <input type="date" class="form-control" id="fecha_ed" placeholder="fecha" required
                            aria-describedby="emision-error">
                        <div id="emision-error" class="invalid-feedback">Por favor, ingrese emision</div>
                    </div>
                    <div class="form-group">
                        <label for="hora" aria-label="Hora">Hora</label>
                        <input type="time" class="form-control" id="hora_ed">
                    </div>
                    <div class="form-group">
                        <label for="monto">Monto</label>
                        <input type="text" class="form-control" id="monto_ed" placeholder="Ingrese el monto" required>
                    </div>
                    <button class="btn btn-primary" type="submit" onclick="Modificar_Recorrido()">Modificar</button>
</div>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        listar_recorridos();
        Cargar_Select_Rutas();
        Cargar_Select_Buses();
        Cargar_Select_Conductores();
    });
</script>