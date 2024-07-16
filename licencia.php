
<script src="js/licencia.js?rev=<?php echo time(); ?>"></script>
<!-- Begin Page Content -->
<div class="container-fluid">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Estado de Licencia</h6>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="button" data-toggle="modal"
                    data-target="#modal_registro">Agregar</button>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="tabla_licencia" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Num. Licencia</th>
                            <th>Emision</th>
                            <th>Fecha de Vencimiento</th>
                            <th>Clase</th>
                            <th>Categoria</th>
                            <th>Restricciones</th>
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


<!-- Modal -->
<div class="modal fade" id="modal_registro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Licencia</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form here -->
                <div id="add-licencia-form">
                    <div class="form-group">
                        <label for="numero" aria-label="Numero">Numero</label>
                        <input type="text" class="form-control" id="numero" placeholder="Numero" required
                            aria-describedby="numero-error">
                        <div id="numero-error" class="invalid-feedback">Por favor, ingrese un numero válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="emision" aria-label="Emision">Emision</label>
                        <input type="date" class="form-control" id="emision" placeholder="Emision" required
                            aria-describedby="emision-error">
                        <div id="emision-error" class="invalid-feedback">Por favor, ingrese emision</div>
                    </div>
                    <div class="form-group">
                        <label for="vencimiento" aria-label="Vencimiento">Fecha de Vencimiento</label>
                        <input type="date" class="form-control" id="vencimiento" placeholder="Vencimiento" required
                            aria-describedby="vencimiento-error">
                        <div id="vencimiento-error" class="invalid-feedback">Por favor, ingrese la fecha de vencimiento
                            .</div>
                    </div>
                    <div class="form-group">
                        <label for="clase" aria-label="Clase">Clase</label>
                        <input type="text" class="form-control" id="clase" placeholder="Clase" required
                            pattern="[0-9]{8,12}" aria-describedby="clase-error">
                        <div id="clase-error" class="invalid-feedback">Por favor, ingrese la clase de vehiculo.</div>
                    </div>
                    <div class="form-group">
                        <label for="categoria" aria-label="Categoria">Categoria</label>
                        <input type="text" class="form-control" id="categoria" placeholder="Categoria" required
                            aria-describedby="categoria-error">
                        <div id="categoria-error" class="invalid-feedback">Por favor, ingrese la Categoria</div>
                    </div>
                    <div class="form-group">
                        <label for="restricciones" aria-label="Restricciones">Restricciones</label>
                        <input type="text" class="form-control" id="restricciones" placeholder="Restricciones" required
                            aria-describedby="restricciones-error">
                        <div id="restricciones-error" class="invalid-feedback">Por favor, las restricciones</div>
                    </div>
</div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" type="submit" onclick="Registrar_Licencia()">Agregar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modificar Licencia</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form here -->
                <div id="add-licencia-form">
                    <div class="form-group">
                        <input type="text" style="display: none;" id="licencia_ed">
                        <label for="numero" aria-label="Numero">Numero</label>
                        <input type="text" class="form-control" id="numero_ed" placeholder="Numero" required
                            aria-describedby="numero-error">
                        <div id="numero-error" class="invalid-feedback">Por favor, ingrese un numero válido.</div>
                    </div>
                    <div class="form-group">
                        <label for="emision" aria-label="Emision">Emision</label>
                        <input type="date" class="form-control" id="emision_ed" placeholder="Emision" required
                            aria-describedby="emision-error">
                        <div id="emision-error" class="invalid-feedback">Por favor, ingrese emision</div>
                    </div>
                    <div class="form-group">
                        <label for="vencimiento" aria-label="Vencimiento">Fecha de Vencimiento</label>
                        <input type="date" class="form-control" id="vencimiento_ed" placeholder="Vencimiento" required
                            aria-describedby="vencimiento-error">
                        <div id="vencimiento-error" class="invalid-feedback">Por favor, ingrese la fecha de vencimiento
                            .</div>
                    </div>
                    <div class="form-group">
                        <label for="clase" aria-label="Clase">Clase</label>
                        <input type="text" class="form-control" id="clase_ed" placeholder="Clase" required
                            pattern="[0-9]{8,12}" aria-describedby="clase-error">
                        <div id="clase-error" class="invalid-feedback">Por favor, ingrese la clase de vehiculo.</div>
                    </div>
                    <div class="form-group">
                        <label for="categoria" aria-label="Categoria">Categoria</label>
                        <input type="text" class="form-control" id="categoria_ed" placeholder="Categoria" required
                            aria-describedby="categoria-error">
                        <div id="categoria-error" class="invalid-feedback">Por favor, ingrese la Categoria</div>
                    </div>
                    <div class="form-group">
                        <label for="restricciones" aria-label="Restricciones">Restricciones</label>
                        <input type="text" class="form-control" id="restricciones_ed" placeholder="Restricciones" required
                            aria-describedby="restricciones-error">
                        <div id="restricciones-error" class="invalid-feedback">Por favor, las restricciones</div>
                    </div>
</div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" type="submit" onclick="Modificar_Licencia()">Modificar</button>
            </div>
        </div>
    </div>
</div>



<script>
    $(document).ready(function () {
        listar_licencias();
    });
</script>
