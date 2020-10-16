// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var idioma = "ESP";
var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip far fa-2x fa-check-circle blink'></i>";
var tache = "<i class='it far fa-2x fa-times-circle blink'></i>";
var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
jq321(document).ready(function () {
	jq321("#mododebug").hide();
	if (window.parent.data_crm) {
		debug = true;
		verLongitud = true;
		mezclarPreguntas = true;
		ponerNumeral = false;
		elementosPorSegmento = 3;
		siguienteIntentoBlanco = true;
	}
	if (window.name == "movil") {
		esMobil = true;
	} else {
		esMobil = esPortable();
	}
	if (esMobil) {
		elementosPorSegmento = 1;
		//var texto = jq321("#textoInstrucciones").html();
		// var texto = jq321("#textoInstrucciones").text();
		// jq321("#textoInstrucciones").removeClass("mostrar").addClass("ocultar");
		// console.log("texto: "+texto);
		// jq321("#toolTipInstrucciones").attr("title",texto);
		// jq321("#toolTipInstrucciones").removeClass("ocultar").addClass("mostrar");
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
		} else {
			jq321("#textoInstrucciones").slideDown(300);
			jq321(this).addClass("hiden");
		}
	});
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
	if (flechaArriba) {
		jq321('.ir-arriba').show();
	} else {
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

function divideReactivosQF_A(numReactivos) { //  RA-01, RA-03,   QF-A
	for (i = 0; i < numReactivos; i++) {
		preguntas.push({
			txt1: "",
			txt2: "",
			ind: 0
		});
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		respuestas.push({
			txt: "",
			ind: 0
		});
		respuestas[i].txt = reactivos[i].A;
		respuestas[i].ind = indices[i];
	}
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) {
		return 0.5 - Math.random()
	});
}

function creaEscribir(reactivosMostrar) {
	var escr = (idioma == "ESP") ? "Escribe&nbsp;aquí..." : "Write&nbsp;here...";
	// elementosPorSegmento;
	if (elementosPorSegmento >= reactivosMostrar || elementosPorSegmento <= 0) {
		elementosPorSegmento = reactivosMostrar;
	}
	var conteo = 0;
	for (i = 0; i < reactivosMostrar; i++) {
		if (conteo >= elementosPorSegmento) {
			conteo = 0;
			totalSegmentos++;
		}
		var preg = reactivos[i].Q.split("@");
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : ''); // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		} else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : ''); // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		}

		var texto = numeralPregunta;
		for (j = 0; j < reactivos[i].A.length; j++) { // JLBG mar 18, 2019; a cada caja se le agrega la retroArroba correspondiente
			if (debug) {
				jq321("#mododebug").show();
				escr = reactivos[i].A[j]
			}
			texto += preg[j] + '<input type="text" placeholder="' + escr + '" data-respuesta="' + reactivos[i].A[j] + '" id="caja_' + (i + 1) + "." + (j + 1) + '">\
			<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].FA[j].correcta, 1) + '">' + palomita + '</span>\
			<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].FA[j].incorrecta, 1) + '">' + tache + '</span>';
		}
		texto += preg[j];
		jq321("#completable").append('<div id="divId' + i + '" class=segmento' + totalSegmentos + '><p class="contenido">' + texto + tam(reactivos[i].Q, 0));
		// JLBG mar 18, 2019; a cada enunciado se le agrega su retro
		jq321('#divId' + i).prepend('<p class="retros">\
			<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span>\
			<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span></p>');
		conteo++;
	}
	jq321('i.ip').css("display", "none");
	jq321('i.it').css("display", "none");
	jq321("[id^=divId]").addClass("ocultar");
	jq321(".segmento1").removeClass("ocultar");
}


function tam(cad, n) { // 1T, 0ele.esc.ord
	var txt = "";
	if (verLongitud) {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {
			txt = cad + txt
		}
	} else {
		txt = (n == 1) ? cad : ""
	}
	return txt;
}
//function mostrarMensaje(tipo, titulo, cadena) {
function mostrarMensaje(clase, recurso) {
	if (!recurso) {
		recurso = -1
	}
	var msgs = [,
		[("Arrastra todas las respuestas a los espacios correspondientes."), ("Please, drag all answers to appropriate spaces.")], //completar arrastrando
		[("Llena todos los campos de texto."), ("Please, fill out all text fields")], //completar escribiendo
		[("Contesta todas las preguntas."), ("Please, answer all questions")], // verdadero-falso
		[("Ordena todos los encunciados."), ("Please, sort all sentences")], //Ordenar
		[("Elige una respuesta para cada recuadro."), ("Please, choose an answer for each list")], // completar eligiendo
		[("Arrastra todas las respuestas a los espacios correspondientes."), ("Please, drag all answer appropriate spaces.")]
		[(""), ("")]
	];

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
					tit = ("Atención");
					msg = ("Has alcanzado el máximo número de intentos: " + maxIntentos + ".")
					btnOK = ("Aceptar");
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
					tit = ("Atención");
					msg = msgs[recurso][0]; //recurso,0
					btnOK = ("Aceptar");
			}
			break;
		default:
			tipo = ("Error");
			tit = ("Error del sistema");
			msg = ("Condición desconocida")
			btnOK = ("Aceptar");
	}
	swal({
		title: tit,
		text: msg,
		confirmButtonText: btnOK,
		closeOnConfirm: true,
		html: true
	});
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
			var btnOK = ("OK");
			break;
		default:
			var btnOK = ("Aceptar");
	}
	swal({
		title: titulo,
		text: cadena,
		confirmButtonText: btnOK,
		closeOnConfirm: true,
		html: true
	});
}

function esPortable() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i) ||
		navigator.userAgent.match(/Opera Mini/i) ||
		navigator.userAgent.match(/IEMobile/i)
	) {
		return true;
	} else {
		return false;
	}
}