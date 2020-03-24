// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<img class='palomita' style='display:none' src='img/palomita.png' />";
var tache = "<img class='tache' style='display:none' src='img/tache.png' />";

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
	for (i = 0; i < numReactivos; i++) {
		preguntas.push({txt1: "", txt2: "", ind: 0});
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		respuestas.push({txt: "", ind: 0});
		respuestas[i].txt = reactivos[i].A;
		respuestas[i].ind = indices[i];
	}
}

function reordenaArreglo(arreglo) {
    arreglo.sort(function(a, b){return 0.5 - Math.random()});
}

function creaEscribir(reactivosMostrar){
	for (i = 0; i < reactivosMostrar; i++) {
		var preg = reactivos[i].Q.split("@");
		var texto = "";
		for (j = 0; j < reactivos[i].A.length; j++) {
			texto += preg[j] + '<input type="text" data-respuesta="' + reactivos[i].A[j] + '" id="caja_' + (i + 1) + "." + (j + 1) + '">';
		}
		texto += preg[j];
		jq321("#completable").append('<hr><div id="p' + i + '"><p>' + texto + tam1(reactivos[i].Q));
		jq321("#p" + i).append('<span class="retroBien ocultarRetro">' + tam(reactivos[i].F[0]) + '</span><span class="retroMal ocultarRetro">' + tam(reactivos[i].F[1]) + '</span>');
	}
}

function creaArrastrar() {
	jq321(".reactivos .lista-preguntas").each(function() { jq321(this).html(''); });
	jq321(".respuestas .lista-respuestas").each(function() { jq321(this).html(''); });

	if (invPregResp) {jq321(".respuestas").prependTo(".ejercicio-arrastrar")}
	if (formatoColumnas) {
		jq321("#reactivo").addClass("col-md-9 col-lg-9");
		jq321("#respuesta").addClass("col-md-3 col-lg-3");
		if (!(esTexto)) {
			jq321("#reactivo").addClass("col-sm-9 col-xs-9");
			jq321("#respuesta").addClass("col-sm-3 col-xs-3");
		}
	}
	else {
		jq321("#reactivo").addClass("center");
		jq321("#respuesta").addClass("center");
	}

	for (var i = 0; i < preguntas.length; i++ ) {
		var preg = preguntas[i].txt1.split("@");
		jq321("#reactivo .lista-preguntas").append('<div class="sub-item" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + '><p>' + (i + 1) + '.&nbsp;&nbsp;' + tam(preg[0]) + '<span class="droppable"></span>' + preg[1] + '<br/></p></div>');
		jq321('#preg' + preguntas[i].ind).append('<div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + tam(preguntas[i].txt2[0]));
		jq321('#preg' + preguntas[i].ind).append('<div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + tam(preguntas[i].txt2[1]));
		jq321('#preg' + preguntas[i].ind).after('<hr/>');
	}
	jq321('div.sub-item:last + hr').remove();

	for (var i = 0; i < respuestas.length; i++ ) {
		if (esTexto) {             // texto
			jq321(".respuestas .lista-respuestas").append('<div class="sub-item respuesta" id="resp' + respuestas[i].ind + '"><div data-intentos="1" class="draggable" data-drag="' + respuestas[i].ind + '">' + tam(respuestas[i].txt) + '</div></div>');
		}
		else {                   // imagen
			jq321(".respuestas .lista-respuestas").append('<div class="sub-item respuesta "id="resp' + respuestas[i].ind + '"><img data-intentos="1" class="draggable" data-drag="' + respuestas[i].ind + '" src="' + respuestas[i].txt + '"></div>');
		}
	}
}
function creaOrdenar() {
	preguntas = reactivos;
	for (i = 0; i < reactivosMostrar; i++) {
		respOriginales.push(preguntas[i].Q);
		var tmp = preguntas[i].Q.split(" ");
		preg = [];
		for (j = 0; j < tmp.length; j++) {
			preg.push([tmp[j], j]);
		}
		reordenaArreglo(preg);
		var txt = "";
		for (j = 0; j < preg.length; j++) {
			txt += "<li class='ui-state-default ui-sortable-handle' data-orden=" + preg[j][1] + "><span class='ui-icon ui-icon-arrowthick-2-e-w'></span>" + preg[j][0] + "</li>";
		}
		jq321("#ordenarEnunciado").append("<div class='lista'><ul class='sortable' id='ulId" + i + "'>" + txt + tam1(preguntas[i].Q) + "<div class='retroInd'><div class='retroBien ocultarRetro'>" + tam(preguntas[i].F[0]) + "</div><div class='retroMal ocultarRetro'>" + tam(preguntas[i].F[1]) + "</div></div>");
		jq321(".lista:last").after("<hr/>");
	}
	jq321(".lista > .sortable").each(function() {
		$(this).sortable();
		$(this).disableSelection();
	});
}

//  ============================================================================================================
function creaTablaVF(numReactivos){
	jq321('div#contenedor').append('<table class="tabla-reactivos">');
	jq321('.tabla-reactivos').append('<tbody>');
	jq321('tbody').append('<tr>');
	jq321('tr').append('<th>&nbsp;');
	jq321('tr').append('<th>Verdadero');
	jq321('tr').append('<th>Falso');
	jq321('tr').append('<th>&nbsp;');
	for (i = 0; i < numReactivos; i++){
		jq321('tbody').append('<tr class="reactivo">');
		jq321('tr:last').append('<td class="preguntaTexto" id="' + i + '">' + tam(reactivos[i].Q) + '<br/><div class="retroBien ocultarRetro">' + tam(reactivos[i].F[0]) + '</div><div class="retroMal ocultarRetro">' + tam(reactivos[i].F[1]) + '</div></td>');
		jq321('tr:last').append('<td class="preguntaOpciones"><label>' + espacios + '<input type="radio" name="pregunta' + i + '" value="true">' + espacios + '</label>');
		jq321('tr:last').append('<td class="preguntaOpciones"><label>' + espacios + '<input type="radio" name="pregunta' + i + '" value="false">' + espacios + '</label>');
		jq321('tr:last').append('<td>' + palomita + tache);
	}
}

//  ============================================================================================================
function creaElegir(mostrar) {
	var ind = 1;
	for (i = 0; i < mostrar; i++) {
		jq321("#contenedor").append('<hr/>').append('<div id="divId' + i + '">');
		jq321("div#divId" + i).append('<p id="pId' + i + '">');
		var componentes = reactivos[i].Q.split("@");
		var respuestas = reactivos[i].A;
		for (j = 0; j < respuestas.length; j++) {
			var opciones = respuestas[j];
			if (mezclarRespuestas) {reordenaArreglo(opciones)}
			opciones.unshift({opcion: "-------", correcta: false});
			jq321("#pId" + i).append(componentes[j]).append('<select id="selId' + ind + '">');
			for (k = 0; k < opciones.length; k++) {
				jq321("select:last").append("<option>" + opciones[k].opcion);
				if (opciones[k].correcta) {
					jq321("select:last").attr("data-respuesta", opciones[k].opcion);
				}
			}
			ind++;
		}
		jq321("#pId" + i).append(componentes[j] + tam1(reactivos[i].Q));
		jq321("#divId" + i).append("<div class='retroBien ocultarRetro'>" + tam(reactivos[i].F[0])).append("<div class='retroMal ocultarRetro'>" + tam(reactivos[i].F[1]));
	}
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
}

function creaOM(mostrar) {
	var ind = 1;
	for (i = 0; i < mostrar; i++) {
		jq321("#bancoPreguntas").append('<div class="setPregunta">');
		jq321(".setPregunta:last").append('<div class="preguntaTexto">' + (i + 1) + '. ' + tam(reactivos[i].Q));
		jq321(".setPregunta:last").append('<div class="opciones">');
		if (mezclarRespuestas) {reordenaArreglo(reactivos[i].A);}
		for (j = 0; j < reactivos[i].A.length; j++) {
			var res = String.fromCharCode(j + 97) + ') ';
			jq321(".opciones:last").append('<div class="opcion btn btn-default" data-correcta="' + reactivos[i].A[j].correcta + '">' + res + tam(reactivos[i].A[j].opcion));
		}
		jq321(".setPregunta:last").append('<div class="retroIndividual">');
		jq321(".retroIndividual:last").append('<div class="retroCorrecta bg-success">' + tam(reactivos[i].F[0]) + '</div>').append('<div class="retroIncorrecta bg-danger">' + tam(reactivos[i].F[1]) + '</div>');
	}
}

function tam(cad) {
	var txt = "";
	if (crm) {txt = cad}
	else {txt = cad + "&nbsp;<sup>" + cad.length + "</sup>"}
	return txt;
}

function tam1(cad) {
	var txt = "";
	if (crm) {txt = ""}
	else {txt = "&nbsp;<sup>" + cad.length + "</sup>"}
	return txt;
}

function mostrarMensaje(tipo, titulo, cadena) {
	swal({title: titulo, text: cadena, type: tipo, confirmButtonText: "Aceptar", closeOnConfirm: true, html: true });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function(indice){
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = retroCal[indice].Mensaje;
			}
		});
	}
	return mensaje;
}
