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
var grupos = [];

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<img class='palomita' style='display:none' src='img/palomita.png' />";
var tache = "<img class='tache' style='display:none' src='img/tache.png' />";

var esMobil = false;

jq321(document).ready(function () {
	if (window.parent.data_crm) {
		verLongitud = true;
	}
	if (window.name == "movil") {
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
	jq321(".info").click(function () {
		console.log("hola");
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
	for (i = 0; i < numReactivos; i++) {
		preguntas.push({ txt1: "", txt2: "", ind: 0 });
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		respuestas.push({ txt: "", ind: 0 });
		respuestas[i].txt = reactivos[i].A;
		respuestas[i].ind = indices[i];
	}
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) { return 0.5 - Math.random() });
}

//  ============================================================================================================
function creaLV(numReactivos) {
	var numEnc = encabezados.length;
	if (numEnc > 8) { numEnc = 8 }
	var colCriterio = '';
	var colOpcion = '1';
	colCriterio = 12 - numEnc;
	for (i = 0; i < numReactivos; i++) {
		grupos.push(reactivos[i][1]);
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		} else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		}
		if (i == 0) {
			jq321("#contenedor").append('<div class="row" id="encabezado">');
			jq321("#encabezado").append('<div class="col-xs-12 col-sm-12 col-md-' + colCriterio + '">');
			for (j = 0; j < numEnc; j++) {
				jq321("#encabezado").append('<div class="col-xs-12 col-sm-12 col-md-' + colOpcion + '">' + tam(encabezados[j][0], 1));
			}
		}
		jq321("#contenedor").append('<div class="row opcion ' + reactivos[i][1] + '" id="reng' + i + '">');
		jq321("#reng" + i).append('<div class="col-xs-12 col-sm-12 col-md-' + colCriterio + ' texto" onclick="elegir()" >' + numeralPregunta + tam(reactivos[i][0], 1));
		for (j = 0; j < numEnc; j++) {
			jq321("#reng" + i).append('<div class="col-xs-12 col-sm-12 col-md-' + colOpcion + ' opcion"><label class="content-input"><input type="radio" name="preg' + i + '" value="' + encabezados[j][1] + '"><i></i><span class="txt">' + tam(encabezados[j][0], 1) + '</span><br></label></div>');
		}
	}
}
//  ============================================================================================================
// function creaOM(mostrar) {
// 	var ind = 1;
// 	for (i = 0; i < mostrar; i++) {
// 		jq321("#bancoPreguntas").append('<div class="setPregunta" id="sp' + i + '">');
// 		jq321(".setPregunta:last").append('<div class="preguntaTexto">' + (i + 1) + '. ' + tam(reactivos[i].Q, 1));
// 		jq321(".setPregunta:last").append('<div class="opciones">');
// 		jq321(".setPregunta:last").append('<div class="retroIndividual">');
// 		if (mezclarRespuestas) {reordenaArreglo(reactivos[i].A);}
// 		for (j = 0; j < reactivos[i].A.length; j++) {
// 			var res = String.fromCharCode(j + 97) + ') ';
// 			jq321(".opciones:last").append('<div class="opcion btn btn-default" data-correcta="' + reactivos[i].A[j].correcta + '">' + res + tam(reactivos[i].A[j].opcion, 1));
// 			if (reactivos[i].A[j].correcta) {
// 				jq321(".retroIndividual:last").append('<div class="retroCorrecta bg-success">' + tam(reactivos[i].A[j].retro, 1) + '</div>');
// 			}
// 			else {
// 				jq321(".retroIndividual:last").append('<div class="retroIncorrecta bg-danger">' + tam(reactivos[i].A[j].retro, 1) + '</div>');
// 			}
// 		}
// 	}
// }

function tam(cad, n) {// 1T, 0ele.esc.ord
	var txt = "";
	if (verLongitud) {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) { txt = cad + txt }
	}
	else {
		txt = (n == 1) ? cad : ""
	}
	return txt;
}

function mostrarMensaje(clase, recurso) {
	if (!recurso) { recurso = -1 }
	var msgs = [,
		[ic(".setneidnopserroc soicapse sol a satseupser sal sadot artsarrA"), ic(".secaps etairporppa ot srewsna lla garD")],  // completar arrastrando
		[ic(".otxet ed sopmac sol sodot anelL"), ic(".sdleif txet lla tuo lliF")],                  // completar escribiendo
		[ic(".satnugerp sal sadot atsetnoC"), ic(".snoitseuq lla rewsnA")],                         // verdadero-falso
		[ic(".odatluser ut reconoc arap sovitcaer sol sodot anedrO"), ic(".snoitseuq lla troS")],                            // ordenar
		[ic(".ordaucer adac arap atseupser anu egilE"), ic(".tsil hcae rof rewsna na esoohC")],     // completar eligiendo
		[ic(".setneidnopserroc soicapse sol a satseupser sal sadot artsarrA"), ic(".secaps etairporppa ot srewsna lla garD")],  // arrastrar esquema
		[ic(".oñepmesed ut reconoc arap oiretirc adac ed nóicpo anu anoicceleS"), ""]   // rubrica
	];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos
			// tipo = ic("gninraw");
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
			// tipo = ic("gninraw");
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
	swal({ title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function (indice) {
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
	swal({ title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
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

function elegir(e) {
	var ElementosClick = new Array();
	// Funcion para capturar el click del raton
	var HaHechoClick;
	if (e == null) {
		// Si hac click un elemento, lo leemos
		HaHechoClick = event.srcElement;
	} else {
		// Si ha hecho click sobre un destino, lo leemos
		HaHechoClick = e.target;
	}
	// Añadimos el elemento al array de elementos
	ElementosClick.push(HaHechoClick);
	// Una prueba con salida en consola
	console.log("Contenido sobre lo que se hizo click:\n" + ElementosClick[0].innerHTML);

	var respuesta = jq321(HaHechoClick).parent().parent().hasClass("correcto");
	if (!respuesta) {
		var opciones = jq321(HaHechoClick).parent().find("input:radio");
		var listado = opciones.length;
		var marcado = -1;
		var porMarcar = 0;
		for (var i = 0; i < listado; i++) {
			var marca = jq321(opciones[i]).prop("checked");
			if (jq321(opciones[i]).prop("checked")) { marcado = i }
			console.log("opcion[i] marcado es: " + marca);
		}
		if (!(marcado == -1 || marcado == (listado - 1))) {
			porMarcar = marcado + 1;
		}
		var disponible = jq321(opciones[0]).attr("disabled");
		if (disponible != "disabled") {
			jq321("opciones").each(function(){
				jq321(this).prop("checked", false);
			});
			jq321(opciones[porMarcar]).prop("checked", true);
		}
	}
}
