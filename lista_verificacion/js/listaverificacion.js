	jq321(document).ready(function() {
		creaIndice();
		if (mezclarPreguntas) {reordenaArreglo(reactivos)};
		creaLV(reactivosMostrar);
		// nueva(reactivosMostrar);
		limpiaRadiosVF();
		jq321("button#btnRevisar").show();
		jq321("button#btnReiniciar").hide();
		iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);
	});


//  ============================================================================================================
function limpiaRadiosVF(){ /*Aqui se alteran titulos */
	jq321("input").prop( "disabled", false );
	jq321("input:radio").attr("checked", false);
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text("Check");
			jq321("#btnReiniciar").text("Restart");
			jq321("th#tV").text("True");
			jq321("th#tF").text("False");
			break;
		default:
			jq321("#btnRevisar").text("Revisar");
			jq321("#btnReiniciar").text("Reiniciar");
			jq321("th#tV").text("Verdadero");
			jq321("th#tF").text("Falso");
	}
}

function evaluarLV(){ //se invoca con el boton "[Revisar]"
	jq321("input").prop( "disabled", true );
	// jq321(".row.opcion").find("i").removeClass("vacio");
	jq321(".vacio").removeClass("vacio");
	jq321("[id^=reng]").each(function(indice){
		if (jq321(this).find("input:checked").length == 0) {
			jq321(this).addClass("vacio");
		}
	});

	if (listaMultiple) {
		var vacios = 0;
		jq321(".row.opcion").each(function(){
			jq321(this).find("span").removeClass("vacio");
			if (jq321(this).find(":checked").length == 0) {
				// jq321(this).find("i").addClass("vacio");
				vacios++;
			}
		})
		if (vacios > 0) {
			mostrarMensaje(2, 3);
			jq321("input").prop( "disabled", false );
			return
		}
	}
	else {
		jq321("i.vacio").removeClass("vacio");
		for (var i = 0; i < reactivosMostrar; i++) {
			var jl = jq321("input:radio[name=preg" + i + "]:checked");
			if (jq321("input:radio[name=preg" + i + "]:checked").length == 0) {
				jq321("input:radio[name=preg" + i + "]").siblings().each(function(i, casilla){
					// jq321(casilla).addClass("vacio");
				});
			}
		}
		if (jq321(":checked").length < reactivosMostrar) { 
			mostrarMensaje(2, 3);
			return
		};
	}
	jq321("button#btnRevisar").hide();
	jq321("button#btnReiniciar").show();

	var suma = 0;
	var sumVis = 0;
	var sumAud = 0;
	var sumCin = 0;
	jq321(":checked").each(function(indice) {
		switch (indice) {
			case 1:
			case 3:
			case 6:
			case 8:
			case 12:
				sumVis += parseFloat(jq321(this).val());
				break;
			case 0:
			case 5:
			case 9:
			case 11:
			case 14:
				sumAud += parseFloat(jq321(this).val());
				break;
			case 2:
			case 4:
			case 7:
			case 10:
			case 13:
				sumCin += parseFloat(jq321(this).val());
				break;
		}
	});

	console.log("evaluacion con " + Math.max(sumVis,sumAud,sumCin));
	guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, Math.max(sumVis,sumAud,sumCin), Math.max(sumVis,sumAud,sumCin));
	switch (idioma) {
		case "ENG":
			var txtResp = (suma == 1) ? "point" : "points";
			mostrarEval(ic(""), ic(""), "Your preferent style is the highest<br/><br/>Visual: " + sumVis + " points<br/>Aural: " + sumAud + " points<br/>Kinesthetic: " + sumCin + " points<br/><br/>");
			break;
		default:
			var txtResp = (suma == 1) ? "punto" : "puntos";
			mostrarEval(ic(""), ic(""), "Tu estilo preferente es el puntaje más alto<br/><br/>Visual: " + sumVis + " puntos<br/>Auditivo: " + sumAud + " puntos<br/>Cinestésico: " + sumCin + " puntos<br/><br/>");
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
	//  window.location.reload();
	jq321("input").prop( "disabled", false );
	cuentaIntentos++;
	if (cuentaIntentos < maxIntentos) {
		jq321(".cRbutton").attr("disabled", false);
		jq321(":checked").prop('checked', false);
		jq321("img.tache").css("display", "none");
		jq321("img.palomita").css("display", "none");   
		jq321("button#btnRevisar").show();
		jq321("button#btnReiniciar").hide();
		jq321(".retroMal").removeClass("mostrarRetro").addClass("ocultarRetro");
		jq321(".retroBien").removeClass("mostrarRetro").addClass("ocultarRetro");
		correctas = 0;
	} else {
		switch (idioma) {
			case "ENG":
				mostrarEval("info", "Information", "You have reached maximum number of attempts: " + maxIntentos);
				break;
			default:
				mostrarEval("info", "Información", "Has alcanzado el número máximo de intentos: " + maxIntentos);
		}
	}
}
