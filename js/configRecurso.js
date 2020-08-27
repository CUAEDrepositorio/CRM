
var esParrafo = true; //cuando se necesita que que con base a un parrafo se encuentre una palabra; FALSE cuando solo se ocupan palabras
var debug = false; //Esta opción solo aplica cuando listaReactivos,js esta conformado por una frase y palabra
var tempo = false; //Activar funcion de temporizador KDMR
var minutes = 0;
var seg = 20; //establecer el tiempo del temporizador, antes debe estar en TRUE la variable TEMPO KDMR
var verLongitud = false;
var orientaciones = false;
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