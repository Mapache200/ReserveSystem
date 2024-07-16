<script src="js/ruta.js?rev=<?php echo time(); ?>"></script>
<!-- Begin Page Content -->
<div class="container-fluid">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Rutas</h6>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="button" data-toggle="modal" data-target="#modal_registro">Agregar</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="tabla_ruta" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Origen de Ruta</th>
                            <th>Destino de Ruta</th>
                            <th>Distancia de la Ruta</th>
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
                <h5 class="modal-title" id="exampleModalLabel">Agregar Conductor</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addConductorForm">
                    <div class="form-group">
                        <label for="origen">Origen de Ruta</label>
                        <select class="form-control" id="origen">
                        <option value="Trujillo">Trujillo</option>
                        <option value="El Porvenir">El Porvenir</option>
                        <option value="Florencia de Mora">Florencia de Mora</option>
                        <option value="Huanchaco">Huanchaco</option>
                        <option value="La Esperanza">La Esperanza</option>
                        <option value="Laredo">Laredo</option>
                        <option value="Moche">Moche</option>
                        <option value="Poroto">Poroto</option>
                        <option value="Salaverry">Salaverry</option>
                        <option value="Simbal">Simbal</option>
                        <option value="Víctor Larco Herrera">Víctor Larco Herrera</option>
                        </select>
                        <!-- <a class="btn btn-secondary" href="">validar</a> -->
                    </div>
                    <div class="form-group">
                        <label for="destino">Destino de Ruta</label>
                        <select class="form-control" id="destino"><option value="Trujillo">Trujillo</option>
                        <option value="El Porvenir">El Porvenir</option>
                        <option value="Florencia de Mora">Florencia de Mora</option>
                        <option value="Huanchaco">Huanchaco</option>
                        <option value="La Esperanza">La Esperanza</option>
                        <option value="Laredo">Laredo</option>
                        <option value="Moche">Moche</option>
                        <option value="Poroto">Poroto</option>
                        <option value="Salaverry">Salaverry</option>
                        <option value="Simbal">Simbal</option>
                        <option value="Víctor Larco Herrera">Víctor Larco Herrera</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="DistanciaRuta">Distancia de la Ruta</label>
                        <input type="text" class="form-control" id="distancia" placeholder="Ingrese Distancia de la Ruta" required>
                    </div>                  
                    <!-- Add more form fields as needed -->
                    <button class="btn btn-primary" type="submit" onclick="Registrar_Ruta()">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modificar Rutas</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="addRutaForm">
                    <div class="form-group">
                    <input type="text" style="display: none;" id="ruta_ed">
                        <label for="origen_ed">Origen de Ruta</label>
                        <select class="form-control" id="origen_ed"><option value="Trujillo">Trujillo</option>
                        <option value="El Porvenir">El Porvenir</option>
                        <option value="Florencia de Mora">Florencia de Mora</option>
                        <option value="Huanchaco">Huanchaco</option>
                        <option value="La Esperanza">La Esperanza</option>
                        <option value="Laredo">Laredo</option>
                        <option value="Moche">Moche</option>
                        <option value="Poroto">Poroto</option>
                        <option value="Salaverry">Salaverry</option>
                        <option value="Simbal">Simbal</option>
                        <option value="Víctor Larco Herrera">Víctor Larco Herrera</option>
                        </select>
                        <!-- <a class="btn btn-secondary" href="">validar</a> -->
                    </div>
                    <div class="form-group">
                        <label for="destino_ed">Destino de Ruta</label>
                        <select class="form-control" id="destino_ed"><option value="Trujillo">Trujillo</option>
                        <option value="El Porvenir">El Porvenir</option>
                        <option value="Florencia de Mora">Florencia de Mora</option>
                        <option value="Huanchaco">Huanchaco</option>
                        <option value="La Esperanza">La Esperanza</option>
                        <option value="Laredo">Laredo</option>
                        <option value="Moche">Moche</option>
                        <option value="Poroto">Poroto</option>
                        <option value="Salaverry">Salaverry</option>
                        <option value="Simbal">Simbal</option>
                        <option value="Víctor Larco Herrera">Víctor Larco Herrera</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="distancia">Distancia de la Ruta</label>
                        <input type="text" class="form-control" id="distancia_ed" placeholder="Ingrese Distancia de la Ruta" required>
                    </div>
                    <div class="form-group">
                        <label for="observacion">Observacion</label>
                        <input type="text" class="form-control" id="observacion_ed" placeholder="Ingrese las observaciones" required>
                    </div>
                    <!-- Add more form fields as needed -->
                    <button class="btn btn-primary" type="submit" onclick="Modificar_Ruta()">Modificar</button>
</div>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        listar_rutas();
    });
</script>