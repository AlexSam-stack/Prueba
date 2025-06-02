<?php
    require "../../model/model_area.php";
    $MU = new Modelo_Tipo();//instanciando 
    $area= strtoupper(htmlspecialchars($_POST["a"],ENT_QUOTES,"UTF-8"));
    $consulta= $MU-> Registrar_Tipo($area);
    echo $consulta;
?>