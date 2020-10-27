// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var califMax = 0;      // JLBG Jun 03, 2020;  variable para guardar la calificacion máxima de todos los intentos

var indImg = 0;
var arreglo2 = [];

var idioma = "ESP";
var ponerNumeroPreguntas = false; // cuantos preguntas son?, no necesariamente cuantas son visibles...
var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip far fa-2x fa-check-circle blink'></i>";
var tache = "<i class='it far fa-2x fa-times-circle blink'></i>";
// var lupa = '<i class="fas fa-search-plus lupa blink"></i>';
var lupa = "";


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
	jq321(".info").hide();
	if (esMobil) {
		elementosPorSegmento = elementosPorSegmentoMovil;
		var texto = jq321("#textoInstrucciones").text();
		jq321(".info").show();
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
	estandarizar();
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

		var tmp1 = preguntas[i].Q;
		var debugRespuesta = tmp1.join("|");
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
		var arreglo1 = [];

		for (j = 0; j < preg.length; j++) { // RAAR Jun 28,18:data-orden es para evaluar, data-despliegue es para saber si ha movido algo, debugguear
			var tmp = preg[j][0];
			var resp = [];
			var ext = "";

			var pregunta = tmp;
			var contador = (i + 1).toString() + (j + 1).toString();
			resp = objetoMultimedia(pregunta, contador);
			var titulo = resp[0];
			var pregunta = resp[1];
			var play = resp[2];
			var pause = resp[3];
			var control = resp[4];
			var barraDeslizante = resp[5];
			var contVideo = resp[6];

			arreglo1.push([preg[j][0], preg[j][1], resp[7]]);

			var elemento = '<label class="contenido" id=lbl' + contador + '><span class="opcion" id=opc' + contador + '>' + titulo + pregunta + control + contVideo + barraDeslizante + '</span></label>';
			var pos1 = pregunta.lastIndexOf('<img');
			var pos2 = pregunta.lastIndexOf('<audio');
			var pos3 = pregunta.lastIndexOf('<video');

			if (pos1 >= 0) {
				txt += '<li class="ui-state-active listaImagen" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
			}
			else if (pos2 >= 0) {
				txt += '<li class="ui-state-active listaAudio" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
			}
			else if (pos3 >= 0) {
				txt += '<li class="ui-state-active listaVideo" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
			}
			else {
				txt += '<li class="ui-state-active listaTexto" data-txt="' + preg[j][0] + '" data-orden=' + preg[j][1] + ' data-despliegue=' + j + '>' + lupa + elemento + '</li>';
			}
			indImg++;
			if (pos1 >= 0) {
				var p2 = debugRespuesta.replace(tmp, resp[7]);
				debugRespuesta = p2;
			}
			if (pos2 >= 0) {
				var p2 = debugRespuesta.replace(tmp, resp[7]);
				debugRespuesta = p2;
			}
			if (pos3 >= 0) {
				var p2 = debugRespuesta.replace(tmp, resp[7]);
				debugRespuesta = p2;
			}
		}
		arreglo2.push(arreglo1);
		var toolTipSi = '<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span>';
		var toolTipNo = '<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span>';
		// jq321('#ordenar').append("<div id='lista" + i + "'><div style='display:table-cell'><ul class='sortable' id='ulId" + i + "'>" + txt + tam(valorInicial, 0) + toolTipSi + toolTipNo);
		jq321('#ordenar').append("<div id='lista" + i + "'><ul class='sortable' id='ulId" + i + "'>" + txt + tam(valorInicial, 0) + toolTipSi + toolTipNo);
		jq321('#lista' + i).addClass("segmento" + totalSegmentos).addClass('lista');
		if (ponerNumeral) {
			jq321("#lista" + i).prepend("<div class='bullet'>" + numeralPregunta);
		}
		jq321("#lista" + i).append("<span class='debug'><sup>" + debugRespuesta + "</sup></br></span>");
		jq321("#lista" + i).append("<span class='resp2'>" + debugRespuesta + "</br></span>");
		conteo++;
	}
	jq321(".lista > .sortable").each(function () {
		jq321(this).sortable();
		jq321(this).disableSelection();
	});
	jq321('.ip, .it').hide();
	jq321("[class^=segmento]").addClass("ocultar");
	jq321(".segmento1").removeClass("ocultar");
	jq321("span.debug, span.resp2").hide();
	if (debug) { jq321(".debug").show() }
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
					msg = ic("." + maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
					btnOK = ic("KO");
					break;
				default:
					tit = ic("nóicnetA");
					msg = ic("." + maxIntentos + " :sotnetni ed oremún omixám le odaznacla saH");
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
		// || navigator.userAgent.match(/iPad/i)
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

function objetoMultimedia(opcion, contador) {
	var iconoPlay = '<i class="play fas fa-play-circle fa-3x"></i>';
	var iconoPause = '<i class="pause fas fa-pause-circle fa-3x"></i>';
	var iconoExpandirVideo = '<i class="fas fa-expand fa-2x botonexp"></i>';
	var iconoContraerVideo = '<i class="fas fa-expand fa-2x botonexp"></i>';
	var respuesta = [];
	var titulo = "";
	var elemento = "";
	var play = "";
	var pause = "";
	var control = "";
	var barraDeslizante = "";
	var contVideo = "";
	var nombre = "";
	var ext = "";
	var IDtmp = '';

	var posUltimaDiagonal = opcion.lastIndexOf('/') + 1;
	if (posUltimaDiagonal != 0) {
		ext = opcion.toLowerCase().substring(opcion.lastIndexOf('.') + 1);
	}
	
	switch (ext) {
		case "jpeg":             // IMAGENES
		case "jpg":
		case "gif":
		case "png":
		case "svg":
		case "bmp":
		case "ico":
			nombre = "Imagen " + contador;
			IDtmp = "imagen" + contador;
			// elemento = '<img id="imagen' + contador + '" class="imagen" src=' + opcion + ' alt="" title="Imagen ' + contador + '" data-action="zoom"><br/>';
			elemento = '<img id="imagen' + contador + '" class="zoom imagen" src=' + opcion + ' alt="" title="Imagen ' + contador + '" onclick="zoom(' + IDtmp + ')"><br/>';
			if (nombreMultimedia) { elemento = '<span class="encMM">Imagen ' + contador + '</span>' + elemento }
			break;
		case "mp3":               // AUDIO
			nombre = "Audio " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Audio ' + contador + '</span>' };
			elemento = '<audio id="audio' + contador + '"><source src=' + opcion + ' type="audio/mpeg">El navegador no soporta elementos AUDIO</audio>';
			play = '<span id="play' + contador + '" onclick="reproducir(' + contador + ')" style="display: block;" title="' + nombre + '">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar(' + contador + ')" style="display: none;" title="' + nombre + '">' + iconoPause + '</span>';
			control = play + pause;
			barraDeslizante = '<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1">';
			break;
		case "wav":               // AUDIO
			nombre = "Audio " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Audio ' + contador + '</span>' };
			elemento = '<audio id="audio' + contador + '"><source src=' + opcion + ' type="audio/wav">El navegador no soporta elementos AUDIO</audio>';
			play = '<span id="play' + contador + '" onclick="reproducir(' + contador + ')" style="display: block;" title="' + nombre + '">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar(' + contador + ')" style="display: none;" title="' + nombre + '">' + iconoPause + '</span>';
			control = play + pause;
			barraDeslizante = '<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1">';
			break;
		case "ogg":               // AUDIO
			nombre = "Audio " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Audio ' + contador + '</span>' };
			elemento = '<audio id="audio' + contador + '"><source src=' + opcion + ' type="audio/ogg">El navegador no soporta elementos AUDIO</audio>';
			play = '<span id="play' + contador + '" onclick="reproducir(' + contador + ')" style="display: block;" title="' + nombre + '">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar(' + contador + ')" style="display: none;" title="' + nombre + '">' + iconoPause + '</span>';
			control = play + pause;
			barraDeslizante = '<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1">';
			break;
		case "mp4":               // VIDEO
			nombre = "Video " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Video ' + contador + '</span>' };
			elemento = '<video id="video' + contador + '" title="' + nombre + '"><source src=' + opcion + ' type="video/mp4">El navegador no soporta elementos VIDEO</video>';
			play = '<span id="play' + contador + '" onclick="reproducir(' + contador + ')" style="display: table-cell">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar(' + contador + ')" style="display:none">' + iconoPause + '</span>';
			contVideo = '<span class="controlesVid" id="controles' + contador + '" style="display: inline-flex; align-items:center">' + play + pause + '\
			<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1" style="display: table-cell"> \
			<span class="compr-exp" id="exp' + contador + '" onclick=" expande(' + contador + ')" style="display: table-cell">' + iconoExpandirVideo + '</span> \
			<span class="compr-exp" id="comp' + contador + '" onclick=" contrae(' + contador + ')" style="display:none">' + iconoContraerVideo + '</span></span>';
			break;
		case "webm":               // VIDEO
			nombre = "Video " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Video ' + contador + '</span>' };
			elemento = '<video id="audio' + contador + '" title="' + nombre + '"><source src=' + opcion + ' type="video/webm">El navegador no soporta elementos VIDEO</video>';
			play = '<span id="play' + contador + '" onclick="reproducir(' + contador + ')" style="display: table-cell">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar(' + contador + ')" style="display:none">' + iconoPause + '</span>';
			contVideo = '<span class="controlesVid" id="controles' + contador + '" style="display: inline-flex; align-items:center">' + play + pause + '\
			<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1" style="display: table-cell"> \
			<span class="compr-exp" id="exp' + contador + '" onclick=" expande(' + contador + ')" style="display: table-cell">' + iconoExpandirVideo + '</span> \
			<span class="compr-exp" id="comp' + contador + '" onclick=" contrae(' + contador + ')" style="display:none">' + iconoContraerVideo + '</span></span>';
			break;
		case "ogg":               // VIDEO
			nombre = "Video " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Video ' + contador + '</span>' };
			elemento = '<video id="audio' + contador + '" title="' + nombre + '"><source src=' + opcion + ' type="video/ogg">El navegador no soporta elementos VIDEO</video>';
			play = '<span id="play' + contador + '" onclick="reproducir(' + contador + ')" style="display: table-cell">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar(' + contador + ')" style="display:none">' + iconoPause + '</span>';
			contVideo = '<span class="controlesVid" id="controles' + contador + '" style="display: inline-flex; align-items:center">' + play + pause + '\
			<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1" style="display: table-cell"> \
			<span class="compr-exp" id="exp' + contador + '" onclick=" expande(' + contador + ')" style="display: table-cell">' + iconoExpandirVideo + '</span> \
			<span class="compr-exp" id="comp' + contador + '" onclick=" contrae(' + contador + ')" style="display:none">' + iconoContraerVideo + '</span></span>';
			break;
		default:
			elemento = opcion;
	}

	respuesta.push(titulo);
	respuesta.push(elemento);
	respuesta.push(play);
	respuesta.push(pause);
	respuesta.push(control);
	respuesta.push(barraDeslizante);
	respuesta.push(contVideo);
	respuesta.push(nombre);
	return (respuesta)
}

function continuar() {
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
		// jq321("audio").attr("disabled", false);
		var xx = jq321("[id^=rId].incorrecto").find("*").attr("disabled", false);
		jq321("i.ip, i.it").hide();
		jq321("[id^=rId].incorrecto").find("input:radio").attr("disabled", false);
		jq321("[id^=rId].incorrecto").find("input:radio").prop("checked", false);
		jq321("[id^=rId]").removeClass("incorrecto");

		jq321("[id^=rId].incorrecto").find("audio").attr("disabled", false);
		jq321("[id^=rId].incorrecto").find("audio").prop("checked", false);
		jq321("[id^=rId].incorrecto").find("video").attr("disabled", false);
		jq321("[id^=rId].incorrecto").find("video").prop("checked", false);
		jq321(".compr-exp").attr("disabled", false);
		jq321(".compr-exp").prop("checked", false);

		jq321("[id^=ctrlDeslizante], .controlesVid").show();
	}
	else {
		mostrarMensaje(1);
	}
}

function reproducir(ind) {
	/* TODAS LAS PLAY SE MUESTRAN Y SE DETIENEN */
	/* TODAS LAS PAUSE SE OCULTAN */
	iniciaPlayer(ind);
	var selector = "";
	var tipo1 = jq321("#audio" + ind);
	var tipo2 = jq321("#video" + ind);
	selector = (tipo1.length > 0 ? tipo1 : tipo2)
	if (jq321(selector).attr("disabled") != "disabled") {
		jq321('[id^=audio], [id^=video]').each(function () {
			jq321(this)[0].pause();
		});
		if (esPortable()) {
			jq321('[id^=pause]').css("display", "none");
			jq321('[id^=play]').css("display", "block");
		}
		else {
			jq321('[id^=pause]').css("display", "none");
			jq321('[id^=play]').css("display", "block");
		}
		jq321(selector)[0].play();
		jq321("#play" + ind).css("display", "none");
		if (esPortable()) {
			jq321('#pause' + ind).css("display", "block");
		}
		else {
			jq321("#pause" + ind).css("display", "block");
		}
	}
}

function pausar(ind) {
	audio = document.getElementById('audio' + ind);
	video = document.getElementById('video' + ind);
	var elemento = (audio !== null ? audio : video);
	elemento.pause();
	document.getElementById('pause' + ind).style.display = "none";
	document.getElementById('play' + ind).style.display = "block";
	if (esPortable()) {
		document.getElementById('play' + ind).style.display = "block";
	}
}

//ESTA FUNCION CONTROLA EL SEEKER DEL REPRODUCTOR EN RESPUESTAS 
function iniciaPlayer(ind) {
	audio = document.getElementById("audio" + ind);
	video = document.getElementById("video" + ind);
	ctrlDeslizante = document.getElementById("ctrlDeslizante" + ind);
	ctrlDeslizante.addEventListener("change", vidSeek, false);
	var elemento = (audio !== null ? audio : video);
	elemento.addEventListener("timeupdate", seektimeupdate, false);
}

function vidSeek() {
	var elemento = (audio !== null ? audio : video);
	var seekto = elemento.duration * (ctrlDeslizante.value / 100);
	elemento.currentTime = seekto;
}

function seektimeupdate() {
	var elemento = (audio !== null ? audio : video);

	var nt = elemento.currentTime * (100 / elemento.duration);
	ctrlDeslizante.value = nt;
}
//ESTA FUNCION FUNCIONA PARA AGRANDAR EL VIDEO
function expande(ind) {
	var elemento = document.getElementById("video" + ind);
	if (elemento.requestFullscreen) {
		elemento.requestFullscreen();
	} else if (elemento.mozRequestFullScreen) {
		elemento.mozRequestFullScreen();
	} else if (elemento.webkitRequestFullscreen) {
		elemento.webkitRequestFullscreen();
	} else if (elemento.msRequestFullscreen) {
		elemento.msRequestFullscreen();
	}
	document.getElementById("exp" + ind).style.display = "none";
	document.getElementById("comp" + ind).style.display = "";
}

///FUNCION PARA QUITAR EL AMPLIADO DE PANTALLA LO IMPORTANTE ESTA EN EL DISPLAY DE ELEMENTOS
function contrae(ind) {
	// var elemente = document.getElementById("contenedor" + ind);
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { /* Firefox */
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE/Edge */
		document.msExitFullscreen();
	}
	document.getElementById("comp" + ind).style.display = "none";
	document.getElementById("exp" + ind).style.display = "";
}
//inicia la linea seek en su punto inicial
function estandarizar() {
	var todostotal = document.getElementsByClassName("rangos");
	for (var i = 0; i < todostotal.length; i++) {
		todostotal[i].value = 0;
	}
}

