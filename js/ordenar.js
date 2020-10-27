/*
Created by Adib on 18/12/15.
Modified by Adib on 01/02/17.
 * Update: 2017-0821 @marco_caloch
 * By CUAED
Added:
    - Multiple sentences
    - Horizontal scroll
 * Update: 2017-11-15 @juan_becerril
    - number of attempts
	- display feedback
	- windows messages standard
*/
jq321(document).ready(function () { // RAAR Jun 28,18: Lo traigo de index, es chocosa la dispersion....
	if (mezclarPreguntas) { reordenaArreglo(reactivos) };
	creaOrdenar(reactivosMostrar);
	creaRespuestas(respDesordenadas1);
	jq321("button#btnRevisar").show();
	jq321("button#btnReiniciar").hide();
	// mobilepro();
	iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
	jq321("#btnPrevio, #btnProximo").addClass("invisible");
	jq321("#btnPaginador").hide();
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		if (carruselContinuo) {
			jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		} else {
			jq321(".cPaginador.cPrevio").removeClass("visible").addClass("invisible");
		}
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq321("#btnPaginador").show();
	}
	estandarizar();
});

function creaRespuestas(arreglo) {
	jq321(".lista > .sortable").each(function () {
		var piezas = "";
		jq321(this).children("li").each(function () {
			piezas += jq321(this).attr("data-txt");
		});
		arreglo.push(piezas);
	});
}

// jq321(".zoom").click(function () {
function zoom(item) {
	// alert("AQUI");
	var padreImagen = jq321(item).parent().parent().parent().parent();

	jq321(padreImagen).sortable("option", "disabled", true);


	var self = jq321(item);
	// var self = this;
	//	alert ("Zoom "+jq321(self).parents(".respuesta").find(".draggable").attr("data"));
	// var imagen = jq321(self).parents(".respuesta").find(".draggable").attr("data");
	var imagen = jq321(self).attr("src");
	//https://www.w3schools.com/howto/howto_css_modal_images.asp
	var modal = document.getElementById("myModal");
	var modalImg = document.getElementById("imgZoom");
	// Get the <span> element that closes the modal
	///var span = document.getElementsByClassName("close")[0];
	var span = document.getElementById("closeZoom");
	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	}
	modal.style.display = "block";
	//modalImg.src = this.src;

	modalImg.src = imagen;
	// });
	jq321(padreImagen).sortable("option", "disabled", false);
}



jq321(function () {
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text(ic("kcehC"));
			jq321("#btnReiniciar").text(ic("tpmetta txeN"));
			break;
		default:
			jq321("#btnRevisar").text(ic("rasiveR"));
			jq321("#btnReiniciar").text(ic("otnetni etneiugiS"));
	}
	var eScormActividad = false; // true si se toma en cuenta como objetivo del scorm, false si no
	var listas = jq321(".lista > .sortable");
	var intTotal = 0;
	var totalOr = 0;
	jq321('#btnReiniciar').hide();
	jq321('#btnRevisar').show();

	jq321(".sortable").sortable({ //checar el $ a la larga puede funcionar, pero aqui nojala con jq321
		change: function (event, ui) {
			var movement = ui.position.left - ui.originalPosition.left > 0 ? "derecha" : "izquierda";
		}
	});

	jq321("#btnRevisar").click(function () {
		var contador = 0;
		var enunciados = jq321(".lista > .sortable");
		jq321(".lista.vacio").removeClass("vacio");
		respDesordenadas2 = [];
		creaRespuestas(respDesordenadas2);
		var sinOrdenar = false;
		jq321.each(respDesordenadas1, function (i) { //RAAR Ago 20,18: Deshabilito validacion....da lata por que se desodena al azar  y a veces queda correcta y hay que moverle...
			console.log('i = ' + i + ', respDesordenadas1[' + i + '] ' + respDesordenadas1[i] + ' respDesordenadas2[' + i + '] ' + respDesordenadas2[i]);
			if (respDesordenadas1[i] == respDesordenadas2[i]) { //RAAR Jun 28,18: esto esta mal, hay que comparar por textos, y si hay dos articulos iguales?
				console.log('----> igual ' + respDesordenadas1[i] + '  ' + respDesordenadas2[i]);
				sinOrdenar = true;
				jq321("#ulId" + i).parent().addClass("vacio");
			}
		});
		if (sinOrdenar) {
			mostrarMensaje(2, 4);
		}
		else {
			jq321('#btnRevisar').hide();
			jq321('#btnReiniciar').show();
			jq321("input:radio, audio, video, .compr-exp").attr("disabled", true);
			// jq321("[id^=ctrlDeslizante], .controlesVid").css("display", "none");
			jq321("[id^=ctrlDeslizante], .controlesVid").hide();
			jq321('[id^=audio]').each(function () {
				jq321(this)[0].pause();
			});
			if (esPortable()) {
				jq321('[id^=pause]').css("display", "none");
				jq321('[id^=play]').css("display", "block");
			}
			else {
				jq321('[id^=pause]').css("display", "none");
				jq321('[id^=play]').css("display", "block");
			}

			enunciados.each(function (index) {
				jq321(this).sortable("option", "disabled", true);
				var respuestaCorrecta = obtenerEnunciado(jq321(this));
				if (respuestaCorrecta === respOriginales[index]) {
					jq321(this).closest(".lista").removeClass("mal").addClass("bien");
					if (mostrarRetroIndividual) {
						jq321(this).parent().find(".retroBien").removeClass("ocultarRetro").addClass("mostrarRetro");
						jq321(this).find(".ip").show();
					}
					contador++;
				}
				else {
					jq321(this).closest(".lista").removeClass("bien").addClass("mal");
					if (mostrarRetroIndividual) {
						jq321(this).parent().find(".retroMal").removeClass("ocultarRetro").addClass("mostrarRetro")
						jq321(this).find(".it").show();
					}
				}
			});

			var res = Math.floor(10 * contador / total);
			switch (idioma) {
				case "ENG":
					var txtResp = (contador == 1) ? ic("rewsna thgir") : ic("srewsna thgir");
					// mostrarEval(ic("ofni"), ic("tluseR"), ic(" nettog evah uoY") + contador + " " + txtResp + ic(" fo ") + total + "<br/><br/>" + asignarEvaluacion(res));
					mostrarEval("", ic("tluseR"), ic(" nettog evah uoY") + contador + " " + txtResp + ic(" fo ") + total + "<br/><br/>" + asignarEvaluacion(res));
					break;
				default:
					// var txtResp = (contador == 1) ? ic("atcerroc atseupser") : ic("satcerroc satseupser");
					var txtResp = ic(".satcerroc satseupser ");
					// mostrarEval(ic("ofni"), ic("odatluseR"), ic(" etsivutbO") + contador + " " + txtResp + ic(" ed ") + total + "<br/><br/>" + asignarEvaluacion(res));
					var txt = ic(" etsivutbO") + contador + "/" + total + txtResp;
					// mostrarEval("", ic("odatluseR"), ic(" etsivutbO") + contador + " " + txtResp + ic(" ed ") + total + "<br/><br/>" + asignarEvaluacion(res));
					mostrarEval("", ic("odatluseR"), txt + "<br/><br/>" + asignarEvaluacion(res));
			}
			intentos++;
			if (intentos == maxIntentos) {
				jq321(".mal > .resp2").show();
			}
			//save eScormActividad
			var correctas = contador;
			var totalPreguntas = total;

			// JLBG Jun 03, 2020;  para guardar calificación por distintos criterios
			// -1 : guardar calificación más alta de todos los intentos
			// 0  : guardar calificación del último intento (default-actual)
			// n  : guardar calificación del intento n

			if (guardarCalificacion == 0) {   // guarda siempre -> último intento
				guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
			}
			else if (guardarCalificacion == intentos) {   // guarda en el intento n
				guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
			}
			else if (guardarCalificacion == -1) {    // CALIFICACION MAS ALTA DE TODOS LOS INTENTOS
				if (correctas > califMax) {
					califMax = correctas;
					guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, califMax, totalPreguntas);
					console.log("califMax es " + califMax);
				}
			}
		}
	});

	function obtenerEnunciado(lista) {
		var listado = lista;
		var l1 = lista.children("li");
		var resp = [];
		lista.children("li").each(function (index) {
			resp.push(jq321(this).attr("data-txt"));
		});
		return resp.join("@");

		return lista.children("li").toArray().map(function (elemento) {
			return elemento.innerText;
		}).join("@");
	}

	jq321("#btnReiniciar").click(function () {
		listas = jq321(".lista > .sortable");
		if (intentos < maxIntentos) {
			respDesordenadas1 = [];
			jq321(".ip, .it").hide();
			listas.each(function (index) {
				var estaLista = jq321(this);

				if (siguienteIntentoBlanco || estaLista.parent().hasClass("mal")) {
					jq321(this).sortable("option", "disabled", false);
					var tmp2 = respOriginales[index];
					debugRespuesta = tmp2.replace(/@/g, "|");
					tmp1 = respOriginales[index].split("@");
					preg1 = [];
					jq321.each(tmp1, function (indice1) {
						preg1.push([tmp1[indice1], indice1]);
					});
					do {
						preg = [];
						jq321.each(tmp1, function (indice1) {
							preg.push([tmp1[indice1], indice1]);
						});
						reordenaArreglo(preg);
					}
					while (preg.join() == preg1.join());
					estaLista.empty();
					estaLista.parent().find("span").remove("span");
					var valorInicial = respOriginales[index];
					do {
						reordenaArreglo(preg);
						var pregCheck = preg[0][0];
						for (j = 1; j < preg.length; j++) {
							pregCheck += "@" + preg[j][0]
						}
					} while (valorInicial == pregCheck);  // RAAR Jun 28,18: para asegurarnos que no salga igual la lista inicial despues de sortearla, pasa con los pequeños 

					var txt = "";
					for (j = 0; j < preg.length; j++) { // RAAR Jun 28,18:data-orden es para evaluar, data-despliegue es para saber si ha movido algo, debugguear
						var tmp = preg[j][0];

						var resp = [];
						var ext = "";
						var pregunta = tmp;
						var posUltimaDiagonal = pregunta.lastIndexOf('/') + 1;
						if (posUltimaDiagonal != 0) {
							ext = pregunta.toLowerCase().substring(pregunta.lastIndexOf('.') + 1);
						}
						var contador = (index + 1).toString() + (j + 1).toString();
						resp = objetoMultimedia(pregunta, contador);
						var titulo = resp[0];
						var pregunta = resp[1];
						var play = resp[2];
						var pause = resp[3];
						var control = resp[4];
						var barraDeslizante = resp[5];
						var contVideo = resp[6];

						var elemento = '<label class="contenido" id=lbl' + contador + '><span class="opcion" id=opc' + contador + '>' + titulo + pregunta + control + contVideo + barraDeslizante + '</span></label>';
						var pos1 = pregunta.lastIndexOf('<img');
						var pos2 = pregunta.lastIndexOf('<audio');
						var pos3 = pregunta.lastIndexOf('<video');

						if (pos1 >= 0) {
							txt += '<li class="ui-state-active listaImagen" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
						}
						else if (pos2 >= 0) {
							txt += '<li class="ui-state-active listaAudio" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
						}
						else if (pos3 >= 0) {
							txt += '<li class="ui-state-active listaVideo" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
						}
						else {
							txt += '<li class="ui-state-active listaTexto" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
						}
						indImg++;
						if (pos1 >= 0) {
							var p2 = debugRespuesta.replace(tmp, resp[7]);
							debugRespuesta = p2;
						}
						if (pos2 >= 0) {
							var p2 = debugRespuesta.replace(tmp, resp[7]);
							debugRespuesta = p2;
						}
						if (pos3 >= 0) {
							var p2 = debugRespuesta.replace(tmp, resp[7]);
							debugRespuesta = p2;
						} // SOLO PARA DEBUG
					}

					var toolTipSi = '<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[index].F[0], 1) + '">' + palomita + '</span>';
					var toolTipNo = '<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[index].F[1], 1) + '">' + tache + '</span>';

					jq321(estaLista).append(txt + tam(valorInicial, 0) + toolTipSi + toolTipNo);
					jq321(estaLista).parent().append("<span class='debug'><sup>" + debugRespuesta + "</sup></br></span>");
					jq321(estaLista).parent().append("<span class='resp2'>" + debugRespuesta + "</br></span>");
					jq321(".ip, .it").hide();
					jq321(estaLista).sortable();
					jq321(estaLista).disableSelection();
					if (siguienteIntentoBlanco) {
						jq321(".ordenar .lista").removeClass('bien');
					}
				}
			});
			jq321(".ordenar .lista").removeClass('mal');
			creaRespuestas(respDesordenadas1);
			listas.each(function (index) {
				if (jq321(this).parent().hasClass("bien")) {
					var tmp = respDesordenadas1[index];
					tmp += "*";
					respDesordenadas1[index] = tmp;
				}
			});
			jq321("span.debug, span.resp2").hide();
			if (debug) { jq321(".debug").show() }

		}//fin if
		else {
			mostrarMensaje(1);
		}//fin else
		jq321('#btnRevisar').show();
		jq321('#btnReiniciar').hide();
		// mobilepro();

		jq321(document).ready(function () {
			jq321('[data-toggle="tooltip"]').each(function () {
				var options = {
					html: true
				};

				if (jq321(this)[0].hasAttribute('data-type')) {
					options['template'] =
						'<div class="tooltip ' + jq321(this).attr('data-type') + '" role="tooltip">' +
						'	<div class="tooltip-arrow"></div>' +
						'	<div class="tooltip-inner"></div>' +
						'</div>';
				}
				jq321(this).tooltip(options);
			});
		});
		estandarizar();
	});
});

function mobilepro() {
	var imagenes = document.getElementsByClassName("fa-search-plus");
	for (var i = 0; i < imagenes.length; i++) {
		console.log(i);
		var padre = imagenes[i].parentNode;
		padre.setAttribute('id', 'wrap' + (i + 1));
	}
	for (var i = 0; i < imagenes.length; i++) {
		var viewer = new ViewBigimg()
		var wrap = document.getElementById('wrap' + (i + 1))
		// console.log(viewer)
		wrap.onclick = function (e) {
			if (e.target.nodeName === 'IMG') {
				viewer.show(e.target.src)
			}
		}
	}
}
function paginar(boton) {
	self = jq321("." + boton);
	jq321(".segmento" + recorreSegmentos).hide();
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
	jq321(".segmento" + recorreSegmentos).show();
	jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
};
