
/* NOTAS
*/


function iniciar() {
	identificaPlataforma();
	creaArrastrar();
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text("Check"); //ic("Check"
			jq321("#btnReiniciar").text("Next attempt"); //ic("Next attempt")
			break;
		default:
			jq321("#btnRevisar").text("Revisar"); //ic("Revisar")
			jq321("#btnReiniciar").text("Siguiente intento"); //ic("Próximo intento"
	}
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		jq321("#btnPaginador").show();
		if (carruselContinuo) {
			jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		} else {
			jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			jq321(".cPaginador.cPrevio").removeClass("visible").addClass("invisible");
		}
	}


	//	var temp = jq321(".reactivos .lista-preguntas span").length; //?
	//jq321(".reactivos .lista-preguntas span").length; no se porque estaba asi.....
	if (calificaPregunta) { // RAAR oct 14,18: para despues...al desarrollar para AGN el recurso scormu2_act1 se observa...
		// reactivosMostrar funciona con calificaPregunta=true pero si hay preguntas dummy?, por que se necesita que se pueda forzar las preguntas a cierta cantidad...
		// esto implica que no todas las preguntas cuentan para calificacion, esto no tiene problema si solo hay una arroba-casilla por pregunta, pero si es mas de una...no funciona
		totalPreguntas = reactivosMostrar;
	} else {
		totalPreguntas = jq321(".droppable").length;
	}
	DragDrop();
	//	conectividadSCORM.iniciaAmbienteScorm(ambSCORM,barraSCORM,idObjetivo);
	iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
}
function identificaPlataforma() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;/*
	jq321("#watermark").append("<b>appVersion:</b> " + nVer);
	jq321("#watermark").append("<br><b>userAgent:</b> " + nAgt);
	jq321("#watermark").append("<br><b>appName:</b> " + browserName);
	jq321("#watermark").append("<br><b>fullVersion:</b> " + fullVersion);
	jq321("#watermark").append("<br><b>majorVersion:</b> " + majorVersion);
	jq321("#watermark").append("<br><b>platform:</b> " + platform + "<br>");*/
	vBrowser = versionBrowser(); // la declaro global
	//alert (vBrowser.name + " " + vBrowser.version);
	if ("ontouchstart" in document.documentElement) {
		jq321("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo es Touch Screen<br>");
	}
	else {
		jq321("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo NO es Touch Screen<br>");
	}
}

function DragDrop() {
	jq321(".dropup-content .fa-search-plus").click(function () {
		var self = this;
		//	alert ("Zoom "+jq321(self).parents(".respuesta").find(".draggable").attr("data"));
		var imagen = jq321(self).parents(".respuesta").find(".draggable").attr("data");
		//https://www.w3schools.com/howto/howto_css_modal_images.asp
		var modal = document.getElementById("modalZoom");
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
	});


	if (esMobil) {
		jq321(".respuesta .draggable").mouseover(function () {
			jq321(".mostrar .droppable:not(.ocupado):first").removeClass("bordeDrop").addClass("objetivoSeleccionRapida");
		});
		jq321(".respuesta .draggable").mouseleave(function () {
			jq321(".mostrar .droppable").removeClass("objetivoSeleccionRapida").addClass("bordeDrop");
		});
		jq321(".respuesta .draggable").click(function () {
			if (seleccionRapida) {
				var cualLee = jq321('.mostrar .droppable:not(.ocupado):first');
				if (cualLee.length) {			
					agregaResp(jq321('.mostrar .droppable:not(.ocupado):first'), jq321(this)); // orale...jala...
				}
			}
			
		});

	} else {
		jq321(".respuesta .draggable").mouseover(function () {
			/*		//https://www.w3schools.com/howto/howto_css_modal_images.asp
					var modal = document.getElementById("modalZoom");
					var modalImg = document.getElementById("imgZoom");
					// Get the <span> element that closes the modal
					///var span = document.getElementsByClassName("close")[0];
					var span = document.getElementById("closeZoom");
					// When the user clicks on <span> (x), close the modal
					span.onclick = function() { 
					modal.style.display = "none";
					}
					modal.style.display = "block";
					//modalImg.src = this.src;
					//modalImg.src = 'ejemplo/autoconocimiento.png';*/

			if (seleccionRapida) { //.droppable:empty:first
				jq321(".mostrar .droppable:not(.ocupado):first").removeClass("bordeDrop").addClass("objetivoSeleccionRapida");
			}
		});
		jq321(".respuesta .draggable").mouseleave(function () {
			if (seleccionRapida) {
				//jq321( ".droppable" ).css( "background-color", "white" );
				//   jq321( ".mostrar .droppable" ).css( "border", "1px solid #AAAAAA" ); // border: 1px solid #AAAAAA;
				jq321(".mostrar .droppable").removeClass("objetivoSeleccionRapida").addClass("bordeDrop");
			}
		});
		jq321(".respuesta .draggable").dblclick(function () {
			if (seleccionRapida) {
				var cualLee = jq321('.mostrar .droppable:not(.ocupado):first');
				if (cualLee.length) {
					console.log("DOBLE-CLIC: se dio doble clic para respuesta en caja");
					agregaResp(jq321('.mostrar .droppable:not(.ocupado):first'), jq321(this)); // orale...jala...
				}
				//				limpiaRespuestas(); 
			}
		});

	}

	jq321(".cPaginador").mouseover(function () {

		/*	self= this; //practica para asegurar que estoy en el que dio click.... 
			  if (jq321(self).hasClass('cProximo')) {
				if (recorreSegmentos==totalSegmentos) {
					jq321(self).css( "background-color", "red" );
				//	jq321(self).prop( "disabled", "true" )
				}	
			} else {
				if (recorreSegmentos==1) {
					jq321(self).css( "background-color", "red" );
				//	jq321(self).prop( "disabled", "true" )
				}		
				
			}*/
	});
	// jq321(".cPaginador").click(function () {
	// 	self = this; //practica para asegurar que estoy en el que dio click....

	// 	if (jq321(self).hasClass('cProximo')) {
	// 		jq321(".segmento"+recorreSegmentos).removeClass("mostrar").addClass("ocultar");	
	// 		// jq321(".segmento" + recorreSegmentos).hide();
	// 		if (carruselContinuo) {
	// 			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
	// 		} else {
	// 			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
	// 			if (recorreSegmentos < totalSegmentos) {
	// 				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
	// 			} else {
	// 				jq321(self).removeClass("visible").addClass("invisible");
	// 				jq321(".cPrevio").removeClass("invisible").addClass("visible");
	// 			}
	// 		}
	// 		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	// 		// jq321(".segmento" + recorreSegmentos).show();
	// 		//	alert('paginador cProximo'+this.innerText+ ' HTML '+self.innerHTML );
	// 	} else {
	// 		jq321(".segmento"+recorreSegmentos).removeClass("mostrar").addClass("ocultar");	
	// 		// jq321(".segmento" + recorreSegmentos).hide();
	// 		if (carruselContinuo) {
	// 			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);
	// 		} else {
	// 			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);
	// 			if (recorreSegmentos > 1) {
	// 				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
	// 			} else {
	// 				jq321(self).removeClass("visible").addClass("invisible");
	// 				jq321(".cProximo").removeClass("invisible").addClass("visible");
	// 			}
	// 		}
	// 		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	// 		// jq321(".segmento" + recorreSegmentos).show();
	// 		//		alert('paginador cPrevio'+this.innerText+ ' HTML '+self.innerHTML );		
	// 	}
	// 	/*	if (recorreSegmentos < totalSegmentos) {
	// 			jq321(self,".cProximo").addClass("mostrar");
	// 		} else {
	// 			jq321(self,".cProximo").addClass("ocultar");
	// 			jq321(self,".cPrevio").addClass("mostrar");
	// 		}
	// 		if (recorreSegmentos>1) {
	// 			jq321(self,".cPrevio").addClass("mostrar");
	// 		} else {
	// 			jq321(self,".cPrevio").addClass("ocultar");
	// 		}*/

	// 	jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
	// });

	jq321(".draggable").draggable({
		//	 hover: ,
		cursor: 'move', // no percibo que haga algo..., sin definirlo pone el cursor de move
		revert: true, // para que se regrese el elemento a su lugar de origen si no se acepta
		stack: ".draggable",//poner z-index automático, para poner al frente al elemento que se esta moviendo..
		create: function (event, ui) { console.log("draggable creado") },
		drag: function () {					// <<<<<<<<<<<============== JLBG Oct 16, 2019, función para ocultar la lupa al iniciar el arrastre
			console.log("Durante DRAG");
			jq321(this).parent().find(".iconoLupa").css("display", "none");
		},
		stop: function () {					// <<<<<<<<<<<============== JLBG Oct 16, 2019, función para mostrar la lupa al terminar el arrastre
			console.log("Terminando DRAG");
			jq321(this).parent().find(".iconoLupa").css("display", "initial");
			//alert ("fin drag");
		}

	});

	//jq321(".reactivos .lista-preguntas [data-drop] .droppable").droppable({
	jq321(".droppable").droppable({		
		tolerance: 'pointer',
		accept: '.draggable',
		hoverClass: "dragOver",
		drop: function (event, ui) {	 // esto es solo un evento que se dispara..al ACEPTAR

			console.log("DROP: se soltó respuesta en caja");
			agregaResp(jq321(this), jq321(ui.draggable));
		}  // de la función drop
	});    // de la función droppable
	//alert ("drag drop");
}

function limpiaRespuestas() {
	var casillasRespuesta = jq321(".pregunta .draggable").length;
	var ocupados = jq321(".ocupado").length;	
	if (ocupados == casillasRespuesta) { //en lugar de reactivosMostrar pongo la cantidad de casillas, una respuesta para varias casillas...
		jq321(".respuestas").css("display", "none");
		jq321("#carrusel1").hide();
		if (formatoColumnas) { //Para reacomodar la pantalla al eliminar la columna de respuestas
			jq321("#reactivo").removeClass("col-md-9 col-lg-9 col-sm-9 col-xs-9").addClass("col-md-12 col-lg-12 col-sm-12 col-xs-12");
			jq321("#respuesta").removeClass("col-md-3 col-lg-3 col-sm-3 col-xs-3");
		}
		//alert("if ocupados");
	}

	if (carruselRespuestas) {
		var t1 = jq321("div.usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		var t2 = jq321("div#tmp > div");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		if (jq321("div.usado").length == jq321("div#tmp > div").length) {					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321("#carrusel1").hide();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		}					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	}
}

function agregaResp(imagen, arrastrable) { // imagen es un apuntador, un receptor de this....del droppable
	//var numDrag = arrastrable.attr('data-drag'); //esto identifica la casilla de respuestas
	var numQuedan = arrastrable.attr('data-quedan'); // de origen asigno cuantas veces se usa hasta agotar...

	//var pregId =  imagen.attr('data-idu'); // identifica de origen a que pregunta pertenece la casilla de respuestas
	//var casId =  imagen.attr('id'); // El ID es único por casilla de pregunta
	var dataRespuestaReceptor = imagen.attr('data-resp'); // esto es de la pregunta no de casillas....
	//	var dataRespuestaReceptor2 = jq321(imagen).attr('data-resp');		
	//	var idUnico = 'clon' + casId + numDrag.toString(); // A partir del 13-03-2018 la identificación no se duplica. Combino receptor y arrastrable por que puede usarse una respuesata para mas de un receptor...
	//.attr("id",idUnico)
	// podría tomar -data- para obtener la respuesta sin duplicar en data-respuesta, creo que si, pero por ahora los separo conceptualmente....
	var dataRespuestaArrastrable = arrastrable.attr('data-respuesta');
	var dataArrastrable = arrastrable.attr('data');
	var textoArrastrable = arrastrable.text();
	if (jq321(arrastrable).hasClass("clonado")) { //permutas en zona de preguntas, varias validaciones
		if (permutaRespuestas) {
			if (yaUsada(jq321(imagen).parents(".pregunta").attr("id"), jq321(arrastrable).html()) == false) { //podría ser text()... para que no tome dos casillas iguales en el mismo reactivo
				jq321(".mostrar .droppable").removeClass("avisaFaltante").addClass("bordeDrop"); // pinta el borde adecuado
				var dataTemp = jq321(imagen).find(".draggable").attr("data");
				var dataRespuestaTemp = jq321(imagen).find(".draggable").attr("data-respuesta");
				var textoTemp = jq321(imagen).find(".draggable").text();
				// var RA = jq321(imagen).find(".draggable");
				// hoy Feb 16,20 esto ya no fuciono, no se que paso de noviembre para aca...
				/*
				jq321(imagen).find(".draggable")[0].outerHTML=jq321(imagen).find(".draggable")[0].outerHTML; // jaloooooo!!!! Nov 18,19, en chrome un bug requiere que reiniciemos el object por que ya no despliega el cambio de URL, en FireFox trabaja ok.  https://stackoverflow.com/questions/5744207/jquery-outer-html
				jq321(arrastrable)[0].outerHTML=jq321(arrastrable)[0].outerHTML; // jaloooooo!!!! Nov 18,19, en chrome un bug requiere que reiniciemos el object por que ya no despliega el cambio de URL, en FireFox trabaja ok.  https://stackoverflow.com/questions/5744207/jquery-outer-html
				jq321(imagen).find(".draggable").text(textoArrastrable).attr("data",dataArrastrable).attr("data-respuesta",dataRespuestaArrastrable).removeClass(quitarAcentos(dataRespuestaTemp)).addClass(quitarAcentos(dataRespuestaArrastrable)); 
				jq321(arrastrable).text(textoTemp).attr("data",dataTemp).attr("data-respuesta",dataRespuestaTemp).removeClass(quitarAcentos(dataRespuestaArrastrable)).addClass(quitarAcentos(dataRespuestaTemp)); //.addClass(quitarAcentos(dataRespuestaArrastrable))
				*/

				if (jq321(imagen).hasClass("ocupado") != jq321(arrastrable).parent().hasClass("ocupado")) { // es un XOR, actualizo antes de permutar para que se efectivo
					var imClass = jq321(imagen).hasClass("ocupado") ? 'ocupado' : '';
					var arrClass = jq321(arrastrable).parent().hasClass("ocupado") ? 'ocupado' : '';
					jq321(imagen).removeClass('ocupado').addClass(arrClass);
					jq321(arrastrable).parent().removeClass('ocupado').addClass(imClass);
				}

				// RAAR feb 20,20 previamente la tecnica para la permuta era tomar los datos de cada draggable y actualizar cada elemento con los datos del otro elemento a cambiar...
				// pero el tag <object> hoy en dia no actualiza correctamente el cambio de texto a imagen, por que se opto por permutar los objetos reasignando los padres correspondientes...
				var imagenPadre = jq321(imagen);
				var imagenDetached = jq321(imagen).find(".draggable").detach();
				var arrastrablePadre = jq321(arrastrable).parent();
				var arrastrableDetached = jq321(arrastrable).detach();
				imagenDetached.prependTo(arrastrablePadre); //prepend para que quede antes de taches y palomas
				arrastrableDetached.prependTo(imagenPadre);
				//	jq321(imagenDetached).css({ top: "0px",left: "0px"});
				//	jq321(arrastrableDetached).css({ top: "0px",left: "0px"}); // Esto lo necesesita por que en la segnda vuelta se sale del droppable

				//jq321(imagenPadre).appendTo(arrastrableDetached);
				//jq321(arrastrablePadre).appendTo(imagenDetached);
				//	var test = arrastrable.parent;

				// var JL = jq321(imagen).find(".draggable");
				// JL.outerHTML = JL.outerHTML;
				// var JL1 = jq321(arrastrable);
				// JL1.outerHTML = JL1.outerHTML;

				jq321(imagen).find('.palomita').removeClass("mostrar").addClass("ocultar");
				jq321(imagen).find('.tache').removeClass("mostrar").addClass("ocultar");
				jq321(arrastrable.parent()).find('.palomita').removeClass("mostrar").addClass("ocultar");
				jq321(arrastrable.parent()).find('.tache').removeClass("mostrar").addClass("ocultar");


				// jq321(imagen).find('.palomita').hide();
				// jq321(imagen).find('.tache').hide();
				// jq321(arrastrable.parent()).find('.palomita').hide();
				// jq321(arrastrable.parent()).find('.tache').hide();

				if (calificarEnTiempoReal) {
					if (comparaRespuesta(dataRespuestaReceptor, dataRespuestaArrastrable)) {
						jq321(imagen).find('.palomita').removeClass("ocultar").addClass("mostrar");
						// jq321(imagen).find('.palomita').show();
					} else {
						jq321(imagen).find('.tache').removeClass("ocultar").addClass("mostrar");
						// jq321(imagen).find('.tache').show();
					}
				}
				//var temp = arrastrable.parent().attr('data-resp');
				if (dataRespuestaTemp != '') { //si muevo un objeto a una casilla vacia no quiero que marque la abandonada como erronea...
					if (calificarEnTiempoReal) {
						if (comparaRespuesta(arrastrable.parent().attr('data-resp'), dataRespuestaTemp)) {
							jq321(arrastrable.parent()).find('.palomita').removeClass("ocultar").addClass("mostrar");
							// jq321(arrastrable.parent()).find('.palomita').show();
						} else {
							jq321(arrastrable.parent()).find('.tache').removeClass("ocultar").addClass("mostrar");
							// jq321(arrastrable.parent()).find('.tache').show();
						}
					}
				}

			}
		}
	} else { // Si el arrastre es desde zona de respuestas...

		if (yaUsada(jq321(imagen).parents(".pregunta").attr("id"), jq321(arrastrable).html()) == false) { //podría ser text()...
			if (!(jq321(imagen).hasClass("ocupado"))) {
				jq321(".mostrar .droppable").removeClass("avisaFaltante").addClass("bordeDrop"); // pinta el borde adecuado
				if (carruselRespuestas) { // aqui, antes de que numQuedan sea 0
					var spanActivo = jq321("span.active");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
					var idAttrActivo = jq321("span.active").attr("id");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
					var idActivo = idAttrActivo.substring(3);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
					var slideActivo = jq321("#slide" + idActivo);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
					if ( numQuedan == 1 ) {  //si es uno ya es para quitar...por las respuestas que se usan mas de una vez
							jq321(spanActivo).addClass("usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
							jq321(slideActivo).addClass("usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
							showSlides(slideIndex);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
						}
				}

				if (admitirErronea) {
					jq321(imagen).find(".draggable").attr("data", dataArrastrable).text(textoArrastrable).attr("data-respuesta", dataRespuestaArrastrable).addClass(quitarAcentos(dataRespuestaArrastrable));
					numQuedan--;
					arrastrable.attr('data-quedan', numQuedan);// '+quitarAcentos(arrastrableRespuesta)+'"
					imagen.addClass('ocupado');
					if (calificarEnTiempoReal) {
						if (comparaRespuesta(dataRespuestaReceptor, dataRespuestaArrastrable)) {
							jq321(imagen).find('.palomita').removeClass("ocultar").addClass("mostrar");
							// jq321(imagen).find('.palomita').show();
						} else {
							jq321(imagen).find('.tache').removeClass("ocultar").addClass("mostrar");
							// jq321(imagen).find('.tache').show();
						}
					}
				} else {
					if (comparaRespuesta(dataRespuestaReceptor, dataRespuestaArrastrable)) {
						jq321(imagen).find(".draggable").attr("data", dataArrastrable).text(textoArrastrable).attr("data-respuesta", dataRespuestaArrastrable).addClass(quitarAcentos(dataRespuestaArrastrable));
						numQuedan--;
						arrastrable.attr('data-quedan', numQuedan);
						imagen.addClass('ocupado');
						if (calificarEnTiempoReal) {
							if (comparaRespuesta(dataRespuestaReceptor, dataRespuestaArrastrable)) {
								jq321(imagen).find('.palomita').removeClass("ocultar").addClass("mostrar");
								// jq321(imagen).find('.palomita').show();
							} else {
								jq321(imagen).find('.tache').removeClass("ocultar").addClass("mostrar");
								// jq321(imagen).find('.tache').show();
							}
						}
					}
				}

				if (numQuedan < 1) {
					arrastrable.css("display", "none");   // si no los deshabilito pueden seguirse arrastrando...
					arrastrable.parent().css("display", "none");
				}

			}
		}
	}//end if (jq321(imagen).hasClass("clonado"))
	limpiaRespuestas();
}

function yaUsada(tPregunta, tTexto) { //Para verficiar que si la respuestas ya está en alguna casilla de la pregunta...
	//alert (tPregunta);
	//var tRespuesta= jq321 ('.c' + tPregunta+' object');
	var respuestaYaUsada = jq321('.c' + tPregunta + ' object' + ':contains(' + tTexto + ')');	//:contains('Hola')
	if (respuestaYaUsada.length > 0) {
		return true;
	} else {
		return false;
	}
}

function revisar() {
	var ocupados = jq321(".ocupado");
	var casillasPregunta = jq321(".droppable");
	//	if (ocupados.length != casillasRespuesta) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
	if (ocupados.length != casillasPregunta.length) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
		mostrarMensaje(2, 1);
		jq321(".droppable").removeClass("avisaFaltante");
		jq321(".droppable:not(.ocupado)").addClass("avisaFaltante");
	}
	else {
		jq321(".droppable").removeClass("avisaFaltante");
		calificar();
		revisaBuenas();
	}
}

function comparaRespuesta(recibeDrop, recibeColocada) {  // Esta funcion es por que hay puede haber multiples respuestas validas....
	var respStringDrop = "|" + quitarAcentos(recibeDrop) + "|";
	var respStringColocada = "|" + quitarAcentos(recibeColocada) + "|";

	if (respStringDrop.indexOf(respStringColocada) != -1) {
		return true; // si existe la respuesta
	} else {
		return false;
	}
}

function calificar() {
	jq321('#btnRevisar').hide();
	jq321('#btnReiniciar').show();

	var preguntas = jq321(".pregunta");
	var reactivoCorrecto = 0;
	var casillaTotal = 0;

	jq321.each(preguntas, function () {
		var selfPregunta = this;
		jq321(selfPregunta).find(".draggable").draggable(); //RAAR Feb 18:si no uso esto, a partir del tercer intento,  marcar error, que falta inicializar...
		jq321(selfPregunta).find(".draggable").draggable("disable");
		

		var respuestas = jq321(selfPregunta).find(".droppable");
		var casillaCorrecta = 0;
		jq321.each(respuestas, function () {
			var respStringDrop = jq321(this).attr("data-resp");
			var respStringColocada = jq321(this).find(".clonado").attr("data-respuesta");
			if (comparaRespuesta(respStringDrop, respStringColocada)) {
				jq321(this).addClass("correcto");
				casillaCorrecta++;
				if (!calificaPregunta) {
					jq321(this).find(".palomita").show();
				}
			}
			else {
				jq321(this).addClass("incorrecto");
				if (!calificaPregunta) {
					jq321(this).find(".tache").show();
				}
			}
		});
		casillaTotal += casillaCorrecta;
		if (casillaCorrecta == respuestas.length) {
			reactivoCorrecto++;
			//hipoteticamente basta con calificaPregunta, pero si es con calificacion ciega?
			if (mostrarRetroIndividual) { jq321(selfPregunta).find(".palomitaReactivo").show() };
		}
		else {
			if (mostrarRetroIndividual) { jq321(selfPregunta).find(".tacheReactivo").show() };
		}
	});
	//intentos++;
	correctas = (calificaPregunta ? reactivoCorrecto : casillaTotal);
/*  desactivo sept 18, 20 asi eran las retros antes, por que seguía aqui? no se comento  al poner el de arriba que usa .show()
	var listaContestadas = jq321(".droppable"); //Leo las cajas drop, esto es solo para poner palomas o taches
	//console.log (listaContestadas);
	jq321.each(listaContestadas, function (indice) {
		jq321(this).find(".draggable").draggable(); //RAAR Feb 18:si no uso esto, a partir del tercer intento,  marcar error, que falta inicializar...
		jq321(this).find(".draggable").draggable("disable");
		var respStringDrop = jq321(this).attr("data-resp");
		var idDrop = jq321(this).attr("id");
		var respStringColocada = jq321(this).find(".clonado").attr("data-respuesta");
		//	if (respStringDrop == respStringColocada) { // OJO con la funcion regex!!! y aunque no esta aqui hay que estudiarla....	
		if (comparaRespuesta(respStringDrop, respStringColocada)) {
			//jq321(this).addClass("correcto").droppable("disable"); // el disable no permite desplegar a las palomas su retro...
			jq321(this).addClass("correcto");
			// if (mostrarRetroArroba && calificaPregunta == false) {
			if (mostrarRetroArroba) {
				jq321('#'+idDrop).find('.palomita').removeClass("ocultar");
				// jq321('#' + idDrop).find('.palomita').show();
				//jq321(this).parent().parent().find('.palomita').show();
			}
		}
		else {
			jq321(this).addClass("incorrecto");
			// if (mostrarRetroArroba && calificaPregunta == false) {
			if (mostrarRetroArroba) {
				jq321('#'+idDrop).find('.tache').removeClass("ocultar"); 
				// jq321('#' + idDrop).find('.tache').show();
				//jq321(this).parent().parent().find('.tache').show();
			}

		}
	});

	*/
/*	
	var listadoPreguntas = jq321(".lista-preguntas .sub-item");
	var preguntasCorrectas = 0; // Para contar por cada pregunta correcta
	var casillasCorrectas = 0;  // Cuenta todas las casillas correctas
	correctas = 0;
	//console.log (listadoPreguntas);
	jq321.each(listadoPreguntas, function (indice) {
		var tempPregunta = jq321(this).attr("id");
		var sTemp = ".c" + tempPregunta; //el ID es casi igual a la clase, por eso lo uso para identificar la clase de las casillas
		var tempCasilla = jq321(sTemp);
		var temCCorrecta = sTemp + '.correcto'; //busco los objetos que tengan las DOS clases....
		var tempCorrecta = jq321(temCCorrecta);
		// var rTextoBien = jq321(this).children (".retroBien").text();
		//  var rTextoMal = jq321(this).children (".retroMal").text();
		if (tempCasilla.length == tempCorrecta.length) {
			preguntasCorrectas++;
			casillasCorrectas += tempCorrecta.length;
			// if (mostrarRetroIndividual) {
			// 	if (calificaPregunta) {
			// 		jq321(this).find(".palomitaReactivo").removeClass("ocultar").addClass("mostrar");
			// 		// jq321(this).find(".palomitaReactivo").show();
			// 	}
			// }
		}
		else {
			// if (mostrarRetroIndividual) {
			// 	if (calificaPregunta) {
			// 		jq321(this).find(".tacheReactivo").removeClass("ocultar").addClass("mostrar");
			// 		// jq321(this).find(".tacheReactivo").show();
			// 	}
			// }
			casillasCorrectas += (calificaPregunta === true ? 0 : tempCorrecta.length);
		}
	});
	if (calificaPregunta) {
		correctas = preguntasCorrectas;
	} else {
		correctas = casillasCorrectas;
	}
*/
	intentos++;
}

function revisaBuenas() {
	var res = Math.floor(10 * correctas / totalPreguntas);
	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? " right answer." : " right answers.";
			// mostrarEval((esMobil?"":"info"), "Result", "You have gotten " + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			mostrarEval("", "", "You have gotten " + correctas + " " + txtResp + " of " + totalPreguntas + "<br/><br/>" + asignarEvaluacion(res));
			break;
		default:
			// var txtResp = (correctas == 1) ? "respuesta correcta " : "respuestas correctas ";
			var txtResp = (correctas == 1) ? " respuestas correctas." : " respuestas correctas.";
			// mostrarEval((esMobil?"":"info"), "Resultado", "Obtuviste " + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			// mostrarEval("", "Resultado", "Obtuviste " + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			mostrarEval("", "Resultado", "Obtuviste " + correctas + "/" + totalPreguntas + txtResp + "<br/><br/>" + asignarEvaluacion(res));
	}
	//console.log("evaluacion " + correctas + " " + txtResp + " :--: " + totalPreguntas);
	//guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
	switch (guardarCalificacion) {
		case 0:
			guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
		break;
		case -1:
			calificacionMasAlta = ( correctas > calificacionMasAlta ? correctas : calificacionMasAlta);
			if ((intentos+1) == maxIntentos) {
				guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, calificacionMasAlta, totalPreguntas);
			} 
		break;	
		default:
			if ((intentos+1) == guardarCalificacion) {
				guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
			}
		break;
	}
}

function reiniciar() {  //se invoca en el boton Next Atempt, quito taches y activo casillas de respuesta....
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
		var cuentaCorrectas = 0;
		if (calificaPregunta == true) {
			cuentaCorrectas = reactivosMostrar;
		} else {
			cuentaCorrectas = jq321(".droppable").length;
		}
		if ((correctas != cuentaCorrectas) || siguienteIntentoBlanco) {
			jq321(".respuestas").css("display", "block"); //RAAR Feb 20,19: Revisar, doble ocultamiento contra renglon 452 jq321.each(respInc, function(indice) {
			if (formatoColumnas) {
				jq321("#reactivo").removeClass("col-md-12 col-lg-12 col-sm-12 col-xs-12").addClass("col-md-9 col-lg-9");
				jq321("#respuesta").addClass("col-md-3 col-lg-3");
				/*			if (!(esTexto)) {
								jq321("#reactivo").addClass("col-sm-9 col-xs-9");
								jq321("#respuesta").addClass("col-sm-3 col-xs-3");
							}*/
			}
		}
		
		//var cuenta = 0;
		jq321('.tache').hide();
		jq321('.tacheReactivo').hide();
		 jq321('.palomita').hide();
		 jq321('.palomitaReactivo').hide();
		var listadoPreguntas = jq321(".lista-preguntas .sub-item");
		jq321.each(listadoPreguntas, function (indice) { //Recorro cada reactivo....
			selfSubItem = this;
			var incorrecto = jq321(selfSubItem).find(".incorrecto");
			jq321.each(incorrecto, function (indIncorrecta) {
				selfIncorrecto = this;
				//dataRespuestaTemp = jq321(selfIncorrecto).find(".draggable").attr("data-respuesta");
				//dataRespuestaTemp = dataRespuestaTemp === undefined ? '':dataRespuestaTemp; // valido por que truena.. en el quitarAcentos
				jq321(selfIncorrecto).find(".draggable").remove(); //las que remuevo estanban con el draggable disable, las nuevas ya lo traen activo
				jq321(selfIncorrecto).prepend(jq321("#reservorio").find(".draggable:first-child"));
			});
			var incorrecto = jq321(selfSubItem).find(".incorrecto"); //por que se tiene que declarar de nuevo? si no lo hago la variable está vacia.... feb 20, RAAR
			jq321(incorrecto).removeClass("incorrecto ocupado");
			if (siguienteIntentoBlanco) {
				jq321(this).find(".palomita").hide();	
				jq321(this).find(".palomitaReactivo").hide();	
				var correcto = jq321(selfSubItem).find(".correcto");
				jq321.each(correcto, function (indcorrecta) {  //se recorre por cada casilla correcta en el reactivo
					jq321(correcto).find(".draggable").remove();
					jq321(correcto).append(jq321("#reservorio").find(".draggable:first-child"));
					jq321(correcto).removeClass("correcto ocupado");
					jq321(correcto).droppable('enable');
				});
			}

		});
		var respInc = jq321("object.draggable"); // eso se pude reducir poniendo una clase RESPUESTA en el object..., s
		jq321.each(respInc, function (indice) {
			var numQuedan = jq321(this).attr('data-quedanInicial'); // Al debuggear Inicial aparece con minuscula inicial, ojo con esto....
			jq321(this).attr('data-quedan', numQuedan); //RAAR Ago 3,18: reinicio el contador de uso de las casillas respuesta....											
			jq321(this).attr("style", "position: relative;").css("display", "");
			jq321(this).parent().css("display", "");
		});
		/* DE DONDE SALIO ESTO? 
		jq321("div[class*='segmento']").hide();
		recorreSegmentos = 1; // el primer segmento a desplegar...
		jq321(".segmento" + recorreSegmentos).show();
		if (totalSegmentos > recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
			jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
			jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
			// jq321("#btnPaginador").show();
		}
		if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
			if (carruselContinuo) {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
			} else {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
				jq321(".cPaginador.cPrevio").removeClass("visible").addClass("invisible");
			}
		}
		*/

		if (carruselRespuestas) {
			jq321("div.mySlides > div.respuesta").css("display", "");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321("div.mySlides > div.respuesta > object").css("display", "");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321("#carrusel1").show();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321(".usado").show();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321(".usado").removeClass("usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			slideIndex = 0;					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			showSlides(slideIndex);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		}
	}
	else {
		mostrarMensaje(1);
	}
}

function quitarAcentos(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; //Le tengo que quitar que elimine la coma, para que la comparacion funcione	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
	var to = "aaaaeeeeiiiioooouuuunc------"; // RAAR, Ago13,18, le agrego de nuevo la coma, funcionara?, por las clases para las casillas de respuesta....
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -|]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
	return str;
}//

function versionBrowser() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;
	var minorVersion, nameOffset, verOffset, ix, cad1, cad2;

	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) OPiOS/14.0.0.104835 Mobile/13G36 Safari/9537.53";  //OPERA
	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) FxiOS/8.1.1b4948 Mobile/13G36 Safari/601.1.46";  //Firefox
	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) CriOS/60.0.3112.89 Mobile/13G36 Safari/601.1.46";  //Chrome
	//	
	//	platform = "iPad";
	if (platform == "iPad") {
		// firefox - FxiOS substring de userAgent FxiOS/8.1.1b4948
		// chrome  - CriOS substring de userAgent CriOS/60.0.3112.89
		// opera   - OPiOS substring de userAgent OPiOS/14.0.0.104835
		cad1 = nAgt.substring(nAgt.lastIndexOf("iOS") - 2);
		cad2 = cad1.split(" ");
		browserName = cad2[0].substring(0, cad2[0].lastIndexOf("/"));
		if (browserName == "CriOS") { browserName = "Chrome" };
		if (browserName == "FxiOS") { browserName = "Firefox" };
		if (browserName == "OPiOS") { browserName = "Opera" };
		fullVersion = cad2[0].substring(cad2[0].lastIndexOf("/") + 1);
	}
	else {
		cad1 = nAgt.substring(nAgt.lastIndexOf(" ") + 1);
		// Edge, Firefox, Opera
		if (((cad1.indexOf("Edge")) != -1) || ((cad1.indexOf("Firefox")) != -1) || ((cad1.indexOf("OPR")) != -1)) {
			browserName = cad1.substring(0, cad1.indexOf("/"));
			if (browserName == "OPR") browserName = "Opera";
			fullVersion = cad1.substring(cad1.indexOf("/") + 1);
		}
		else {
			// Safari
			cad2 = nAgt.substring(nAgt.indexOf("Version"));
			if (((cad2.indexOf("Version")) != -1)) {
				browserName = cad2.substring(cad2.lastIndexOf(" ") + 1, cad2.lastIndexOf("/"));
				fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
			}
			else {
				// Chrome
				cad2 = nAgt.substring(nAgt.indexOf("Chrome"));
				if (((cad2.indexOf("Chrome")) != -1)) {
					browserName = cad2.substring(cad2.indexOf("Chrome"), cad2.indexOf("/"));
					fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
				}
				else {
					// Internet Explorer
					browserName = "Internet Explorer";
					fullVersion = cad2.substring(cad2.indexOf("rv") + 3, cad2.lastIndexOf(")"));
				}
			}
		}

		majorVersion = parseInt('' + fullVersion, 10);
		minorVersion = fullVersion.substring(fullVersion.indexOf(".") + 1);
		if (isNaN(majorVersion)) {
			fullVersion = '' + parseFloat(navigator.appVersion);
			majorVersion = parseInt(navigator.appVersion, 10);
			minorVersion = "";
		}
	}

	//	document.write(''
	//	 + '<p align="left">'
	//	 + browserName + '&nbsp' + fullVersion
	////	 + '<b>Browser name</b>  = ' + browserName + '<br>'
	////	 + '<b>Full version</b>  = ' + fullVersion + '<br>'
	////	 + '<b>Major version</b> = ' + majorVersion + '<br>'
	////	 + '<b>Minor version</b> = ' + minorVersion + '<br>'
	////	 + '<b>navigator.appVersion</b> = ' + nVer + '<br>'
	////	 + '<b>navigator.userAgent</b> = ' + nAgt + '<br>'
	////	 + '<b>Ultima cadena en userAgent</b> = ' + cad1 + '<br>'
	////	 + '<b>navigator.appName</b> = ' + navigator.appName + '<br>'
	//	)
	//	var OSName = "Unknown OS";
	//	if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
	//	if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
	//	if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
	//	if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
	//	
	////	document.write('<b>OS:</b> ' + OSName + '<br>');
	////	document.write('<b>Platform:</b> ' + platform + '</p>');
	////document.title = browserName + ' ' + fullVersion;
	//	 + '</p><br>';
	var objSalida = { name: browserName, version: fullVersion };
	return objSalida;
}

