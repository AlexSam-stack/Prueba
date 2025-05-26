<?php
    require "../../model/model_area.php";
    $MU = new Modelo_Tipo();//instanciando 
    $tipo= strtoupper(htmlspecialchars($_POST["tipo"],ENT_QUOTES,"UTF-8"));
    $consulta= $MU-> Registrar_Tipo($tipo);
    echo $consulta;
?>