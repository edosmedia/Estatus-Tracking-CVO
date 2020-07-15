<?php
	
	@session_start();
	
	include("conexion.php");
	include("class/class.carro.php");
	
	
	$_SESSION["ClienteSantander"] == "1234";
	$ClienteSantander	= (isset($_SESSION["ClienteSantander"]))?	$_SESSION["ClienteSantander"]	: "";
	
	$Pagina = $_SERVER["SCRIPT_NAME"];
	
	if($ClienteSantander == "" && $Pagina != "/cronline/validador.php"){
		// header("Location: validador.php?error=2");
	}
	
	
	
	$carro_compra	= new CarroCompra();
	
	$carro_dif	= $carro_compra->get_content();
	
	
	$articulos_total	= $carro_compra->articulos_total();
	$precio_total		= $carro_compra->precio_total();
	
	
	$precio_total		= $precio_total /*- $total_dif*/;
	
	if(empty($articulos_total) || $articulos_total == 0){
		$articulos_total = 0;
	}
	
	if(empty($precio_total) || $precio_total == 0){
		$precio_total = 0;
	}
	
	$dif_total = 0;
	if($articulos_total > 0){
		
		foreach($carro_dif as $d){
			
			$diferencia_pago = $d["diferencia"];
			$dif_total = $dif_total + $diferencia_pago;
			
		}
		
		$show_total = $articulos_total.' Items';
	}
	else{
		$show_total = $articulos_total.' Item';
	}
	
	
	$precio_total		= $precio_total - $dif_total;
	
	
?>


<!DOCTYPE html>
<html lang="es">

<head>
  <!-- Hotjar Tracking Code for www.cavasonline.cl -->

  <script>
  (function(h, o, t, j, a, r) {

    h.hj = h.hj || function() {
      (h.hj.q = h.hj.q || []).push(arguments)
    };

    h._hjSettings = {
      hjid: 1899848,
      hjsv: 6
    };

    a = o.getElementsByTagName('head')[0];

    r = o.createElement('script');
    r.async = 1;

    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;

    a.appendChild(r);

  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  </script>
  <script type="text/javascript" src="js/complentos.js"></script>
  <!--Mail Marketing -->
  <script type="text/javascript"
    src="https://cdn.embluemail.com/pixeltracking/pixeltracking.js?code=1bae1b79c53c98ac7fe44e400f7bd07b">
  </script>
  <script type="text/javascript" src="js/emblue-sdk-worker.js"></script>

  <!-- OnSite EmBlue -->
  <script>
  (function(w, d, k, t, u, s, c, f) {
    f = function(t) {
      t = new Date();
      return t.getFullYear() + '' + (t.getMonth() + 1) + '' + t.getDate() + 'T' + t.getHours() + '' +
        t
        .getMinutes() + '' + t.getSeconds()
    };
    u = 'https://widgets-api.embluemail.com/scripts/3185EF6719A465FA/318/' + f();
    w[k] = w[k] || [];
    s = d.createElement(t);
    s.async = 1;
    s.src = u;
    c = d.getElementsByTagName(t)[0];
    c.parentNode.insertBefore(s, c);
  })(window, document, '_swdg', 'script');
  </script>
  <!-- OnSite EmBlue -->

  <!--Facebook Pixel Code -->
  <script>
  ! function(f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ?
        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
  }(window, document, 'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '2814200152025266');
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=2814200152025266&ev=PageView&noscript=1" /></noscript>
  <!-- End Facebook Pixel Code -->


  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-116303076-1"></script>
  <script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'UA-116303076-1');
  gtag('config', 'AW-809282753');
  </script>


  <!-- Google Analycts -->

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-168768060-1">
  </script>
  <script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'UA-168768060-1');
  </script>




  <title>Cavas Reunidas Online – Las mejores ofertas en Vinos y licores</title>

  <meta charset="utf-8">
  <!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="google-site-verification" content="dBAcvY0Ha4_9_Em1bSTIfIvK1eul-s1-b8u177qkNQU" />
  <meta name="description"
    content="Vinos y licores a un solo click, compra online y nosotros lo despachamos a la puerta de tu hogar, encuentra las mejores ofertas aquí, despacho gratis por compras sobre... " />
  <meta name="keywords"
    content="Beneficios Santander, malbec, syrah, carmenere, petit noir,espumantes, destilados, albariño, brut, cabernet franc, carignan, chardonnay, cinsaul, garnacha, mezcla blanca, mezcla tinta, quebranta, rose, sauvignon blanc, viognier, gran reserva, blend, champenoise, vino reserva, vino gran reserva, vino Premium, vino super Premium, varietal, amaral, andes plateau, bauzá, botalcura, calcu, Carmen, clos de luz, concha y toro, cuatro gallos, de martino, destilería Lynchburg, finca flichman, francois lurton, garzón, gemma, johnnie Walker, laberinto, las veletas, laura hartwig, los boldos, maquis, marqués de Cáceres, montgras, odfjell vineyards, pancho fierro, quintay, santa julia, santa rita, Santiago queirolo, seis luces, tabali, taittinger, tatié, terra noble, undurraga, Valdivieso, ventisquero, ventolera, viu manent, William cole, zuccardi, vinos extranjeros, vinos nacionales, oferta licores, mejores vinos, vinos a domicilio, vinos online, vinos para regalar, vinos chilenos, vinos tintos, vinos por mayor, licores, Suscripción, Venta de vinos, Vinos, Club de Vinos, vinoteca, vinos chilenos, vinos baratos, vino tinto, vino blanco, vinoteca, tienda de vinos, ofertas de vinos, oferta vinos, los mejores vinos, beneficios del santander, mundo del vino, merlot, el mundo del vino, el club, club del vino, champagne, cava de vinos, cabernet sauvignon, bodegas" />
  <meta name="twitter:widgets:theme" content="light">
  <meta property="og:title" content="CAVAS ONLINE" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.cavasonline.cl/tienda/img/logo.svg" />
  <meta property="og:description"
    content="Con más de 10 años de vida y una extensa experiencia, Cavas Reunidas siempre se ha preocupado de seleccionar vinos de calidad y licores para sus clientes, inspiración que decantó en la creación del CAVASONLINE.cl, instancia donde sus cliente experimentarán un placentero viaje por las distintas cepas, viñas del país, diversos licores nacionales y extranjero. Junto con esto, tales como de descuento permanente en la compra de vinos, licores y accesorios en todas las tiendas de CavasOnlines" />
  <meta property="og:url" content="https://www.cavasonline.cl" />
  <meta name="robots" content="index, follow" />
  <script type="text/javascript" src="js/medicion-comercio.js"></script>
  <script type="text/javascript" src="js/complementos.js"></script>

  <!-- Google Fonts -->
  <link
    href='https://fonts.googleapis.com/css?family=Open+Sans:400italic,700,600,800,400,300%7CRoboto:700,400,300%7CMerriweather:400,400italic'
    rel='stylesheet'>

  <!-- Css -->
  <!-- GOOGLE WEB FONT -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Nixie+One&display=swap" rel="stylesheet">
  <!-- BASE CSS -->

  <!-- Css -->
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/bootstrap-select.css" />
  <link rel="stylesheet" href="css/magnific-popup.css" />
  <link rel="stylesheet" href="revolution/css/settings.css" />
  <link rel="stylesheet" href="css/font-icons.css" />
  <link rel="stylesheet" href="css/rev-slider.css" />
  <link rel="stylesheet" href="css/sliders.css" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/style-e.css" />
  <link rel="stylesheet" href="css/spacings.css" />
  <link rel="stylesheet" href="css/animate.min.css" />
  <link href="css/home_1.css" rel="stylesheet">

  <!-- WhatsApp --->

  <!--  
	Favicons
	=============================================
	-->
  <link rel="apple-touch-icon-precomposed" sizes="57x57" href="img/favicons/apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/favicons/apple-touch-icon-114x114.png" />
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/favicons/apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/favicons/apple-touch-icon-144x144.png" />
  <link rel="apple-touch-icon-precomposed" sizes="60x60" href="img/favicons/apple-touch-icon-60x60.png" />
  <link rel="apple-touch-icon-precomposed" sizes="120x120" href="img/favicons/apple-touch-icon-120x120.png" />
  <link rel="apple-touch-icon-precomposed" sizes="76x76" href="img/favicons/apple-touch-icon-76x76.png" />
  <link rel="apple-touch-icon-precomposed" sizes="152x152" href="img/favicons/apple-touch-icon-152x152.png" />
  <link rel="icon" type="image/png" href="img/favicons/favicon-196x196.png" sizes="196x196" />
  <link rel="icon" type="image/png" href="img/favicons/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/png" href="img/favicons/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="img/favicons/favicon-16x16.png" sizes="16x16" />
  <link rel="icon" type="image/png" href="img/favicons/favicon-128.png" sizes="128x128" />
  <meta name="application-name" content="Cavas Online;" />
  <meta name="msapplication-TileColor" content="#FFFFFF" />
  <meta name="msapplication-TileImage" content="img/favicons/mstile-144x144.png" />
  <meta name="msapplication-square70x70logo" content="img/favicons/mstile-70x70.png" />
  <meta name="msapplication-square150x150logo" content="img/favicons/mstile-150x150.png" />
  <meta name="msapplication-wide310x150logo" content="img/favicons/mstile-310x150.png" />
  <meta name="msapplication-square310x310logo" content="img/favicons/mstile-310x310.png" />
  <link rel="manifest" href="img/favicons/manifest.json">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="img/favicons/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">



  <!-- Contador -->





  <!-- WhatsChat.co PRO widget -->
  <script type="text/javascript">
  (function() {
    var options = {
      whatsapp: "56994191065", // WhatsApp number 
      position: "left", // Position may be 'right' or 'left'.
      image: "", //Image to display. Leave blank to display whatsapp defualt icon
    };
    var proto = document.location.protocol,
      host = "https://whatschat.co",
      url = host;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url + '/whatsapp/init.js';
    s.onload = function() {
      getbutton(host, proto, options);
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  })();
  </script>
  <!-- WhatsChat.co PRO widget -->

</head>

  <body style="padding: 0 0 !important;">

    <div id="page">

      <header class="version_2">
        <div class="layer"></div><!-- Mobile menu overlay mask -->
        <div class="top_line version_1 plus_select">
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-sm-10 col-10" style="font-size: 16px;font-weight:bold ;text-align:center;">
                Despacho gratis a todo Chile por compras sobre $50.000
              </div>
              <!-- <div class="col-sm-2 col-2" style=text-align:right;>
                                        <div class="follow_us">
                                             <ul>
                                                  <li><a href="http://twitter.com/cavasonline1"><img
                                                                 src="img/twitter.svg" data-src="img/twitter.svg" alt=""
                                                                 class="lazy"></a></li>
                                                  <li><a href="https://www.facebook.com/CAVAS-online-113298540374033/"><img
                                                                 src="img/facebook.svg" data-src="img/facebook.svg"
                                                                 alt="" class="lazy"></a></li>
                                                  <li><a href="https://www.instagram.com/cavasonline"><img
                                                                 src="img/instagram.svg" data-src="img/instagram.svg"
                                                                 alt="" class="lazy"></a></li>
                                             </ul>
                                        </div>
                                   </div> -->
            </div>
            <!-- End row -->
          </div>
          <!-- End container-->
        </div>
        <div class="main_header Sticky">
          <div class="container">
            <div class="row small-gutters">
              <div class="col-xl-3 col-lg-1 d-lg-flex align-items-center">
                <div id="logo">
                  <a href="index.php"><img src="img/logo.svg" alt="cavasonline" class="logo-r" width="200" height="auto"
                      style="padding-top: 8%;"></a>
                </div>
              </div>
              <nav class="col-xl-6 col-lg-9">
                <a class="open_close" href="javascript:void(0);">
                  <div class="hamburger hamburger--spin">
                    <div class="hamburger-box">
                      <div class="hamburger-inner"></div>
                    </div>
                  </div>
                </a>

                <!-- Mobile menu button -->

                <div class="main-menu">
                  <div id="header_menu">
                    <a href="index.php"><img src="img/logo.svg" alt="" width="100" height="35"></a>
                    <a href="index.php" class="open_close" id="close_in">
                      <i class="ti-close"></i>
                    </a>
                  </div>
                  <ul>
                    <li>
                      <a href="index.php">Home</a>
                    </li>
                    <li>
                      <a href="tienda_online.php">Tienda Online</a>
                    </li>
                    <li>
                      <a href="vinos.php">Vinos</a>
                    </li>
                    <li>
                      <a href="espumantes.php">Espumantes</a>
                    </li>
                    <li>
                      <a href="licores_destilados.php">Licores y Destilados</a>
                    </li>
                    <!--    <li>
                      <a href="packs.php">Packs</a>
                    </li> -->
                    <li>
                      <a href="estucheria.php">Estucheria</a>
                    </li>
                    <li>
                      <a class="tracking-menu" href="tracking.php">Tracking</a>
                    </li>
                  </ul>
                </div>
                <!--/main-menu -->
                <!-- Mobile Cart -->
                <div class="nav-cart-wrap style-1 mobile-cart hidden-lg hidden-md">
                  <ul style="display: inline-flex !important">
                    <li class="boton-busqueda">
                      <i class="fa fa-search hidden-lg mostrar" onClick="javascript: filtraProducto();"></i>

                    <li>
                      <div class="nav-cart">
                        <div class="cart-outer">
                          <div class="cart-inner">
                            <a class="shopping-cart relative" href="carrito.php">
                              <i class="icon-bag"></i>
                              <span id="cartCount"><?php echo $articulos_total; ?></span>
                            </a>
                          </div>
                        </div>
                        <div id="divCartMenuMobile" class="nav-cart-container">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- /dropdown-cart-->
              </nav>
              <!-- Carrito de compra y buscador -->

              <ul id="iconos-menu">
                <li class="boton-busqueda">
                  <i class="fa fa-search hidden-xs" onClick="javascript: filtraProducto();"></i>
                  <div class="buscador hidden-xs">
                    <input type="text" id="bBuscador" placeholder="Busca tu producto favorito"
                      onKeyPress="okFiltraProducto(event);" />
                  </div>
                </li>
                <!--
                                        <li>
                                             <a href="javascript:void(0);" class="search_panel">
                                                  <i class="fa fa-search hidden-xs" > </i>
                                             </a>
                                        </li>
										-->
                <li>
                  <a href="tracking.php">
                    <i class="fa fa-truck hidden-xs" title="Rastrea tu Pedido Aqui!"></i>
                  </a>

                </li>
                <li>
                  <div id="divContentCart" class="nav-cart hidden-xs">
                    <div class="cart-outer float-right">
                      <div class="cart-inner">
                        <a class="shopping-cart relative" href="carrito.php">
                          <i class="icon-bag"></i>
                          <span id="cartCountMobile"><?php echo $articulos_total; ?></span>
                        </a>
                      </div>
                    </div>
                    <div id="divCartMenu" class="nav-cart-container"></div>
                  </div>
                </li>
                <li></li>
              </ul>

            </div>
            <!-- Fin Carrito de y buscador -->

          </div>
          <!-- /row -->
        </div>
    </div>
    <!-- /main_header -->
    </header>
    <!-- /header -->
    <div class="buscador-m hidden-lg" style="display:none; text-align: center">
      <div class="contenedor-buscador">
        <input type="text" id="bBuscador_movil" placeholder="Busca tu producto favorito"
          onKeyPress="okFiltraProducto2(event);" style="width: 80%; text-align: center" />
        <i class="fa fa-search hidden-lg" onClick="javascript: filtraProducto2();"></i>
      </div>
    </div>

    <div class="top_panel">
      <div class="container header_panel">
        <a href="#0" class="btn_close_top_panel" onClick="javascript: limpiaBusqueda();"><i class="ti-close"></i></a>
        <p>Dime tu Consulta?</p>
      </div>
      <!-- /header_panel -->
      <div class="container">
        <div class="search-input">
          <!--<input class="" type="text" id="bBuscador" placeholder="Busca tu producto favorito" onKeyUp="javascript: buscaProducto();" />-->
          <button class="" type="button" onKeyUp="javascript: buscaProducto();">
            <i class="ti-search"></i>
          </button>
        </div>
        <hr>
        <ul id="divProductosBuscador" class="lista-busqueda"></ul>
      </div>
      <!-- /related -->
    </div>
    <!-- /search_panel -->
    <div id="myButton"></div>