<?php
	
	include("conexion.php");
	include("header.php");
	
?>
<section id="buscador-pedidos">
  <div class="container rastreador" style="padding-bottom: 2.3% !important;">
    <form class="text-center buscador-tracking">
      <p>Rastreador de Pedido</p>
      <p style="font-size: 1em;">Elegir una Opción</p>
      <input type="text" class="campo-rut" name="RutCliente" id="RutCliente" onclick="elejirRut();" placeholder="Introducir su RUT" /> ó
      <input type="text" name="NumPedido" id="NumPedido" placeholder="Introducir su Número de Pedido" onclick="nump();" />
      <div class="row">
        <button type="button" class="boton-buscar-tracking btn btn-lg btn-info text-center" style="width: 25%; text-align: center; font-size: small;" onClick="javascript: buscaPedido();">
          <i class="fa fa-fw fa-search"></i> Buscar Pedido
        </button>
      </div>
    </form>
    <hr />
    <div id="divTracking" class="tracking"></div>
  </div>
</section>

<div class="modal fade in modal-raiz" id="ModalMostrarDetalle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dimesiones-tracking">
    <!-- Boton de Salida Mobile Superior-->
    <div class="modal-footer hidden-lg" style="border-top: 0;">
      <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
    </div>
    <!-- END Boton de Salida Mobile Superior-->

    <!--  Grafico de Estatus Pedido Mobile / Escritorio-->
    <div class="modal-content tracking-modal">
      <p class="bg-warning" id="titleDetalle"></p>
      <div id="divModalTracking"></div>
    </div>
    <!--   END Grafico de Estatus Pedido Mobile / Escritorio-->

    <!-- Boton de Salida Mobile / Escritorio-->
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">X</button>
    </div>
    <!--  END Boton de Salida Mobile / Escritorio-->
  </div>
</div>

<?php
	
	include("footer.php");
	
?>
<script>
  function nump() {
    document.getElementsById("RutCliente").prop("disabled", true);
  }

  function elejirRut() {
    document.getElementsById("NumPedido").prop("disabled", true);
  }

  function buscaPedido() {
    var RutCliente = $("#RutCliente").val();
    var NumPedido = $("#NumPedido").val();

    RutCliente = $.trim(RutCliente);
    NumPedido = $.trim(NumPedido);

    $.ajax({
      type: "POST",
      url: "pedido_tracking.php",
      data: {
        RutCliente: RutCliente,
        NumPedido: NumPedido,
      },
      success: function (result) {
        $("#divTracking").html(result);
      },
    });
  }

  function detalleTracking(NotaVenta, Estado) {
    $("#divModalTracking").html("...");

    $.ajax({
      type: "POST",
      url: "detalle_tracking.php",
      data: {
        NotaVenta: NotaVenta,
        Estado: Estado,
      },
      success: function (result) {
        $("#divModalTracking").html(result);
      },
    });
  }
</script>
