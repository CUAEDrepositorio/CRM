var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip far fa-check-circle blink'></i>";
var tache = "<i class='it far fa-times-circle blink'></i>";

jq341(document).ready(function () {
	console.log("READY de reactivos.js");
	if (window.parent.data_crm) {
		verLongitud = true;
		mostrarRetroFinal = true;
		verLongitud = true;
	}
	if (window.name == "movil") {
		esMobil = true;
	}
	else {
		esMobil = esPortable();
	}
	if (esMobil) {
		jq341("#textoInstrucciones").addClass("estilosinstruccion");
		jq341(".info").removeClass("ocultar").addClass("mostrar");
		jq341("#textoInstrucciones").slideUp(10);
		jq341("#textoInstrucciones").addClass("mostrarinfo");
	}
	jq341(".info").click(function () {
		if (jq341(this).hasClass("hiden")) {
			jq341("#textoInstrucciones").slideUp(300);
			jq341(this).removeClass("hiden");
		}
		else {
			jq341("#textoInstrucciones").slideDown(300);
			jq341(this).addClass("hiden");
		}
	});
	if (flechaArriba) {
		jq341('.ir-arriba').click(function () {
			jq341('body, html').animate({
				scrollTop: '0px'
			}, 300);
		});

		jq341(window).scroll(function () {
			if (jq341(this).scrollTop() > 0) {
				jq341('.ir-arriba').slideDown(300);
			} else {
				jq341('.ir-arriba').slideUp(300);
			}
		});
	}
	else {
		jq341('.ir-arriba').hide();
	}
});

function creaRubrica(numReactivos) {
	jq341("#contenedor").append('<div class="row" id="encabezado">');
	jq341("#encabezado").append('<div class="col-12 col-xs-12 col-lg-3" id="encCol">Criterio');
	jq341("#encabezado").append('<div class="row col-12 col-xs-12 col-lg-9" id="textos">');
	for (k = 0; k < encabezados.length; k++) {
		var ptos = (encabezados[k][1] == 1) ? " punto" : " puntos";
		jq341('#textos').append('<div class="col-12 col-xs-12 col-lg-3 enc">' + tam(encabezados[k][0] + " <br/>" + encabezados[k][1] + ptos, 1) + '</div>');
	}
	for (i = 0; i < numReactivos; i++) {
		var gpoBtn = '<div class="btn-group btn-group-toggle d-flex flex-column flex-lg-row grupo" data-toggle="buttons" id="grp' + i + '">';
		jq341('#contenedor').append('<div class="set row" id="elem' + i + '">');
		for (j = 0; j < reactivos[i].length; j++) {
			if (j == 0) {
				jq341('#elem' + i).append('<div class="col-12 col-xs-12 col-lg-3 pregunta vertical-center">' + tam(reactivos[i][j], 1)).append('<div class="col-12 col-xs-12 col-lg-9 vertical-center">' + gpoBtn);
			}
			else {
				ptos = (encabezados[j - 1][1] == 1) ? " punto" : " puntos";
				if (rubricaMultiple) {
					jq341('#grp' + i).append('<label class="btn"><input type="checkbox" name="opcion' + i + '" id="opcion' + i + j + '" value="' + encabezados[j - 1][1] + '"/>' + tam(reactivos[i][j], 1) + '</label>');
				}
				else {
					jq341('#grp' + i).append('<hr class="hrEspecial"/><div class="btn"><input type="radio" name="opcion' + i + '" id="opcion' + i + j + '" value="' + encabezados[j - 1][1] + '"/>' + tam(reactivos[i][j], 1) + '<p class="txt">' + tam(encabezados[j - 1][0] + "<br/>" + encabezados[j - 1][1] + ptos, 1) + '</p></div>');
				}

			}
		}
	}
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

function ic(c) {
	var x = c.length;
	var ci = "";
	while (x >= 0) {
		ci += c.charAt(x);
		x--;
	}
	return ci;
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq341.each(retroCal, function (indice) {
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
