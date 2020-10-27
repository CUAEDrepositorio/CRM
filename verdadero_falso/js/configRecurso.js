/* Configuracion */

var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var siguienteIntentoBlanco = true;   // true: limpiará aciertos y errores; false: conservará aciertos
var calificacionGlobal = false;
var formatoColumnas = true;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var esTexto = true;                  // true: respuestas son TEXTO; false respuestas son IMAGENES
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas (default)

var carruselContinuo = false; // si se quiere que los botones previo y proximo del paginado de reactivos no tengan pared TRUE, false para pared

var elementosPorSegmento = 10;        // numero de elementos a mostrar por pagina en desktop
var elementosPorSegmentoMovil = 1;    // numero de elementos a mostrar por pagina en vista movil, sugerido 1
var reactivosMostrar = 10;            // número de reactivos a mostrar
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var intentos = 0;
var correctas = 0;
var contestadas = 0;
var totalPreguntas = 0;
var mezclarPreguntas = true;         // true: mezcla preguntas; false NO mezcla preguntas
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = true;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
var numeralAlfabetico = false; //si queremos letras en vez de números, true.
var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas... 
var ponerNumeroPreguntas = false // cuantos preguntas son?, no necesariamente cuantas son visibles...
var porEspacios = true;
var porEnunciados = true;

var flechaArriba = false;          // true: muestra la flecha-arriba para moverse rápidamente al principio del recurso; false: no lo muestra

var retroCal = [ // Esto es calificacion del 0 al 10, no puntaje
	{ LimInf: 0, LimSup: 5, Mensaje: ["¡Vaya! Parece que no es suficiente.", ""] }
	, { LimInf: 6, LimSup: 7, Mensaje: ["¡Esfuérzate más!", ""] }
	, { LimInf: 8, LimSup: 9, Mensaje: ["¡Sigue esforzándote!", ""] }
	, { LimInf: 10, LimSup: 10, Mensaje: ["¡Felicidades!", ""] }
];

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0; // Para scorm...

var guardarCalificacion = 0;
// -1 : guardar calificación más alta de todos los intentos
// 0  : guardar calificación del último intento (default)
// n  : guardar calificación del intento n

var idioma = "ESP";
var debug = false;
var verLongitud = false;  //true:ver longitud del texto ; false:omitir

var encabezados = ["Verdadero", "Falso"];