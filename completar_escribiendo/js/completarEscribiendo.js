/**
 * Update: 2017-0821 @marco_caloch
 * By CUAED
 * Update: 2017-1004 @juan_becerril
 */

jq321(function () {
	//var eScormActividad = false; // true si se toma en cuenta como objetivo del scorm, false si no
	//var totalEs = 0;
	var intentosEs = 2; // 0 = ilimitados
	var intentosRealizadosEs = 0;
	//var indiceActividad = 3; //
	iniciarEscribiendo();


	function iniciarEscribiendo() {
		var caja;
		jq321("#completable input").each(function (index) {
			caja = jq321(this);
			caja.attr("class", "");
			var respuesta = jq321(this).data("respuesta"); // atributo definido como data-respuesta en index.html
			if (typeof respuesta === "object") {
				caja.attr("size", String(respuesta[0]).length + 2);
			} else if (typeof respuesta === "string") {
				caja.attr("size", caja.attr("data-respuesta").length + 2);
			}
			caja.focus(function (e) {
				jq321(this).attr("class", "");
			});
		});
		switch (idioma) {
			case "ENG":
				jq321("#btnRevisar").text(ic("kcehC"));
				jq321("#btnReiniciar").text(ic("tpmetta txeN"));
				break;
			default:
				jq321("#btnRevisar").text(ic("rasiveR"));
				jq321("#btnReiniciar").text(ic("otnetni etneiugiS"));
		}
		jq321("button#btnRevisar").show();
		jq321("button#btnReiniciar").hide();
		if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
			if (carruselContinuo) {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
			} else {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			}
			jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
			jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
		}
		iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
	} //fin iniciarEscribiendo

	jq321("button#btnRevisar").click(revisar);
	jq321("button#btnReiniciar").click(reiniciar);


	jq321(".cPaginador").click(function () {
		self = this; //practica para asegurar que estoy en el que dio click....
		jq321(".segmento" + recorreSegmentos).addClass("ocultar");
		if (jq321(self).hasClass('cProximo')) {
			if (carruselContinuo) {
				recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
			} else {
				recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
				if (recorreSegmentos < totalSegmentos) {
					jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
				} else {
					jq321(self).removeClass("visible").addClass("invisible");
					jq321(".cPrevio").removeClass("invisible").addClass("visible");
				}
			}
		} else {
			if (carruselContinuo) {
				recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);
			} else {
				recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);
				if (recorreSegmentos > 1) {
					jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
				} else {
					jq321(self).removeClass("visible").addClass("invisible");
					jq321(".cProximo").removeClass("invisible").addClass("visible");
				}
			}
		}

		jq321(".segmento" + recorreSegmentos).removeClass("ocultar");
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		
	});





	function revisar() {
		var cajas = jq321("#completable input");
		var hayVacias = false;
		jq321.each(cajas, function (indice) {
			if (cajas[indice].value == "") {
				hayVacias = true;
				jq321(cajas[indice]).addClass("vacio");
			}
		});
		if (hayVacias) {
			mostrarMensaje(2, 2);
		} else {
			correctas = 0;
			correctasTotal = 0;
			jq321("#completable p.contenido").each(function (indice1) {
				if (mostrarRetroIndividual) {
					jq321(".retros").css("display", "table-cell");
				}
				buenasParrafo = 0;
				// jq321(this).parent().find("img.palomita, img.tache").css("display", "none");
				jq321(this).parent().find("i.ip, i.it").css("display", "none"); // JLBG may 2, 2019; cambio imagen palomita-tache por icono palomita-tache
				bien = jq321(this).parent().find(".retroBien");
				mal = jq321(this).parent().find(".retroMal");
				var cajasParrafo = jq321(this).find("input").length;
				jq321(this).find("input").each(function (indice2) {
					jq321(this).prop("disabled", true);
					respReal = jq321(this).data("respuesta");
					respEscrita = jq321(this).val();
					if (compararResultados(respReal, respEscrita)) {
						jq321(this).attr("class", "correcto");
						if (mostrarRetroArroba) {
							var xx = jq321(this).nextAll("span").eq(0);
							// jq321(this).nextAll().eq(0).find("img.palomita").css("display", "inline");  // JLBG mzo 18, 2019; muestro la palomita que está a continuación del input
							jq321(this).nextAll().eq(0).find("i.ip").css("display", "inline"); // JLBG may 2, 2019; cambio imagen palomita por icono palomita
						}
						correctas++;
						buenasParrafo++;
					} else {
						jq321(this).attr("class", "incorrecto");
						if (mostrarRetroArroba) {
							// jq321(this).nextAll().eq(1).find("img.tache").css("display", "inline");   // JLBG mzo 18, 2019; muestro el tache que está a continuación del input
							jq321(this).nextAll().eq(1).find("i.it").css("display", "inline"); // JLBG may 2, 2019; cambio imagen tache por icono tache
						}
						if (typeof respReal === "object") {
							mensajeMal = respReal.join(" o ");
							console.log(mensajeMal);
						}
					}
				});
				if (buenasParrafo == cajasParrafo) {
					correctasTotal++;
					if (mostrarRetroIndividual) {
						// jq321(bien).removeClass("ocultarRetro").addClass("mostrarRetro");
						// jq321(this).parent().find("img.palomita").first().css("display", "inline");   // JLBG mzo 18, 2019; muestro solo la retroIndividual correcta
						jq321(this).parent().find("i.ip").first().css("display", "inline"); // JLBG may 6, 2019; muestro solo la retroIndividual correcta
					}
				} else {
					if (mostrarRetroIndividual) {
						// jq321(mal).removeClass("ocultarRetro").addClass("mostrarRetro")
						// jq321(this).parent().find("img.tache").first().css("display", "inline");   // JLBG mzo 18, 2019; muestro solo la retroIndividual incorrecta
						jq321(this).parent().find("i.it").first().css("display", "inline"); // JLBG may 6, 2019; muestro solo la retroIndividual incorrecta
					}
				}
			});

			switch (idioma) {
				case "ENG":
					var txtResp1 = (correctas == 1) ? "right answer" : "right answers";
					var txtResp2 = (correctasTotal == 1) ? "right sentence" : "right sentences";
					var msg1 = (porEspacios || porEnunciados) ? "<span id='resultado'>You have gotten</span><br/>" : "";
					var msg2 = (porEspacios) ? (correctas + "<strong>" + txtResp1 + "</strong> of <strong>" + cajas.length + "</strong> posibles<br/>") : "";
					var msg3 = (porEnunciados) ? (correctasTotal + "<strong>" + txtResp2 + "</strong> of <strong>" + total + "</strong><br/><br/>") : "";
					var tit = ic("tluseR");
					break;
				default:
					var txtResp1 = (correctas == 1) ? "respuesta correcta" : "respuestas correctas";
					var txtResp2 = (correctasTotal == 1) ? "enunciado correcto" : "enunciados correctos";
					var msg1 = (porEspacios || porEnunciados) ? "<span id='resultado'>Obtuviste</span><br/>" : "";
					var msg2 = (porEspacios) ? ("<strong>" + correctas + "</strong> " + txtResp1 + " de <strong>" + cajas.length + "</strong> posibles<br/>") : "";
					var msg3 = (porEnunciados) ? ("<strong>" + correctasTotal + "</strong> " + txtResp2 + " de <strong>" + total + "</strong><br/><br/>") : "";
					var tit = ic("odatluseR");

			}

			if (porEspacios || porEnunciados) {
				var res = (porEspacios) ? (correctas / cajas.length) : (correctasTotal / total);
				// console.log("Evaluacion con " + Math.floor(res));
				mostrarEval("", "", msg1 + msg2 + msg3 + asignarEvaluacion(Math.floor(10 * res)));
			}
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctasTotal, total);
			var totalPreguntas = total;
			var correctasRedondeadas = (porEspacios) ? correctas : correctasTotal; //uuuy no se excluye cuando tambien prenden porEnunciado			intentosRealizadosEs++;
			jq321("button#btnRevisar").hide();
			jq321("button#btnReiniciar").show();
		}
	}

	function compararResultados(valorAtributo, valorEscrito) {
		var respuesta = valorAtributo;
		if (respuesta.indexOf("|") != -1) {
			var resp = respuesta.split("|");
			respuesta = resp;
		}
		if (typeof respuesta === "string") {
			return quitarAcentos(respuesta) === quitarAcentos(valorEscrito);
		} else if (typeof respuesta === "number") {
			return respuesta === parseFloat(valorEscrito);
		} else if (typeof respuesta === "object") {
			return respuesta.some(function (elemento) {
				return compararResultados(elemento, valorEscrito);
			});
		}
	}

	function reiniciar() {
		var caja;
		// verificamos el numero de intentos
		if ((intentosEs == 0) || (intentosRealizadosEs < intentosEs)) {
			jq321("i.ip, i.it").css("display", "none");
			if (mostrarRetroIndividual && !(mostrarRetroFinal)) {
				jq321(".correcto").attr("class", "").val("").prop("disabled", false);
			}
			jq321(".incorrecto").attr("class", "").val("").prop("disabled", false);
			jq321(".retroBien").removeClass("mostrarRetro").addClass("ocultarRetro")
			jq321(".retroMal").removeClass("mostrarRetro").addClass("ocultarRetro")
			jq321(".escribiendo .retroalimentacionFinal .retroRango").removeClass('mostrarRetro').addClass('ocultarRetro');
			if (mostrarRetroIndividual) {
				jq321(".retros").css("display", "none");
			}
		} // fin intentos
		else {
			mostrarMensaje(1);
		} // fin else
		// JLBG mzo 18, 2019; oculto todas las palomitas y taches luego de cada revisión
		// jq321("img.palomita, img.tache").css("display","none");
		jq321("button#btnRevisar").show();
		jq321("button#btnReiniciar").hide();
	}

});
