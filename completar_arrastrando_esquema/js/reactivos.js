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
var recorreSegmentos =1; // por lo menos existe el primer segmento o sea el unico
var esMobil = false;
var elementosPorSegmento =1; // elementos por segmento limita la visiblidad, la idea es que sea menor o igual a reactivosMostrar

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
 var palomita = "<img class='palomita blink' style='display:none' src='img/palomita.png' />"; 
 var tache = "<img class='tache blink' style='display:none' src='img/tache.png' />";
 var palomita1 = "<i class='ip  far fa-check-circle blink ocultar' ></i>";
 var tache1 = "<i class='it  far fa-times-circle blink ocultar' ></i>";

 var carruselRespuestas = true;
 var formatoColumnas = false;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apilados
 var slideIndex = 0;					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
 var mostrarRetroIndividual = false;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual


jq321(document).ready(function() {//RAAR Sep 13,18: Aqui arrancamos, me traigo esto de index.html
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
		mostrarRetroIndividual =  true;
		mostrarRetroFinal =  true;
	}	
	if (esMobil) {
		/*elementosPorSegmento =1;
		jq321("#textoInstrucciones").addClass("estilosinstruccion");
		jq321(".info").removeClass("ocultar");
		jq321("#textoInstrucciones").slideUp(10);
		 jq321("#textoInstrucciones").addClass("mostrarinfo");*/
		 jq321("#NoDisponible").removeClass("ocultar");
		 jq321("section").addClass("ocultar");
		//  invPregResp = true;
		//  jq321("hr.separador").show();
 
	} else {
		 jq321("hr.separador").hide();
		 jq321("#etiquetaRespuesta").hide();

	}	
	if (mezclarPreguntas) {	reactivos.sort(function(a, b){return 0.5 - Math.random()}); }
	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
	if (mezclarRespuestas) {reordenaArreglo(respuestas)};
	iniciar();

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

window.onresize = function(){
	console.log("cambió tamaño");
   if (esMobil == false) {
	   //alert ("if (esMobil == false) {");
	   //document.body.style.backgroundColor = "yellow";
	   //alert("window.innerWidth: " + window.innerWidth +" \n document.body.scrollWidth"+ document.body.scrollWidth+" \n document.body.clientWidth"+ document.body.clientWidth+" \n screen.width"+ screen.width+" \n screen.availWidth"+ screen.availWidth+" \n document.body.offsetWidth"+document.body.offsetWidth+" \n documentElement.clientWidth"+document.documentElement.clientWidth);
	   if ( document.body.scrollWidth < screen.availWidth) { // para que no surta efecto cuando el body sea mayor a la pantalla del equipo
		   //alert ("document.body.scrollWidth "+ document.body.scrollWidth + " < " +"document.body.clientWidth "+ document.body.clientWidth);		 
		   if ( document.body.scrollWidth  > document.body.clientWidth ) { //cuando aparezca barra inhibimos...
			   //alert ("INHIBIR");
			   jq321("#NoDisponible").removeClass("ocultar");
			   jq321("section").addClass("ocultar");			
		   } else{
			   jq321("#NoDisponible").addClass("ocultar");
			   jq321("section").removeClass("ocultar");
		   }
	   }
   }
};

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
	for (var i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join("|");
	   if (i<numReactivos-1) { enlaza += "|"; }
	}	
//	enlaza = enlaza.replace(/[|]/gi, ","); // Cambios los pipes por comas, por que en las casillas de respuesta no importa...encierro en [] para que lo tome como caracter...
	listaTodas = enlaza.split("|");
	for (var i = 0; i < listaTodas.length; i++) { 
		if (!listaRespuestas.includes (listaTodas[i])) { 
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
    //casillasRespuesta = listaTodas.length;
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

//funcion para crear esquema en movil con crea escribiendo
function creaesquema(){

var arregloop=[];
var armadopro="";
var prearmado="";
for(var j=0;j<reactivos[0].A.length;j++){
arregloop.push(reactivos[0].A[j]);
}



//construccion de la tabla 
for(var i=0;i<reactivos[0].A.length;i++){
	var p1="<p class='perf'>";
	var p2="</p>";
	var retros="";
	var numero=(i+1)+".&nbsp;";
	var sel1='<select data-respuesta="'+reactivos[0].A[i]+'">';
	var sel2="</select>";
	arregloop = arregloop.sort(function() {return Math.random() - 0.5});
	armadopro+="<option>------</option>";

	for(var m=0;m<arregloop.length;m++){

	armadopro+="<option>"+tam(arregloop[m],1)+"</option>";

	

	}
retros='<span data-toggle="tooltip" data-placement="aut" data-type="success" title="' + tam(reactivos[0].FA[i].correcta, 1) + '">' + palomita1 + '</span><span data-toggle="tooltip" data-placement="auto" data-type="danger" title="' + tam(reactivos[0].FA[i].incorrecta, 1) + '">' + tache1 + '</span>';
prearmado+=p1+numero+sel1+armadopro+sel2+retros+p2;
armadopro="";
}
var cont1="<div class='preguntas'>";
	var cont2="</div>";
	var todoall=cont1+prearmado+cont2;
var imagen= reactivos[0].Q;
var pos=imagen.indexOf("@");
console.log(pos);
imagen=imagen.substring(0,pos);
var todoimagen= "<div id='wrap'>"+imagen+"</div>";
//se inicializa el zoom para la imagen 
var viewer = new ViewBigimg();
jq321(".reactivos ").append(todoall);
jq321(".reactivos ").append(todoimagen);



var wrap = document.getElementById('wrap');
wrap.onclick = function (e) {
  if (e.target.nodeName === 'IMG') {
 viewer.show(e.target.src);

  }
}


}

function creaArrastrar() { // Se arman las textos con sus correspondientes cajas...
	var idCas = 0; //para cololar un ID unica a cada casilla droppable....
	var textoRetro = '';
	jq321(".reactivos .lista-preguntas").each(function() { jq321(this).html(''); });
	jq321(".respuestas .lista-respuestas").each(function() { jq321(this).html(''); });
	//alert ("crea arrastrar");
	if (invPregResp) {
		jq321(".respuestas").prependTo(".ejercicio-arrastrar");
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
	var cuentaPreguntasSegmento =0;
	var cuentaSegmentos = 1; // iniciamos en 1, el cero se presta a confusion...
	for (var i = 0; i < preguntas.length; i++ ) { // Armo las preguntas.....
		var preg = preguntas[i].txt1.split("@");
		var HTMLArmado = "";
		var HTMLArmadoNew ="";
		var HTMLDroppable ="";
		//var segmentos = preg.length;
		var cuantasArrobas = preg.length-1; // Para formar las casillas droppable de respuesta, puede haber respuestas dummy o sea de mas asi evito casillas de mas.
		//var numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas? '/'+reactivosMostrar:'') + ((ponerNumeral || ponerNumeroPreguntas)?'.&nbsp;':'');
		var numeralPregunta = (ponerNumeral ? (i + 1) : '') +  ((ponerNumeral)?'.&nbsp;':'');
		if (cuentaPreguntasSegmento==elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			cuentaSegmentos++;
		
		} else {
			cuentaPreguntasSegmento++;
		}
		var enlaza ='';
		var textoTemp=''; //var textoTem=''; asi estaba al nov 20,18
		for (var k=0;k<preguntas[i].listaResp.length;k++) { //Para que una pregunta sepa todas las respuestas de sus casillas
			enlaza += "|";
			textoTemp = preguntas[i].listaResp[k];
			enlaza += textoTemp;
		}
		enlaza += "|";
		var pClases = "sub-item content_todo pregunta ocultar segmento"+cuentaSegmentos;
		
		var h1 ='<div class="'+pClases+'" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + ' data-listaResp="'+enlaza+'">';
	//	var h2 = '<p>' + numeralPregunta + '&nbsp;&nbsp;' + tam(preg[0], 1);
	//	var h10 = '</p>';
		// var h2 = tam(preg[0], 1);
		var h2 = preg[0];     // JLBG mzo 16, 2019; quité el número que se mostraba debajo de la imagen
		var h10 = '';	
		var h11 ='</div>';
        //HTMLArmadoNew = h1+h2+h10+h11;
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
	//	for (var i = 0; i < respuestas.length; i++ ) { //asi estaba en la version 2.3
		var elemObjeto = '';
		var retroArrobaCorrecta ='';
		var retroArrobaIncorrecta='';
		var tipotool="";
		var tipotool2="";
		var retroArrobaEsquema =''; // En esquema las retros por arroba las pongo despues de la imagen
		for (var j=0;j<cuantasArrobas;j++){ //Creo una casilla por arroba,
			// RAAR Sep 4,18: Esto valida cuando no se pongan todas las retros por arroba
			var textValidaCorr = (preguntas[i].listaFA[j] == undefined?'':preguntas[i].listaFA[j].correcta);	
			var textValidaInc = (preguntas[i].listaFA[j] == undefined?'':preguntas[i].listaFA[j].incorrecta);	
			// copiate la validacion de retroIndividual, es mas simple...
			if (textValidaCorr.length>0) {
				console.log("");
				retroArrobaCorrecta = '<div class="cas'+idCas+' retroArroba retroBien ocultarRetro">'+textValidaCorr+'</div>' ;
				retroArrobaEsquema += retroArrobaCorrecta;
				tipotool="success";
			}
			if (textValidaInc.length>0) {
				console.log("BUENA");
				retroArrobaIncorrecta = '<div class="cas'+idCas+' retroArroba retroMal ocultarRetro">'+textValidaInc+'</div>' ;
				retroArrobaEsquema += retroArrobaIncorrecta;
				tipotool2="danger";
			}		
			
			//data="img/blanco.png"
			elemObjeto = '<object class="draggable clonado" data="" data-respuesta="" ></object>'; // Creo los atributos para el enroque de datos en el drop, blanco.png es un truco para q se active para imagenes, hay que quitarlo luego...
			HTMLDroppable +='<span class=" droppable cpreg'+preguntas[i].ind+' cas'+idCas+' buena" id="cas'+idCas+'"   data-resp="'+preguntas[i].listaResp[j]+'" >'+'<span data-toggle="tooltip" class=" toolsti adaptable" data-placement="auto" data-type="success" title="'+tam(preguntas[i].listaFA[j].correcta,1)+'">' + palomita + '</span><span data-toggle="tooltip" class="toolsti adaptable" data-placement="auto" data-type="danger" title="'+tam(preguntas[i].listaFA[j].incorrecta,1)+'">' + tache + '</span>'+elemObjeto+'</span>' + preg[j+1];			
		
			console.log(preguntas[i].listaFA[j].correcta);
			console.log(preguntas[i].listaFA[j].incorrecta);
			idCas++;
			//console.log ("HTMLDroppable: "+HTMLDroppable);
		}
		console.log(retroArrobaEsquema);
		HTMLArmadoNew = h1+h2+HTMLDroppable+h10+h11;
		
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
		jq321("#reactivo .lista-preguntas").append(HTMLArmadoNew);
		
//	jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroArroba ocultarRetro" id="retro' + preguntas[i].ind + '0">' + preguntas[i].listaFA ); //RETRO ARROBA
		textoRetro = tam(preguntas[i].txt2[0], 1); //RAAR Ago 16,18: uso clase retroBien para desplegar retro por arroba, puede colisionar
		
		
		if (textoRetro.length>0) { // RAAR Nov 20,18: Aqui pongo la retro arroba para que vaya despues de la imagen...
			jq321('#preg' + preguntas[i].ind).append('<div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + textoRetro +'</div>');
		}
		textoRetro = tam(preguntas[i].txt2[1], 1);
		if (textoRetro.length>0) {
			jq321('#preg' + preguntas[i].ind).append('<div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + textoRetro +'</div>');
		}
	//	jq321('#preg' + preguntas[i].ind).after('<hr/>'); RAAR jun 13,18: inhabilito no detecto para que....
	}
	//jq321('div.sub-item:last + hr').remove(); //RAAR jun 13,18: inhabilito no detecto para que....

	for (var i = 0; i < respuestas.length; i++ ) { //armo respuestas....
		var HTMLArmado ="";
			// RAAR Ago 13,18: El pipe es un truco para que me de el texto exacto y no encuentre una parte...
			// listaResp esta en la PREGUNTA no en las casillas, es para obtener el segmento....
			var listaDroppables = jq321('[data-listaResp*="|'+respuestas[i].txt+'|"]');		//ojo que una respuesta puede pertenecer a mas de una pregunta/casilla,* que contenga... por los casos de doble casilla de respuesta
			var acumulaSegmento='';
			listaDroppables.each( function( index, elemento ) {
			   // jq321( el ).attr('class');				
				//console.log(respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class'));				
				//var clasesPregunta = respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class');
				var guardaSegmento='';				
				for (var j=1; j<=cuentaSegmentos ;j++) {
					guardaSegmento = 'segmento'+j;
					console.log(respuestas[i].txt+' - '+'segmento'+j+' '+ jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento));
				//	if (jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento)) {
					if (jq321( elemento ).hasClass(guardaSegmento)) {
						acumulaSegmento += ' '+guardaSegmento; //por ahora dejo que se dupliquen si es que estan en el mismo segmento....
					}
					//jq321( elemento ).parents('.pregunta').hasClass('segmento'+j);
				}
			});
			if (carruselRespuestas) {
				
				var obj2 =  '<div class="sub-item respuesta ocultar'+acumulaSegmento+'" ><object data-respuesta="'+respuestas[i].txt+ '" data-quedanInicial="'+respuestas[i].incidencia+'" data-quedan="'+respuestas[i].incidencia+'" class="carrusel draggable '+quitarAcentos(respuestas[i].txt)+'" data-drag="' + i + '" data="'+respuestas[i].txt+'">'+tam(respuestas[i].txt, 1)+'</object>' +'</div>';	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 
				var HTML_Slide = '<div id="slide' + (i + 0) + '" class="dropup mySlides"><div class="dropup sub-item respuesta">' + obj2 + '</div></div>';					// quito draggable, JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				var punto = '<span id="dot' + (i + 0) + '" class="dot" onclick="currentSlide(' + (i + 0) + ')"></span>';					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				jq321("#tmp").append(HTML_Slide);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
				jq321(".dot-container").append(punto);					// JLBG Mayo 22, 2020; ajuste para colocar respuesta desde slides inferiores
			
			} else {
				HTMLArmado = '<div class="sub-item respuesta ocultar'+acumulaSegmento+'" ><object data-respuesta="'+respuestas[i].txt+ '" data-quedanInicial="'+respuestas[i].incidencia+'" data-quedan="'+respuestas[i].incidencia+'" class="draggable '+quitarAcentos(respuestas[i].txt)+'" data-drag="' + i + '" data="'+respuestas[i].txt+'">'+tam(respuestas[i].txt, 1)+'</object>' +'</div>';	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 
				jq321(".respuestas .lista-respuestas").append(HTMLArmado);
			}
	}
	totalSegmentos = cuentaSegmentos;
	recorreSegmentos = 1; // el primer segmento a desplegar...
	jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");

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
	if (cad == "") {return ""};
	var txt = "";
	if (crm) {txt = (n == 1) ? cad : ""} // i n diferente de 1 pone nada
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
		//	tipo = "warning";
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
		//	tipo = "error";
			tit = "Error de sistema";
			msg = "Condición desconocida";
			btnOK = "Aceptar";
	}

	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

// function mostrarMensaje(clase, recurso) {
// 	if (!recurso) {recurso = -1}
// 	var msgs = [,
// 		["Arrastra todas las respuestas a los espacios correspondientes.", "Please, drag all answers to appropriate spaces"],  // completar arrastrando
// 		["Llena todos los campos de texto.", "Please, fill out all text fields"],                  // completar escribiendo
// 		["Contesta todas las preguntas.", "Please, answer all questions"],                         // verdadero-falso, opcion-multiple
// 		["Ordena todos los reactivos para conocer tu resultado.", "Please, sort all sentences"],   // ordenar enunciados
// 		["Elige una respuesta para cada recuadro.", "Please, choose an answer for each list"],     // completar eligiendo
// 		["Contesta todas las preguntas.", "Please, drag all answers to appropriate spaces"]  // lista de verificación, antes CAEsquema
// 		];
// 	var tipo = "";
// 	var tit = "";
// 	var msg = "";
// 	var btnOK = "";
// 	switch (clase) {
// 		case 1: // intentos
// 			tipo = ic("gninraw");
// 			switch (idioma) {
// 				case "ENG":
// 					tit = ic("gninraW");
// 					//msg = ic(maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
// 					msg = maxIntentos + " :You have reached maximum number of attempts"; // empiezo a quitar los espejos....abril 26 2018
					
// 					btnOK = ic("KO");
// 					break;
// 				default:
// 					tit = ic("nóicnetA");
// 					msg = ic(maxIntentos + " :sotnetni ed oremún omixám le odaznacla saH");
// 					btnOK = ic("ratpecA");
// 			}
// 			break;
// 		case 2: // Contestar TODO
// 			tipo = ic("gninraw");
// 			switch (idioma) {
// 				case "ENG":
// 					tit = ic("gninraW");
// 					msg = msgs[recurso][1]; //recurso,1
// 					btnOK = ic("KO");
// 					break;
// 				default:
// 					tit = ic("nóicnetA");
// 					msg = msgs[recurso][0];  //recurso,0
// 					btnOK = ic("ratpecA");
// 			}
// 			break;
// 		default:
// 			tipo = ic("rorre");
// 			tit = ic("ametsis ed rorrE");
// 			msg = ic("adiconocsed nóicidnoC");
// 			btnOK = ic("ratpecA");
// 	}
// 	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true,confirmButtonColor: "#0069d9" });
// }
//function mostrarMensaje(tipo, titulo, cadena) {
/*
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
	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}*/

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) { 
		jq321.each(retroCal, function(indice){
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == "ENG") ? retroCal[indice].Mensaje[1] : retroCal[indice].Mensaje[0];
			}
		});
	}
	mensaje = tam(mensaje, 1) +'<br>' + tam(textoRetroGeneral, 1);
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

	swal({title:titulo, text: cadena, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
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

