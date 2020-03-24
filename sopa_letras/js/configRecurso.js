var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var esParrafo = true; //cuando se necesita que que con base a un parrafo se encuentre una palabra; FALSE cuando solo se ocupan palabras
var debug = false; //Esta opción solo aplica cuando listaReactivos,js esta conformado por una frase y palabra
var tempo = false; //Activar funcion de temporizador KDMR
var minutes = 1;
var seg = 30; //establecer el tiempo del temporizador, antes debe estar en TRUE la variable TEMPO KDMR
var verLongitud = false;
var orientaciones = false;
var retroCal = [{
		LimInf: 0,
		LimSup: 3,
		Mensaje: "No fue suficiente"
	},
	{
		LimInf: 4,
		LimSup: 7,
		Mensaje: "Esfuérzate más"
	},
	{
		LimInf: 8,
		LimSup: 12,
		Mensaje: "Suficiente"
	},
	{
		LimInf: 13,
		LimSup: 13,
		Mensaje: "Excelente"
	},
];
//para retros en inglès