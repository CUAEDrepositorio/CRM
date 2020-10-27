jq321(document).ready(function () {
	creaIndice();
	if (mezclarPreguntas) { reordenaArreglo(reactivos) };
	creaLV(reactivosMostrar);
	// nueva(reactivosMostrar);
	limpiaRadiosVF();
	jq321("button#btnRevisar").show();
	jq321("button#btnReiniciar").hide();
	iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
});


//  ============================================================================================================
function limpiaRadiosVF() { /*Aqui se alteran titulos */
	jq321("input").prop("disabled", false);
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
			jq321("#btnReiniciar").text("Siguiente intento");
			jq321("th#tV").text("Verdadero");
			jq321("th#tF").text("Falso");
	}
}

function evaluarLV() { //se invoca con el boton "[Revisar]"
	jq321("input").prop("disabled", true);
	jq321(".vacio").removeClass("vacio");
	jq321("[id^=reng]").each(function (indice) {
		if (jq321(this).find("input:checked").length == 0) {
			jq321(this).addClass("vacio");
		}
	});

	var vacios = 0;
	jq321(".row.opcion").each(function () {
		jq321(this).find("span").removeClass("vacio");
		if (jq321(this).find(":checked").length == 0) {
			// jq321(this).find("i").addClass("vacio");
			vacios++;
		}
	})
	if (vacios > 0) {
		mostrarMensaje(2, 3);
		jq321("input").prop("disabled", false);
		return
	}
	jq321("button#btnRevisar").hide();
	jq321("button#btnReiniciar").show();

	var gruposUnicos = Array.from(new Set(grupos));
	console.log(gruposUnicos);

	var gpoUnicoLen = gruposUnicos.length;
	var gpoCal = [];
	var maximo = 0;
	var maxInd = 0;
	for (var i = 0; i < gpoUnicoLen; i++) {
		var gpo = jq321("." + gruposUnicos[i]);
		var suma = 0;
		jq321("." + gruposUnicos[i]).each(function (indice) {
			var marcados = jq321(this).find(":checked");
			suma += parseFloat(jq321(this).find(":checked").val());
		});
		console.log("Suma para " + gruposUnicos[i] + " es " + suma);
		gpoCal.push([gruposUnicos[i], suma]);
		if (suma > maximo) {
			maximo = suma;
			maxInd = i;
		}
	}

	console.log("Calificación máxima es " + maximo);
	guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, maximo, maximo);
	switch (idioma) {
		case "ENG":
			if (mostrarMax) {
				mostrarEval(ic(""), ic("tluseR"), "Your preferent style is:<br/><br/>" + gpoCal[maxInd][0] + ": " + gpoCal[maxInd][1] + " points.");
			}
			else {
				var txtResp = "";
				for (var i = 0; i < gpoCal.length; i++) {
					txtResp += gpoCal[i][0] + ": " + gpoCal[i][1] + " points.<br/>"
				}
				txtResp += "<br/>";
				mostrarEval(ic(""), ic("tluseR"), "Your preferent style is the highest:<br/><br/>" + txtResp);
			}
			break;
		default:
			if (mostrarMax) {
				mostrarEval(ic(""), ic("odatluseR"), "Tu estilo preferente es:<br/><br/>" + gpoCal[maxInd][0] + ": " + gpoCal[maxInd][1] + " puntos.");
			}
			else {
				var txtResp = "";
				for (var i = 0; i < gpoCal.length; i++) {
					txtResp += gpoCal[i][0] + ": " + gpoCal[i][1] + " puntos.<br/>"
				}
				txtResp += "<br/>";
				mostrarEval(ic(""), ic("odatluseR"), "Tu estilo preferente es el puntaje más alto:<br/><br/>" + txtResp);
			}
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
	swal({ title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function reiniciar() {
	cuentaIntentos++;
	if (cuentaIntentos < maxIntentos) {
		jq321("input").prop("disabled", false);
		jq321(".cRbutton").attr("disabled", false);
		jq321(":checked").prop('checked', false);
		jq321("img.tache").css("display", "none");
		jq321("img.palomita").css("display", "none");
		jq321("button#btnRevisar").show();
		jq321("button#btnReiniciar").hide();
		jq321(".retroMal").removeClass("mostrarRetro").addClass("ocultarRetro");
		jq321(".retroBien").removeClass("mostrarRetro").addClass("ocultarRetro");
		correctas = 0;
	}
	else {
		switch (idioma) {
			case "ENG":
				mostrarEval("", "Attention", "You have reached maximum number of attempts: " + maxIntentos + ".");
				break;
			default:
				mostrarEval("", "Atención", "Has alcanzado el número máximo de intentos: " + maxIntentos + ".");
		}
	}
	jq321("button#btnRevisar").show();
	jq321("button#btnReiniciar").hide();
}
