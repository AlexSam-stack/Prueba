var tbl_tipodocumento;
function listar_tipodocumento(){
    tbl_tipodocumento = $("#tabla_tipo").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/tipo/controlador_listar_tipo.php",
            type:'POST'
        },
        "columns":[
            {"defaultContent":""},
            {"data":"tipodo_descripcion"},
            {"data":"tipodo_fregistro"},
            {"data":"tipodo_estado",
                render: function(data,type,row){
                        if(data=='activo'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"defaultContent":"<button class='editar btn btn-primary'><i class='fa fa-edit'></i></button>"},
            
        ],
  
        "language":idioma_espanol,
        select: true
    });
    tbl_tipodocumento.on('draw.td',function(){
      var PageInfo = $("#tabla_tipo").DataTable().page.info();
      tbl_tipodocumento.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
      });
    });
}


$('#tabla_tipo').on('click', '.editar', function(){
    var data = tbl_tipodocumento.row($(this).parents('tr')).data(); // En tamaño escritorio
    if(tbl_tipodocumento.row(this).child.isShown()){
        var data = tbl_tipodocumento.row(this).data();
    } // Permite llevar los datos cuando es tamaño celular y usas el responsive de tbl_tipodocumento
    $("#modal_editar").modal("show");
    document.getElementById("txt_area_editar").value=data.area_nombre;
    document.getElementById("txt_idarea").value=data.area_cod;
    document.getElementById("txt_status").value=data.area_estado;
})

function AbrirRegistro(){
    $("#modal_registro").modal({backdrop:"static", keyboard:false})
    $("#modal_registro").modal("show");
}

function Registrar_Area() {
    let area = document.getElementById("txt_area").value;
    if(area.length == 0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar un área", "warning");
    }

    $.ajax({
        url: "../controller/area/controlador_registro_area.php",
        type: 'POST',
        data: {
            a: area
        }
    }).done(function(resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "Nuevo Área Registrada", "success").then((value) => {
                    document.getElementById("txt_area").value = "";
                    tbl_tipodocumento.ajax.reload();
                    $("#modal_registro").modal("hide");
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "El área ingresada ya se encuentra en la base de datos", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "No se completó el registro", "error");
        }
    });
}

function Modificar_Area() {
    let id = document.getElementById("txt_area").value;
    let area = document.getElementById("txt_area_editar");
    let esta = document.getElementById("select_status").value;
    if(area.length == 0 || id.length==0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar un área", "warning");
    }

    $.ajax({
        url: "../controller/area/controlador_modificar_area.php",
        type: 'POST',
        data: {
            id:id,
            are: area,
            esta:esta
        }
    }).done(function(resp) {
        if (resp > 0) {
            if (resp == 1) {
                Swal.fire("Mensaje de Confirmación", "Datos Actualizados", "success").then((value) => {
                    tbl_tipodocumento.ajax.reload();
                    $("#modal_editar").modal("hide");
                });
            } else {
                Swal.fire("Mensaje de Advertencia", "El área ingresada ya se encuentra en la  base de datos", "warning");
            }
        } else {
            return Swal.fire("Mensaje de Error", "No se completó la modificación", "error");
        }
    });
}