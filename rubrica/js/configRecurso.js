﻿/* Configuracion */
 
var maxIntentos = 1;                 // número de intentos máximo para resolver el ejercicio
var calificacionGlobal = false;
var formatoColumnas = true;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var esTexto = true;                  // true: respuestas son TEXTO; false respuestas son IMAGENES
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas (default)

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
var mostrarRetroFinal = false;       // true: muestra retro por aciertos; false: NO muestra retro
var numeralAlfabetico = false; //si queremos letras en vez de números, true.
var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas... 
var ponerNumeroPreguntas = false // cuantos preguntas son?, no necesariamente cuantas son visibles...
var porEspacios = true;
var porEnunciados = true;

var flechaArriba = false;          // true: muestra la flecha-arriba para moverse rápidamente al principio del recurso; false: no lo muestra

var retroCal = [
	{LimInf: 0, LimSup: 4.2, Mensaje: ["Debes mejorar", "Insufficient"]},
	{LimInf: 4.3, LimSup: 8.3, Mensaje: ["Es importante releer nuestra unidad de aprendizaje. Recuerda realizarlo de manera continua y buscando palabras clave en cada lectura.", "Insufficient"]},
	{LimInf: 8.4, LimSup: 12.4, Mensaje: ["Muy bien; queda mucho conocimiento que explorar; en estos intentos alcanzaste el objetivo planteado.", "Sufficient"]},
	{LimInf: 12.5, LimSup: 16.5, Mensaje: ["Excelente", "Excellent"]},
	];

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0; // Para scorm...

var idioma = "ESP";
var verLongitud = false;  //true: ver longitud del texto ; false: omitir
