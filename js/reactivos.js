/* PROGRAMMING: PENDIENTE DE REVISAR
No leia el maxIntentos si estaba al inicio de este archivo...


pendiente....        bodyOriginal = document.body.innerHTML; y para reestablecer... document.body.innerHTML = bodyOriginal;
file:///G:/Mi%20unidad/DesarrolloMultimedia/FabiolaCorreccionesDeInglesI_programacion/list/index.html
y ojo    with(oDragItem.style){
        zIndex = 1000;
        position="absolute";
        left=x+"px";
        top=y+"px";
    }

  revisar mecnismo para insertar video
<div class="video">
     <img class="maintainaspectratio" src="maintainaspectratio.png" />
     <object>
          <param ... /><param ... />...
          <embed src="..." ...</embed>
     </object>
</div>
https://stackoverflow.com/questions/1495407/maintain-the-aspect-ratio-of-a-div-with-css

*/

// JavaScript Document
var preguntas = [];
var respuestas = [];
//var casillasRespuesta; RAAR Ago 18,18: en desuso, las respuestas no equivalen a casillas droppable
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
// RAAR Estas las migre de configRecurso.js
var intentos = 0;
var correctas = 0;
//var contestadas = 0;
var totalPreguntas = 0;
var totalSegmentos = 0;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var esMobil = false;

var carruselRespuestas = true;
var formatoColumnas = false;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var slideIndex = 0;					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
//var palomita = "<img class='palomita' style='display:none' src='img/palomita.png' />";
//var tache = "<img class='tache' style='display:none' src='img/tache.png' />";

jq321(document).ready(function () {//RAAR Sep 13,18: Aqui arrancamos, me traigo esto de index.html
	if (!carruselRespuestas) { jq321("#carrusel1").hide() }
	if (window.name == "movil") {
		esMobil = true;
	}
	else {
		esMobil = esPortable();
	}
	console.log("ready(), es un aparato mobil? " + esMobil);
	console.log("ready(), modo debug? " + debug);
	if (window.parent.data_crm) { //para el portal CRM, 
		//if (true) {
		verLongitud = true;
		debug = true;
		mostrarRetroIndividual = true;
		mostrarRetroFinal = true;
		elementosPorSegmento = 3;
	}
	if (esMobil) { 
		elementosPorSegmento = elementosPorSegmentoMovil;
		jq321(".info").show;
		jq321("#textoInstrucciones").addClass("estilosinstruccion mostrarinfo");
		jq321("#textoInstrucciones").slideUp(1);
		invPregResp = true;
		jq321("hr.separador").show();
	}
	else {
		jq321(".info").hide();	
		jq321("hr.separador").hide();
		jq321("#etiquetaRespuesta").hide();
	//	jq321("hr.separador").hide();
	}
	for (var i = 0; i < reactivos.length; i++) { // para saber el orden como esta en listaReactivos.js
		reactivos[i].indiceOriginal = i + 1;
		// var test = 0;
	}
	if (mezclarPreguntas) { reactivos.sort(function (a, b) { return 0.5 - Math.random() }); }
	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
	if (mezclarRespuestas) { reordenaArreglo(respuestas) };
	iniciar();
	jq321(".info").click(function () {
		if (jq321(this).hasClass("hiden")) {
			jq321("#textoInstrucciones").slideUp(300);
			jq321(this).removeClass("hiden");
		}
		else {
			jq321("#textoInstrucciones").slideDown(300);
			jq321(this).addClass("hiden");
		}
	});
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
		ci += c.charAt(x);
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
	var listaRespuestas = []; // Para generar un listado de respuestas sin repetidos
	var listaTodas = [];
	var tantos = 0;
	for (i = 0; i < numReactivos; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
		//	preguntas.push({txt1: "", txt2: "", ind: 0, respA:"", respB:"", listaResp:""});
		preguntas.push({ txt1: "", txt2: "", ind: 0, listaResp: "", listaFA: "" });
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		preguntas[i].listaResp = reactivos[i].A;
		preguntas[i].listaFA = reactivos[i].FA;
	}

	var enlaza = "";
	for (var i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join("|");
		if (i < numReactivos - 1) { enlaza += "|"; }
	}
	//	enlaza = enlaza.replace(/[|]/gi, ","); // Cambios los pipes por comas, por que en las casillas de respuesta no importa...encierro en [] para que lo tome como caracter...
	listaTodas = enlaza.split("|");
	for (var i = 0; i < listaTodas.length; i++) {
		//if (!listaRespuestas.includes (listaTodas[i])) { //includes no jala en IE
		if (listaRespuestas.indexOf(listaTodas[i]) == -1) {  //si no esta incluyelo...	
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
	for (i = 0; i < listaRespuestas.length; i++) { // translado a la variable global respuestas....
		tantos = cuentaElemento(listaTodas, listaRespuestas[i]); // en listaTodas leo cuantas incidencias tiene una respuesta....
		respuestas.push({ txt: listaRespuestas[i], ind: 0, incidencia: tantos });
		//console.log ("RESPUESTAS "+respuestas[i].txt,"incidencia "+respuestas[i].incidencia);
	}
	//casillasRespuesta = listaTodas.length;
	//console.log (listaRespuestas instanceof Array); // respuestas es un array, por que instancesof da true por que respuestas fue creado por el constructor array
}

function cuentaElemento(arregloBusqueda, palabraBuscada) { // cuenta cuantas veces aparece una palabra en un arreglo
	var j = 0;
	var cuentaIncidencia = 0;
	//console.log("cuenta elementos");
	//alert (palabraBuscada);
	for (j = 0; j < arregloBusqueda.length; j++) {
		if (arregloBusqueda[j] == palabraBuscada) {
			cuentaIncidencia++
		}
	}
	return cuentaIncidencia;
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) { return 0.5 - Math.random() }); // es un funcion de comparacion, math. produce valores -1 a 1, y provoca azar...
}
/*
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
}*/

function creaArrastrar() { // Se arman las textos con sus correspondientes cajas...
	var idCas = 0; //para cololar un ID unica a cada casilla droppable....
	var palomita = "<i class='ip palomita far fa-2x fa-check-circle blink '></i>"; //no imagen...es libreria...
	var tache = "<i class='it tache far fa-2x fa-times-circle blink '></i>";

	var palomitaReactivo = "<i class='ip palomitaReactivo far fa-2x fa-check-circle blink '></i>"; //no imagen...es libreria...
	var tacheReactivo = "<i class='it tacheReactivo far fa-2x fa-times-circle blink '></i>";

	jq321(".reactivos .lista-preguntas").each(function () { jq321(this).html(''); });
	jq321(".respuestas .lista-respuestas").each(function () { jq321(this).html(''); });

	if (invPregResp) {
		jq321(".respuestas").prependTo(".ejercicio-arrastrar");
		jq321("#carrusel1").prependTo("#cuerpo");
	}
	if (formatoColumnas) {
		jq321("#reactivo").addClass("col-md-9 col-lg-9");
		jq321("#respuesta").addClass("col-md-3 col-lg-3");
	}
	else {
		jq321("#reactivo").addClass("center");
		jq321("#respuesta").addClass("center");
	}
	var cuentaPreguntasSegmento = 0;
	var cuentaSegmentos = 1; // iniciamos en 1, el cero se presta a confusion...
	for (var i = 0; i < preguntas.length; i++) { // Armo las preguntas.....
		var longPreg = calculaLong(preguntas[i]);   // JLBG 16 mzo, 2019  Funcion para calcular la longitud de la pregunta mas sus respuestas, para que muestre al final de la pregunta
		var preg = preguntas[i].txt1.split("@");
		var HTMLArmado = "";
		var HTMLArmadoNew = "";
		var HTMLDroppable = "";
		//var segmentos = preg.length;
		var cuantasArrobas = preg.length - 1; // Para formar las casillas droppable de respuesta, puede haber respuestas dummy o sea de mas asi evito casillas de mas.
		//var numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas? '/'+reactivosMostrar:'') + ((ponerNumeral || ponerNumeroPreguntas)?'.-':'');
		var numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		if (cuentaPreguntasSegmento == elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			cuentaSegmentos++;

		} else {
			cuentaPreguntasSegmento++;
		}
		var enlaza = '';
		//var textoTem='';
		for (var k = 0; k < preguntas[i].listaResp.length; k++) { //Para que una pregunta sepa todas las respuestas de sus casillas
			enlaza += "|";
			textoTemp = preguntas[i].listaResp[k];
			enlaza += textoTemp;
		}
		enlaza += "|";
		// var pClases = "sub-item pregunta ocultar segmento" + cuentaSegmentos;
		var pClases = "sub-item pregunta segmento" + cuentaSegmentos;
		// RAAR Sep 24,18: este br por que?,  mar 4, 19: ya supe pq. en css .mostrar {} tenia display:"initial", lo dejo en ""
		var h1 = '<div class="' + pClases + '" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + ' data-listaResp="' + enlaza + '">';
		var h2 = '<p>' + numeralPregunta + preg[0];
		//var h2 = '<span>' + numeralPregunta + preg[0];           // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		if (verLongitud == false) {
			var h10 = '</p>';    // JLBG, 2019, mzo 16: arreglé la colocaciónn del tamaño del texto de la pregunta 
			//var h10 = '</span>';    // JLBG, 2019, mzo 16: arreglé la colocaciónn del tamaño del texto de la pregunta 
		}
		else {
			var h10 = '&nbsp;<sup>' + longPreg + '</sup></p>';    // JLBG, 2019, mzo 16: arreglé la colocaciónn del tamaño del texto de la pregunta 
			//	var h10 = '&nbsp;<sup>' + longPreg + '</sup></span>';    // JLBG, 2019, mzo 16: arreglé la colocaciónn del tamaño del texto de la pregunta 
		}
		//var h10 = '</p>';	
		//var h10 = '</span>'; ????
		var h11 = '</div>';
		//HTMLArmadoNew = h1+h2+h10+h11;
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
		//	for (var i = 0; i < respuestas.length; i++ ) { //asi estaba en la version 2.3
		var elemObjeto = '';
		//var retroArrobaCorrecta = '';
		//var retroArrobaIncorrecta = '';
		for (var j = 0; j < cuantasArrobas; j++) { //Creo una casilla por arroba,
			// RAAR Sep 4,18: Esto valida cuando no se pongan todas las retros por arroba
			var textValidaCorr = (preguntas[i].listaFA[j] == undefined ? '' : preguntas[i].listaFA[j].correcta);
			var textValidaInc = (preguntas[i].listaFA[j] == undefined ? '' : preguntas[i].listaFA[j].incorrecta);

			var rArrCorrecta = '<span data-toggle="tooltip" data-placement="auto" data-type="success" title="' + tam(textValidaCorr, 1) + '">' + palomita + '</span>';
			var rArrIncorrecta = '<span data-toggle="tooltip" data-placement="auto" data-type="danger" title="' + tam(textValidaInc, 1) + '">' + tache + '</span>';
			var debugRespuesta = (debug ? '<sup>' + preguntas[i].listaResp[j] + '</sup>' : "");
			//elemObjeto = '<object class="draggable clonado" data="img/blanco.png" data-respuesta="" style="height:0px"></object>'; // Creo los atributos para el enroque de datos en el drop, blanco.png es un truco para q se active para imagenes, hay que quitarlo luego...								// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			elemObjeto = '<object class="draggable clonado" data="img/blanco.png" data-respuesta="" ></object>'; // Creo los atributos para el enroque de datos en el drop, blanco.png es un truco para q se active para imagenes, hay que quitarlo luego...								// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			//	HTMLDroppable +='<span class="droppable cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[j]+'">'+elemObjeto+palomita+tache+'</span>'+debugRespuesta+retroArrobaCorrecta+retroArrobaIncorrecta + preg[j+1];
			HTMLDroppable += '<span class="droppable bordeDrop cpreg' + preguntas[i].ind + '" id="cas' + idCas + '" data-resp="' + preguntas[i].listaResp[j] + '">' + elemObjeto + rArrCorrecta + rArrIncorrecta + '</span>' + debugRespuesta + preg[j + 1];
			idCas++;
			//console.log ("HTMLDroppable: "+HTMLDroppable);
		}
		textoRetroReactivoCorrecta = preguntas[i].txt2[0]; //RAAR Ago 16,18: uso clase retroBien para desplegar retro por arroba, puede colisionar
		textoRetroReactivoIncorrecta = preguntas[i].txt2[1];
		var rCorrecta = '<span data-toggle="tooltip" data-placement="auto" data-type="success" title="' + tam(textoRetroReactivoCorrecta, 1) + '">' + palomitaReactivo + '</span>'; // Esto así por que si no es tooltip, el funcionamiento cambia y solo se inserta la imagen...
		var rIncorrecta = '<span data-toggle="tooltip" data-placement="auto" data-type="danger" title="' + tam(textoRetroReactivoIncorrecta, 1) + '">' + tacheReactivo + '</span>';


		HTMLArmadoNew = h1 + rCorrecta + rIncorrecta + h2 + HTMLDroppable + h10 + h11;

		jq321("#reactivo .lista-preguntas").append(HTMLArmadoNew);
		/*		if (esMobil==false) {
					if (textoRetroReactivoCorrecta.length>0) { //incrusto la retroPorReactivo
						jq321('#preg' + preguntas[i].ind).append('<div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + textoRetroReactivoCorrecta +'</div>');
					}
					if (textoRetroReactivoIncorrecta.length>0) {
						jq321('#preg' + preguntas[i].ind).append('<div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + textoRetroReactivoIncorrecta +'</div>');
					}
				}*/
		//	jq321('#preg' + preguntas[i].ind).after('<hr/>'); RAAR jun 13,18: inhabilito no detecto para que....
	}
	//jq321('div.sub-item:last + hr').remove(); //RAAR jun 13,18: inhabilito no detecto para que....
	//var dropUpMenu = '<div class="dropup-content"><a href="#">Zoom</a></div>'; //para el menu desplegable zoom <i class='palomitaReactivo far fa-check-circle blink ocultar'></i>
	var dropUpMenu = '<div class="iconoLupa dropup-content"><i class="fas fa-search-plus"></i></div>';

	for (var i = 0; i < respuestas.length; i++) { //armo respuestas....
		var HTMLArmado = "";
		/*	if (esImagen(respuestas[i].txt)) {
				alert ("es */
		var dropUpMenu = esImagen(respuestas[i].txt) ? '<div class="iconoLupa dropup-content"><i class="fas fa-search-plus"></i></div>' : '';
		// RAAR Ago 13,18: El pipe es un truco para que me de el texto exacto y no encuentre una parte...
		// listaResp esta en la PREGUNTA no en las casillas, es para obtener el segmento....
		var listaDroppables = jq321('[data-listaResp*="|' + respuestas[i].txt + '|"]');		//ojo que una respuesta puede pertenecer a mas de una pregunta/casilla,* que contenga... por los casos de doble casilla de respuesta
		var acumulaSegmento = '';
		listaDroppables.each(function (index, elemento) {
			// jq321( el ).attr('class');				
			//console.log(respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class'));				
			//var clasesPregunta = respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class');
			var guardaSegmento = '';
			for (var j = 1; j <= cuentaSegmentos; j++) {
				guardaSegmento = 'segmento' + j;
				//console.log(respuestas[i].txt+' - '+'segmento'+j+' '+ jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento));
				//	if (jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento)) {
				if (jq321(elemento).hasClass(guardaSegmento)) {
					acumulaSegmento += ' ' + guardaSegmento; //por ahora dejo que se dupliquen si es que estan en el mismo segmento....
				}
				//jq321( elemento ).parents('.pregunta').hasClass('segmento'+j);
			}
		});

		//RAAR Jun 22,18: recuerda, fuen cuando se agrego acumulaSegmento que al restringir la elementosPorSegmento se volvio mas pequeña la casilla de una respuesta que correspondia dos preguntas del mismo segmento...no se que fue....
		var incidenciaRespuestas = (forzarRespuestaA > 0 ? forzarRespuestaA : respuestas[i].incidencia);
		//var cCasillaDraggable = soloAbecedario(respuestas[i].txt);	// a veces ponen textos enormes, estoy y un split, que solo lea el primero ya que no sirve para mas de una palabra,  para acortar la clase....	
		var vRespuesta = obtenClase(respuestas[i].txt);
		

		var obj1 = '<object title="Arrastra/doble click para selección rápida" data-respuesta="' + respuestas[i].txt + '" data-quedanInicial="' + incidenciaRespuestas + '" data-quedan="' + incidenciaRespuestas + '" class="draggable ' + vRespuesta + '" data-drag="' + i + '" data="' + respuestas[i].txt + '">' + tam(respuestas[i].txt, 1) + '</object>';					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		var obj2 = '<object title="Arrastra/doble click para selección rápida" data-respuesta="' + respuestas[i].txt + '" data-quedanInicial="' + incidenciaRespuestas + '" data-quedan="' + incidenciaRespuestas + '" class="carrusel draggable ' + vRespuesta + '" data-drag="' + i + '" data="' + respuestas[i].txt + '">' + tam(respuestas[i].txt, 1) + '</object>';					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		// HTMLArmado = '<div class="dropup sub-item respuesta ocultar' + acumulaSegmento + '" ><object data-respuesta="' + respuestas[i].txt + '" data-quedanInicial="' + incidenciaRespuestas + '" data-quedan="' + incidenciaRespuestas + '" class="draggable ' + vRespuesta + '" data-drag="' + i + '" data="' + respuestas[i].txt + '">' + tam(respuestas[i].txt, 1) + '</object>' + dropUpMenu + '</div>';	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 
		// HTMLArmado = '<div class="dropup sub-item respuesta ' + acumulaSegmento + '" ><object data-respuesta="' + respuestas[i].txt + '" data-quedanInicial="' + incidenciaRespuestas + '" data-quedan="' + incidenciaRespuestas + '" class="draggable ' + vRespuesta + '" data-drag="' + i + '" data="' + respuestas[i].txt + '">' + tam(respuestas[i].txt, 1) + '</object>' + dropUpMenu + '</div>';	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 
		HTMLArmado = '<div class="dropup sub-item respuesta ' + acumulaSegmento + '" >' + obj1 + dropUpMenu + '</div>';	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores

		//var HTML_Slide = '<div id="slide' + (i + 0) + '" class="dropup mySlides draggable"><div class="dropup sub-item respuesta">' + obj2 + '</div></div>';					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		var HTML_Slide = '<div id="slide' + (i + 0) + '" class="dropup mySlides"><div class="dropup sub-item respuesta">' + obj2 + '</div></div>';					// quito draggable, JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		var punto = '<span id="dot' + (i + 0) + '" class="dot" onclick="currentSlide(' + (i + 0) + ')"></span>';					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores

		jq321(".respuestas .lista-respuestas").append(HTMLArmado);


		if (carruselRespuestas) {
			jq321("#tmp").append(HTML_Slide);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			jq321(".dot-container").append(punto);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
		}
	}
	totalSegmentos = cuentaSegmentos;
	jq321("div[class*='segmento']").hide();
	recorreSegmentos = 1; // el primer segmento a desplegar...
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	jq321(".segmento" + recorreSegmentos).show();
	if (totalSegmentos > recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		// jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
		jq321("#btnPaginador").show();
	}

	jq321(".palomitaReactivo, .palomita").hide();
	jq321(".tacheReactivo, .tache").hide();
	jq321("#btnPaginador").hide();

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


function esImagen(filePath) {
	// var fileInput = document.getElementById('file');
	// var filePath = fileInput.value;
	var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
	if (!allowedExtensions.exec(filePath)) {
		// alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
		// fileInput.value = '';
		return false;
	} else {
		return true;
		//Image preview
		/*   if (fileInput.files && fileInput.files[0]) {
			   var reader = new FileReader();
			   reader.onload = function(e) {
				   document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
			   };
			   reader.readAsDataURL(fileInput.files[0]);
		   }*/
	}
}
function obtenClase(stringRespuesta) {
	//cCasillaDraggable.split("-",1)
	var resultado = '';
	if (stringRespuesta.indexOf("/") != -1) { // es ruta...
		var inicio = stringRespuesta.lastIndexOf("/");
		var fin = stringRespuesta.lastIndexOf(".");
		// alert ("tiene diagnonal");
		if (fin > inicio) {
			resultado = stringRespuesta.substring(inicio + 1, fin);
		}
	} else { //texto...
		stringRespuesta = quitarAcentos(stringRespuesta); // por que duro tanto sin esto?
		resultado = stringRespuesta.split("-", 1);

		//alert ("sin diagnonal");
	}
	return resultado;
}

function calculaLong(pregunta) {     // JLBG 2019, 16 mzo: funcion para construir la pregunta con todas sus respuestas, y poner su valor al final de la misma
	var x = pregunta.txt1.split("@");
	var nuevo = "";
	for (var i = 0; i < x.length - 1; i++) {
		nuevo += x[i];
		// if (pregunta.listaResp[i].toUpperCase() !== "DISTRACTOR") {
		nuevo += pregunta.listaResp[i];
		// }
	}
	nuevo += x[x.length - 1];
	return nuevo.length;
}

function tam(cad, n) {// 1T, 0ele.esc.ord Es para imprimir la longitud del texto indicado, crm=var global de impresion, n para apagar en caso particular...
	var txt = "";
	if (verLongitud == false) { txt = (n == 1) ? cad : "" } // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) { txt = cad + txt }
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



/*function mostrarMensaje(clase, recurso) { //RAAR ago 18,18: Pongo funcion reversa
	if (!recurso) { recurso = -1 }
	var msgs = [,
		["Arrastra todas las respuestas a los espacios correspondientes.", "Please, drag all answers to appropriate spaces"],  // completar arrastrando
		["Por favor, llena todos los campos de texto", "Please, fill out all text fields"],                  // completar escribiendo
		["Por favor, contesta todas las preguntas", "Please, answer all questions"],                         // verdadero-falso
		["Por favor, ordena todos los enunciados", "Please, sort all sentences"],                            // ordenar enunciados
		["Por favor, elige una respuesta para cada recuadro", "Please, choose an answer for each list"],     // completar eligiendo
		["Por favor, arrastra todas las respuestas a los espacios correspondientes", "Please, drag all answers to appropriate spaces"],  // arrastrar esquema		["", ""]
		["Por favor, elija la opción apropiada", "Please, choose the right option"],  // opcion multiple radiobutton		
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
					msg = "You have reached maximum number of attempts: " + maxIntentos + "."; // empiezo a quitar los espejos....abril 26 2018

					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = "Has alcanzado el máximo número de intentos: " + maxIntentos + ".";
					btnOK = "Aceptar";
			}
			break;
		case 2: // Contestar TODO
			tipo = "warning";
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
			tipo = "error";
			tit = "Error de sistema";
			msg = "Condición desconocida";
			btnOK = "Aceptar";
	}

	swal({ title: tit, text: msg, type: "", confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}*/

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function (indice) {
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == "ENG") ? retroCal[indice].Mensaje[1] : retroCal[indice].Mensaje[0];
			}
		});
	}
	mensaje = mensaje + '<br>' + textoRetroGeneral;
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
	swal({ title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}


// JavaScript Document
var min = 10;
var max = 18;
function increaseFontSize() {
	var p = document.getElementsByTagName('p');
	for (i = 0; i < p.length; i++) {
		if (p[i].style.fontSize) {
			var s = parseInt(p[i].style.fontSize.replace("px", ""));
		} else {
			var s = 12;
		}
		if (s != max) {
			s += 1;
		}
		p[i].style.fontSize = s + "px"


		localStorage.tamano = s;
		//alert(localStorage.getItem('tamano'));	  
	}
}

function decreaseFontSize() {
	var p = document.getElementsByTagName('p');
	for (i = 0; i < p.length; i++) {
		if (p[i].style.fontSize) {
			var s = parseInt(p[i].style.fontSize.replace("px", ""));
		} else {
			var s = 12;
		}
		if (s != min) {
			s -= 1;
		}
		p[i].style.fontSize = s + "px"
	}

	localStorage.tamano = s;
	//alert(localStorage.getItem('tamano'));   
}

function soloAbecedario(str) { // solo permito letras minusculas y guion medio sin caracteres especiales....
	//str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	/*	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
		var to   = "aaaaeeeeiiiioooouuuunc------"; 
		for (var i = 0, l = from.length ; i < l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}*/
	str = str.replace(/[^a-z0-9 -]/g, '') // quito todo lo que no sea minusculas, espacio y guion
		.replace(/\s+/g, '-') // los espacios los cambio a guion
		.replace(/-+/g, '-'); // las series de guion por un solo guion
	return str;
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
