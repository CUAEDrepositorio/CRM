//bandera necesaria si se utilziaran videos
var vidmaster = false;

//boton rendirse revela las cartas faltantes
var rendirse = false;
//contiene la ruta de la cubierta de las cartas
var imagentapa = "./imagenes/bocina.png";

//ancho y alto de la carta del memorama
var anchocarta = 120;
var altocarta = 120;

//opcion para separar las cartas o tenerlas en un solo contenedor
var separador = false;

var activarson = false; //Activar sonido
var tempo = false; //Activar funcion de temporizador KDMR
var minutes = 1; //establecer el tiempo del temporizador, antes debe estar en TRUE la variable TEMPO KDMR
var seg = 30;
var debug = false; //activar el debug

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;
var movimientos = 0;

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
  }
];
