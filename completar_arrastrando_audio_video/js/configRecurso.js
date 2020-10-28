/* configuracion

*No leia el maxIntentos si estaba al inicio de este archivo...


pendiente....        bodyOriginal = document.body.innerHTML; y para reestablecer... document.body.innerHTML = bodyOriginal;
file:///G:/Mi%20unidad/DesarrolloMultimedia/FabiolaCorreccionesDeInglesI_programacion/list/index.html
y ojo    with(oDragItem.style){
        zIndex = 1000;
        position="absolute";
        left=x+"px";
        top=y+"px";
    }

*/

var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var siguienteIntentoBlanco = true; // true: cuando se requiera que en un siguiente intento todo este en blanco quitando palomas y taches...


var calificacionGlobal = false;
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
var calificaPregunta = false;   // true: Todas las arrobas de una pregunta cuentan como una, false: Cada arroba cuenta como un punto
var admitirErronea = true; // Para ciertos ejercicios de autoevaluacion se apaga esta bandera, asi solo admite respuestas correctas....

var elementosPorSegmento = 3; // elementos por segmento limita la visiblidad, la idea es que sea menor o igual a reactivosMostrar
var reactivosMostrar = 3;            // número de reactivos a mostrar
var elementosPorSegmentoMovil = 1;    // numero de elementos a mostrar por pagina en vista movil, sugerido 1
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
//var recursoTransformer = true; // autoajuste a portable..

var total = reactivosMostrar;
var numeral = true; //pone un numeral a lado del video.
var mezclarPreguntas = true;         // true: mezcla preguntas; false NO mezcla preguntas, RAAR a partir de jun 12,18 mezcla todos los reactivos
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = calificaPregunta;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroArroba = !calificaPregunta;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
//var porEspacios = true; //no se usa
//var porEnunciados = true; // nose usa
var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = false // cuantos preguntas son?, no necesariamente cuantas son visibles...
var seleccionRapida = true; //true permite elegir respuesta dando doble click ademas de arrastrar, falso: solo funcciona arrastrable
var forzarRespuestaA = 0; //si se quiere que las respuestas solo se usen 'n' veces, si es cero se ignora...
var carruselContinuo = false; // si se quiere que los botonos previo y proximo no tengan pared TRUE, false para pared
var flechaArriba = false;          // true: muestra la flecha-arriba para moverse rápidamente al principio del recurso; false: no lo muestra
var permutaRespuestas = true; //true para permitir el intercambio de respuestas en zona reacivos, false para deshabilitar
var respuestasSiempreCentro = false; // Si el recurso esta con formatoColumnas=true, esta bandera permita tener, al tener true,  las respuestas siempre al centro en pantalla, en false realiza scroll...

var guardarCalificacion = 0; // 0:actual, -1: la calificacion mayor, -1,2,3,4,n- por intento especifico
if ( guardarCalificacion > maxIntentos ) {
	guardarCalificacion = maxIntentos;
}


var retroCal = [ 
	{LimInf: 0, LimSup: 5, Mensaje: ["¡Vaya! Parece que no es suficiente.", "Insufficient"]}
	,{LimInf: 6, LimSup: 7, Mensaje: ["¡Esfuérzate más!", "Work harder"]}
	,{LimInf: 8, LimSup: 9, Mensaje: ["¡Sigue esforzándote!", "Sufficient"]}
	,{LimInf: 10, LimSup: 10, Mensaje: ["¡Felicidades!", "Excellent"]}
];

/*
Backup: Definicion oficial de mensajes finales. Jun 2020. Esto es un respaldo por que ususalmente se modifican las retros a solicitud.
var retroCal = [ 
	{LimInf: 0, LimSup: 5, Mensaje: ["¡Vaya! Parece que no es suficiente.", "Insufficient"]}
	,{LimInf: 6, LimSup: 7, Mensaje: ["¡Esfuérzate más!", "Work harder"]}
	,{LimInf: 8, LimSup: 9, Mensaje: ["¡Sigue esforzándote!", "Sufficient"]}
	,{LimInf: 10, LimSup: 10, Mensaje: ["¡Felicidades!", "Excellent"]}
];
*/
    
var debug = false;
    if (debug) {
        document.write("-modo debug true-"); //para avisar en pantalla el modo...
    }


var idObjetivo = 0;
var ambSCORM = false;
var barraSCORM = false;
var idioma = "ESP";
var verLongitud = false; //bandera 0/1 para prender la impresión de la longitud del texto.....

