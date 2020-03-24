/*
Created, Modified and Updated by @juan_becerril on 2017-11-15.
    - Multiple sentences
    - number of attempts
	- display feedback
	- windows messages standard
*/
var enunciadosCorrectos = 0;

function hayVacios() {
	var salir = false;
	jq321("select").removeClass("vacio"); // JLBG mzo 18, 2019; quitar clase a preguntas sin marcar
	jq321("select").each(function (ind, elemento) {
		if (elemento.value == "-------") {
			jq321(elemento).addClass("vacio"); // JLBG mzo 18, 2019; marcar las preguntas sin contestar
			salir = true;
			// return false;
		}
	});
	return salir;
}

// jq321(".cPaginador").click(function()
function paginar(boton) {
	self = jq321("." + boton);
	// self= this; //practica para asegurar que estoy en el que dio click....
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
};


function continuar() {
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
		// jq321("img.palomita, img.tache").css("display","none");
		jq321("i.ip, i.it").removeClass("mostrar").addClass("ocultar");
		if (mostrarRetroIndividual && !(mostrarRetroFinal)) {
			jq321("select").each(function () {
				jq321(this).prop("disabled", false).val("-------").removeClass("mal").removeClass("bien");
			});
		} else {
			jq321("select.mal").each(function () {
				jq321(this).prop("disabled", false).val("-------").removeClass("mal");
			});
		}
		// jq321(".mostrarRetro").removeClass("mostrarRetro").addClass("ocultarRetro");
	} else {
		mostrarMensaje(1);
	}
}

function revisar() {
	if (hayVacios()) {
		mostrarMensaje(2, 5);
	} else {
		jq321('#btnRevisar').hide();
		jq321('#btnReiniciar').show();
		if (intentos < maxIntentos) {
			// jq321("img.palomita, img.tache").css("display","none");
			jq321("i.ip, i.it").removeClass("mostrar").addClass("ocultar");
			enunciadosCorrectos = 0;
			correctas = 0;
			totalPreguntas = 0;
			jq321("#contenedor > div > p").each(function (ind1, enunciado) {
				var correctasReactivo = 0;
				jq321(enunciado).find("select").each(function (ind2) {
					totalPreguntas++;
					var respCorrecta = jq321(this).attr("data-respuesta");
					var respElegida = jq321(this).val();
					jq321(this).prop("disabled", true);
					if (respElegida == respCorrecta) {
						correctasReactivo++;
						jq321(this).addClass("bien");
						if (mostrarRetroArroba) {
							jq321(this).nextAll("span").eq(0).find("i.ip").removeClass("ocultar").addClass("mostrar");
						}
					} else {
						jq321(this).addClass("mal");
						if (mostrarRetroArroba) {
							jq321(this).nextAll("span").eq(1).find("i.it").removeClass("ocultar").addClass("mostrar");
						}
					}
				});
				if (correctasReactivo == jq321(enunciado).find("select").length) {
					if (mostrarRetroIndividual) {
						// jq321(this).parent().find("img.palomita").css("display", "inline");
						// var tmp1 = jq321(this).find("i.ip").removeClass("ocultar").addClass("mostrar");
						// jq321(this).parent().find(".retroBien").removeClass("ocultarRetro").addClass("mostrarRetro")
						var jl = jq321(this).parent().find("i.ip").first(); // JLBG may 6, 2019; muestro solo la retroIndividual correcta
						jq321(this).parent().find("i.ip").first().removeClass("ocultar").addClass("mostrar"); //.css("display", "inline");   // JLBG may 6, 2019; muestro solo la retroIndividual correcta
						jq321(this).find(".retros, .contenido").css("display", "table-cell");
					}
					enunciadosCorrectos++;
				} else {
					if (mostrarRetroIndividual) {
						// jq321(this).parent().find(".retroMal").removeClass("ocultarRetro").addClass("mostrarRetro")
						// jq321(this).parent().find("img.tache").css("display", "inline");
						// var tmp1 = jq321(this).find("i.it").removeClass("ocultar").addClass("mostrar");
						var jl = jq321(this).parent().find("i.it").first(); // JLBG may 6, 2019; muestro solo la retroIndividual correcta
						jq321(this).parent().find("i.it").first().removeClass("ocultar").addClass("mostrar"); //.css("display", "inline");   // JLBG may 6, 2019; muestro solo la retroIndividual correcta
						jq321(this).find(".retros, .contenido").css("display", "table-cell");
					}
				}
				correctas += correctasReactivo;
			});
			intentos++;
		}
		switch (idioma) {
			case "ENG":
				var txtResp1 = (correctas == 1) ? ic("rewsna thgir") : ic("srewsna thgir");
				var txtResp2 = (enunciadosCorrectos == 1) ? ic("ecnetnes thgir") : ic("secnetnes thgir");
				var msg1 = (porEspacios || porEnunciados) ? ic(">/rb<>naps/<nettog evah uoY> 'odatluser'=di naps<") : "";
				var msg2 = (porEspacios) ? (ic(">gnorts<") + correctas + ic(" >gnorts/<") + txtResp1 + ic(">gnorts< fo ") + totalPreguntas + ic(">/rb<>/rb<selbissop >gnorts/<")) : "";
				var msg3 = (porEnunciados) ? (ic(">gnorts<") + enunciadosCorrectos + ic(" >gnorts/<") + txtResp2 + ic(">gnorts< fo ") + total + ic(">/rb<>/rb<>gnorts/<")) : "";
				var tit = ic("tluseR");
				break;
			default:
				var txtResp1 = (correctas == 1) ? ic("atcerroc atseupser") : ic("satcerroc satseupser");
				var txtResp2 = (enunciadosCorrectos == 1) ? ic("otcerroc odaicnune") : ic("sotcerroc sodaicnune");
				var msg1 = (porEspacios || porEnunciados) ? ic(">/rb<>naps/<etsivutbO> 'odatluser'=di naps<") : "";
				var msg2 = (porEspacios) ? (ic(">gnorts<") + correctas + ic(" >gnorts/<") + txtResp1 + ic(">gnorts< ed ") + totalPreguntas + ic(">/rb<>/rb<selbisop >gnorts/<")) : "";
				var msg3 = (porEnunciados) ? (ic(">gnorts<") + enunciadosCorrectos + ic(" >gnorts/<") + txtResp2 + ic(">gnorts< ed ") + total + ic(">/rb<>/rb<>gnorts/<")) : "";
				var tit = ic("odatluseR");
		}
		if (porEspacios || porEnunciados) {
			var res = (porEspacios) ? (correctas / totalPreguntas) : (enunciadosCorrectos / total);
			console.log("evaluacion con " + Math.floor(res));
			mostrarEval("", "", msg1 + msg2 + msg3 + asignarEvaluacion(Math.floor(10 * res)));
		}
		guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
		// if (ambSCORM) {
		// 		if (barraSCORM){ //RAAR Mar 31,18: si la barra esta prendinda entonces la califiacion se gurda en objetives por que se va a generar una calificación compesta que se guarda en cmi.core
		// 			console.log("Inicia scorm objetives");
		// 			//califica SCORM
		// 			if (parent.conectividadSCORM === undefined) {
		// 				console.log("Actividad en documento, es con try");
		// 				try {
		// 					conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0);   // envia los datos a la base de datos
		// 					conectividadSCORM.finalizarObjetivo(idObjetivo); //para ponerle passed..
		// 				//	conectividadSCORM.desconectarConCalificacion(buenas, total); //esta se usa en el recurso viejo, no uso esta por que hay rutinas de salvado abajo...
		// 					conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
		// 					if (barraSCORM) {conectividadSCORM.actualizarBarra()}	                         // actualiza al nuevo estatus la barra de avance
		// 					conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
		// 					conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
		// 				} catch(e){
		// 				console.warn("Error al calificar en conectividadSCORM");
		// 				}
		// 			}
		// 			else {
		// 				console.log("Actividad en frame, es con parent");
		// 				parent.conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0); // envia los datos a la base de datos
		// 				parent.conectividadSCORM.finalizarObjetivo(idObjetivo); //para ponerle passed..
		// 				//parent.conectividadSCORM.desconectarConCalificacion(buenas, total); //esta se usa en el recurso viejo, no uso esta por que hay rutinas de salvado abajo...
		// 				//parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	                              // finaliza la actividad en estatus passed
		// 				parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
		// 				if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
		// 				parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
		// 				parent.conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
		// 			}
		// 			//fin califica SCORM
		// 			console.log("Fin scorm objetives");
		// 		} else { //si el recurso es autocalificable
		// 			console.log("Inicia scorm cmi.core");
		// 			//califica SCORM
		// 			if (parent.conectividadSCORM === undefined) {
		// 				console.log("Actividad en documento, es con try");
		// 				try {
		// 					conectividadSCORM.calificar(correctas,totalPreguntas); //RAAR Oct 10,18: Esta y la linea anterior salvan a diferentes rutas...debe ser uno u otra..
		// 					conectividadSCORM.finalizarObjetivo(idObjetivo); // esto no creo que vaya
		// 					conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
		// 					//if (barraSCORM) {conectividadSCORM.actualizarBarra()}	                         // actualiza al nuevo estatus la barra de avance
		// 					conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
		// 					conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
		// 				} catch(e){
		// 				console.warn("Error al calificar en conectividadSCORM");
		// 				}
		// 			}
		// 			else {
		// 				console.log("Actividad en frame, es con parent");
		// 				parent.conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0); // envia los datos a la base de datos
		// 				parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	  // esto no creo que vaya
		// 				parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
		// 				//if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
		// 				parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
		// 				parent.conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
		// 			}
		// 			//fin califica SCORM
		// 			console.log("Fin scorm cmi.core");
		// 		}
		// 	} //if (ambSCORM)
	}
}