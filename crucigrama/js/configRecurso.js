var numeropalabras = 5; //Toma aleatoriamente el número de palabras que esten en listaReactivos.js
var tempo = false;
var minutes = 1;
var seg = 30;
var verLongitud = false;
var debug = false;

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var retroCal = [{
		LimInf: 0,
		LimSup: 3,
		Mensaje: "No fue suficiente"
	},
	{
		LimInf: 4,
		LimSup: 6,
		Mensaje: "Esfuérzate más"
	},
	{
		LimInf: 7,
		LimSup: 9,
		Mensaje: "Suficiente"
	},
	{
		LimInf: 10,
		LimSup: 10,
		Mensaje: "Excelente"
	},
];