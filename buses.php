
<script src="js/bus.js?rev=<?php echo time(); ?>"></script>
<div class="container-fluid">
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Buses</h6>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="button" data-toggle="modal" data-target="#modal_registro">Agregar</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="tabla_bus" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Capacidad</th>
                            <th>Estado</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="modal_registro" tabindex="-1" role="dialog" aria-labelledby="modalregistrar" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_registro_Label">Agregar Buses</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form here -->
                <div id="add-bus-form">
                    <div class="form-group">
                        <label for="placa" aria-label="Placa">Placa</label>
                        <input type="text" class="form-control" id="placa" placeholder="Placa" required aria-describedby="placa-error">
                        <div id="placa-error" class="invalid-feedback">Por favor, ingrese la Placa.</div>
                    </div>
                    <div class="form-group">
                        <label for="modelo" aria-label="Modelo">Modelo</label>
                        <input type="text" class="form-control" id="modelo" placeholder="Modelo" required aria-describedby="modelo-error">
                        <div id="modelo-error" class="invalid-feedback">Por favor, ingrese un modelo.</div>
                    </div>
                    <div class="form-group">
                        <label for="capacidad" aria-label="Capacidad">Capacidad</label>
                        <input type="text" class="form-control" id="capacidad" placeholder="Capacidad" required aria-describedby="capacidad-error">
                        <div id="capacidad-error" class="invalid-feedback">Por favor, ingrese la capcidad del Bus.</div>
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" type="submit" onclick="Registrar_Bus()">Agregar</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_registro_Label">Editar Buses</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form here -->
                <div id="add-bus-form">
                    <div class="form-group">
                        <input type="text" style="display: none;" id="bus_ed">
                        <label for="placa" aria-label="Placa">Placa</label>
                        <input type="text" class="form-control" id="placa_ed" placeholder="Placa" required aria-describedby="placa-error">
                        <div id="placa-error" class="invalid-feedback">Por favor, ingrese una Placa válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="modelo" aria-label="Modelo">Modelo</label>
                        <input type="text" class="form-control" id="modelo_ed" placeholder="Modelo" required aria-describedby="modelo-error">
                        <div id="modelo-error" class="invalid-feedback">Por favor, ingrese un modelo válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="capacidad" aria-label="Capacidad">Capacidad</label>
                        <input type="text" class="form-control" id="capacidad_ed" placeholder="Capacidad" required aria-describedby="capacidad-error">
                        <div id="capacidad-error" class="invalid-feedback">Por favor, ingrese una capacidad válido.</div>
                    </div>
                        
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" type="submit" onclick="Modificar_Bus()">Modificar</button>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        listar_buses();
    });
</script>