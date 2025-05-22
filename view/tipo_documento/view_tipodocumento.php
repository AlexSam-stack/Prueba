<script src="../js/console_tipodocumento.js?rev=<?php echo time();?>"></script>

<div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">MANTENIMIENTO TIPO DOCUMENTO</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Tipo documento</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- /.col-md-6 -->
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><b>Listado de tipo documento</b></h3>
                <button class="btn btn-danger btn-sm float-right" onclick="AbrirRegistro()"><i class="fas fa-plus"></i> Nuevo Registro</button>
              </div>
              <div class="card-body">
                <table id="tabla_tipo" class="display">
                      <thead>
                        <tr>
                            <th>#</th>
                            <th>Tipo documento</th>
                            <th>Fecha Registro </th>
                            <th>Estatus</th>
                            <th>Acción</th>
                        </tr>
                    </thead>   
                </table>
              </div>
            </div>
          </div>
          <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->
     <!-- Modal -->
      <div class="modal fade" id="modal_registro" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Registro de Area</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                 <label for="">TIPO DOCUMENTO</label> 
                 <input type="text" class="form-control" id="txt_tipo">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success" onclick="Registrar_Area()">REGISTRAR</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="modal_editar" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">EDITAR DATOS DE AREA</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                 <label for="">AREA</label> 
                 <input type="text" class="form-control" id="txt_area_editar">
                 <input type="text" id="txt_idarea" hidden> 
                </div>
                <div class="col">
                  <lable for="">Estatus</lable>
                  <select name="" id="select_status" class="form-control">
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success" onclick="Modificar_Area()">Modificar</button>
            </div>
          </div>
        </div>
      </div>
     <script>
      	$(document).ready(function() {
          listar_tipodocumento();
        });

        $('#modal_registro').on('shown.bs.modal', function(){
          $('#txt_tipo').trigger('focus')
        })
     </script>