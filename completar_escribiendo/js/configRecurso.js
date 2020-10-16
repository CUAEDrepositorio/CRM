var maxIntentos = 2; // número de intentos máximo para resolver el ejercicio
var calificacionGlobal = false;
var formatoColumnas = true; // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var esTexto = true; // true: respuestas son TEXTO; false respuestas son IMAGENES
var invPregResp = false; // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
var siguienteIntentoBlanco = false;
var elementosPorSegmento = 5;
var reactivosMostrar = 5; // número de reactivos a mostrar

if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var intentos = 0;
var correctas = 0;
var contestadas = 0;
var totalPreguntas = 0;
var mezclarPreguntas = false; // true: mezcla preguntas; false NO mezcla preguntas
var mezclarRespuestas = false; // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroArroba = true; // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroIndividual = !mostrarRetroArroba; // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroFinal = true; // true: muestra retro por aciertos; false: NO muestra retro
var numeralAlfabetico = true; //si queremos letras en vez de números, true.
var ponerNumeral = false; // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = false; // cuantos preguntas son?, no necesariamente cuantas son visibles...
var porEspacios = mostrarRetroArroba; //  JLBG mzo 26, 2019; se asigna el valor de mostrarRetroArroba para forzar las retros por arroba y conteo de cajas correctas
var porEnunciados = mostrarRetroIndividual; //  JLBG mzo 26, 2019; se asigna el valor de mostrarRetroIndividual para forzar las retros individaules y conteo de enunciados correctos
var carruselContinuo = false; // si se quiere que los botonos previo y proximo no tengan pared TRUE, false para pared

var retroCal = [{
		LimInf: 0,
		LimSup: 5,
		Mensaje: ["¡Vaya! Parece que no es suficiente."]
	},
	{
		LimInf: 6,
		LimSup: 7,
		Mensaje: ["¡Esfuérzate más!"]
	},
	{
		LimInf: 8,
		LimSup: 9,
		Mensaje: ["¡Sigue esforzándote!"]
	},
	{
		LimInf: 10,
		LimSup: 10,
		Mensaje: ["¡Felicidades!"]
	},
];

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;
var debug = false;
var verLongitud = false;
var flechaArriba = false;
var revisionEstricta = true;
//Calificacion mas alta -1; Ultima calificacion 0, Calificacion de determinado intento #
var guardarCalificacion = 0; 