var numeropalabras = 5 //Toma aleatoriamente el número de palabras que esten en listaReactivos.js
var tempo = true;
var minutes = 1;
var seg = 15;
var verLongitud = false;
var debug = false;
var maxIntentos = 2;

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

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;
