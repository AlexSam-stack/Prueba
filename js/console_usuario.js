function Iniciar_Sesion(){
    recuerdame();
    let usu= document.getElementById("txt_usuario").value;
    let con= document.getElementById("txt_contra").value;
    if(usu.length ==0  || con.length==0){
      return Swal.fire({
        icon: "warning",
        title: "Mensaje de Advertencia",
        text:"Llene los campos de la sesion",
        heightAuto:false
      })
    }

    $.ajax({
        url:"controller/usuario/controlador_sesion.php",
        type:"POST",
        data:{
            u:usu,
            c:con,
        }
    }).done(function(resp){
        let data =JSON.parse(resp);
        if(data.length>0){
           if(data[0][7]=="INACTIVO"){
            return Swal.fire({
                icon: "warning",
                title: "Mensaje de Advertencia",
                text:"El usuario "+usu+" se encuentra inactivo",
                heightAuto:false
                });
           }

           $.ajax({
            url:"controller/usuario/controlador_crear_sesion.php",
                type:"POST",
                data:{
                    idusuario:data[0][0],
                    usuario:data[0][1],
                    rol:data[0][8]
                }
           }).done(function(r){
                let timerInterval;
                Swal.fire({
                title: "Bienvenido al sistema",
                html: "Seras redireccionado en <b></b> milliseconds.",
                timer: 2000,
                timerProgressBar: true,
                heightAuto:false,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
                });
           })

        }else{
            Swal.fire({
                icon: "error",
                title: "Mensaje de Advertencia",
                text:"Usuario o contraseña incorrecta",
                heightAuto:false
            })
        }
    })
}

function recuerdame(){
    if(rmcheck.checked && usuarioInput.value != "" && passInput.value != ""){
        localStorage.usuario  = usuarioInput.value;
        localStorage.pass      = passInput.value;
        localStorage.checkbox = rmcheck.value;
    }else{
        localStorage.usuario   = "";
        localStorage.pass      = "";
        localStorage.checkbox  = "";
    }
}

var tbl_usuario;
function listar_usuario(){
    tbl_usuario = $("#tabla_usuario").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/usuario/controlador_listar_usuario.php",
            type:'POST'
        },
        "columns":[
            {"defaultContent":""},
            {"data":"usu_usuario"},
            {"data":"area_nombre"},
            {"data":"usu_rol"},
            {"data":"nempleado"},
            {"data":"usu_estatus",
                render: function(data,type,row){
                        if(data=='activo'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"defaultContent":"<button class='btn btn-primary'><i class='fa fa-edit'></i></button>"},
            
        ],
  
        "language":idioma_espanol,
        select: true
    });
    tbl_usuario.on('draw.td',function(){
      var PageInfo = $("#tabla_usuario").DataTable().page.info();
      tbl_usuario.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
      });
    });
}