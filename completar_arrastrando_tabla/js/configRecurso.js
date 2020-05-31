﻿var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var maxIntentosReactivo = 2;
var calificacionGlobal = false;
var formatoColumnas = false;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
//var esTexto = true;   RAAR, May 16,18; elimino su uso con <object> en lugar de img               // true: respuestas son TEXTO; false respuestas son IMAGENES 
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
var seleccionRapida = true; //true permite elegir respuesta dando doble click ademas de arrastrar, falso: solo funcciona arrastrable

var reactivosMostrar = 11;            // número de reactivos a mostrar, considere el encabezado...
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var calificaAciertos = true;           // true: calificacion por acierto; false: calificacion por ponderacion a 10
var respRequeridas = 0;          // 0: todas las casillas de respuesta deben llenarse; valor diferente a cero, fija las casillas requeridas a contestar
var mezclarPreguntas = false;         // true: mezcla preguntas; false NO mezcla preguntas
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = false;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroArroba = false;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
var porEspacios = true;
var porEnunciados = false;
//var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var recursoTransformer = true; // autoajuste a portable..
var forzarRespuestaA = 0; //si se quiere que las respuestas solo se usen 'n' veces, si es cero se ignora...
var flechaArriba = false;          // true: muestra la flecha-arriba para moverse rápidamente al principio del recurso; false: no lo muestra

var debug = false;
/*if (debug) { // si lo muevo al ready hay colision, por ahora fuera....RAAR abril 24,2020, no debe aparecer en movil
	document.write("-modo debug true-"); //para avisar en pantalla el modo...
}*/
var retroCal = [
	{LimInf: 0, LimSup: 7, Mensaje: ["No fue suficiente", "Insufficient"]},
	{LimInf: 8, LimSup: 9, Mensaje: ["Esfuérzate más", "Work harder"]},
	{LimInf: 10, LimSup: 11, Mensaje: ["Suficiente", "Sufficient"]},
	{LimInf: 12, LimSup: 12, Mensaje: ["Excelente", "Excellent"]}
	];

var retroCal = [
	{LimInf: 0, LimSup: 3, Mensaje: ["No fue suficiente", "Insufficient"]},
	{LimInf: 4, LimSup: 6, Mensaje: ["Esfuérzate más", "Work harder"]},
	{LimInf: 7, LimSup: 9, Mensaje: ["Suficiente", "Sufficient"]},
	{LimInf: 10, LimSup: 10, Mensaje: ["Excelente", "Excellent"]}
	];

var ambSCORM = false; //prender para que guarde calificacion en moodle...
var barraSCORM = false; //para indicar si hay barra de avance en ambientes tipo APRENDO MAS. No interactua con la barra, es para que el recurso sepa donde almacenar datos...
var idObjetivo = 0; // Para dar secuencia a las evaluaciones dentro aprendo+, inicia en cero, si son 4 evaluaciones debe haber 0,1,2,3 recursos de evaluación respectivamente
	
var idioma = "ESP";
var verLongitud = false;

// Estas son variables no parametros de configuración, no deben estar aqui....
var intentos = 0;
var correctas = 0;
var contestadas = 0;
var totalPreguntas = 0;