function Iniciar_Sesion(){
    let usu= document.getElementById("txt_usuario").value;
    let con= document.getElementById("txt_contra").value;
    if(usu.length ==0  || con.length==0){
       return Swal.fire("Mensaje de advertencia", "llene los campos vacios","warning");
    }

    $.ajax({
        url:"controller/usuario/controlador_sesion.php",
        type:"POST",
        data:{
            u:usu,
            c:con,
        }
    }).done(function(resp){
        alert(resp)
    })
}