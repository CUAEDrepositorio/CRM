	jq341(document).ready(function() {
		console.log("READY de rubrica.js");
		// creaIndice();
		// if (mezclarPreguntas) {reordenaArreglo(reactivos)};
		creaRubrica(reactivosMostrar);
		limpiaRadiosVF();
		jq341("button#btnRevisar").show();
		jq341("button#btnReiniciar").hide();
		iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);
	});

//  ============================================================================================================
function limpiaRadiosVF(){ /*Aqui se alteran titulos */
	jq341("input:radio").attr("checked", false);
	switch (idioma) {
		case "ENG":
			jq341("#btnRevisar").text("Check");
			jq341("#btnReiniciar").text("Restart");
			jq341("th#tV").text("True");
			jq341("th#tF").text("False");
			break;
		default:
			jq341("#btnRevisar").text("Revisar");
			jq341("#btnReiniciar").text("Reiniciar");
			jq341("th#tV").text("Verdadero");
			jq341("th#tF").text("Falso");
	}
}

function revisarRubrica(){ //se invoca con el boton "Revisar"
	jq341("div.grupo").each(function() {
		jq341(this).parent().parent().removeClass("vacio");
		if (jq341(this).children("div.active").length == 0) {
			jq341(this).parent().parent().addClass("vacio");
		}
	});
	if (jq341("div.grupo").parent().parent().hasClass("vacio") ) {
		mostrarMensaje(2, 7);
		return
	}
	jq341("input[type='radio']").parent().parent().prop('disabled',true);
	var suma = 0.0;
	jq341("div.active").each(function() {
		var valor = parseFloat(jq341(this).children("input").val());
		suma += valor;
	});
	suma = Math.round(suma*100)/100;
	
	jq341("button#btnRevisar").hide();
	jq341("button#btnReiniciar").show();
	console.log("evaluacion con " + Math.floor(suma));
	guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, suma, suma);
	switch (idioma) {
		case "ENG":
			var txtResp = (suma == 1) ? "point" : "points";
			mostrarEval(ic(""), ic("tluseR"), "You have gotten " + suma + " " + txtResp + ".<br/><br/>" + asignarEvaluacion(suma));
			break;
		default:
			var txtResp = (suma == 1) ? "punto" : "puntos";
			mostrarEval(ic(""), ic("odatluseR"), "Obtuviste " + suma + " " + txtResp + ".<br/><br/>" + asignarEvaluacion(suma));
	}
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			var btnOK = ic("KO");
			break;
		default:
			var btnOK = ic("ratpecA");
	}
	swal({title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function reiniciar () {
	 window.location.reload();
}
