// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var cuentaIntentos = 0;

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<img class='palomita' style='display:none' src='img/palomita.png' />";
var tache = "<img class='tache' style='display:none' src='img/tache.png' />";

var esMobil = false;

jq321(document).ready(function(){
	if (window.parent.data_crm) {
		verLongitud = true;
	}
	if (window.name=="movil") {
		esMobil = true;
	}
	else {
		esMobil = esPortable();		
	}
	if (esMobil) {
		var texto = jq321("#textoInstrucciones").text();
		jq321("#textoInstrucciones").addClass("estilosinstruccion");
		jq321(".info").removeClass("ocultar").addClass("mostrar");
		jq321("#textoInstrucciones").slideUp(10);
		jq321("#textoInstrucciones").addClass("mostrarinfo");
	}
	jq321(".info").click(function(){
		console.log("hola");
		if(jq321(this).hasClass("hiden")) {
			jq321("#textoInstrucciones").slideUp(300);
			jq321(this).removeClass("hiden");
		}
		else {
			jq321("#textoInstrucciones").slideDown(300); 
			jq321(this).addClass("hiden");
		}
	});
	if (flechaArriba) {
		jq321('.ir-arriba').click(function(){
			jq321('body, html').animate({
				scrollTop: '0px'
			}, 300);
		});
		
		jq321(window).scroll(function(){
			if( jq321(this).scrollTop() > 0 ){
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
		jq321("#completable").append('<hr><div id="p' + i + '"><p>' + texto + tam(reactivos[i].Q, 0));
		jq321("#p" + i).append('<span class="retroBien ocultarRetro">' + tam(reactivos[i].F[0], 1) + '</span><span class="retroMal ocultarRetro">' + tam(reactivos[i].F[1], 1) + '</span>');
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
		jq321("#reactivo .lista-preguntas").append('<div class="sub-item" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + '><p>' + (i + 1) + '.&nbsp;&nbsp;' + tam(preg[0], 1) + '<span class="droppable"></span>' + preg[1] + '<br/></p></div>');
		jq321('#preg' + preguntas[i].ind).append('<div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + tam(preguntas[i].txt2[0], 1));
		jq321('#preg' + preguntas[i].ind).append('<div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + tam(preguntas[i].txt2[1], 1));
		jq321('#preg' + preguntas[i].ind).after('<hr/>');
	}
	jq321('div.sub-item:last + hr').remove();

	for (var i = 0; i < respuestas.length; i++ ) {
		if (esTexto) {             // texto
			jq321(".respuestas .lista-respuestas").append('<div class="sub-item respuesta" id="resp' + respuestas[i].ind + '"><div data-intentos="1" class="draggable" data-drag="' + respuestas[i].ind + '">' + tam(respuestas[i].txt, 1) + '</div></div>');
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
		jq321("#ordenarEnunciado").append("<div class='lista'><ul class='sortable' id='ulId" + i + "'>" + txt + tam(preguntas[i].Q, 0) + "<div class='retroInd'><div class='retroBien ocultarRetro'>" + tam(preguntas[i].F[0], 1) + "</div><div class='retroMal ocultarRetro'>" + tam(preguntas[i].F[1], 1) + "</div></div>");
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
	jq321('tr').append('<th id="tV">Verdadero');
	jq321('tr').append('<th id="tF">Falso');
	jq321('tr').append('<th>&nbsp;');
	for (i = 0; i < numReactivos; i++){
		jq321('tbody').append('<tr class="reactivo">');
		if (invPregResp) {
			// JLBG 16 mzo 2019, se muestran las retros buenas y malas como tooltips; la palomita y el tache se insertan dentro del span correspondiente; placement lleva AUTO; type es SUCCESS o DANGER para color; clases tooltip en css/ra05.css
			jq321('tr:last').append('<td><span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span><span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span>');
			jq321('tr:last').append('<td class="preguntaOpciones"><label class="content-input">' + espacios + '<input class="cRbutton" type="radio" name="pregunta' + i + '" value="true">' + espacios + '<i></i></label>');
			jq321('tr:last').append('<td class="preguntaOpciones"><label class="content-input">' + espacios + '<input class="cRbutton" type="radio" name="pregunta' + i + '" value="false">' + espacios + '<i></i></label>');
			jq321('tr:last').append('<td class="preguntaTexto" id="' + i + '">' + tam(reactivos[i].Q, 1) + '</td>');
		}
		else {
			jq321('tr:last').append('<td class="preguntaTexto" id="' + i + '">' + tam(reactivos[i].Q, 1) + '<br/></td>');
			jq321('tr:last').append('<td class="preguntaOpciones"><label class="content-input">' + espacios + '<input class="cRbutton" type="radio" name="pregunta' + i + '" value="true">' + espacios + '<i></i>' + espacios + '</label>');
			jq321('tr:last').append('<td class="preguntaOpciones"><label class="content-input">' + espacios + '<input class="cRbutton" type="radio" name="pregunta' + i + '" value="false">' + espacios + '<i></i>' + espacios + '</label>');
			jq321('tr:last').append('<td><span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span><span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span>');
		}
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
		jq321("#pId" + i).append(componentes[j] + tam(reactivos[i].Q, 0));
		jq321("#divId" + i).append("<div class='retroBien ocultarRetro'>" + tam(reactivos[i].F[0], 1)).append("<div class='retroMal ocultarRetro'>" + tam(reactivos[i].F[1], 1));
	}
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text(ic("kcehC"));
			jq321("#btnReiniciar").text(ic("tpmetta txeN"));
			break;
		default:
			jq321("#btnRevisar").text(ic("rasiveR"));
			jq321("#btnReiniciar").text(ic("otnetni omixórP"));
	}
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
}
 
//  ============================================================================================================
// function nueva(numReactivos){
// 	jq321('div#contenedor').append('<table class="tabla-rubrica">');
// 	jq321('.tabla-rubrica').append('<tbody>');
// 	jq321('tbody').append('<tr>');
// 	jq321('tr').append('<th>&nbsp;');
// 	for (i = 0; i < encabezados.length; i++) {
// 		jq321('tr').append('<th>' + encabezados[i]);
// 	}
// 	for (i = 0; i < numReactivos; i++){
// 		jq321('tbody').append('<tr class="reactivo">');
// 			jq321('tr:last').append('<td class="preguntaTexto" id="' + i + '">' + tam(reactivos[i].toString(), 1) + '<br/></td>');
// 			for (j = 0; j < encabezados.length; j++) {
// 				if (listaMultiple) {
// 					jq321('tr:last').append('<td class="preguntaOpciones"><label class="content-input"><input class="cRbutton" type="checkbox" name="pregunta' + i + '" value="'+ puntaje[j]+'"><span class="checkmark"></span></label>');
// 				}
// 				else {
// 					jq321('tr:last').append('<td class="preguntaOpciones"><label class="content-input"><input class="cRbutton" type="radio" name="pregunta' + i + '" value="'+ puntaje[j]+'"><i></i></label>');
// 				}
// 			}
// 	}
// }
//  ============================================================================================================

function creaLV(numReactivos){
	for (i = 0; i < numReactivos; i++){
		if (i == 0) {
			jq321("#c1").append('<div class="row" id="encabezado">');
			jq321("#encabezado").append('<div class="col-xs-12 col-sm-12 col-md-6">');
			for (j = 0; j < encabezados.length; j++) {
				jq321("#encabezado").append('<div class="col-xs-12 col-sm-12 col-md-2">' + tam(encabezados[j], 1));
			}
		}
		jq321("#c1").append('<div class="row opcion" id="reng' + i + '">');
		jq321("#reng" + i).append('<div class="col-xs-12 col-sm-12 col-md-6 texto">' + tam(reactivos[i], 1));
		for (j = 0; j < puntaje.length; j++) {
			jq321("#reng" + i).append('<div class="col-xs-12 col-sm-12 col-md-2 opcion"><label class="content-input"><input type="radio" name="preg' + i + '" value="' + puntaje[j] + '"><i></i><span class="txt">' + tam(encabezados[j], 1) + '</span><br></label></div>');
		}
	}
	var x = jq321("[id^=reng]");
}
//  ============================================================================================================
function creaOM(mostrar) {
	var ind = 1;
	for (i = 0; i < mostrar; i++) {
		jq321("#bancoPreguntas").append('<div class="setPregunta" id="sp' + i + '">');
		jq321(".setPregunta:last").append('<div class="preguntaTexto">' + (i + 1) + '. ' + tam(reactivos[i].Q, 1));
		jq321(".setPregunta:last").append('<div class="opciones">');
		jq321(".setPregunta:last").append('<div class="retroIndividual">');
		if (mezclarRespuestas) {reordenaArreglo(reactivos[i].A);}
		for (j = 0; j < reactivos[i].A.length; j++) {
			var res = String.fromCharCode(j + 97) + ') ';
			jq321(".opciones:last").append('<div class="opcion btn btn-default" data-correcta="' + reactivos[i].A[j].correcta + '">' + res + tam(reactivos[i].A[j].opcion, 1));
			if (reactivos[i].A[j].correcta) {
				jq321(".retroIndividual:last").append('<div class="retroCorrecta bg-success">' + tam(reactivos[i].A[j].retro, 1) + '</div>');
			}
			else {
				jq321(".retroIndividual:last").append('<div class="retroIncorrecta bg-danger">' + tam(reactivos[i].A[j].retro, 1) + '</div>');
			}
		}
	}
}

function tam(cad, n) {// 1T, 0ele.esc.ord
	var txt = "";
	if (verLongitud) {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {txt = cad + txt}
	}
	else {
		txt = (n == 1) ? cad : ""
	}
	return txt;
}
//function mostrarMensaje(tipo, titulo, cadena) {
function mostrarMensaje(clase, recurso) {
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
					msg = ic(maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
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
	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function(indice){
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == ic("GNE")) ? tam(retroCal[indice].Mensaje[1], 1) : tam(retroCal[indice].Mensaje[0], 1);
			}
		});
	}
	return mensaje;
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			var btnOK = ic("KO");
			break;
		default:
			var btnOK = ic("ratpecA");
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
