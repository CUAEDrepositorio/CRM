var numeropalabras = 10 //Toma aleatoriamente el número de palabras que esten en listaReactivos.js
var tempo = false;
var minutes = 5;
var seg = 10;
var verLongitud = false;
var debug = false;

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var retroCal = [{
		LimInf: 0,
		LimSup: 5,
		Mensaje: "¡Vaya! Parece que no es suficiente."
	},
	{
		LimInf: 6,
		LimSup: 7,
		Mensaje: "¡Esfuérzate más!"
	},
	{
		LimInf: 8,
		LimSup: 9,
		Mensaje: "¡Sigue esforzándote!"
	},
	{
		LimInf: 10,
		LimSup: 10,
		Mensaje: "¡Felicidades!"
	},
];