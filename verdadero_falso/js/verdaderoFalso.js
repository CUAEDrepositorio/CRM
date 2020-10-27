//  ============================================================================================================
function limpiaRadiosVF() { /*Aqui se alteran titulos */
	jq321("input:radio").attr("checked", false);
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text(ic("kcehC"));
			jq321("#btnReiniciar").text(ic("tpmetta txeN"));
			jq321("th#tV").text("True");
			jq321("th#tF").text("False");
			break;
		default:
			jq321("#btnRevisar").text(ic("rasiveR"));
			jq321("#btnReiniciar").text(ic("otnetni etneiugiS"));
			jq321("th#tV").text(encabezados[0]);
			jq321("th#tF").text(encabezados[1]);
	}
}

//  ============================================================================================================
function revisarVF() { //se invoca con el boton "revisar"
	jq321(".vacio").removeClass("vacio");
	jq321("[id^=reng]").each(function (indice) {
		if (jq321(this).find("input:checked").length == 0) {
			jq321(this).addClass("vacio");
		}
	});
	if (jq321(":checked").length != reactivosMostrar) {
		mostrarMensaje(2, 3);
	}
	else {
		correctas = 0;
		jq321("button#btnRevisar").hide();
		jq321("button#btnReiniciar").show();
		jq321("input:radio").attr("disabled", true);

		jq321(".opcioncontenedor").each(function (indice) {
			var valor = jq321("input:radio[name=pregunta" + indice + "]:checked").attr("value");
			if (valor == reactivos[indice].A.toString()) {
				jq321(this).find("i.ip").css("display", "initial");
				jq321(this).addClass("correcto");
				correctas++;
			}
			else {
				jq321(this).find("i.it").css("display", "initial");
				jq321(this).addClass("incorrecto");
			}
		});
		intentos++;
		var res = Math.ceil(10 * correctas / total);
		console.log("Correctas: " + correctas);
		console.log("Total: " + total);
		console.log("Calificación: " + res.toPrecision());
		switch (idioma) {
			case "ENG":
				var txtResp = (correctas == 1) ? ic("rewsna thgir") : ic("srewsna thgir");
				mostrarEval("", ic("tluseR"), ic(" nettog evah uoY") + correctas + " " + txtResp + ic(" fo ") + total + "<br/><br/>" + asignarEvaluacion(res));
				break;
			default:
				var txtResp = ic(".satcerroc satseupser ");
				var txt = ic(" etsivutbO") + correctas + "/" + total + txtResp;
				mostrarEval("", ic("odatluseR"), txt + "<br/><br/>" + asignarEvaluacion(res));
		}
		// guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		// JLBG Jun 03, 2020;  para guardar calificación por distintos criterios
		// -1 : guardar calificación más alta de todos los intentos
		// 0  : guardar calificación del último intento (default-actual)
		// n  : guardar calificación del intento n

		if (guardarCalificacion == 0) {   // guarda siempre -> último intento
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		}
		else if (guardarCalificacion == intentos) {   // guarda en el intento n
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		}
		else if (guardarCalificacion == -1) {    // CALIFICACION MAS ALTA DE TODOS LOS INTENTOS
			if (correctas > califMax) {
				califMax = correctas;
				guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, califMax, total);
				console.log("califMax es " + califMax);
			}
		}
	}
}
//  ============================================================================================================
function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			var btnOK = ic("KO");
			break;
		default:
			var btnOK = ic("ratpecA");
	}
	swal({ title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

//  ============================================================================================================
function reiniciar() {
	jq321(".ip, .it").hide();
	jq321(".opcioncontenedor").removeClass("correcto incorrecto");
	if (intentos < maxIntentos) {
		if (siguienteIntentoBlanco) {
			jq321(".cRbutton").attr("disabled", false);  // HABILITAR
			jq321(":checked").prop('checked', false);   // LIMPIAR
		}
		else {
			jq321(".opcioncontenedor").each(function (indice) {
				var valor = jq321("input:radio[name=pregunta" + indice + "]:checked").attr("value");
				if (valor != reactivos[indice].A.toString()) {
					jq321(this).find(".cRbutton").attr("disabled", false);  // HABILITAR
					jq321(this).find(":checked").prop('checked', false);   // LIMPIAR
				}
				else {
					jq321(this).addClass("correcto");
				}
			});
		}
	}
	else {
		switch (idioma) {
			case "ENG":
				mostrarEval("", "Attention", "You have reached maximum number of attempts: " + maxIntentos + ".");
				break;
			default:
				mostrarEval("", "Atención", "Has alcanzado el máximo número de intentos: " + maxIntentos + ".");
		}
	}
	jq321("button#btnRevisar").show();
	jq321("button#btnReiniciar").hide();
	recorreSegmentos = 1;
	jq321("[class^=segmento]").addClass("ocultar");
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar");
	if (recorreSegmentos < totalSegmentos) {
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		jq321(".cPaginador.cPrevio").addClass("invisible");
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
}

//  ============================================================================================================
function paginar(boton) {
	self = jq321("." + boton);
	// self= this; //practica para asegurar que estoy en el que dio click....
	jq321(".segmento" + recorreSegmentos).removeClass("mostrar").addClass("ocultar");
	if (jq321(self).hasClass('cProximo')) {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
		}
		else {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
			if (recorreSegmentos < totalSegmentos) {
				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
			}
			else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cPrevio").removeClass("invisible").addClass("visible");
			}
		}
	}
	else {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);
		}
		else {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);
			if (recorreSegmentos > 1) {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			}
			else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cProximo").removeClass("invisible").addClass("visible");
			}
		}
	}
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar");
	jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
};
