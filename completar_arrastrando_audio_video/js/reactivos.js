// JavaScript Document
var preguntas = [];
var respuestas = [];
var conteo=0;
var casillasRespuesta;
var retro = [];
var indices = [];
var preg = [];
var numeralpro=1;
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var incremento; // revisar, para contar drags solamente? 
var cuentaVideos = 0;
var cuentaAudios = 0;
// RAAR Estas las migre de configRecurso.js
var intentos = 0;
var correctas = 0;
//var contestadas = 0;
var totalPreguntas = 0;
var totalSegmentos = 0;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var esMobil = false;
var slideIndex = 0;

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip palomita far fa-2x fa-check-circle blink' style='display:none'></i>";
var tache = "<i class='it tache far fa-2x fa-times-circle blink' style='display:none'></i>";
var palomitaReactivo = "<i class='ip palomitaReactivo far fa-2x fa-check-circle blink' style='display:none'></i>"; //no imagen...es libreria...
var tacheReactivo = "<i class='it tacheReactivo far fa-2x fa-times-circle blink' style='display:none'></i>";

var carruselRespuestas = true;
var formatoColumnas = true;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados

var video;
var seekslider;
//funciones para inicializar la linea seek, de cada video 

//ESTA FUNCION CONTROLA EL SEEKER DEL REPRODUCTOR EN RESPUESTAS 
function intializePlayer(self) {
	//	console.log("holiporoli");
	padreSelf = self.parentElement;
	seekslider = padreSelf.querySelector(".rangos");
	//video = document.getElementById("resp" + ind);
	//seekslider = document.getElementById("seekslider" + ind);
	seekslider.addEventListener("change", vidSeek, false); // para dar click en la barra y adelantar o atrasar...
	video = self.parentElement.parentElement.querySelector("video");
	video.addEventListener("timeupdate", seektimeupdate, false);
}
/*
function intializePlayer(ind) {
	//	console.log("holiporoli");
	video = document.getElementById("resp" + ind);
	seekslider = document.getElementById("seekslider" + ind);
	seekslider.addEventListener("change", vidSeek, false);
	video.addEventListener("timeupdate", seektimeupdate, false);
}
//ESTA FUNCION CONTROLA EL SEEKER DEL REPRODUCTOR EN PREGUNTAS 
function intializePlayer1(ind) {
	//	console.log("holiporoli");
	video = document.getElementById("cloncas" + ind);
	seekslider = document.getElementById("seekslidercas" + ind);
	seekslider.addEventListener("change", vidSeek, false);
	video.addEventListener("timeupdate", seektimeupdate, false);
}
*/
//inicia la linea seek en su punto inicial
function estandarizar() {
	var todostotal = document.getElementsByClassName("rangos");

	for (var i = 0; i < todostotal.length; i++) {
		todostotal[i].value = 0;
	}

}
//FUNCIONES PARA QUE EL SEEKER TENGA RANGO 
function vidSeek(){
	console.log("siguiele");
	var seekto= video.duration*(seekslider.value/100);
	video.currentTime=seekto;
}

function seektimeupdate(){
	var nt=video.currentTime*(100/video.duration);
	seekslider.value=nt;
}

jq321(document).ready(function() {
	if (!carruselRespuestas) { jq321("#carrusel1").hide() }
	if (window.name=="movil") {
		esMobil = true;
		// alert ("indexbis.html window.name: "+window.name);
	}
	else {
		esMobil = esPortable();		
	}
	if (window.parent.data_crm) { //para el portal CRM, 
	//if (true) {
		verLongitud = true;
		debug = true;
		mostrarRetroIndividual =  true;
		mostrarRetroFinal =  true;
		elementosPorSegmento = 3;
}

	console.log("ready(), es un aparato mobil? "+esMobil);
	console.log("ready(), modo debug? "+debug);

	//if (esMobil && recursoTransformer) {
	if (esMobil) {
		elementosPorSegmento = elementosPorSegmentoMovil;
		//var texto = jq321("#textoInstrucciones").html();
		jq321("#textoInstrucciones").addClass("estilosinstruccion");
		jq321(".info").removeClass("ocultar").addClass("mostrar");
		 jq321("#textoInstrucciones").slideUp(10);
		 jq321("#textoInstrucciones").addClass("mostrarinfo"); 
		 invPregResp = true;
		 jq321("hr.separador").show();
	} else {
		jq321("#etiquetaRespuesta").hide();
		jq321("hr.separador").hide();
	}
	if (flechaArriba) {
		jq321('.ir-arriba').click(function () {
			jq321('body, html').animate({
				scrollTop: '0px'
			}, 300);
		});
		jq321(window).scroll(function () {
			if (jq321(this).scrollTop() > 0) {
				jq321('.ir-arriba').slideDown(300);
			} else {
				jq321('.ir-arriba').slideUp(300);
			}
		});
	}
	else {
		jq321('.ir-arriba').hide();
	}

	if (mezclarPreguntas) {	reactivos.sort(function(a, b){return 0.5 - Math.random()}); }
	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
/*			if (mezclarPreguntas) {reordenaArreglo(preguntas)}; // POR QUE? RAAR MAY 28, agregue MezclarReactivos de mas, cambio este a if (mezclarReactivos) y ya quedaria...*/
	if (mezclarRespuestas) {reordenaArreglo(respuestas)};
	iniciar();
	iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);
	estandarizar();

	jq321(".info").click(function(){
		console.log("hola");
			if(jq321(this).hasClass("hiden"))
			   {				 jq321("#textoInstrucciones").slideUp(300);
				   jq321(this).removeClass("hiden");
			   }
			else
			{
				
				jq321("#textoInstrucciones").slideDown(300); 
				jq321(this).addClass("hiden");
			}
		
		});

	});



function escribeArreglo(arreglo) {
	for (i = 0; i < arreglo.length; i++) {
		for (var prop in arreglo[i]) {
			if (arreglo[i].hasOwnProperty(prop)) {
				document.writeln('<p style="text-align: left">' + prop + ' || ' + arreglo[i][prop] + '</p>');
			}
		}
	}
	document.writeln('<hr>');
}

// solo voltea los strings, los voy eliminado a partir de abril 3, 2018, RAAR
function ic(c) {
	var x = c.length;
	var ci = "";
	while (x >= 0) {
		ci+=c.charAt(x);
		x--;
	}
	return ci;
}

function creaIndice() {
	var i = 0;
	for (i = 0; i < reactivos.length; i++) {
		indices.push(i)
	}
	reordenaArreglo(indices);
}

function divideReactivosQF_A(numReactivos) {  //  RA-01, RA-03,   QF-A
	var listaRespuestas =[]; // Para generar un listado de respuestas sin repetidos
	var listaTodas = [];
	var tantos = 0;
	for (i = 0; i < numReactivos; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
	//	preguntas.push({txt1: "", txt2: "", ind: 0, respA:"", respB:"", listaResp:""});
	preguntas.push({txt1: "", txt2: "", ind: 0, listaResp:"", listaFA:""});	
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		preguntas[i].listaResp = reactivos[i].A;
		preguntas[i].listaFA = reactivos[i].FA;		
	}
	
	var enlaza="";
	for (i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join();
	   if (i<numReactivos-1) { enlaza += ","; }
	}	
	enlaza = enlaza.replace(/[|]/gi, ","); // Cambios los pipes por comas, por que en las casillas de respuesta no importa...encierro en [] para que lo tome como caracter...
	listaTodas = enlaza.split(",");
	for (i = 0; i < listaTodas.length; i++) { 
		//if (!listaRespuestas.includes (listaTodas[i])) { //includes no jala en IE
		if (listaRespuestas.indexOf (listaTodas[i])==-1) {  //si no esta incluyelo...
		   listaRespuestas.push(listaTodas[i]);
		}
	}
/*	 //deshablito por que simplifico al agregar pipes en las  respuestas
for (i = 0; i < numReactivos; i++) { // genero la lista de respuetas recorriendo la matriz y pondiendola en una lista continua sin duplicados
		for (var j = 0; j < reactivos[i].A.length; j++) {
			if (!listaRespuestas.includes (reactivos[i].A[j])) { 
			   listaRespuestas.push(reactivos[i].A[j]);
			}
			listaTodas.push(reactivos[i].A[j]);
		}
	}*/
	listaRespuestas.sort();
	listaTodas.sort();
	for (i=0; i<listaRespuestas.length;i++){ // translado a la variable global respuestas....
		tantos = cuentaElemento(listaTodas,listaRespuestas[i]); // en listaTodas leo cuantas incidencias tiene una respuesta....
		respuestas.push({txt: listaRespuestas[i], ind:0, incidencia:tantos});
		//console.log ("RESPUESTAS "+respuestas[i].txt,"incidencia "+respuestas[i].incidencia);
	}
    casillasRespuesta = listaTodas.length;
	//console.log (listaRespuestas instanceof Array); // respuestas es un array, por que instancesof da true por que respuestas fue creado por el constructor array
}

function cuentaElemento (arregloBusqueda, palabraBuscada){ // cuenta cuantas veces aparece una palabra en un arreglo
	var j=0;
	var cuentaIncidencia = 0;
	//console.log("cuenta elementos");
	//alert (palabraBuscada);
	for (j=0; j<arregloBusqueda.length; j++){
		if (arregloBusqueda[j]==palabraBuscada) {
			cuentaIncidencia++
		}
	}
	return cuentaIncidencia;
}

function reordenaArreglo(arreglo) {
    arreglo.sort(function(a, b){return 0.5 - Math.random()}); // es un funcion de comparacion, math. produce valores -1 a 1, y provoca azar...
}

function creaEscribir(reactivosMostrar){
	for (i = 0; i < reactivosMostrar; i++) {
		var preg = reactivos[i].Q.split("@");
		var texto = "";
		for (j = 0; j < reactivos[i].A.length; j++) {
			texto += preg[j] + '<input type="text" data-respuesta="' + reactivos[i].A[j] + '" id="caja_' + (i + 1) + "." + (j + 1) + '">';
		}
		texto += preg[j];
		jq321("#completable").append('<hr><div id="p' + i + '"><p>' + texto + tam(reactivos[i].Q, 0));
		jq321("#p" + i).append('<span class="retroBien ocultarRetro">' + tam(reactivos[i].F[0], 1) + '</span><span class="retroMal ocultarRetro">' + tam(reactivos[i].F[1], 1) + '</span>');
	}
}

function creaArrastrar() { // Se arman las textos con sus correspondientes cajas...
	var idCas = 0; //para cololar un ID unica a cada casilla droppable....
	var textoRetro = '';
	jq321(".reactivos .lista-preguntas").each(function() { jq321(this).html(''); });
	jq321(".respuestas .lista-respuestas").each(function() { jq321(this).html(''); });
	//alert ("crea arrastrar");
	if (invPregResp) {
		jq321(".respuestas").prependTo(".ejercicio-arrastrar")
		jq321("#carrusel1").prependTo("#cuerpo");
	}
	if (formatoColumnas) {
		jq321("#reactivo").addClass("col-md-9 col-lg-9");
		jq321("#respuesta").addClass("col-md-3 col-lg-3");
		if (respuestasSiempreCentro && !esMobil) { jq321("#respuesta").addClass("respuestasSiempreCentro"); }
	}
	else {
		jq321("#reactivo").addClass("center");
		jq321("#respuesta").addClass("center");
	}
	var cuentaPreguntasSegmento = 0;
	var cuentaSegmentos = 1; // iniciamos en 1, el cero se presta a confusion...
	for (var i = 0; i < preguntas.length; i++ ) { // Armo las preguntas.....
		var preg = preguntas[i].txt1.split("@");
		var HTMLArmado = "";
		var HTMLArmadoNew ="";
		var HTMLDroppable ="";
		//var segmentos = preg.length;
		var cuantasArrobas = preg.length-1; // Para formar las casillas droppable de respuesta, puede haber respuestas dummy o sea de mas asi evito casillas de mas.
		var numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas? '/'+reactivosMostrar:'') + ((ponerNumeral || ponerNumeroPreguntas)?'.':'');
		if (cuentaPreguntasSegmento==elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			cuentaSegmentos++;
		
		} else {
			cuentaPreguntasSegmento++;
		}
		var enlaza ='';
		//var textoTem='';
		for (var k=0;k<preguntas[i].listaResp.length;k++) { //Para que una pregunta sepa todas las respuestas de sus casillas
			enlaza += "|";
			textoTemp = preguntas[i].listaResp[k];
			enlaza += textoTemp;
		}
		enlaza += "|";
		var pClases = "sub-item pregunta ocultar segmento"+cuentaSegmentos;
		var h1 ='<div class="'+pClases+'" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + ' data-listaResp="'+enlaza+'">';
		var h2 = '<p>' + numeralPregunta + '&nbsp;&nbsp;' + tam(preg[0], 1); // div para que sea block
		var h10 = '</p>';
		var h11 ='</div>';
        //HTMLArmadoNew = h1+h2+h10+h11;
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
		for (var j=0;j<cuantasArrobas;j++){ //preguntas[i].listaResp.length, da casillas de mas por las respuetas dummy
			var textValidaCorr = (preguntas[i].listaFA[j] == undefined ? '' : preguntas[i].listaFA[j].correcta);
			var textValidaInc = (preguntas[i].listaFA[j] == undefined ? '' : preguntas[i].listaFA[j].incorrecta);
			var rArrCorrecta = '<span class="contToolTip" data-toggle="tooltip" data-placement="auto" data-type="success" title="' + tam(textValidaCorr, 1) + '">' + palomita + '</span>';
			var rArrIncorrecta = '<span class="contToolTip" data-toggle="tooltip" data-placement="auto" data-type="danger" title="' + tam(textValidaInc, 1) + '">' + tache + '</span>';

			var debugRespuesta = (debug?'<sup>'+preguntas[i].listaResp[j]+'</sup>':"");
			//sept 20:tiene que ser SPAN, ya que usar div hace el <p> corte en cada segmento entre arrobas y se descuadra el formato....
			//oct 8,20: pero si se pone span falla el drag que contiene video y controles, no hace el tolerance del drop correctamente
			//HTMLDroppable +='<div class="droppable cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[j]+'"><div class="draggable"></div>'+ rArrCorrecta + rArrIncorrecta + '</div>'+ debugRespuesta + preg[j+1];
			HTMLDroppable +='<div class="droppable bordeDrop cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[j]+'"><div class="draggable"></div>'+ rArrCorrecta + rArrIncorrecta + '</div>'+ debugRespuesta + preg[j+1];
			idCas++;
			//console.log ("HTMLDroppable: "+HTMLDroppable);
		}
		textoRetroReactivoCorrecta = preguntas[i].txt2[0]; //RAAR Ago 16,18: uso clase retroBien para desplegar retro por arroba, puede colisionar
		textoRetroReactivoIncorrecta = preguntas[i].txt2[1];
		var rCorrecta = '<span data-toggle="tooltip" data-placement="auto" data-type="success" title="' + tam(textoRetroReactivoCorrecta, 1) + '">' + palomitaReactivo + '</span>'; // Esto así por que si no es tooltip, el funcionamiento cambia y solo se inserta la imagen...
		var rIncorrecta = '<span data-toggle="tooltip" data-placement="auto" data-type="danger" title="' + tam(textoRetroReactivoIncorrecta, 1) + '">' + tacheReactivo + '</span>';
		HTMLArmadoNew = h1 + rCorrecta + rIncorrecta + h2 + HTMLDroppable + h10 + h11;
		jq321("#reactivo .lista-preguntas").append(HTMLArmadoNew);

		//jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroArroba ocultarRetro" id="retro' + preguntas[i].ind + '0">' + preguntas[i].listaFA ); //RETRO ARROBA
		//jq321('#preg' + preguntas[i].ind).append('<div class="retroArroba ocultarRetro" id="retro' + preguntas[i].ind + '0">' + preguntas[i].listaFA +'</div'); //RETRO ARROBA

		// textoRetro = tam(preguntas[i].txt2[0], 1);
		// jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + textoRetro +'</div');
		// textoRetro = tam(preguntas[i].txt2[1], 1);
		// jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + textoRetro +'</div');
	
	}
	//jq321('div.sub-item:last + hr').remove(); //RAAR jun 13,18: inhabilito no detecto para que....
var arr=[];
	for (var i = 0; i < respuestas.length; i++) { //armo respuestas....
		var HTMLArmado = "";
		//var listaDroppables = jq321('[data-resp="'+respuestas[i].txt+'"]');		//ojo que una respuesta puede pertenecer a mas de una pregunta/casilla
		// RAAR Ago 13,18: El pipe es un truco para que me de el texto exacto y no encuentre una parte...
		// listaResp esta en la PREGUNTA no en las casillas, es para obtener el segmento....
		var listaDroppables = jq321('[data-listaResp*="|' + respuestas[i].txt + '|"]');		//ojo que una respuesta puede pertenecer a mas de una pregunta/casilla,* que contenga... por los casos de doble casilla de respuesta
		var acumulaSegmento = '';
		listaDroppables.each(function (index, elemento) {
			// jq321( el ).attr('class');				
			//console.log(respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class'));				
			//var clasesPregunta = respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class');
			var guardaSegmento = '';
			var totalseg = elementosPorSegmento;
			if (i == 0) {

				for (var m = 0; m < cuentaSegmentos; m++) {
					arr.push(0);
				}
			}

			for (var j = 1; j <= cuentaSegmentos; j++) {
				guardaSegmento = 'segmento' + j;
				//console.log("holi "+cuentaSegmentos);
				//console.log(respuestas[i].txt+' - '+'segmento'+j+' '+ jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento));
				//if (jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento)) {
				if (jq321(elemento).hasClass(guardaSegmento)) {
					acumulaSegmento += ' ' + guardaSegmento; //por ahora dejo que se dupliquen si es que estan en el mismo segmento....
					conteo++;
					var posis = acumulaSegmento.indexOf("o");
					var novo = acumulaSegmento.substring(posis + 1, acumulaSegmento.length);
					var nom = parseInt(novo, 10);

					var posarr = nom - 1;
					var aux = arr[posarr];
					aux++;
					arr[posarr] = aux;

					var formula = (nom - 1) * elementosPorSegmento;

					incremento = formula + aux;

				}
				//jq321( elemento ).parents('.pregunta').hasClass('segmento'+j);
			}
		});
		// Firefox 1.0+
		var controlsText = '';
		var isFirefox = typeof InstallTrigger !== 'undefined';
		if (!isFirefox) {
			//alert ('firefox');
			controlsText = 'controls';
		}

		////INCIO DE LA CONSTRUCCION DEL REPRODUCTOR
		///LA VARIABLE ENTORNO NOS DICE SI ES AUDIO O VIDEO DESDE LA RUTA
		var entorno = respuestas[i].txt;
		var posm = entorno.indexOf("/");
		entorno = entorno.substring(0, posm);
		var muestra = "";
		var playau = "";
		var controlclass = "";
		var siaudio = "";
		var posteraud = "";
		var audioimagen = "";
		var altovid = "";
		//LA VARIABLE POSTERAUD GUARDA LA IMAGEN MOSTRADA EN AUDIOS, LE DAMOS OTRA CLASE A LOS ADIOS YA QUE TIENEN OTRA FORMA EN MOVIL
		var textoNumeralSi = "";
		var numeroCaja = 0;
		if (entorno == "audio") {
			posteraud = "poster='img/sonido.png'"
			altovid = "height='0px'";
			muestra = 'style="display:none"';
			controlclass = "controlitosaud";
			playau = "botonplpaaud";
			textoNumeralSi = "Audio ";
			cuentaAudios++;
			numeroCaja = cuentaAudios;

		} else { //video
			//siaudio = '<div class="botonExpand botonExpandAbre" id="exp' + i + '" onclick=" getFullscreen(' + i + ')" ><i class="fas fa-expand botonexp"></i></div> <div style="display:none" class="botonExpand botonExpandCierra" id="comp' + i + '" onclick=" getFullscreenOn(' + i + ')" ><i class="fas fa-compress botonexp"></i></div>';
			siaudio = '<div class="botonExpand botonExpandAbre" id="exp' + i + '" onclick=" getFullscreen(this)" ><i class="fas fa-expand botonexp"></i></div> <div style="display:none" class="botonExpand botonExpandCierra" id="comp' + i + '" onclick=" getFullscreenOn(this)" ><i class="fas fa-compress botonexp"></i></div>';
			altovid = "width='100%'";
			//controlclass = "controlitos";
			controlclass = "controlitosaud";
			//playau = "botonplpa";
			playau = "botonplpaaud";
			textoNumeralSi = "Video ";
			cuentaVideos++;
			numeroCaja = cuentaVideos;
		}

		///CREAMOS EL VIDEO TANTO EN AUDIOS COMO EN VIDEOS, implementeo videDraggable para poder contar cuantos respuestas hay, draggable se duplica y al usar "respuestas" como en el original es impreciso
		//var iconoToca = '<video ' + altovid + '  id="resp' + i + '" preload="auto" ' + muestra + ' data-respuesta="' + respuestas[i].txt + '" data-quedan="' + respuestas[i].incidencia + '" data-pro="' + i + '" class="draggable videoDraggable"  data="' + respuestas[i].txt + '">'; //aqui requiere CONTROLS  style="color:red;" style="background-color:powderblue;"
		var iconoToca = '<video ' + altovid + '  id="resp' + i + '" preload="auto" ' + muestra + ' data-respuesta="' + respuestas[i].txt + '" data-quedan="' + respuestas[i].incidencia + '" data-pro="' + i + '" class="videoDraggable"  data="' + respuestas[i].txt + '">'; //aqui requiere CONTROLS  style="color:red;" style="background-color:powderblue;"		
		iconoToca += '<source src="' + respuestas[i].txt + '" type="audio/mp3" style="background-color:powderblue;"> ';
		iconoToca += 'Your browser does not support the audio element. ';
		iconoToca += '</video> ';

		// var numeralito;
		// var numeral = false; // para borrar despues...
		//  if (numeral == true) {
		//  	numeralito = numeralpro;
		//  	numeralpro++;
		//  }
		//CREAMOS LOS CONTROLES PARA EL PLAY O EL STOP, SON DOS DIV CON ICONOS
		//LA LINEA ES UN INPUT TIPO SEEKER 
		//EL DE AMPLIAR ES UN DIV IGUAL CON ICONO
		//var botonplay = '<div class="' + controlclass + '" id="controles' + i + '"><div class="numeralsi">' + incremento + '</div><div  class="' + playau + '" id="play' + (i + 1) + '" onclick="playAudio(' + i + ')"><i class="play fas fa-play-circle fa-5x"></i></div><div class="' + playau + '" id="pause' + (i + 1) + '" style="display:none" onclick="pauseAudio(' + i + ')"><i class="pause fas fa-pause-circle fa-5x"></i></div><input class="rangos" id="seekslider' + i + '" type="range" min="0" max="100" step="1">' + siaudio + '</div>';
		//var botonplay = '<div class="' + controlclass + '" id="controles' + i + '"><div class="numeralsi">' + incremento + '</div><div  class="bPlay ' + playau + '" id="play' + (i + 1) + '" onclick="playAudio(this)"><i class="play fas fa-play-circle fa-5x"></i></div><div class="bPause ' + playau + '" id="pause' + (i + 1) + '" style="display:none" onclick="pauseAudio(this)"><i class="pause fas fa-pause-circle fa-5x"></i></div><input class="rangos" id="seekslider' + i + '" type="range" min="0" max="100" step="1">' + siaudio + '</div>';
		var botonplay = '<div class="' + controlclass + '" id="controles' + i + '"><div class="numeralsi">' + textoNumeralSi + numeroCaja + '</div><div  class="bPlay ' + playau + '" id="play' + (i + 1) + '" onclick="playAudio(this)"><i class="play fas fa-play-circle fa-5x"></i></div><div class="bPause ' + playau + '" id="pause' + (i + 1) + '" style="display:none" onclick="pauseAudio(this)"><i class="pause fas fa-pause-circle fa-5x"></i></div><input class="rangos" id="seekslider' + i + '" type="range" min="0" max="100" step="1">' + siaudio + '</div>';		

		var values = jq321("resp" + i);
		var debugRespuesta = (debug ? '<div class="debug">' + respuestas[i].txt + '</div>' : "");
		var incidenciaRespuestas = (forzarRespuestaA > 0 ? forzarRespuestaA : respuestas[i].incidencia);

		//var obj1 = '<div id="contenedor' + i + '" data-respuesta="' + respuestas[i].txt + '" data-quedan="' + respuestas[i].incidencia + '"  data-drag="' + i + '" data="' + respuestas[i].txt + '"   class="sub-item draggable respuesta ocultar' + acumulaSegmento + '" >' + audioimagen + iconoToca + botonplay + '</div>';
		//var obj2 = '<div id="contenedor' + i + '" data-respuesta="' + respuestas[i].txt + '" data-quedan="' + respuestas[i].incidencia + '"  data-drag="' + i + '" data="' + respuestas[i].txt + '"   class="draggable carrusel" >' + audioimagen + iconoToca + botonplay + '<sup>' + debugRespuesta + '</sup>' + '</div>' ;

		if (!carruselRespuestas) {
			var obj1 = '<div id="contenedor' + i + '" data-respuesta="' + respuestas[i].txt + '" data-quedanInicial="' + incidenciaRespuestas + '" data-quedan="' + respuestas[i].incidencia + '"  data-drag="' + i + '" data="' + respuestas[i].txt + '"   class="sub-item draggable respuesta ocultar' + acumulaSegmento + '" >' + audioimagen + iconoToca + botonplay + '</div>';
			HTMLArmado = obj1;  //esta estructura es por que la estoy importando de CAClasico
			jq321(".respuestas .lista-respuestas").append(HTMLArmado);
		}
		if (carruselRespuestas) {
			var obj2 = '<div id="contenedor' + i + '" data-respuesta="' + respuestas[i].txt + '" data-quedanInicial="' + incidenciaRespuestas + '" data-quedan="' + respuestas[i].incidencia + '"  data-drag="' + i + '" data="' + respuestas[i].txt + '"   class="draggable carrusel" >' + audioimagen + iconoToca + botonplay +  debugRespuesta  + '</div>' ;
			var HTML_Slide = '<div id="slide' + (i + 0) + '" class="dropup mySlides"><div class="dropup sub-item respuesta">' + obj2 + '</div></div>';					// quito draggable, JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			var punto = '<span id="dot' + (i + 0) + '" class="dot" onclick="currentSlide(' + (i + 0) + ')"></span>';					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	
			jq321("#tmp").append(HTML_Slide);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321(".dot-container").append(punto);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		}
	}
	totalSegmentos = cuentaSegmentos;

	recorreSegmentos = 1; // el primer segmento a desplegar...
	jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	if (totalSegmentos>recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
		jq321("#btnPaginador").text(""+recorreSegmentos+" / "+totalSegmentos);
		jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
	if (carruselRespuestas) {
		jq321(".mySlides").hide();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		jq321(".mySlides:nth-of-type(" + (slideIndex + 1) + ")").show();					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		jq321(".dot:nth-of-type(" + (slideIndex + 1) + ")").addClass("active");					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		jq321(".respuestas .lista-respuestas").hide();
		jq321("#reactivo").removeClass("col-md-9 col-lg-9").addClass("col-md-12 col-lg-12");
		jq321("#desplazamiento").appendTo("#reactivo");

	}
}

function currentSlide(n) {					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	var listaSpan = jq321("span.dot:not(.usado)");
	for (var pos = 0; pos < listaSpan.length; pos++) {
		var k1 = jq321(listaSpan[pos]);
		var atributo = k1.attr("id");
		if (atributo == "dot"+n) {break}
	}
	// showSlides(slideIndex = n);
	showSlides(slideIndex = pos);
}

function showSlides(n) {					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	jq321(".usado").hide();
	jq321(".dot").removeClass("active");
	jq321(".mySlides:not(.usado)").hide();
	var slides = jq321(".mySlides:not(.usado)").length;
	if (n > (slides - 1)) { slideIndex = 0 }
	if (n < 0) { slideIndex = (slides - 1) }
	jq321(jq321(".mySlides:not(.usado)")[slideIndex]).fadeToggle();
	jq321(jq321(".dot:not(.usado)")[slideIndex]).addClass("active");
}

function avanzar() {					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	var listaSpan = jq321("span.dot:not(.usado)");
	for (var pos = 0; pos < listaSpan.length; pos++) {
		if (jq321(listaSpan[pos]).hasClass("active")) {
			break;
		}
	}
	slideIndex = pos + 1;
	showSlides(slideIndex);
}

function regresar() {					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
	var listaSpan = jq321("span.dot:not(.usado)");
	for (var pos = 0; pos < listaSpan.length; pos++) {
		if (jq321(listaSpan[pos]).hasClass("active")) {
			break;
		}
	}
	slideIndex = pos - 1;
	showSlides(slideIndex);
}

function tam(cad, n) {// 1T, 0ele.esc.ord Es para imprimir la longitud del texto indicado, crm=var global de impresion, n para apagar en caso particular...
	var txt = "";
	if (verLongitud == false) {txt = (n == 1) ? cad : ""} // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {txt = cad + txt}
	}
	return txt;
}


function mostrarMensaje(clase, recurso) { //RAAR ago 18,18: Pongo funcion reversa
	if (!recurso) {recurso = -1}
	var msgs = [,
		["Arrastra todas las respuestas a los espacios correspondientes.", "Please, drag all answers to appropriate spaces"],  // completar arrastrando
		["Llena todos los campos de texto.", "Please, fill out all text fields"],                  // completar escribiendo
		["Contesta todas las preguntas.", "Please, answer all questions"],                         // verdadero-falso, opcion-multiple
		["Ordena todos los reactivos para conocer tu resultado.", "Please, sort all sentences"],   // ordenar enunciados
		["Elige una respuesta para cada recuadro.", "Please, choose an answer for each list"],     // completar eligiendo
		["Contesta todas las preguntas.", "Please, drag all answers to appropriate spaces"]  // lista de verificación, antes CAEsquema
		];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos;
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = "You have reached maximum number of attempts: "+maxIntentos + "."; // empiezo a quitar los espejos....abril 26 2018
					
					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = "Has alcanzado el máximo número de intentos: "+maxIntentos + ".";
					btnOK = "Aceptar";
			}
			break;
		case 2: // Contestar TODO
			//tipo = "warning";
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = msgs[recurso][1]; //recurso,1
					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = msgs[recurso][0];  //recurso,0
					btnOK = "Aceptar";
			}
			break;
		default:
			//tipo = "error";
			tit = "Error de sistema";
			msg = "Condición desconocida";
			btnOK = "Aceptar";
	}

	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}
//function mostrarMensaje(tipo, titulo, cadena) {
/*function mostrarMensaje(clase, recurso) {
	if (!recurso) {recurso = -1}
	var msgs = [,
		[ic("setneidnopserroc soicapse sol a satseupser sal sadot artsarra ,rovaf roP"), ic("secaps etairporppa ot srewsna lla gard ,esaelP")],  // completar arrastrando
		[ic("otxet ed sopmac sol sodot anell ,rovaf roP"), ic("sdleif txet lla tuo llif ,esaelP")],                  // completar escribiendo
		[ic("satnugerp sal sadot atsetnoc ,rovaf roP"), ic("snoitseuq lla rewsna ,esaelP")],                         // verdadero-falso
		[ic("sodaicnune sol sodot anedro ,rovaf roP"), ic("secnetnes lla tros ,esaelP")],                            // ordenar enunciados
		[ic("ordaucer adac arap atseupser anu egile ,rovaf roP"), ic("tsil hcae rof rewsna na esoohc ,esaelP")],     // completar eligiendo
		[ic("setneidnopserroc soicapse sol a satseupser sal sadot artsarra ,rovaf roP"), ic("secaps etairporppa ot srewsna lla gard ,esaelP")],  // arrastrar esquema
		["", ""]
		];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					//msg = ic(maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
					msg = maxIntentos + " :You have reached maximum number of attempts"; // empiezo a quitar los espejos....abril 26 2018
					
					btnOK = ic("KO");
					break;
				default:
					tit = ic("nóicnetA");
					msg = ic(maxIntentos + " :sotnetni ed oremún omixám le odaznacla saH");
					btnOK = ic("ratpecA");
			}
			break;
		case 2: // Contestar TODO
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = msgs[recurso][1]; //recurso,1
					btnOK = ic("KO");
					break;
				default:
					tit = ic("nóicnetA");
					msg = msgs[recurso][0];  //recurso,0
					btnOK = ic("ratpecA");
			}
			break;
		default:
			tipo = ic("rorre");
			tit = ic("ametsis ed rorrE");
			msg = ic("adiconocsed nóicidnoC");
			btnOK = ic("ratpecA");
	}
	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true,confirmButtonColor: "#0069d9" });
}*/

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function(indice){
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == "ENG") ? tam(retroCal[indice].Mensaje[1], 1) : tam(retroCal[indice].Mensaje[0], 1);
			}
		});
	}
	return mensaje;
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			//var btnOK = ic("KO");
			var btnOK = "OK";
			break;
		default:
			//var btnOK = ic("ratpecA");
			var btnOK = "Aceptar";
	}
	swal({title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function esPortable() {
    if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/Opera Mini/i)
            || navigator.userAgent.match(/IEMobile/i)
            ) {
        return true;
    } else {
		return false;
	}
}

function siguiente() {   // JLBG Abr.30 2020, arreglé recurso
	jq321(".segmento" + recorreSegmentos).removeClass("mostrar").addClass("ocultar");
	jq321(".segmento" + recorreSegmentos).hide();
	if (carruselContinuo) {
		recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
	} else {
		recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
		if (recorreSegmentos < totalSegmentos) {
			jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		} else {
			jq321(".cProximo").removeClass("visible").addClass("invisible");
			jq321(".cPrevio").removeClass("invisible").addClass("visible");
		}
	}
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	jq321(".segmento" + recorreSegmentos).show();
	jq321("#btnPaginador").text("" + recorreSegmentos + " / " + totalSegmentos);
}

function anterior() {   // JLBG Abr.30 2020, arreglé recurso
	jq321(".segmento" + recorreSegmentos).removeClass("mostrar").addClass("ocultar");
	jq321(".segmento" + recorreSegmentos).hide();
	if (carruselContinuo) {
		recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);
	} else {
		recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);
		if (recorreSegmentos > 1) {
			jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		} else {
			jq321(".cPrevio").removeClass("visible").addClass("invisible");
			jq321(".cProximo").removeClass("invisible").addClass("visible");
		}
	}
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	jq321(".segmento" + recorreSegmentos).show();
	jq321("#btnPaginador").text("" + recorreSegmentos + " / " + totalSegmentos);
}
//funcion play para los audios y audios de respuesta
//function playAudio(ind) {
	function playAudio(self) {
	/* TODAS LAS PLAY SE MUESTRAN Y SE DETIENEN */
	/* TODAS LAS PAUSE SE OCULTAN */
	//alert ("playAudio");
	intializePlayer(self); //seeker
	//var total = document.getElementsByClassName("respuesta");
	var total = document.getElementsByClassName("videoDraggable");

	for (var i = 0; i < total.length; i++) {

		jq321("#resp" + i).get(0).pause();
/*		var elemnt = jq321("#resp" + i).get(0); PARA QUE?
		var audioovideo = jq321(elemnt).attr("data");	
		var possi = audioovideo.indexOf("/");
		audioovideo = audioovideo.substring(0, possi);

		if (audioovideo == "audio") { // esto para que?
			jq321("#resp" + i).get(0).pause();
		} else if (audioovideo == "multimedia") {
			jq321("#resp" + i).get(0).pause();
		}*/

	}
	var total1 = document.getElementsByClassName("clonado");

	for (var k = 0; k < total1.length; k++) {
		jq321(total1[k]).get(0).pause();
/*		var audioovideo1 = jq321(total1[k]).attr("data");
		var possi1 = audioovideo1.indexOf("/");
		audioovideo1 = audioovideo1.substring(0, possi1);
		console.log(audioovideo1);

		if (audioovideo1 == "audio") {
			jq321(total1[k]).get(0).pause();
		} else if (audioovideo1 == "multimedia") {
			jq321(total1[k]).get(0).pause();
		}*/

	}
/*	var apaga2 = document.getElementsByClassName("botonplpaclon");
	apagatodas();
	var apaga = document.getElementsByClassName("botonplpa");
	for (var j = 0; j < apaga.length; j++) {
		jq321("#play" + (j + 1)).css("display", "");
		jq321("#pause" + (j + 1)).css("display", "none");

	}
*/	
	playing = jq321(".playingNow"); //cualquiera que este tocando lo pauso le quito la bandera
	if (playing.length > 0) {
		pauseAudio (jq321(".playingNow").parent().find(".bPause"));
	}

	jq321(self).parent().parent().find("video").get(0).play();
	jq321(self).parent().parent().find("video").addClass("playingNow");
	jq321(self).hide();
	jq321(self).parent().find(".bPause").show();
/*
	jq321('#resp' + ind).get(0).play();
	jq321("#play" + (ind + 1)).css("display", "none");
	jq321("#pause" + (ind + 1)).css("display", "");
*/
}


function pauseAudio(self) {
	jq321(self).parent().parent().find("video").get(0).pause();
	jq321(self).parent().parent().find("video").removeClass("playingNow");
	jq321(self).hide();
	jq321(self).parent().find(".bPlay").show();	
}
/*
function pauseAudio(ind) {
	var esteAudio = document.getElementById('resp' + ind);
	esteAudio.pause();
	document.getElementById('pause' + (ind + 1)).style.display = "none";
	document.getElementById('play' + (ind + 1)).style.display = "block";
}
*/
	//FUNCION PARA APAGAR TODOS LOS ADUOS Y VIDEOS
/*
function apagatodas(){
for(var n=0;n<9;n++){
	jq321("#playclon"+0+""+n).css("display", "");
	jq321("#pauseclon"+0+""+n).css("display", "none");

}


	for(var m=10; m<99;m++){
	jq321("#playclon" +m).css("display", "");
	jq321("#pauseclon" +m).css("display", "none");
}
}	
*/

//ESTA FUNCION FUNCIONA PARA AGRANDAR EL VIDEO
	//function getFullscreen(ele) {
	//	var element = document.getElementById("contenedor" + ele);
	function getFullscreen(self) {
		//var element = document.getElementById("contenedor" + ele);		
		var element = jq321(self).parents(".draggable")[0];
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
		jq321(element).find(".botonExpandAbre").hide();
		jq321(element).find(".botonExpandCierra").show();
		//document.getElementById("exp" + ele).style.display = "none";
		//document.getElementById("comp" + ele).style.display = "";
	}
	//function getFullscreenOn(ele) {
	//var elemente = document.getElementById("contenedor" + ele);
	function getFullscreenOn(self) {
		//var elemente = document.getElementById("contenedor" + ele);
		var element = jq321(self).parents(".draggable")[0];
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) { /* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { /* IE/Edge */
			document.msExitFullscreen();
		}
		jq321(element).find(".botonExpandAbre").show();
		jq321(element).find(".botonExpandCierra").hide();
		//document.getElementById("comp" + ele).style.display = "none";
		//document.getElementById("exp" + ele).style.display = "";
	} 
  //ESTA FUNCION ES PARA AGRANDAR EL ELEMENTO EN EL SPAN DE PREGUNTAS, no se usa
//   function getFullscreen1(element,numdi){
// 	if(element.requestFullscreen) {
// 		element.requestFullscreen();
// 	  } else if(element.mozRequestFullScreen) {
// 		element.mozRequestFullScreen();
// 	  } else if(element.webkitRequestFullscreen) {
// 		element.webkitRequestFullscreen();
// 	  } else if(element.msRequestFullscreen) {
// 		element.msRequestFullscreen();
// 	  }

// 	  document.getElementById("expclon"+numdi).style.display="none";
// 	  document.getElementById("compclon"+numdi).style.display="";
// 	  }

///FUNCION PARA QUITAR EL AMPLIADO DE PANTALLA LO IMPROTANTE ESTA EN EL DISPLAY DE ELEMENTOS, no se usa
	//   function getFullscreenOn1(ele,numd){
	// 	var elemente= document.getElementById("contenedor"+ele);
	
	
	// 	if (document.exitFullscreen) {
	// 		document.exitFullscreen();
	// 	  } else if (document.mozCancelFullScreen) { /* Firefox */
	// 		document.mozCancelFullScreen();
	// 	  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
	// 		document.webkitExitFullscreen();
	// 	  } else if (document.msExitFullscreen) { /* IE/Edge */
	// 		document.msExitFullscreen();
	// 	  }	
	
	
	// 		  document.getElementById("compclon"+numd).style.display="none";
	// 		  document.getElementById("expclon"+numd).style.display="";
	// 		}   







//funcion play para los audios y videos dentro del span
// ESTO ASI ESTABA, LE FALTA EL CIERRE ALA FUNCION PLAYAUDIO1
/*
	function playAudio1(ind) {
		// TODAS LAS PLAY SE MUESTRAN Y SE DETIENEN 
		// TODAS LAS PAUSE SE OCULTAN 

		console.log(ind);
	var total=document.getElementsByClassName("clonado");
var prefijo="";
	if(ind >= 0 && ind <=9){
prefijo=0+""+ind;

	}else{
		prefijo=ind+"";
	}


	intializePlayer1(prefijo);

	for(var i=0;i<total.length;i++){
	
		var audioovideo=jq321(total[i]).attr("data");
		var possi=audioovideo.indexOf("/");
		audioovideo= audioovideo.substring(0,possi);
		console.log(audioovideo);
	
		if(audioovideo=="audio"){
			jq321(total[i]).get(0).pause();	
		}else if(audioovideo=="multimedia"){
			jq321(total[i]).get(0).pause();
		}

	}


	var total1=document.getElementsByClassName("respuesta");

for(var i=0;i<total1.length;i++){
	var elemnt1=jq321("#resp" + i).get(0);
		var audioovideo1=jq321(elemnt1).attr("data");
		var possi1=audioovideo1.indexOf("/");
		audioovideo1= audioovideo1.substring(0,possi1);
		
		if(audioovideo1=="audio"){
			jq321("#resp" + i).get(0).pause();	
		}else if(audioovideo1=="multimedia"){
			jq321("#resp" + i).get(0).pause();
		}

}


apagatodas();

//PROCESO PARA OCULTAR Y PRESENTAR ELEMENTOS

var apaga=document.getElementsByClassName("botonplpa");

for(var j=0; j<apaga.length;j++){
	jq321("#play" + (j+1)).css("display", "");
	jq321("#pause" + (j+1)).css("display", "none");

}
	
	
	
	jq321("#cloncas" + prefijo).get(0).play();

		
		jq321("#playclon" +prefijo).css("display", "none");
		jq321("#pauseclon" + prefijo).css("display", "");
	
	
		}
		
		function pauseAudio1(ind) {
			var prefijo="";
			if(ind >= 0 && ind <=9){
				prefijo=0+""+ind;
				
					}else{
						prefijo=ind+"";
					}


		var esteAudio = document.getElementById('cloncas'+prefijo);
		esteAudio.pause();
		document.getElementById('pauseclon'+prefijo).style.display = "none";
		document.getElementById('playclon' + prefijo).style.display = "block";
		}
	
*/