// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];

var indImg = 0;

var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
// var palomita = "<i class='ip far fa-2x fa-check-circle blink'></i>";
var palomita = '<span class="ip glyphicon glyphicon-ok-circle blink" style="font-size: 2em" ></span>';
// var tache = "<i class='it far fa-2x fa-times-circle blink'></i>";
var tache = '<span class="it glyphicon glyphicon-remove-circle blink"style="font-size: 2em" ></span>';
// var lupa = '<i class="fas fa-search-plus lupa blink"></i>';
var lupa = "";

jq321(document).ready(function () {
	if (window.parent.data_crm) {
		verLongitud = true;
	}
	if (window.name == "movil") {
		esMobil = true;
		// alert ("indexbis.html window.name: "+window.name);
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

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) { return 0.5 - Math.random() });
}

function creaOrdenar() {
	preguntas = reactivos;
	if (elementosPorSegmento >= reactivosMostrar || elementosPorSegmento <= 0) {
		elementosPorSegmento = reactivosMostrar;
	}
	var conteo = 0;
	for (i = 0; i < reactivosMostrar; i++) {
		if (conteo >= elementosPorSegmento) {
			conteo = 0;
			totalSegmentos++;
		}
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		} else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		}

		var debugRespuesta = "";
		if (debug) {
			// var debugRespuesta = (debug ? '<sup>' + preguntas[i].Q + '</sup>' : "");
			var tmp1 = preguntas[i].Q;
			debugRespuesta = "|";

			for (var j = 0; j < tmp1.length; j++) {
				debugRespuesta += tmp1[j] + "|";
			}
		}
		var preg = [];
		var resp = [];
		for (j = 0; j < preguntas[i].Q.length; j++) {
			preg.push([preguntas[i].Q[j], j]);
			resp.push(preguntas[i].Q[j]);
		}
		var valorInicial = resp.join("@");
		respOriginales.push(valorInicial);
		do {
			reordenaArreglo(preg);
			var pregCheck = preg[0][0];
			for (j = 1; j < preg.length; j++) {
				pregCheck += "@" + preg[j][0]
			}
		} while (valorInicial == pregCheck);  // RAAR Jun 28,18: para asegurarnos que no salga igual la lista inicial despues de sortearla, pasa con los pequeños 
		var txt = "";
		for (j = 0; j < preg.length; j++) { // RAAR Jun 28,18:data-orden es para evaluar, data-despliegue es para saber si ha movido algo, debugguear
			var tmp = preg[j][0];
			tmp = tmp.split("/");
			if (tmp.length > 1) {
				console.log("HAY UNA RUTA INVOLUCRADA");
				// var nombreFuncion = 'onclick="zoom('+indImg+')"';
				var nombreFuncion = '';
				var imagen = "<img id='idimg" + indImg + "' src='" + preg[j][0] + "' alt='" + preg[j][0] + "' class='imagen' "+nombreFuncion+">";
				txt += "<li class='ui-state-active listaImagen' data-txt='" + preg[j][0] + "' data-orden=" + preg[j][1] + " data-despliegue=" + j + ">" + lupa + imagen + "</li>";
				indImg++;
			}
			else {
				console.log("Seguro que es un texto");
				txt += "<li class='ui-state-active ui-sortable-handle' data-txt='" + preg[j][0] + "' data-orden=" + preg[j][1] + " data-despliegue=" + j + ">" + preg[j][0] + "</li>";
			}
		}

		if (debug) { txt += debugRespuesta } // SOLO PARA DEBUG
		var toolTipSi = '<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span>';
		var toolTipNo = '<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span>';
		jq321('#ordenar').append("<div id='lista" + i + "'><ul class='sortable' id='ulId" + i + "'>" + txt + tam(valorInicial, 0) + toolTipSi + toolTipNo);
		jq321('#lista' + i).addClass("segmento" + totalSegmentos).addClass('lista');
		if (ponerNumeral) {
			jq321("#lista" + i).prepend("<div class='bullet'>" + numeralPregunta);
		}
		conteo++;
	}
	jq321(".lista > .sortable").each(function () {
		jq321(this).sortable();
		jq321(this).disableSelection();
	});
	jq321('span.ip, span.it').addClass("ocultar");
	var JL = jq321("[class^=segmento]");
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

function mostrarMensaje(clase, recurso) {
	if (!recurso) { recurso = -1 }
	var msgs = [,
		[ic("setneidnopserroc soicapse sol a satseupser sal sadot artsarra ,rovaf roP"), ic("secaps etairporppa ot srewsna lla gard ,esaelP")],  // completar arrastrando
		[ic("otxet ed sopmac sol sodot anell ,rovaf roP"), ic("sdleif txet lla tuo llif ,esaelP")],                  // completar escribiendo
		[ic("satnugerp sal sadot atsetnoc ,rovaf roP"), ic("snoitseuq lla rewsna ,esaelP")],                         // verdadero-falso
		[ic("satnugerp sal sadot anedro ,rovaf roP"), ic("snoitseuq lla tros ,esaelP")],                            // ordenar
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

function zoom(imagen) {
	var img = jq321("#idimg"+imagen)[0];
	var modal = jq321("#myModal")[0];
	var modalImg = jq321("#imgContenido")[0];
	var captionText = jq321("#caption")[0];

	jq321(modal).css("display", "block");
	jq321(modalImg).attr("src", jq321(img).attr("src"));
	jq321(captionText).html(jq321(img).attr("alt"));
	var span = jq321(".close")[0];
	span.onclick = function () {
		jq321(modal).css("display", "none")
	}

}

