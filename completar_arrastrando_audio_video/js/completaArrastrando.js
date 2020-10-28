/* Update JLBG 2017-11-15
completaArrastrando.js utiliza jquery, jquery.ui.touch-punch y jqueryui para su funcionamiento
   update RAAR Febrero-2018, Acepta respuestas sin caja de preguntas por lo que puede haber mas respuestas q preguntas...
   update RAAR Marzo-2018, Acepta n respuestas y salto de linea...
   update RAAR Marzo-2018, Corrección de insertar dos veces el texto en las respuestas, quitar el número de pregunta....
   -RAAR Mar 04,2018, Agrego retro para cada arroba
	RAAR May 7, 2018, Acepto multiples respuestas por arroba
	-LPFR Agosto 27, 2019 se agregan tooltips de retro
	-LPFR Agosto 27, 2019 se agrega version de info movil
	-LPFR Agosto 27, 2019 se genera reproductor personalizado
	-LPFR Agosto 27, 2019 se agregan boton de ampliacion de video
	-LPFR Agosto 27, 2019 se corrige play y pause para audio y video
   
*/

var logo=0;
var x;
var y;
var entro=0;
var axu=0;
//var arraux=[];



function coordenadas(event) {
	x=event.clientX;
	y=event.clientY;
	
	
   }

function iniciar() {
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
	if (elementosPorSegmento<reactivosMostrar) { // los botones de paginas...
		if (carruselContinuo) {
			jq321( ".cPaginador.cProximo" ).removeClass("invisible").addClass("visible");
			jq321( ".cPaginador.cPrevio" ).removeClass("invisible").addClass("visible");
		} else {
			jq321( ".cPaginador.cProximo" ).removeClass("invisible").addClass("visible");
		}
	}	
//	var temp = jq321(".reactivos .lista-preguntas span").length; //?
	 //jq321(".reactivos .lista-preguntas span").length; no se porque estaba asi.....
	if (calificaPregunta) {
		totalPreguntas = reactivosMostrar;
	} else {
		totalPreguntas = jq321(".droppable").length;
	}
	DragDrop();
	
/*	if (ambSCORM) {
		//Inicio carga SCORM
		if (parent.conectividadSCORM === undefined) {
			console.log("Actividad en documento, es con try");
			try {
				var conexion = conectividadSCORM.conectarYComenzar();
				console.log("actividad:: -> ", conexion);
				conectividadSCORM.iniciarObjetivo(idObjetivo);           // inicializa la actividad
				if (barraSCORM) {conectividadSCORM.actualizarBarra()}    // actualiza la barra de avance
				conectividadSCORM.salvar();                              // guarda el status
			} catch(e){
			console.warn("Error con conectividad SCORM");
			}
		}
		else {
			console.log("Actividad en frame, es con parent");
			if (parent.document.readyState === "complete"){
				iniciarSCORM();
				console.log("ya había cargado");
			}
			else {
				console.log("agregó listener");
				parent.addEventListener("load", function(){
					iniciarSCORM();
				});
			}
			function iniciarSCORM(){
				var conexion = parent.conectividadSCORM.conectarYComenzar();
				console.log("actividad:: -> ", conexion);
				parent.conectividadSCORM.iniciarObjetivo(idObjetivo);          // inicializa la actividad
				if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}   // actualiza la barra de avance
				parent.conectividadSCORM.salvar();                             // guarda el status
			}
		}
		//Fin carga SCORM
	}*/
}
function DragDrop() {

	// if (esMobil) {
	// 	jq321(".respuesta .draggable").click(function () {
	// 		//if (seleccionRapida) {		
	// 			var cualLee = jq321('.mostrar .droppable:not(.ocupado):first');
	// 			if (cualLee.length) {			
	// 				agregaResp(jq321('.mostrar .droppable:not(.ocupado):first'), jq321(this)); // orale...jala...
	// 			}
	// 		//}
			
	// 	});	
	// }
	// else {
	if (!esMobil) {
		jq321( ".draggable" ).mouseover(function() {													  
			//	jq321( ".droppable:not(.ocupado):first" ).css( "background-color", "PaleTurquoise" ); //RAAR Jun 19,18: Para que marque la primer casilla vacia
			//jq321( ".droppable:not(.ocupado):first" ).css( "border-color", "PaleTurquoise" ); //RAAR Jun 19,18: Para que marque la primer casilla vacia
			jq321(".mostrar .droppable:not(.ocupado):first").removeClass("bordeDrop").addClass("objetivoSeleccionRapida");
			//alert ("mouseover");
			});	
			jq321( ".draggable" ).mouseleave(function() {
			//  jq321( ".droppable" ).css( "background-color", "white" );
			//jq321( ".droppable:not(.ocupado):first" ).css( "border-color", "#AAAAAA" );
				jq321(".mostrar .droppable").removeClass("objetivoSeleccionRapida").addClass("bordeDrop");
			});			
		jq321( ".respuesta .draggable" ).dblclick(function() {
			//agregaResp(jq321('.droppable:not(.ocupado):first'), jq321(this)); // en audio video no es funcional en moviles...
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
	//}
	jq321( ".cPaginador" ).mouseover(function() {													  

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
/*
jq321( ".cPaginador" ).click(function() {
	self= this; //practica para asegurar que estoy en el que dio click....

	if (jq321(self).hasClass('cProximo')) {
		jq321(".segmento"+recorreSegmentos).removeClass("mostrar").addClass("ocultar");	
		if (carruselContinuo)	{		
			recorreSegmentos = (recorreSegmentos<totalSegmentos? ++recorreSegmentos: 1);
		} else {
			recorreSegmentos = (recorreSegmentos<totalSegmentos? ++recorreSegmentos: recorreSegmentos);
			if (recorreSegmentos<totalSegmentos) {
				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");	
			} else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cPrevio").removeClass("invisible").addClass("visible");
			}
		}
		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	//	alert('paginador cProximo'+this.innerText+ ' HTML '+self.innerHTML );
	} else {
		jq321(".segmento"+recorreSegmentos).removeClass("mostrar").addClass("ocultar");	
		if (carruselContinuo){
			recorreSegmentos = (recorreSegmentos>1? --recorreSegmentos: totalSegmentos);	
		} else {
			recorreSegmentos = (recorreSegmentos>1? --recorreSegmentos: 1);	
			if (recorreSegmentos>1) {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");	
			} else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cProximo").removeClass("invisible").addClass("visible");
			}			
		}
		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
//		alert('paginador cPrevio'+this.innerText+ ' HTML '+self.innerHTML );		
	}
	jq321("#btnPaginador").text(""+recorreSegmentos+" / "+totalSegmentos);

});

*/
	


	
//	jq321(".respuestas   [data-drag]").draggable({
	jq321(".draggable").draggable({
		//	 hover: ,
		// zIndex: 100;
		// cursor: 'move', 
		revert: true, // para que se regrese el elemento a su lugar de origen si no se acepta
		stack: ".draggable"//poner z-index automático, para poner al frente al elemento que se esta moviendo..
		
		
	});


	//jq321(".reactivos .lista-preguntas [data-drop] .droppable").droppable({
	jq321(".droppable").droppable({		
		tolerance: 'pointer', // si le ponemos touch, insterta la respuesta en TODOS los dropable que toque...
		accept: '.draggable',
		hoverClass: "dragOver",
		drop: function(event, ui) {	
			console.log("terminamos");

			agregaResp(jq321(this), jq321(ui.draggable));

			// var ocupados = jq321(".ocupado");
			// if (ocupados.length == casillasRespuesta) { //en lugar de reactivosMostrar pongo la cantidad de casillas, una respuesta para varias casillas...
			// //	jq321(".respuestas").css("display", "none"); //RAAR Oct 3,18: Dejo de funcionar con chrome v69
			// 	if (formatoColumnas) { //Para reacomodar la pantalla al eliminar la columna de respuestas
				
			// 	}
			// 	//alert("if ocupados");
			// }
        //    jq321(this).width("auto"); RAAR Jun 20, 18, Esto para que? si hay width y height minimo en css . droppable....
         //   jq321(this).height("auto");
			
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
	if (jq321(".playingNow").length > 0) {
		pauseAudio(jq321(".playingNow").parent().find(".bPause")); //callamos lo que este tocando....
	}
	if (jq321(arrastrable).find(".clonado").length > 0) { //esta en zona de reactivos...
		if (permutaRespuestas) {
			if (jq321(imagen).hasClass("ocupado") != jq321(arrastrable).parent().hasClass("ocupado")) { // es un XOR, actualizo antes de permutar para que se efectivo
				var imClass = jq321(imagen).hasClass("ocupado") ? 'ocupado' : '';
				var arrClass = jq321(arrastrable).parent().hasClass("ocupado") ? 'ocupado' : '';
				jq321(imagen).removeClass('ocupado').addClass(arrClass);
				jq321(arrastrable).parent().removeClass('ocupado').addClass(imClass);
			}
			var imagenPadre = jq321(imagen);
			var imagenDetached = jq321(imagen).find(".draggable").detach();
			var arrastrablePadre = jq321(arrastrable).parent();
			var arrastrableDetached = jq321(arrastrable).detach();
			imagenDetached.prependTo(arrastrablePadre); //prepend para que quede antes de taches y palomas
			arrastrableDetached.prependTo(imagenPadre);		
		}
	} else { // esta en zona de respuestas, carrusel...

		var numDrag = arrastrable.attr('data-drag'); //esto identifica la casilla de respuestas
		var numQuedan = arrastrable.attr('data-quedan'); // de origen asigno cuantas veces se usa hasta agotar...
		var dataRespuestaArrastrable = arrastrable.attr('data-respuesta');
		//var pregId =  imagen.attr('data-idu'); // identifica de origen a que pregunta pertenece la casilla de respuestas
		var casId = imagen.attr('id'); // El ID es único por casilla de pregunta
		var dataRespuestaReceptor = imagen.attr('data-resp');
		var dataRespuestaReceptor2 = jq321(imagen).attr('data-resp');
		var idUnico = casId + numDrag.toString(); // A partir del 13-03-2018 la identificación no se duplica. Combino receptor y arrastrable por que puede usarse una respuesata para mas de un receptor...
		// podría tomar -data- para obtener la respuesta sin duplicar en data-respuesta, creo que si, pero por ahora los separo conceptualmente....
		var entorno1 = dataRespuestaArrastrable;
		var posm1 = entorno1.indexOf("/");
		entorno1 = entorno1.substring(0, posm1); // toma el nombre del archivo....
		//var textoDelNumeral =  ""; //jq321(arrastrable).find(".numeralsi")[0].outerHTML;
		var textoDelNumeral =  jq321(arrastrable).find(".numeralsi")[0].outerHTML; 
		var botonExpandAbre =  (jq321(arrastrable).find(".botonExpand").length > 0 ? jq321(arrastrable).find(".botonExpand")[0].outerHTML: ""); // solo existe en videos
		var botonExpandCierra =  (jq321(arrastrable).find(".botonExpand").length > 0 ? jq321(arrastrable).find(".botonExpand")[1].outerHTML: "");
		//jq321(imagen).css("width", "190px");
	
		//var idpro = jq321(imagen).attr("id");
		var desaparece = "";
		var siaudio1 = "";
		var posteraud1 = "";
		var altovid1 = "";
		if (entorno1 == "audio") {
			posteraud1 = "poster='img/sonido.png'"
			//altovid1 = "height='40px'";
			altovid1 = "height='0px'";
			desaparece = "desp";
		} else {
			siaudio1 = botonExpandAbre+botonExpandCierra;
			//altovid1 = "height='95%'";
			altovid1 = "width='100%'";
			desaparece = "";
		}
	
		// var retrobien = "";
		// var retromal = "";
		//var iconoToca = '<video  ' + altovid1 + ' preload="auto" data-respuesta="' + dataRespuestaArrastrable + '"  data="' + dataRespuestaArrastrable + '" class="clonado ' + desaparece + '" id="clon' + idUnico + '" >';
		var iconoToca = '<video  ' + altovid1 + ' preload="auto" data-respuesta="' + dataRespuestaArrastrable + '"  data="' + dataRespuestaArrastrable + '" class="clonado ' + desaparece + '" id="clon' + idUnico + '" >';
		iconoToca += '<source src="' + dataRespuestaArrastrable + '" type="audio/mp3" style="background-color:powderblue;"> ';
		iconoToca += 'Your browser does not support the audio element. ';
		iconoToca += '</video> ';
		var pos = idUnico.indexOf("s");
		// console.log(pos);
		var elementoa = idUnico.substring(pos + 1, idUnico.length);
		// console.log(elementoa);
		//var botonplay = '<div class="controlitos1" id="controlesclon' + elementoa + '"><div  class="botonplpaclon"  id="playclon' + elementoa + '" onclick="playAudio1(' + elementoa + ')"><i class="play fas fa-play-circle fa-5x"></i></div><div  class="botonplpaclon" id="pauseclon' + elementoa + '" style="display:none" onclick="pauseAudio1(' + elementoa + ')"><i class="pause fas fa-pause-circle fa-5x"></i></div><input class="rangos" id="seekslider' + idUnico + '" type="range" min="0" max="100" step="1">' + siaudio1 + '</div>';
		var botonplay = '<div class="controlitos1" id="controlesclon' + elementoa + '">' + textoDelNumeral + '<div  class="bPlay botonplpaaud"  id="playclon' + elementoa + '" onclick="playAudio(this)"><i class="play fas fa-play-circle fa-5x"></i></div><div  class="bPause botonplpaaud" id="pauseclon' + elementoa + '" style="display:none" onclick="pauseAudio(this)"><i class="pause fas fa-pause-circle fa-5x"></i></div><input class="rangos" id="seekslider' + idUnico + '" type="range" min="0" max="100" step="1">' + siaudio1 + '</div>';
		//clon = iconoToca + botonplay + '<span  data-toggle="tooltip" data-placement="auto right" data-type="success" title="' + retrobien + '">' + palomita + '</span>' + '<span data-toggle="tooltip" data-placement="auto right" data-type="danger" title="' + retromal + '">' + tache + '</span>';
		clon = iconoToca + botonplay;
		
		if (!(jq321(imagen).hasClass("ocupado"))) {
			if (carruselRespuestas) { // aqui, antes de que numQuedan sea 0
				var spanActivo = jq321("span.active");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				var idAttrActivo = jq321("span.active").attr("id");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				var idActivo = idAttrActivo.substring(3);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				var slideActivo = jq321("#slide" + idActivo);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				if (numQuedan == 1) {  //si es uno ya es para quitar...por las respuestas que se usan mas de una vez
					jq321(spanActivo).addClass("usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
					jq321(slideActivo).addClass("usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
					showSlides(slideIndex);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				}
			}
			if (admitirErronea) {
				jq321(".mostrar .droppable").removeClass("avisaFaltante").addClass("bordeDrop"); // pinta el borde adecuado

				//	imagen.append("<object data='"+dataRespuestaArrastrable+"' data-respuesta='"+dataRespuestaArrastrable+"' class='clonado' id='clon" + idUnico + "' >"+ tam(dataRespuestaArrastrable,1)   + "</object>" + palomita + tache);
				imagen.find(".draggable").append(clon);
				var cambiable = document.getElementById("seekslider" + idUnico);
				cambiable.value = 0; // para que inicie en 0
				numQuedan--;
				arrastrable.attr('data-quedan', numQuedan);
				imagen.addClass('ocupado');
			} else {
				jq321(".mostrar .droppable").removeClass("avisaFaltante").addClass("bordeDrop"); // pinta el borde adecuado
				imagen.find(".draggable").append(clon);
				if (comparaRespuesta(dataRespuestaReceptor, dataRespuestaArrastrable)) {
					numQuedan--;
					arrastrable.attr('data-quedan', numQuedan);
					imagen.addClass('ocupado');
				}
			}

			if (numQuedan < 1) {
				//convierto a objeto DOM por que pause no existe en jquery
				jq321(arrastrable).fadeOut();
				//arrastrable.parent().fadeOut(); //creo que ya no aplica, por que no hay contendor, el <audio> es el draggable
				//	arrastrable.css("display", "none");   //RAAR Oct 3,18: Dejo de funcionar con chrome v69
				//	arrastrable.parent().css("display", "none");	
			}
		}
	} //else (jq321(arrastrable).hasClass("clonado"))
	// if (carruselRespuestas) {
	// 	var t1 = jq321("div.usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	// 	var t2 = jq321("div#tmp > div");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	// 	if (jq321("div.usado").length == jq321("div#tmp > div").length) {					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	// 		jq321("#carrusel1").hide();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	// 	}					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	// }
	limpiaRespuestas();
} 

function revisar() {
	jq321('[data-toggle="tooltip"]').each(function () { //JLBG para activar los tooltips, el title de retro...
		var options = {
			html: true };		
		if (jq321(this)[0].hasAttribute('data-type')) {
			options['template'] =
			'<div class="tooltip ' + jq321(this).attr('data-type') + '" role="tooltip">' +
			'	<div class="tooltip-arrow"></div>' +
			'	<div class="tooltip-inner"></div>' +
			'</div>';
		}
		jq321(this).tooltip(options);
	});

	var ocupados = jq321(".ocupado");
	var casillasPregunta = jq321(".droppable");	
//	if (ocupados.length != casillasRespuesta) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
	if (ocupados.length != casillasPregunta.length) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
		jq321(".droppable").removeClass("avisaFaltante");
		jq321(".droppable:not(.ocupado)").addClass("avisaFaltante");
		mostrarMensaje(2, 1);
	}
	else {
		jq321(".droppable").removeClass("avisaFaltante");
		calificar();
		revisaBuenas();
	}
}

function comparaRespuesta (recibeDrop, recibeColocada) {  // Esta funcion es por que hay puede haber multiples respuestas validas....
	var respStringDrop = "|" + quitarAcentos(recibeDrop) +"|";
	var respStringColocada = "|" + quitarAcentos(recibeColocada)+"|";	

if (respStringDrop.indexOf(respStringColocada)!=-1) {
	   return true; // si existe la respuesta
	} else {
		return false;  
	}
}

function calificar(){	
	jq321('#btnRevisar').hide();
	jq321('#btnReiniciar').show();	
	var preguntas = jq321(".pregunta");
	var reactivoCorrecto = 0;
	var casillaTotal = 0;
	jq321.each(preguntas, function (index,value) {
		selfPregunta =  this;
		//alert( index + ": " + value );
		jq321(selfPregunta).find(".draggable").draggable(); //RAAR Feb 18:si no uso esto, a partir del tercer intento,  marcar error, que falta inicializar...
		jq321(selfPregunta).find(".draggable").draggable("disable");

		var listaContestadas = jq321(selfPregunta).find(".droppable"); //Leo las cajas drop, esto es solo para poner palomas o taches
		var casillaCorrecta = 0;
		jq321.each(listaContestadas,function (indice){ 
			var respStringDrop = jq321(this).attr("data-resp");
			var respStringColocada = jq321(this).find(".clonado").attr("data-respuesta");	
			if (comparaRespuesta(respStringDrop, respStringColocada)) {
				//alert ("Correcta");
				jq321(this).addClass("correcto");
				//jq321(this).find("i.ip").css("display", "initial");
				casillaCorrecta++;
				if (!calificaPregunta) {
					jq321(this).find(".palomita").show();
				}				
			}
			else {
				jq321(this).addClass("incorrecto");
				//jq321(this).find("i.it").css("display", "initial");
				if (!calificaPregunta) {
					jq321(this).find(".tache").show();
				}				
			}
		});
		casillaTotal += casillaCorrecta;
		var dropCorrectas = jq321(selfPregunta).find(".correcto").length;
		var dropPregunta = jq321(selfPregunta).find(".droppable").length;
		if (dropPregunta == dropCorrectas) {
			reactivoCorrecto++;
			//hipoteticamente basta con calificaPregunta, pero si es con calificacion ciega?
			if (mostrarRetroIndividual) { jq321(selfPregunta).find(".palomitaReactivo").show() };
		}
		else {
			if (mostrarRetroIndividual) { jq321(selfPregunta).find(".tacheReactivo").show() };
		}
	});
	correctas = (calificaPregunta ? reactivoCorrecto : casillaTotal);
/*
	var listadoPreguntas = jq321(".lista-preguntas .sub-item");
	var preguntasCorrectas = 0; // Para contar por cada pregunta correcta
	var casillasCorrectas = 0;  // Cuenta todas las casillas correctas
	correctas = 0;
	console.log (listadoPreguntas);
	jq321.each(listadoPreguntas, function(indice){
	   var tempPregunta = jq321(this).attr("id");
	   var sTemp = ".c"+tempPregunta; //el ID es casi igual a la clase, por eso lo uso para identificar la clase de las casillas
	   var tempCasilla =   jq321 (sTemp);
	   var temCCorrecta = sTemp+'.correcto'; //busco los objetos que tengan las DOS clases....
	   var tempCorrecta = jq321(temCCorrecta);
	  // var rTextoBien = jq321(this).children (".retroBien").text();
	   //var rTextoMal = jq321(this).children (".retroMal").text();
	   if (tempCasilla.length == tempCorrecta.length) {
		   preguntasCorrectas++;
			casillasCorrectas += tempCorrecta.length;
		 //  if (mostrarRetroIndividual) { jq321(this).children (".retroBien").removeClass("ocultarRetro").addClass("mostrarRetro") };
	   }
	   else {
		  // if (mostrarRetroIndividual) { jq321(this).children (".retroMal").removeClass("ocultarRetro").addClass("mostrarRetro") };
			casillasCorrectas += (calificaPregunta===true? 0: tempCorrecta.length);
	   }
	  // if (mostrarRetroArroba && (intentos>=maxIntentos)) { jq321(this).children (".retroArroba").removeClass("ocultarRetro").addClass("mostrarRetro") };
	 // if (mostrarRetroArroba) { jq321(this).children (".retroArroba").removeClass("ocultarRetro").addClass("mostrarRetro") };
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
	var res = Math.floor(10 * correctas/totalPreguntas);
	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? "right answer" : "right answers";
			mostrarEval("", "You have gotten", "" + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			break;
		default:
			//var txtResp = (correctas == 1) ? "respuesta correcta " : "respuestas correctas ";
			//mostrarEval("", "Obtuviste", "" + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			mostrarEval("", "Resultado", "Obtuviste " + correctas + "/" + totalPreguntas + " respuestas correctas." + "<br/><br/>" + asignarEvaluacion(res));

	}
	console.log("evaluacion " + correctas + " " + txtResp + " :--: " + totalPreguntas);
	//guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
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


/*	if (ambSCORM) {
		//califica SCORM
		if (parent.conectividadSCORM === undefined) {
			console.log("Actividad en documento, es con try");
			try {
				conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0);   // envia los datos a la base de datos
				conectividadSCORM.finalizarObjetivo(idObjetivo);	                             // finaliza la actividad en estatus passed
				conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
				if (barraSCORM) {conectividadSCORM.actualizarBarra()}	                         // actualiza al nuevo estatus la barra de avance
				conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
			} catch(e){
			console.warn("Error al calificar en conectividadSCORM");
			}
		}
		else {
			console.log("Actividad en frame, es con parent");
			parent.conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0); // envia los datos a la base de datos
			parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	                              // finaliza la actividad en estatus passed
			parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
			if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
			parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
		}
		//fin califica SCORM
	}*/
}

function reiniciar() {  //se invoca en el boton Next Atempt, quito taches y activo casillas de respuesta....
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
	// 	if ((correctas != reactivosMostrar) || (mostrarRetroIndividual && !(mostrarRetroFinal))) {
	// 			if (formatoColumnas) {
			
	// /*			if (!(esTexto)) {
	// 				jq321("#reactivo").addClass("col-sm-9 col-xs-9");
	// 				jq321("#respuesta").addClass("col-sm-3 col-xs-3");
	// 			}*/
	// 		}
	// 	}
	var cuentaCorrectas = 0;
	if (calificaPregunta == true) {
		cuentaCorrectas = reactivosMostrar;
	} else {
		cuentaCorrectas = jq321(".droppable").length;
	}
	if ((correctas != cuentaCorrectas) || siguienteIntentoBlanco) {
		jq321(".respuestas").css("display", "block"); //RAAR Feb 20,19: Revisar, doble ocultamiento contra renglon 452 jq321.each(respInc, function(indice) {
		if (formatoColumnas) {
			if (carruselRespuestas == false) {		 // si se queda carruselRespuestas esto se va...		
				jq321("#reactivo").removeClass("col-md-12 col-lg-12 col-sm-12 col-xs-12").addClass("col-md-9 col-lg-9");
				jq321("#respuesta").addClass("col-md-3 col-lg-3");
				/*			if (!(esTexto)) {
							jq321("#reactivo").addClass("col-sm-9 col-xs-9");
							jq321("#respuesta").addClass("col-sm-3 col-xs-3");
						}*/
			}
		}
	}
		jq321('.tache').hide();
		jq321('.tacheReactivo').hide();		
		jq321('.palomita').hide();
		jq321('.palomitaReactivo').hide();
		var listadoPreguntas = jq321(".lista-preguntas .sub-item");
		//var respMal = [];	
		jq321.each(listadoPreguntas, function(indice) { //Recorro cada reactivo....
			//jq321(this).find(".mostrarRetro").removeClass("mostrarRetro").addClass("ocultarRetro");
			//jq321(this).find(".tache").css("display", "none");		
			var incorrecto = jq321(this).find(".incorrecto");
			jq321(incorrecto).removeClass("incorrecto ocupado");
			jq321(incorrecto).find(".draggable").empty();
			jq321(incorrecto).find(".draggable").draggable("enable");
			if (siguienteIntentoBlanco) {
				jq321(this).find(".palomita").hide();	
				jq321(this).find(".palomitaReactivo").hide();	
				var correcto = jq321(this).find(".correcto");
				jq321(correcto).removeClass("correcto ocupado");
				jq321(correcto).find(".draggable").empty();
				jq321(correcto).find(".draggable").draggable("enable");
				
			}
												  
		});
		//var respInc = jq321(".lista-respuestas .sub-item "); // eso se pude reducir poniendo una clase RESPUESTA en el object..., s
		var respInc = jq321(".draggable"); // antes de carrusel usaba la linea superior ahora para que funcione con carrusel y zona respuestas uso draggable...
		jq321.each(respInc, function(indice) { // despliego las casillas de respuesta, solo se pueden mover una vez...cambiar?
			jq321(this).css("display","");
			//var com=jq321(this).find("video");
			//var qued1= jq321(com).attr("data-quedan");
			//var qued2= jq321(com).attr("data-pro");
			//console.log(qued1);
			var numQuedan = jq321(this).attr('data-quedanInicial'); // Al debuggear Inicial aparece con minuscula inicial, ojo con esto....
			jq321(this).attr("data-quedan",numQuedan);

		});
		if (carruselRespuestas) {
			jq321("div.mySlides > div.respuesta").css("display", "");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321("div.mySlides > div.respuesta > object").css("display", "");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321("#carrusel1").show();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321(".usado").show();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321(".usado").removeClass("usado");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			slideIndex = 0;					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			showSlides(slideIndex);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		}
//reinicia los controles
		estandarizar();
	}
	else {
		mostrarMensaje(1);
	}
	//contestadas = correctas; RAAR Jun 13, 18: no se usa....
}

function quitarAcentos(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_:;"; //Le tengo que quitar que elimine la coma, para que la comparacion funcione	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
	var to   = "aaaaeeeeiiiioooouuuunc-----";
	for (var i = 0, l = from.length ; i < l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -|]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
	return str;
}//