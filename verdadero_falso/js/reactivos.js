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
var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip far fa-2x fa-check-circle blink'></i>";
var tache = "<i class='it far fa-2x fa-times-circle blink'></i>";
var puntaje = [1, 2];
var esMobil = false;

jq321(document).ready(function () {
	// alert("La resolución de tu pantalla es: " + screen.width + " x " + screen.height);
	// console.log("READY de REACTIVOS.JS");
	if (window.parent.data_crm) {
		verLongitud = true;
		debug = true;
		numeralAlfabetico = true;
	}
	if (window.name == "movil") {
		esMobil = true;
	}
	else {
		esMobil = esPortable();
	}
	if (esMobil) {
		elementosPorSegmento = elementosPorSegmentoMovil;
		var texto = jq321("#textoInstrucciones").text();
		jq321(".info").removeClass("ocultar").addClass("mostrar");
		jq321("#textoInstrucciones").addClass("estilosinstruccion mostrarinfo");
		jq321("#textoInstrucciones").slideUp(1);
	}
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
	// console.log("READY de VERDADERO-FALSO.JS");
	creaIndice();
	if (mezclarPreguntas) { reordenaArreglo(reactivos) };
	creaTablaVF(reactivosMostrar);
	limpiaRadiosVF();
	jq321("button#btnRevisar").show();
	jq321("button#btnReiniciar").hide();
	iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		if (carruselContinuo) {
			jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		} else {
			jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		}
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
	// console.log("READY de INDEX.HTML");
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

function creaTablaVF(numReactivos) {
	console.log("numReactivos es " + numReactivos);
	if (elementosPorSegmento >= reactivosMostrar || elementosPorSegmento <= 0) {
		elementosPorSegmento = reactivosMostrar;
	}
	var conteo = 0;
	for (i = 0; i < numReactivos; i++) {
		if (conteo >= elementosPorSegmento) {
			conteo = 0;
			totalSegmentos++;
		}
		if (i == 0) {
			jq321('div#contenedor').append('<div class="row" id="encabezado">');
			jq321("#encabezado").append('<div class="col-xs-12 col-sm-12 col-md-10">&nbsp;');
			for (j = 0; j < encabezados.length; j++) {
				if (j == 0) {
					jq321("#encabezado").append('<div class="col-xs-12 col-sm-12 col-md-1">' + encabezados[j]);

				} else {
					jq321("#encabezado").append('<div class="col-xs-12 col-sm-12 col-md-1">' + encabezados[j]);
				}
			}
		}

		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		} else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		}

		var debugRespuesta = (debug ? '<sup>' + reactivos[i].A + '</sup>' : "");

		jq321("div#contenedor").append('<div id="reng' + i + '">');
		jq321("#reng" + i).addClass("segmento" + totalSegmentos).addClass("row").addClass("opcion").addClass("opcioncontenedor");
		var toolTipSi = '<span data-toggle="tooltip" data-placement="auto right" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span>';
		var toolTipNo = '<span data-toggle="tooltip" data-placement="auto right" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span>';
		jq321("#reng" + i).append('<div class="primera opcion">' + toolTipSi + toolTipNo + '</div>');

		jq321("#reng" + i).append('<div id="conteni' + i + '" class="conteni col-xs-12 col-sm-12 col-md-12" >');
		jq321("#conteni" + i).append('<div class="col-xs-12 col-sm-12 col-md-10">' + numeralPregunta + tam(reactivos[i].Q, 1) + debugRespuesta);
		for (j = 0; j < puntaje.length; j++) {
			if (puntaje[j] == 1) {
				jq321("#conteni" + i).append('<div class="col-xs-6 col-sm-6 col-md-1 opcion"><label class="content-input"><input class="cRbutton" type="radio" name="pregunta' + i + '" value="true"><i></i><span class="txt">' + encabezados[j] + '</span><br></label></div>');
			} else {
				jq321("#conteni" + i).append('<div class="col-xs-6 col-sm-6 col-md-1 opcion"><label class="content-input"><input class="cRbutton" type="radio" name="pregunta' + i + '" value="false"><i></i><span class="txt">' + encabezados[j] + '</span><br></label></div>');
			}
		}
		conteo++;
	}
	jq321('i.ip, i.it').css("display", "none");
	jq321("[class^=segmento]").addClass("ocultar");
	jq321(".segmento1").removeClass("ocultar");
}

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
//function mostrarMensaje(tipo, titulo, cadena) {
function mostrarMensaje(clase, recurso) {
	if (!recurso) { recurso = -1 }
	var msgs = [,
		[ic(".setneidnopserroc soicapse sol a satseupser sal sadot artsarra ,rovaf roP"), ic(".secaps etairporppa ot srewsna lla gard ,esaelP")],  // completar arrastrando
		[ic(".otxet ed sopmac sol sodot anell ,rovaf roP"), ic(".sdleif txet lla tuo llif ,esaelP")],                  // completar escribiendo
		[ic(".satnugerp sal sadot atsetnoc ,rovaf roP"), ic(".snoitseuq lla rewsna ,esaelP")],                         // verdadero-falso
		[ic(".sotnemele sol sodot anedro ,rovaf roP"), ic(".secnetnes lla tros ,esaelP")],                            // ordenar enunciados
		[ic(".ordaucer adac arap atseupser anu egile ,rovaf roP"), ic(".tsil hcae rof rewsna na esoohc ,esaelP")],     // completar eligiendo
		[ic(".setneidnopserroc soicapse sol a satseupser sal sadot artsarra ,rovaf roP"), ic(".secaps etairporppa ot srewsna lla gard ,esaelP")],  // arrastrar esquema
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
