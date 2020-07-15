<?php
	
	
	$Estado	= (isset($_POST["Estado"]))?	$_POST["Estado"]	: 0;
	
	
	$ruta	= "img/tracking/";
	
	$img1	= $ruta."paso1.svg";
	$img2	= $ruta."paso2.svg";
	$img3	= $ruta."paso3.svg";
	$img4	= $ruta."paso4.svg";
	
	$union1	= $ruta."union.svg";
	$union2	= $union1;
	$union3 = $union1;
	$union4 = $union1;
	
	switch($Estado){
		case 1:
			$img1	= $ruta."paso1-on.svg";
		break;
		case 2:
			$img1	= $ruta."paso1-on.svg";
			$union1	= $ruta."union-on.svg";
			$img2	= $ruta."paso2-on.svg";
		break;
		case 3:
			$img1	= $ruta."paso1-on.svg";
			$union1	= $ruta."union-on.svg";
			$img2	= $ruta."paso2-on.svg";
			$union2	= $ruta."union-on.svg";
			$img3	= $ruta."paso3-on.svg";
		break;
		case 4:
			$img1	= $ruta."paso1-on.svg";
			$union1	= $ruta."union-on.svg";
			$img2	= $ruta."paso2-on.svg";
			$union2	= $ruta."union-on.svg";
			$img3	= $ruta."paso3-on.svg";
			$union3	= $ruta."union-on.svg";
			$img4	= $ruta."paso4-on.svg";
		break;
	}
	
	// echo $Estado;
	
?>
<section id="buscador-pedidos">
    <div class="banda-status">
        <div class="row  status">
            <div class="modulo">
                <div class="paso">
                    <img class="icono" src="<?php echo $img1; ?>" width="100px" alt="paso1" />
                    <img class="union" src="<?php echo $union1; ?>" width="80px" alt="union1" />
                </div>
                <div class="texto">Pedido Aceptado</div>
            </div>
            <div class="modulo">
                <div class="paso">
                    <img class="icono" src="<?php echo $img2; ?>" width="100px" alt="paso2" />
                    <img class="union" src="<?php echo $union2; ?>" width="80px" alt="union2" />
                </div>
                <div class="texto">En Preparación</div>
            </div>
            <div class="modulo">
                <div class="paso">
                    <img class="icono" src="<?php echo $img3; ?>" width="100px" alt="paso3" />
                    <img class="union" src="<?php echo $union3; ?>" width="80px" alt="union3" />
                </div>
                <div class="texto">Documentado</div>
            </div>
            <div class="modulo">
                <div class="paso">
                    <img class="icono" src="<?php echo $img4; ?>" width="100px" alt="paso4" />
                </div>
                <div class="texto">En Despacho</div>
            </div>
        </div>
    </div>
</section>