/* Creado: 20170825 @marco_caloch
 * By CUAED
 * Update: 2017-1004 @juan_becerril
 * */
var totalLimite = 10; // limite de recursos en el arreglo.


// A $( document ).ready() block.
jq321(document).ready(function () {

	if (mezclarPreguntas) {
		reordenaArreglo(reactivos)
	};
	creaEscribir(reactivosMostrar);

});

function totalDatos(arregloDatos) {
	var valor = 0;
	for (var ci = 0; ci < arregloDatos.length; ci++) {
		valor += arregloDatos[ci];
	} // fin for
	return valor;
} // fin 

// Inicializa los valores del arreglo en cero
// arregloDatos es el arreglo a llenar
function iniciarArreglo(arregloDatos) {
	for (var ci = 0; ci < totalLimite; ci++) {
		arregloDatos[ci] = 0;
	} // fin for
} // fin 


// Devuelve el numero de indices/Objetivos que tienen datos validos
// arregloDatos es el arreglo que contiene los valores
function numIndicesActivos(arregloDatos) {
	var valor = 0;
	for (var ci = 0; ci < arregloDatos.length; ci++) {
		if (arregloDatos[ci] > 0) {
			valor++;
		} // fin if
	} // fin for
	return valor;
}

/***********************************************************************/
// A. 
/***********************************************************************/
function retroalimentar(tipo, titulo, cadena) {
	//$('#retroalimentacion').html(cadena);
	//	uiDialogo.html(cadena).dialog("option", "title", titulo).dialog("open");
	swal({
		title: titulo,
		text: cadena,
		type: tipo,
		confirmButtonText: "Aceptar",
		closeOnConfirm: true,
		html: true
	});

} //
//
function quitarAcentos(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	//str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to = "aáaaeéeeiíiioóoouúüunc------";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	//Acepta mayusculas las respuestas
	if (revisionEstricta) {
		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes
	}

	return str;
} //