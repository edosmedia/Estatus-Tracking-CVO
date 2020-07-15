<?php
	
	include("conexion.php");
	include("../integrador/ws_pos/client/base/posws.client.php");
	
	
	
	
	$RutCliente	= (!empty($_POST["RutCliente"]))?	$_POST["RutCliente"]	: null;
	$NumPedido	= (!empty($_POST["NumPedido"]))?	$_POST["NumPedido"]		: null;
	
	$Token		= "@C4v45@";
	
	
	if(empty($NumPedido) && empty($RutCliente)){
		$html =
			'<h4 class="alert alert-danger">
				<i class=fa fa-fw fa-exclamation-triangle"></i> No hay filtros seleccionados
			</h4>	
			';
		
		die($html);
	}
	
	if($RutCliente != ""){
		$RutCliente	= str_pad($RutCliente,12,"0",STR_PAD_LEFT);
	}
	
	
	$newOrderStatusCROnlineVO = new newOrderStatusCROnlineVO();
	
	
	$newOrderStatusCROnlineVO->pass			= $Token;
	$newOrderStatusCROnlineVO->ordencompra	= $NumPedido;
	$newOrderStatusCROnlineVO->rutcliente	= $RutCliente;
	
	
	$wsTracking = PosWsClient::estadoPedidoCROnline($newOrderStatusCROnlineVO);
	// var_dump($wsTracking);
	$statusWsTracking	= $wsTracking->STATUS;
	$dataWsTracking		= $wsTracking->DATA;
	
	
	if($statusWsTracking == "OK"){
		
		$msg = (isset($dataWsTracking[0]->msg))?	$dataWsTracking[0]->msg	: "";
		$Obs = (isset($dataWsTracking[0]->Obs))?	$dataWsTracking[0]->Obs	: "";
		
		if($msg == "Error"){
			$html =
				'<h4 class="alert alert-danger">
					<i class=fa fa-fw fa-exclamation-triangle"></i> '.$Obs.'
				</h4>	
				';
			
			die($html);
		}
		
		if(empty($dataWsTracking)){
			$html =
				'<h4 class="alert alert-danger">
					<i class=fa fa-fw fa-exclamation-triangle"></i> El campo RUT o Orden Pedidos son Invalidos
				</h4>	
				';
			
			die($html);
		}
		
		$html .=
		'<table id="resultado_tracking">
      <thead>
        <tr>
          <th>N° Pedido</th>
          <th>Orden de Compra</th>
          <th>Nombre del Cliente</th>
          <th>Dirección Despacho</th>
          <th>Monto de Pago</th>
          <th>Tipo Documento</th>
					<th>N° de Documentos</th>
					<th>Detalle Traslado</th>
				</tr>
				<div class="titulo">
          <h3>Tus Pedidos</h3>
        </div>
      </thead>
		';
		
		for($i = 0; $i < count($dataWsTracking); $i++){
			
			$NotaVenta		= $dataWsTracking[$i]->NotaVenta;
			$OrdenCompra	= $dataWsTracking[$i]->OrdenCompra;
			$CodEstado		= $dataWsTracking[$i]->CodEstado;
			$EstadoCygnus	= $dataWsTracking[$i]->EstadoCygnus;
			$Camion			= $dataWsTracking[$i]->Camion;
			
			if($EstadoCygnus == "A" && $Camion <> "000"){
				$CodEstado	= 4;
			}
			
			
			$wsDataPedido			= PosWsClient::dataPedidoCROnline($Token,$NotaVenta);
			
			$statusWsDataPedido		= $wsDataPedido->STATUS;
			$dataWsDataPedido		= $wsDataPedido->DATA;
			
			// var_dump($dataWsDataPedido);
			
			if($statusWsDataPedido == "OK"){
				
				$NombreCliente		= $dataWsDataPedido[0]->NombreCliente;
				$DireccionDespacho	= $dataWsDataPedido[0]->DireccionDespacho;
				$ComunaDespacho		= $dataWsDataPedido[0]->ComunaDespacho;
				$TotalPago			= $dataWsDataPedido[0]->TotalPago;
				$TipoDocumento		= $dataWsDataPedido[0]->TipoDocumento;
				$Folios				= $dataWsDataPedido[0]->Folios;
				
				$TotalPago			= round($TotalPago);
				$TotalPago			= number_format($TotalPago,0,",",".");
				
			}
			
			$parametros = "'$NotaVenta','$CodEstado'";
			
			$html .=
			'<tbody>
        <tr>
          <td data-titulo="N° Pedido:">'.$NotaVenta.'</td>
          <td data-titulo="Orden de Compra:">'.$OrdenCompra.'</td>
          <td data-titulo="Nombre del Cliente:">'.$NombreCliente.'</td>
          <td data-titulo="Dirección Despacho:" class="direccion">'.$DireccionDespacho.', '.$ComunaDespacho.'</td>
          <td data-titulo="Monto de Pago:">'.$TotalPago.'</td>
          <td data-titulo="Tipo Documento:">'.$TipoDocumento.'</td>
					<td data-titulo="N° de Documentos:">'.$Folios.'</td>
						<td data-titulo="Detalle Traslado:">
					<button type="button" class="btn btn-lg btn-info" data-toggle="modal" data-target="#ModalMostrarDetalle" onClick="javascript: detalleTracking('.$parametros.');">
						<i class="fa fa-fw fa-truck"></i>
					</button>
					</td>
        </tr>
      </tbody>';
			
		}
		
		$html .=
		'</>
		';
		
	}
	else{
		$html =
			'<h4 class="alert alert-danger">
				<i class=fa fa-fw fa-exclamation-triangle"></i> '.$wsTracking->ERROR.'
			</h4>	
			';
		
		die($html);
	}
	
	echo $html;