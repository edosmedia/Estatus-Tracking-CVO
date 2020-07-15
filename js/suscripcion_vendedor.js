var icon_warning = '<i class="fa fa-fw fa-exclamation-triangle"></i> ';

function validarEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function comunasRegion(){
	
	var RegionSuscriptor	= $("#RegionSuscriptor").val();
	RegionSuscriptor		= $.trim(RegionSuscriptor);
	
	if(RegionSuscriptor != ""){
		$.ajax({
			type: "POST"
			,url: "comunasRegion.php"
			,data: { DireccionRegion : RegionSuscriptor }
			,success: function(result){
				$("#ComunaSuscriptor").html(result);
			}
		});
	}
	
}


function tipoSuscripciones(PackSeleccion,OpcionSeleccion){
	
	$("#divOpcionesSuscripcion").html("");
	$("#ulTipoSuscripciones").html("");
	$("#SuscripcionEscogida").html("");
	
	$("#CodSuscripcion").val("");
	$("#MontoSuscripcion").val("");
	$("#MontoFlete").val("");
	
	var RegionSuscriptor = $("#RegionSuscriptor").val();
	
	var SocioMercurio = 0;
	if($("#CheckMercurio").is(":checked")){
		SocioMercurio = 1;
	}
	
	$.ajax({
		type: "POST"
		,url: "tipoSuscripciones.php"
		,data:	{	PackSeleccion		: PackSeleccion
					,OpcionSeleccion	: OpcionSeleccion
					,RegionSuscriptor	: RegionSuscriptor
					,SocioMercurio		: SocioMercurio
				}
		,success: function(result){
			$("#ulTipoSuscripciones").html(result);
		}
	});
	
}

function muestraSuscripcion(TipoSuscripcion,OpcionSeleccion,SocioMercurio){
	
	$("#SuscripcionEscogida").html("");
	$("#SuscripcionEscogida").removeClass();
	
	var RegionSuscriptor = $("#RegionSuscriptor").val();
	
	datos =	{	TipoSuscripcion		: TipoSuscripcion
				,OpcionSeleccion	: OpcionSeleccion
				,RegionSuscriptor	: RegionSuscriptor
				,SocioMercurio		: SocioMercurio
			};
	
	$.ajax({
		type: "POST"
		,url: "opcionesSuscripciones.php"
		,data: datos
		,success: function(result){
			$("#divOpcionesSuscripcion").html(result);
		}
	});
	
}

function seleccionaSuscripcion(CodSuscripcion,NombreSuscripcion,IdIcono,RutaIcono,MontoSuscripcion,MontoFlete){
	
	MontoSuscripcion	= parseInt(MontoSuscripcion);
	MontoFlete			= parseInt(MontoFlete);
	
	TotalSuscripcion	= MontoSuscripcion+MontoFlete;
	
	$("#CodSuscripcion").val(CodSuscripcion);
	$("#MontoSuscripcion").val(MontoSuscripcion);
	$("#MontoFlete").val(MontoFlete);
	
	var html = "";
	
	html = html + '<img src="' + RutaIcono + '" width="50px" />';
	
	html = html + "<b>Suscripción:</b> " + NombreSuscripcion + " ($" + number_format(MontoSuscripcion,0) + ")";
	html = html + "<br><b>Total Suscripción:</b> $" + number_format(TotalSuscripcion,0);
	
	// if(MontoFlete != 0){
		
		// html = html + "<li>Suscripción: $" + number_format(MontoSuscripcion,0) + "</li>";
		// html = html + "<li>Flete: $" + number_format(MontoFlete,0) + "</li>";
		
	// }
	
	
	$("#SuscripcionEscogida").html(html);
	$("#ShowSuscripcion").html(html);
	
	$("#SuscripcionEscogida").removeClass();
	$("#SuscripcionEscogida").addClass("alert alert-info");
	$("#ShowSuscripcion").addClass("alert alert-info");
	
	$("#btnGoStep2").prop("disabled",false);
	
}

tipoSuscripciones();
comunasRegion();

$("#ref_tipo_1").click();




function fnRutCargo(){
	
	var RutCargoSuscriptor	= $("#RutSuscriptor").val();
	rut_format		= $.Rut.formatear(RutCargoSuscriptor,true);	
	rut_format		= rut_format.replace(".", "");
	rut_format		= rut_format.replace(".", "");
	rut_format		= rut_format.replace(".", "");
	$("#RutCargoSuscriptor").val(rut_format);
	
}

function validaRutSuscriptor(){
	
	var RutSuscriptor	= $("#RutSuscriptor").val();
	rut_format			= $.Rut.formatear(RutSuscriptor,true);	
	rut_format			= rut_format.replace(".", "");
	rut_format			= rut_format.replace(".", "");
	rut_format			= rut_format.replace(".", "");
	
	rut_format			= $.trim(rut_format);
	
	validador			= jQuery.Rut.validar(rut_format);
	
	
	if(!validador){
		$("#divErrorRut").html(icon_warning + 'El campo RUT de Suscriptor debe ser válido');
		$("#divErrorRut").addClass("alert alert-danger");
		$("#RutSuscriptor").focus();
	}
	else{
		$("#divErrorRut").html("");
		$("#divErrorRut").removeClass();
	}
	
}

function cambiaTitular(){
	
	var NombreSuscriptor			= $("#NombreSuscriptor").val();
	var ApellidoPaternoSuscriptor	= $("#ApellidoPaternoSuscriptor").val();
	var ApellidoMaternoSuscriptor	= $("#ApellidoMaternoSuscriptor").val();
	
	NombreSuscriptor			= $.trim(NombreSuscriptor);
	ApellidoPaternoSuscriptor	= $.trim(ApellidoPaternoSuscriptor);
	ApellidoMaternoSuscriptor	= $.trim(ApellidoMaternoSuscriptor);
	
	var NombreTitular			= NombreSuscriptor + ' ' + ApellidoPaternoSuscriptor + ' ' + ApellidoMaternoSuscriptor;
	NombreTitular				= $.trim(NombreTitular);
	
	$("#NombreTitular").val(NombreTitular);
	
}

function validaEdad(){
	
	var FechaNacimientoSuscriptor	= $("#FechaNacimientoSuscriptor").val();
	FechaNacimientoSuscriptor		= $.trim(FechaNacimientoSuscriptor);
	
	if(FechaNacimientoSuscriptor != ""){
		
		$.ajax({
			type: "POST"
			,url: "calcula_edad_suscriptor.php"
			,data: { FechaNacimientoSuscriptor : FechaNacimientoSuscriptor }
			,dataType: "json"
			,success: function(result){
				if(result.msg == "Ok"){
					ErrorEdad = 0;
					$("#divErrorFechaNacimiento").html("");
					$("#divErrorFechaNacimiento").removeClass();
				}
				else{
					ErrorEdad = 1;
					$("#divErrorFechaNacimiento").html(icon_warning + result.Obs);
					$("#divErrorFechaNacimiento").addClass("alert alert-danger");
					$("#FechaNacimientoSuscriptor").focus();
				}
				
				$("#ErrorEdad").val(ErrorEdad);
			}
		});
		
	}
	
}

function validaRutCargo(){
	
	var RutCargoSuscriptor	= $("#RutCargoSuscriptor").val();
	rut_format		= $.Rut.formatear(RutCargoSuscriptor,true);	
	rut_format		= rut_format.replace(".", "");
	rut_format		= rut_format.replace(".", "");
	rut_format		= rut_format.replace(".", "");
	
	
	validador		= jQuery.Rut.validar(rut_format);
	
	if(!validador){
		$("#divErrorRutCargo").html(icon_warning + 'El RUT de cargo ingresado no válido');
		$("#divErrorRutCargo").addClass("alert alert-danger");
		$("#RutCargoSuscriptor").focus();
	}
	else{
		$("#divErrorRutCargo").removeClass();
	}
	
}


function goBackStep1(){
	
	$("#fieldData").hide();
	$("#fieldPlan").show();
	
	$("#liProgessData").removeClass();
	
	$("#RegionSuscriptor").focus();
	$("#ShowSuscripcion").hide();
	
	$("#divLogSuscripcion").html("");
	$("#divLogSuscripcion").removeClass();
	
}

function goBackStep2(){
	
	$("#fieldDespacho").hide();
	$("#fieldData").show();
	
	$("#liProgessDespacho").removeClass();
	
	$("#RutSuscriptor").focus();
	
	$("#divLogSuscripcion").html("");
	$("#divLogSuscripcion").removeClass();
	
}

function goBackStep3(){
	
	$("#fieldFacturacion").hide();
	$("#fieldDespacho").show();
	
	$("#divLogSuscripcion").html("");
	$("#divLogSuscripcion").removeClass();
	
}


function grabaSuscriptor(){
	
	var RegionSuscriptor	= $("#RegionSuscriptor").val();
	var CodSuscripcion		= $("#CodSuscripcion").val();
	var MontoSuscripcion	= $("#MontoSuscripcion").val();
	
	
	error = 0;
	
	if(RegionSuscriptor == ""){
		$("#RegionSuscriptor").focus();
		$("#divErrorRegion").html(icon_warning + 'Se debe seleccionar una Región de Suscripción');
		$("#divErrorRegion").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorRegion").html("");
		$("#divErrorRegion").removeClass();
	}
	
	if((CodSuscripcion == "" || MontoSuscripcion == "" || isNaN(MontoSuscripcion)) && error == 0){
		$("#SuscripcionEscogida").html(icon_warning + 'Se debe seleccionar una suscripción para continuar');
		$("#SuscripcionEscogida").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#SuscripcionEscogida").html("");
		$("#SuscripcionEscogida").removeClass();
	}
	
	if(error == 0){
		
		EtapaAlta = 0;
		
		$("#fieldPlan").hide();
		$("#fieldData").show();
		
		$("#liProgessData").addClass("active");
		
		$("#ShowSuscripcion").show();
		$("#RutSuscriptor").focus();
		
		
	}
	
}

function grabaSuscriptor2(){
	
	
	var CodSuscriptor				= $("#CodSuscriptor").val();
	
	var CodSuscripcion				= $("#CodSuscripcion").val();
	var MontoSuscripcion			= $("#MontoSuscripcion").val();
	var MontoFlete					= $("#MontoFlete").val();
	var SocioMercurio				= $("#SocioMercurio").val();
	
	var RutSuscriptor				= $("#RutSuscriptor").val();
	var RutCargoSuscriptor			= $("#RutCargoSuscriptor").val();
	
	var NombreSuscriptor			= $("#NombreSuscriptor").val();
	var ApellidoPaternoSuscriptor	= $("#ApellidoPaternoSuscriptor").val();
	var ApellidoMaternoSuscriptor	= $("#ApellidoMaternoSuscriptor").val();
	
	var EmailSuscriptor				= $("#EmailSuscriptor").val();
	var FechaNacimientoSuscriptor	= $("#FechaNacimientoSuscriptor").val();
	var NacionalidadSuscriptor		= $("#NacionalidadSuscriptor").val();
	var SexoSuscriptor				= $("#SexoSuscriptor").val();
	
	var FonoContactoSuscriptor		= $("#FonoContactoSuscriptor").val();
	var FonoMovilSuscriptor			= $("#FonoMovilSuscriptor").val();
	
	var ErrorEdad					= $("#ErrorEdad").val();
	
	
	RutSuscriptor				= $.trim(RutSuscriptor);
	RutCargoSuscriptor			= $.trim(RutCargoSuscriptor);
	NombreSuscriptor			= $.trim(NombreSuscriptor);
	ApellidoPaternoSuscriptor	= $.trim(ApellidoPaternoSuscriptor);
	ApellidoMaternoSuscriptor	= $.trim(ApellidoMaternoSuscriptor);
	
	EmailSuscriptor				= $.trim(EmailSuscriptor);
	FechaNacimientoSuscriptor	= $.trim(FechaNacimientoSuscriptor);
	NacionalidadSuscriptor		= $.trim(NacionalidadSuscriptor);
	SexoSuscriptor				= $.trim(SexoSuscriptor);
	
	FonoContactoSuscriptor		= $.trim(FonoContactoSuscriptor);
	FonoMovilSuscriptor			= $.trim(FonoMovilSuscriptor);
	
	
	validadorRut				= jQuery.Rut.validar(RutSuscriptor);
	validadorEmail				= validarEmail(EmailSuscriptor);
	
	error = 0;
	
	if(RutSuscriptor == "" || !validadorRut){
		$("#RutSuscriptor").focus();
		$("#divErrorRut").html(icon_warning + "El campo RUT de Suscriptor debe ser válido y no estar vacío");
		$("#divErrorRut").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorRut").html("");
		$("#divErrorRut").removeClass();
	}
	
	if(NombreSuscriptor == "" && error == 0){
		$("#NombreSuscriptor").focus();
		$("#divErrorNombre").html(icon_warning + "El campo Nombre de Suscriptor no debe estar vacío");
		$("#divErrorNombre").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorNombre").html("");
		$("#divErrorNombre").removeClass();
	}
	
	if(ApellidoPaternoSuscriptor == "" && error == 0){
		$("#ApellidoPaternoSuscriptor").focus();
		$("#divErrorApellidoPaterno").html(icon_warning + "El campo Apellido Paterno de Suscriptor no debe estar vacío");
		$("#divErrorApellidoPaterno").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorApellidoPaterno").html("");
		$("#divErrorApellidoPaterno").removeClass();
	}
	
	if(ApellidoMaternoSuscriptor == "" && error == 0){
		$("#ApellidoMaternoSuscriptor").focus();
		$("#divErrorApellidoMaterno").html(icon_warning + "El campo Apellido Materno de Suscriptor no debe estar vacío");
		$("#divErrorApellidoMaterno").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorApellidoMaterno").html("");
		$("#divErrorApellidoMaterno").removeClass();
	}
	
	if((EmailSuscriptor == "" || !validadorEmail) && error == 0){
		$("#EmailSuscriptor").focus();
		$("#divErrorEmail").html(icon_warning + "El campo Email de Suscriptor debe ser válido y no debe estar vacío");
		$("#divErrorEmail").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorEmail").html("");
		$("#divErrorEmail").removeClass();
	}
	
	if(NacionalidadSuscriptor == "" && error == 0){
		$("#NacionalidadSuscriptor").focus();
		$("#divErrorNacionalidad").html(icon_warning + "Se debe seleccionar una Nacionalidad");
		$("#divErrorNacionalidad").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorNacionalidad").html("");
		$("#divErrorNacionalidad").removeClass();
	}
	
	if(SexoSuscriptor == "" && error == 0){
		$("#SexoSuscriptor").focus();
		$("#divErrorSexo").html(icon_warning + "Se debe seleccionar un sexo de Suscriptor");
		$("#divErrorSexo").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorSexo").html("");
		$("#divErrorSexo").removeClass();
	}
	
	if((FechaNacimientoSuscriptor == "" || ErrorEdad == "1") && error == 0){
		$("#FechaNacimientoSuscriptor").focus();
		$("#divErrorFechaNacimiento").html(icon_warning + "El campo Fecha de Nacimiento de Suscriptor no debe estar vacío y Ud. debe ser mayor de 18 años");
		$("#divErrorFechaNacimiento").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorFechaNacimiento").html("");
		$("#divErrorFechaNacimiento").removeClass();
	}
	
	if((FonoContactoSuscriptor == "" || isNaN(FonoContactoSuscriptor)) && error == 0){
		$("#FonoContactoSuscriptor").focus();
		$("#divErrorFonoContacto").html(icon_warning + "El campo Teléfono de Contacto debe ser numérico y no vacío");
		$("#divErrorFonoContacto").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorFonoContacto").html("");
		$("#divErrorFonoContacto").removeClass();
	}
	
	if((FonoMovilSuscriptor == "" || isNaN(FonoMovilSuscriptor)) && error == 0){
		$("#FonoMovilSuscriptor").focus();
		$("#divErrorFonoMovil").html(icon_warning + "El campo Teléfono de Móvil debe ser numérico y no vacío");
		$("#divErrorFonoMovil").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorFonoMovil").html("");
		$("#divErrorFonoMovil").removeClass();
	}
	
	if(error == 0){
		
		$("#btnGoStep3").prop("disabled",true);
		
		EtapaAlta = 1;
		
		$("#divLogSuscripcion").html("Grabando Etapa " + EtapaAlta + "");
		$("#divLogSuscripcion").attr("class","alert alert-info");
		
		
		data_cliente =	{	RutSuscriptor				: RutSuscriptor
							,RutCargoSuscriptor			: RutCargoSuscriptor
							,NombreSuscriptor			: NombreSuscriptor
							,ApellidoPaternoSuscriptor	: ApellidoPaternoSuscriptor
							,ApellidoMaternoSuscriptor	: ApellidoMaternoSuscriptor
							,EmailSuscriptor			: EmailSuscriptor
							,FonoContactoSuscriptor		: FonoContactoSuscriptor
							,FonoMovilSuscriptor		: FonoMovilSuscriptor
							,TipoVia					: ''
							,NombreVia					: ''
							,NumVia						: ''
							,AnexoVia					: ''
							,ComunaSuscriptor			: "1"
						};
		
		$.ajax({
			type: "POST"
			,url: "generaCodSuscriptor.php"
			,data: { CodSuscriptor : CodSuscriptor }
			,dataType: "json"
			,success: function(result){
				
				if(result.msg == "Ok"){
					
					$("#divLogSuscripcion").html("Código de Suscriptor Generado");
					$("#divLogSuscripcion").attr("class","alert alert-info");
					
					CodSuscriptor = result.CodSuscriptor;
					$("#CodSuscriptor").val(CodSuscriptor);
					
					$("#divCodSuscriptor").html("Mi N° de Suscriptor: " + CodSuscriptor + "");
					$("#divCodSuscriptor").show();
					$("#divCodSuscriptor").addClass("alert alert-success");
					
					$.ajax({
						type: "POST"
						,url: "grabaCliente.php"
						,data: data_cliente
						,dataType: "json"
						,success: function(result){
							
							if(result.msg == "Ok"){
								
								$("#divLogSuscripcion").html("Cliente Generado Exitosamente");
								$("#divLogSuscripcion").attr("class","alert alert-info");
								
								CodCliente	= result.CodCliente;
								$("#CodCliente").val(CodCliente);
								
								datos_suscriptor =	{	CodSuscriptor				: CodSuscriptor
														,CodCliente					: CodCliente
														,EtapaAlta					: EtapaAlta
														,CodSuscripcion				: CodSuscripcion
														,MontoSuscripcion			: MontoSuscripcion
														,MontoFlete					: MontoFlete
														,SocioMercurio				: SocioMercurio
														,RutSuscriptor				: RutSuscriptor
														,RutCargoSuscriptor			: RutCargoSuscriptor
														,NombreSuscriptor			: NombreSuscriptor
														,ApellidoPaternoSuscriptor	: ApellidoPaternoSuscriptor
														,ApellidoMaternoSuscriptor	: ApellidoMaternoSuscriptor
														,EmailSuscriptor			: EmailSuscriptor
														,NacionalidadSuscriptor		: NacionalidadSuscriptor
														,SexoSuscriptor				: SexoSuscriptor
														,FechaNacimientoSuscriptor	: FechaNacimientoSuscriptor
														,FonoContactoSuscriptor		: FonoContactoSuscriptor
														,FonoMovilSuscriptor		: FonoMovilSuscriptor
														,TipoVia					: ''
														,NombreVia					: ''
														,NumVia						: ''
														,AnexoVia					: ''
														,ComunaSuscriptor			: "1"
														,MedioPago					: ""
														,NombreTitular				: ""
														,TCMarca					: ""
														,TCNumero					: ""
														,TCVctoMes					: ""
														,TCVctoAnyo					: ""
														,NumCtaCorriente			: ""
														,BancoCuenta				: ""
														,TipoDocRef					: ""
														,FolioRef					: ""
														,CodFormaPagoDocRef			: ""
														,MontoCuota					: 0
														,TotalCuotas				: 0
														
													};
								
								$.ajax({
									type: "POST"
									,url: "grabaSuscriptorVendedor.php"
									,data: datos_suscriptor
									,dataType: "json"
									,success: function(result){
										
										if(result.msg == "Ok"){
											
											$("#divLogSuscripcion").html("Etapa " + EtapaAlta + " Completada");
											$("#divLogSuscripcion").attr("class","alert alert-info");
											
											$("#fieldData").hide();
											$("#fieldDespacho").show();
											
											$("#liProgessDespacho").addClass("active");
											$("#btnGoStep3").prop("disabled",false);
											
											$("#TipoVia").focus();
											
										}
										else{
											
											$("#divLogSuscripcion").html(icon_warning + result.Obs);
											$("#divLogSuscripcion").attr("class","alert alert-danger");
											$("#btnGoStep3").prop("disabled",false);
											
										}
										
									}
									
								});
								
							}
							else{
								
								$("#divLogSuscripcion").html(icon_warning + result.Obs);
								$("#divLogSuscripcion").attr("class","alert alert-danger");
								$("#btnGoStep3").prop("disabled",false);
								
							}
							
						}
						
					});
					
				}
				else{
					$("#divLogSuscripcion").html(icon_warning + result.Obs);
					$("#divLogSuscripcion").attr("class","alert alert-danger");
					$("#btnGoStep3").prop("disabled",false);
				}
				
			}
		});
		
	}
	
}

function grabaSuscriptor3(){
	
	var CodSuscriptor				= $("#CodSuscriptor").val();
	var CodCliente					= $("#CodCliente").val();
	
	var CodSuscripcion				= $("#CodSuscripcion").val();
	var MontoSuscripcion			= $("#MontoSuscripcion").val();
	var MontoFlete					= $("#MontoFlete").val();
	var SocioMercurio				= $("#SocioMercurio").val();
	
	var RutSuscriptor				= $("#RutSuscriptor").val();
	var RutCargoSuscriptor			= $("#RutCargoSuscriptor").val();
	
	var NombreSuscriptor			= $("#NombreSuscriptor").val();
	var ApellidoPaternoSuscriptor	= $("#ApellidoPaternoSuscriptor").val();
	var ApellidoMaternoSuscriptor	= $("#ApellidoMaternoSuscriptor").val();
	
	var EmailSuscriptor				= $("#EmailSuscriptor").val();
	var FechaNacimientoSuscriptor	= $("#FechaNacimientoSuscriptor").val();
	var NacionalidadSuscriptor		= $("#NacionalidadSuscriptor").val();
	var SexoSuscriptor				= $("#SexoSuscriptor").val();
	
	var FonoContactoSuscriptor		= $("#FonoContactoSuscriptor").val();
	var FonoMovilSuscriptor			= $("#FonoMovilSuscriptor").val();
	
	
	var TipoVia						= $("#TipoVia").val();
	var NombreVia					= $("#NombreVia").val();
	var NumVia						= $("#NumVia").val();
	var AnexoVia					= $("#AnexoVia").val();
	var ComunaSuscriptor			= $("#ComunaSuscriptor").val();
	
	RutSuscriptor				= $.trim(RutSuscriptor);
	RutCargoSuscriptor			= $.trim(RutCargoSuscriptor);
	NombreSuscriptor			= $.trim(NombreSuscriptor);
	ApellidoPaternoSuscriptor	= $.trim(ApellidoPaternoSuscriptor);
	ApellidoMaternoSuscriptor	= $.trim(ApellidoMaternoSuscriptor);
	
	EmailSuscriptor				= $.trim(EmailSuscriptor);
	FechaNacimientoSuscriptor	= $.trim(FechaNacimientoSuscriptor);
	NacionalidadSuscriptor		= $.trim(NacionalidadSuscriptor);
	SexoSuscriptor				= $.trim(SexoSuscriptor);
	
	FonoContactoSuscriptor		= $.trim(FonoContactoSuscriptor);
	FonoMovilSuscriptor			= $.trim(FonoMovilSuscriptor);
	
	TipoVia						= $.trim(TipoVia);
	NombreVia					= $.trim(NombreVia);
	NumVia						= $.trim(NumVia);
	AnexoVia					= $.trim(AnexoVia);
	ComunaSuscriptor			= $.trim(ComunaSuscriptor);
	
	error = 0;
	
	if(TipoVia == ""){
		$("#TipoVia").focus();
		$("#divErrorTipoVia").html(icon_warning + "Se debe seleccionar el tipo de vía");
		$("#divErrorTipoVia").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorTipoVia").html("");
		$("#divErrorTipoVia").removeClass();
	}
	
	if(NombreVia == "" && error == 0){
		$("#NombreVia").focus();
		$("#divErrorNombreVia").html(icon_warning + "El campo Nombre de Vía no debe ser vacío´");
		$("#divErrorNombreVia").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorNombreVia").html("");
		$("#divErrorNombreVia").removeClass();
	}
	
	if(NumVia == "" && error == 0){
		$("#NumVia").focus();
		$("#divErrorNumVia").html(icon_warning + "El campo Número de Vía no debe ser vacío´");
		$("#divErrorNumVia").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorNumVia").html("");
		$("#divErrorNumVia").removeClass();
	}
	
	if(ComunaSuscriptor == "" && error == 0){
		$("#ComunaSuscriptor").focus();
		$("#divErrorComuna").html(icon_warning + "Se debe seleccionar la Comuna de Despacho");
		$("#divErrorComuna").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorComuna").html("");
		$("#divErrorComuna").removeClass();
	}
	
	if(error == 0){
		
		EtapaAlta = 2;
		
		$("#btnGoStep4").prop("disabled",true);
		
		$("#divLogSuscripcion").html("Grabando Etapa " + EtapaAlta + "");
		$("#divLogSuscripcion").attr("class","alert alert-info");
		
		datos_suscriptor =	{	CodSuscriptor				: CodSuscriptor
								,CodCliente					: CodCliente
								,EtapaAlta					: EtapaAlta
								,CodSuscripcion				: CodSuscripcion
								,MontoSuscripcion			: MontoSuscripcion
								,MontoFlete					: MontoFlete
								,SocioMercurio				: SocioMercurio
								,RutSuscriptor				: RutSuscriptor
								,RutCargoSuscriptor			: RutCargoSuscriptor
								,NombreSuscriptor			: NombreSuscriptor
								,ApellidoPaternoSuscriptor	: ApellidoPaternoSuscriptor
								,ApellidoMaternoSuscriptor	: ApellidoMaternoSuscriptor
								,EmailSuscriptor			: EmailSuscriptor
								,NacionalidadSuscriptor		: NacionalidadSuscriptor
								,SexoSuscriptor				: SexoSuscriptor
								,FechaNacimientoSuscriptor	: FechaNacimientoSuscriptor
								,FonoContactoSuscriptor		: FonoContactoSuscriptor
								,FonoMovilSuscriptor		: FonoMovilSuscriptor
								,TipoVia					: TipoVia
								,NombreVia					: NombreVia
								,NumVia						: NumVia
								,AnexoVia					: AnexoVia
								,ComunaSuscriptor			: ComunaSuscriptor
								,MedioPago					: ""
								,NombreTitular				: ""
								,TCMarca					: ""
								,TCNumero					: ""
								,TCVctoMes					: ""
								,TCVctoAnyo					: ""
								,NumCtaCorriente			: ""
								,BancoCuenta				: ""
								,TipoDocRef					: ""
								,FolioRef					: ""
								,CodFormaPagoDocRef			: ""
								,MontoCuota					: 0
								,TotalCuotas				: 0
							};
		
		$.ajax({
			type: "POST"
			,url: "grabaSuscriptorVendedor.php"
			,data: datos_suscriptor
			,dataType: "json"
			,success: function(result){
				
				if(result.msg == "Ok"){
					
					$("#divLogSuscripcion").html("Etapa " + EtapaAlta + " Completada");
					$("#divLogSuscripcion").attr("class","alert alert-info");
					
					$("#fieldDespacho").hide();
					$("#fieldFacturacion").show();
					
					$("#liProgessFacturacion").addClass("active");
					
					$("#RutCargoSuscriptor").focus();
					
					$("#btnGoStep4").prop("disabled",false);
					
				}
				else{
					$("#divLogSuscripcion").html(icon_warning + result.Obs);
					$("#divLogSuscripcion").attr("class","alert alert-danger");
					$("#btnGoStep4").prop("disabled",false);
				}
				
			}
			
		});
		
	}
	
}

function finalizaSuscripcion(){
	
	var CodSuscriptor				= $("#CodSuscriptor").val();
	var CodCliente					= $("#CodCliente").val();
	
	var CodSuscripcion				= $("#CodSuscripcion").val();
	var MontoSuscripcion			= $("#MontoSuscripcion").val();
	var MontoFlete					= $("#MontoFlete").val();
	var SocioMercurio				= $("#SocioMercurio").val();
	
	var RutSuscriptor				= $("#RutSuscriptor").val();
	
	var NombreSuscriptor			= $("#NombreSuscriptor").val();
	var ApellidoPaternoSuscriptor	= $("#ApellidoPaternoSuscriptor").val();
	var ApellidoMaternoSuscriptor	= $("#ApellidoMaternoSuscriptor").val();
	
	var EmailSuscriptor				= $("#EmailSuscriptor").val();
	var FechaNacimientoSuscriptor	= $("#FechaNacimientoSuscriptor").val();
	var NacionalidadSuscriptor		= $("#NacionalidadSuscriptor").val();
	var SexoSuscriptor				= $("#SexoSuscriptor").val();
	
	var FonoContactoSuscriptor		= $("#FonoContactoSuscriptor").val();
	var FonoMovilSuscriptor			= $("#FonoMovilSuscriptor").val();
	
	
	var TipoVia						= $("#TipoVia").val();
	var NombreVia					= $("#NombreVia").val();
	var NumVia						= $("#NumVia").val();
	var AnexoVia					= $("#AnexoVia").val();
	var ComunaSuscriptor			= $("#ComunaSuscriptor").val();
	
	
	var RutCargoSuscriptor			= $("#RutCargoSuscriptor").val();
	var MedioPago					= $("#MedioPago").val();
	
	var NombreTitular				= $("#NombreTitular").val();
	
	var TCMarca						= $("#TCMarca").val();
	var TCNumero					= $("#TCNumero").val();
	var TCVctoMes					= $("#TCVctoMes").val();
	var TCVctoAnyo					= $("#TCVctoAnyo").val();
	
	var NumCtaCorriente				= $("#NumCtaCorriente").val();
	var BancoCuenta					= $("#BancoCuenta").val();
	
	var TipoDocRef					= $("#TipoDocRef").val();
	var FolioRef					= $("#FolioRef").val();
	var CodFormaPagoDocRef			= $("#CodFormaPagoDocRef").val();
	var MontoCuota					= $("#MontoCuota").val();
	var TotalCuotas					= $("#TotalCuotas").val();
	var ExisteDoc					= $("#ExisteDoc").val();
	
	
	RutSuscriptor				= $.trim(RutSuscriptor);
	NombreSuscriptor			= $.trim(NombreSuscriptor);
	ApellidoPaternoSuscriptor	= $.trim(ApellidoPaternoSuscriptor);
	ApellidoMaternoSuscriptor	= $.trim(ApellidoMaternoSuscriptor);
	
	EmailSuscriptor				= $.trim(EmailSuscriptor);
	FechaNacimientoSuscriptor	= $.trim(FechaNacimientoSuscriptor);
	NacionalidadSuscriptor		= $.trim(NacionalidadSuscriptor);
	SexoSuscriptor				= $.trim(SexoSuscriptor);
	
	FonoContactoSuscriptor		= $.trim(FonoContactoSuscriptor);
	FonoMovilSuscriptor			= $.trim(FonoMovilSuscriptor);
	
	TipoVia						= $.trim(TipoVia);
	NombreVia					= $.trim(NombreVia);
	NumVia						= $.trim(NumVia);
	AnexoVia					= $.trim(AnexoVia);
	ComunaSuscriptor			= $.trim(ComunaSuscriptor);
	
	RutCargoSuscriptor			= $.trim(RutCargoSuscriptor);
	MedioPago					= $.trim(MedioPago);
	
	NombreTitular				= $.trim(NombreTitular);
	
	TCMarca						= $.trim(TCMarca);
	TCNumero					= $.trim(TCNumero);
	TCVctoMes					= $.trim(TCVctoMes);
	TCVctoAnyo					= $.trim(TCVctoAnyo);
	
	NumCtaCorriente				= $.trim(NumCtaCorriente);
	BancoCuenta					= $.trim(BancoCuenta);
	
	var TipoDocRef				= $.trim(TipoDocRef);
	var FolioRef				= $.trim(FolioRef);
	var CodFormaPagoDocRef		= $.trim(CodFormaPagoDocRef);
	var MontoCuota				= $.trim(MontoCuota);
	var TotalCuotas				= $.trim(TotalCuotas);
	var ExisteDoc				= $.trim(ExisteDoc);
	
	
	validaRutCargo				= jQuery.Rut.validar(RutCargoSuscriptor);
	TCMaxLength					= 16;
	if(TCMarca == "American Express"){
		TCMaxLength				= 15;
	}
	
	var mesActual				= '<?php echo date("m"); ?>';
	var anioActual				= '<?php echo date("Y"); ?>';
	
	error = 0;
	
	
	if(RutCargoSuscriptor == "" || !validaRutCargo){
		$("#RutCargoSuscriptor").focus();
		$("#divErrorRutCargo").html(icon_warning + "El RUT de Cargo ingresado debe ser válido y no vacío");
		$("#divErrorRutCargo").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorRutCargo").html("");
		$("#divErrorRutCargo").removeClass();
	}
	
	if(MedioPago == "" && error == 0){
		$("#MedioPago").focus();
		$("#divErrorMedioPago").html(icon_warning + "Se debe seleccionar el Medio de Pago de Suscripción");
		$("#divErrorMedioPago").addClass("alert alert-danger");
		error = 1;
	}
	else{
		$("#divErrorMedioPago").html("");
		$("#divErrorMedioPago").removeClass();
	}
	
	if(MedioPago == "3" || MedioPago == "9" || MedioPago == "13"){
		
		if(NombreTitular == "" && error == 0){
			$("#NombreTitular").focus();
			$("#divErrorTitular").html(icon_warning + "El campo Titular de Medio de Pago no debe estar vacío");
			$("#divErrorTitular").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorTitular").html("");
			$("#divErrorTitular").removeClass();
		}
		
	}
	
	if(MedioPago == "3"){
		
		if(TCMarca == "" && error == 0){
			$("#TCMarca").focus();
			$("#divErrorTCMarca").html(icon_warning + "Se debe seleccionar una Marca de Tarjeta de Crédito");
			$("#divErrorTCMarca").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorTCMarca").html("");
			$("#divErrorTCMarca").removeClass();
		}
		
		if((isNaN(TCNumero) || TCNumero.length != TCMaxLength) && error == 0){
			$("#TCNumero").focus();
			$("#divErrorTCNumero").html(icon_warning + "El campo Número de Tarjeta debe ser numérico y de " + TCMaxLength + " caracteres");
			$("#divErrorTCNumero").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorTCNumero").html("");
			$("#divErrorTCNumero").removeClass();
		}
		
		if(TCVctoAnyo == anioActual){
			if(TCVctoMes <= mesActual && error == 0){
				$("#TCVctoMes").focus();
				$("#divErrorTCVcto").html(icon_warning + "El mes señalado no puede ser inferior o igual al mes en curso");
				$("#divErrorTCVcto").addClass("alert alert-danger");
				error = 1;
			}
			else{
				$("#divErrorTCVcto").html("");
				$("#divErrorTCVcto").removeClass();
			}
		}
		
	}
	
	if(MedioPago == "9" || MedioPago == "13"){
		
		if(NumCtaCorriente == "" && error == 0){
			$("#NumCtaCorriente").focus();
			$("#divErrorNumCta").html(icon_warning + "Se debe ingresar el N° de Cuenta Corriente del cliente");
			$("#divErrorNumCta").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorNumCta").html("");
			$("#divErrorNumCta").removeClass();
		}
		
		if(BancoCuenta == "" && error == 0){
			$("#BancoCuenta").focus();
			$("#divErrorBanco").html(icon_warning + "Se debe seleccionar el Banco asociado a la Cuenta.");
			$("#divErrorBanco").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorBanco").html("");
			$("#divErrorBanco").removeClass();
		}
		
	}
	
	if(MedioPago == "14"){
		
		if(FolioRef == "" && error == 0){
			$("#FolioRef").focus();
			$("#divErrorFolioRef").html(icon_warning + "Se debe ingresar el Folio del documento de Alianza.");
			$("#divErrorFolioRef").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorFolioRef").html("");
			$("#divErrorFolioRef").removeClass();
		}
		
		if((MontoCuota == "" || isNaN(MontoCuota)) && error == 0){
			$("#MontoCuota").focus();
			$("#divErrorMontoCuota").html(icon_warning + "Se debe ingresar el monto de cuota por Alianza.");
			$("#divErrorMontoCuota").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorMontoCuota").html("");
			$("#divErrorMontoCuota").removeClass();
		}
		
		if(ExisteDoc == "0" && error == 0){
			$("#FolioRef").focus();
			$("#divErrorAlianza").html(icon_warning + "Se debe ingresar un Folio válido y emitido.");
			$("#divErrorAlianza").addClass("alert alert-danger");
			error = 1;
		}
		else{
			$("#divErrorAlianza").html("");
			$("#divErrorAlianza").removeClass();
		}
		
		
	}
	
	if(error == 0){
		
		EtapaAlta = 3;
		
		$("#btnFinalizaSuscripcion").prop("disabled",true);
		$("#btnBackStep3").prop("disabled",true);
		
		$("#divLogSuscripcion").html("Grabando Etapa Final");
		$("#divLogSuscripcion").attr("class","alert alert-info");
		
		datos_suscriptor =	{	CodSuscriptor				: CodSuscriptor
								,CodCliente					: CodCliente
								,EtapaAlta					: EtapaAlta
								,CodSuscripcion				: CodSuscripcion
								,MontoSuscripcion			: MontoSuscripcion
								,MontoFlete					: MontoFlete
								,SocioMercurio				: SocioMercurio
								,RutSuscriptor				: RutSuscriptor
								,RutCargoSuscriptor			: RutCargoSuscriptor
								,NombreSuscriptor			: NombreSuscriptor
								,ApellidoPaternoSuscriptor	: ApellidoPaternoSuscriptor
								,ApellidoMaternoSuscriptor	: ApellidoMaternoSuscriptor
								,EmailSuscriptor			: EmailSuscriptor
								,NacionalidadSuscriptor		: NacionalidadSuscriptor
								,SexoSuscriptor				: SexoSuscriptor
								,FechaNacimientoSuscriptor	: FechaNacimientoSuscriptor
								,FonoContactoSuscriptor		: FonoContactoSuscriptor
								,FonoMovilSuscriptor		: FonoMovilSuscriptor
								,TipoVia					: TipoVia
								,NombreVia					: NombreVia
								,NumVia						: NumVia
								,AnexoVia					: AnexoVia
								,ComunaSuscriptor			: ComunaSuscriptor
								,MedioPago					: MedioPago
								,NombreTitular				: NombreTitular
								,TCMarca					: TCMarca
								,TCNumero					: TCNumero
								,TCVctoMes					: TCVctoMes
								,TCVctoAnyo					: TCVctoAnyo
								,NumCtaCorriente			: NumCtaCorriente
								,BancoCuenta				: BancoCuenta
								,TipoDocRef					: TipoDocRef
								,FolioRef					: FolioRef
								,CodFormaPagoDocRef			: CodFormaPagoDocRef
								,MontoCuota					: MontoCuota
								,TotalCuotas				: TotalCuotas
							};
		
		$.ajax({
			type: "POST"
			,url: "grabaSuscriptorVendedor.php"
			,data: datos_suscriptor
			,dataType: "json"
			,success: function(result){
				
				if(result.msg == "Ok"){
					
					$("#divLogSuscripcion").html("Suscripción Grabada Exitosamente");
					$("#divLogSuscripcion").attr("class","alert alert-info");
					
					$.ajax({
						type: "POST"
						,url: "generaContrato.php"
						,data: { CodSuscriptor : CodSuscriptor }
						,dataType: "json"
						,success: function(result){
							
							if(result.msg == "Ok"){
								
								$("#divLogSuscripcion").html("Contrato Generado Exitosamente");
								$("#divLogSuscripcion").attr("class","alert alert-info");
								
								PdfContrato = result.PdfContrato;
								
								$.ajax({
									type: "POST"
									,url: "enviaMailSuscripcion.php"
									,data:	{	CodSuscriptor	: CodSuscriptor
												,PdfContrato	: PdfContrato
											}
									,dataType: "json"
									,success: function(result){
										
										if(result.msg == "Ok"){
											
											var tiempo	= 5000; // Segundos
											
											$("#divLogSuscripcion").html("Suscripción Finalizada. Será redirigido en " + tiempo/1000 + " segundos.");
											$("#divLogSuscripcion").attr("class","alert alert-info");
											
											setTimeout("window.location='index.php'",tiempo);
											
										}
										else{
											$("#divLogSuscripcion").html(icon_warning + result.Obs);
											$("#divLogSuscripcion").attr("class","alert alert-danger");
										}
										
									}
								});
								
							}
							else{
								$("#divLogSuscripcion").html(icon_warning + result.Obs);
								$("#divLogSuscripcion").attr("class","alert alert-danger");
								$("#btnFinalizaSuscripcion").prop("disabled",false);
								$("#btnBackStep3").prop("disabled",false);
							}
							
						}
					});
					
				}
				else{
					$("#divLogSuscripcion").html(icon_warning + result.Obs);
					$("#divLogSuscripcion").attr("class","alert alert-danger");
					$("#btnFinalizaSuscripcion").prop("disabled",false);
					$("#btnBackStep3").prop("disabled",false);
				}
				
			}
			
		});
		
	}
	
}