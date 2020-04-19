//---------------------------------//
//   GLOBAL VARIABLES              //
//---------------------------------//
var borradopro = "no";
var idObjetivo = 0;
var arreglolongitudes = [];
var board, wordArr, wordBank, wordsActive, mode;
var controlpalabra = "S";
var alucinante = 1;
var aciertos = 0;
var indicecoincidencias = 0;
var arreglocoincidencias = [];
var controlbucle = 0;
var defineme = 0;
var direccion = "";
var palabra;
var palabra2;
var stringpalabra;
var palabrasmagicas = [];
var stringpalabra2;
var letra;
var longitud;
var longitud1;
var pro;
var posi = 1;
var posi1 = 1;
var cont2;
var inicio = 0;
var inicio2 = 0;
var master;
var cont;
var contpalabra = 1;
var contpalabra2 = 1;
var pos;
var elem;
var elem2;
var ori;
var ori2;
var esMobil = false;
var tiempo;
var arregloincisosh;
var arregloincisosv;
var posh;
var posv;
var mensaje;
var conteo;
var conteo2;
var final;
var correctasT = [];
var incorrectasT = [];
var ejemploB = [];
var ejemploM = [];

var Bounds = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  Update: function (x, y) {
    this.top = Math.min(y, this.top);
    this.right = Math.max(x, this.right);
    this.bottom = Math.max(y, this.bottom);
    this.left = Math.min(x, this.left);
  },

  Clean: function () {
    this.top = 999;
    this.right = 0;
    this.bottom = 0;
    this.left = 999;
  }
};

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('Esto es un dispositivo móvil');
    //$("#NoMovil").removeClass("ocultar").addClass("mostrar");
    return true;
  }
}

function activate(D) {
  var testElements = document.getElementsByClassName('menguando');
  for (var i = 0; i < testElements.length; i++) {
    testElements[i].style.backgroundColor = "";
  }

  var decideH1;
  var decideV1;
  var cadenamaster1 = D.id + "";
  var pis3 = cadenamaster1.indexOf("L");
  var pis4 = cadenamaster1.indexOf("F");
  var numeral = cadenamaster1.substring(pis3 + 1, pis4);
  var numeral1 = cadenamaster1.substring(pis4 + 1, cadenamaster1.length);
  cadenamaster1 = cadenamaster1.substring(0, pis3);
  var numerobase1 = parseInt(numeral);
  var numerobase2 = parseInt(numeral1)
  var poscomico1 = cadenamaster1.indexOf("V");
  var cadenapro1 = cadenamaster1.substring(0, poscomico1);
  var chango1 = cadenamaster1.substring(poscomico1, cadenamaster1.length);
  var pos3 = cadenapro1.indexOf("_");
  var pos4 = chango1.indexOf("_");
  var hori1 = cadenapro1.substring(1, pos3);
  var verti1 = chango1.substring(1, pos4);
  if (hori1 == "0") {} else {
    decideH1 = 1;
  }
  if (verti1 == "0") {} else {
    decideV1 = 1;
  }
  if (decideH1 == 1 && decideV1 == 1) {
    var cadena2 = cadenapro1.substring(pos3 + 1, cadenapro1.length);
    var elegi = document.getElementsByClassName("H" + hori1 + "_" + cadena2);

    elegi[0].style.backgroundColor = "#f3e8ac";

  } else {
    if (decideH1 == 1) {
      for (var j = 2; j <= numerobase1; j++) {
        var elegih = document.getElementsByClassName("H" + hori1 + "_" + j);
        elegih[0].style.backgroundColor = "#acdff3";
      }
    }
    if (decideV1 == 1) {
      for (var k = 2; k <= numerobase2; k++) {
        var elegiv = document.getElementsByClassName("V" + verti1 + "_" + k);
        elegiv[0].style.backgroundColor = "#acdff3";
      }
    }
  }
}

function borra(D, e) {
  var direccion1 = "";
  var borradoespecial = "I" + D.id


  switch (e.key) {
    case 'ArrowUp':
      direccion1 = "arriba"

      break;
    case 'ArrowDown':
      direccion1 = "abajo"
      break;
    case 'ArrowLeft':
      direccion1 = "izquierda"
      break;
    case 'ArrowRight':
      direccion1 = "derecha"
      break;
    default:
      direccion1 = "";
      break;
  }
  if (direccion1 == "") {
    document.getElementById(borradoespecial).value = "";
    direccion1 = "";
  }
}

function myarchivo(D, e) {
  var letrasi = 1;
  var crec = 1;
  var decideH;
  var decideV;
  var cadenamaster = D.id + "";

  //para ver si solo sea letras
  var cadenaobtener = "I" + D.id;
  var valorinput = document.getElementById(cadenaobtener).value;
  direccion = "";
  switch (e.key) {


    case 'ArrowUp':
      direccion = "arriba";

      break;
    case 'ArrowDown':
      direccion = "abajo";

      break;
    case 'ArrowLeft':
      direccion = "izquierda"

      break;
    case 'ArrowRight':
      direccion = "derecha"

      break;

    default:
      numerobase = "";
      break;
  }

  // console.log(valorinput);
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toString();
  letras = " áéíóúüabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚÜABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; //Se define todo el abecedario que se quiere que se muestre.
  especiales = [8, 37, 38, 39, 40, 46, 6]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

  tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      letrasi = 1;
      tecla_especial = true;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {

    letrasi = 0;
  }

  if (letrasi == 1) {

    letrasi = 0;
    var testElements = document.getElementsByClassName('menguando');

    for (var i = 0; i < testElements.length; i++) {
      testElements[i].style.backgroundColor = "";

    }

    var pis3 = cadenamaster.indexOf("L");
    var pis4 = cadenamaster.indexOf("F");
    var numeral = cadenamaster.substring(pis3 + 1, pis4);
    var numeral1 = cadenamaster.substring(pis4 + 1, cadenamaster.length);
    var numerobase1 = parseInt(numeral);
    var numerobase2 = parseInt(numeral1)
    cadenamaster = cadenamaster.substring(0, pis3);
    var poscomico = cadenamaster.indexOf("V");
    var cadenapro = cadenamaster.substring(0, poscomico);
    var chango = cadenamaster.substring(poscomico, cadenamaster.length);
    var pos1 = cadenapro.indexOf("_");
    var pos2 = chango.indexOf("_");
    var hori = cadenapro.substring(1, pos1);
    var verti = chango.substring(1, pos2);
    if (hori == "0") {} else {
      decideH = 1;
    }

    if (verti == "0") {} else {
      decideV = 1;
    }

    if (decideH == 1) {
      if (e.key == "Backspace") {
        if (controlpalabra == "H") {
          direccion = "izquierda";
        }
      }
    }
    if (decideV == 1) {
      if (e.key == "Backspace") {
        if (controlpalabra == "V") {
          direccion = "arriba";
        }
      }
    }

    if (decideH == 1 && decideV == 1) {
      if (direccion == "") {
        if (controlpalabra == "S") {
          var cadena2 = cadenapro.substring(pos1 + 1, cadenapro.length);
          var numerobase = parseInt(cadena2);
          numerobase++;
          var ira = "H" + hori + "_" + numerobase;
          decideH = 0;
          decideV = 0;
        }

        if (controlpalabra == "H") {
          var cadena2 = cadenapro.substring(pos1 + 1, cadenapro.length);
          var numerobase = parseInt(cadena2);
          numerobase++;
          for (var we = 2; we <= numerobase1; we++) {
            var elegih = document.getElementsByClassName("H" + hori + "_" + we);
            elegih[0].style.backgroundColor = "#acdff3";
          }
          var ira = "H" + hori + "_" + numerobase;
          decideH = 0;
          decideV = 0;
        }
        if (controlpalabra == "V") {
          var cadena2 = chango.substring(pos2 + 1, chango.length);
          var numerobase = parseInt(cadena2);
          numerobase++;
          for (var ki = 2; ki <= numerobase2; ki++) {
            var elegiv = document.getElementsByClassName("V" + verti + "_" + ki);
            elegiv[0].style.backgroundColor = "#acdff3";
          }
          var ira = "V" + verti + "_" + numerobase;
          decideH = 0;
          decideV = 0;
        }
      } else {
        if (direccion == "derecha") {
          var cadena2 = cadenapro.substring(pos1 + 1, cadenapro.length);
          var numerobase = parseInt(cadena2);
          numerobase++;
          alucinante = 0;
          var ira = "H" + hori + "_" + numerobase;
          for (var j = 2; j <= numerobase1; j++) {
            var elegih = document.getElementsByClassName("H" + hori + "_" + j);
            elegih[0].style.backgroundColor = "#acdff3";
          }
          decideH = 0;
          decideV = 0;
        }
        if (direccion == "izquierda") {
          alucinante = 0;
          var cadena2 = cadenapro.substring(pos1 + 1, cadenapro.length);
          var numerobase = parseInt(cadena2);
          numerobase--;
          var ira = "H" + hori + "_" + numerobase;
          for (var m = 2; m <= numerobase1; m++) {
            var elegih = document.getElementsByClassName("H" + hori + "_" + m);
            elegih[0].style.backgroundColor = "#acdff3";
          }
          decideH = 0;
          decideV = 0;
        }
        if (direccion == "arriba") {
          alucinante = 0;
          var cadena2 = chango.substring(pos2 + 1, chango.length);
          var numerobase = parseInt(cadena2);
          numerobase--;
          var ira = "V" + verti + "_" + numerobase;
          for (var k = 2; k <= numerobase2; k++) {
            var elegiv = document.getElementsByClassName("V" + verti + "_" + k);
            elegiv[0].style.backgroundColor = "#acdff3";
          }
          decideH = 0;
          decideV = 0;
        }

        if (direccion == "abajo") {
          alucinante = 0;
          var cadena2 = chango.substring(pos2 + 1, chango.length);
          var numerobase = parseInt(cadena2);
          numerobase++;
          var ira = "V" + verti + "_" + numerobase;
          for (var t = 2; t <= numerobase2; t++) {
            var elegiv = document.getElementsByClassName("V" + verti + "_" + t);
            elegiv[0].style.backgroundColor = "#acdff3";
          }
          decideH = 0;
          decideV = 0;
        }
      }
    } else {
      if (decideH == 1) {
        var cadena2 = cadenapro.substring(pos1 + 1, cadenapro.length);
        var numerobase = parseInt(cadena2);
        if (direccion == "") {
          numerobase++;
          for (var q = 2; q <= numerobase1; q++) {
            var elegih = document.getElementsByClassName("H" + hori + "_" + q);
            elegih[0].style.backgroundColor = "#acdff3";
          }
        } else {
          if (direccion == "derecha") {
            alucinante = 0;
            numerobase++;
            for (var z = 2; z <= numerobase1; z++) {
              var elegih = document.getElementsByClassName("H" + hori + "_" + z);
              elegih[0].style.backgroundColor = "#acdff3";
            }
          }
          if (direccion == "izquierda") {
            alucinante = 0;
            for (var n = 2; n <= numerobase1; n++) {
              var elegih = document.getElementsByClassName("H" + hori + "_" + n);
              elegih[0].style.backgroundColor = "#acdff3";
            }
            numerobase--;
          }
        }

        var ira = "H" + hori + "_" + numerobase;
        decideH = 0;
        decideV = 0;
        direccion == "";
        controlpalabra = "H";
      }
      if (decideV == 1) {
        var cadena2 = chango.substring(pos2 + 1, chango.length);
        var numerobase = parseInt(cadena2);
        if (direccion == "") {
          for (var x = 2; x <= numerobase2; x++) {
            var elegiv = document.getElementsByClassName("V" + verti + "_" + x);
            elegiv[0].style.backgroundColor = "#acdff3";
          }
          numerobase++;
        } else {
          if (direccion == "arriba") {
            alucinante = 0;
            for (var s = 2; s <= numerobase2; s++) {
              var elegiv = document.getElementsByClassName("V" + verti + "_" + s);
              elegiv[0].style.backgroundColor = "#acdff3";
            }
            numerobase--;
          }
          if (direccion == "abajo") {
            alucinante = 0;
            for (var y = 2; y <= numerobase2; y++) {
              var elegiv = document.getElementsByClassName("V" + verti + "_" + y);
              elegiv[0].style.backgroundColor = "#acdff3";
            }
            numerobase++;
          }
        }

        var ira = "V" + verti + "_" + numerobase;
        decideH = 0;
        decideV = 0;
        controlpalabra = "V";
        direccion == "";
      }
    }

    var pardo = document.getElementsByClassName(ira);
    if (borradopro == "si") {
      pardo[0].value = "";
      borradopro = "no";
    }

    try {
      pardo[0].focus();
    } catch (e) {}

  }


}
//---------------------------------//
//   MAIN                          //
//---------------------------------//
function cadenaepicaX(d) {
  // console.log(d);
  var comico = d + "";
  var pis1 = comico.indexOf("L");
  comico = comico.substring(0, pis1);
  var poscomico = comico.indexOf("V");
  comico = comico.substring(0, poscomico);
  return comico;
}

function cadenaepicaY(d) {
  var comico2 = d + "";
  var pis2 = comico2.indexOf("L");
  comico2 = comico2.substring(0, pis2);
  var poscomico2 = comico2.indexOf("V");
  comico2 = comico2.substring(poscomico2, comico2.length);
  return comico2;
}

function soloLetras(e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  especiales = "8-37-38-39-40-46-6-192";
  tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    return false;
  }
}

function quitarextra(d) {
  // console.log(d);
  var comico3 = d + "";
  comico3 = comico3.substring(0, comico.length - 2);
  return comico3;
}

function Play() {
  var letterArr = document.getElementsByClassName('letter');
  document.getElementById("btnCreate").style.display = "";
  for (var i = 0; i < letterArr.length; i++) {
    var dato = cadenaepicaX(letterArr[i].id);
    var dato2 = cadenaepicaY(letterArr[i].id);
    // console.log(name);
    letterArr[i].innerHTML = "<input  id='I" + letterArr[i].id + "' onkeypress='return soloLetras(event)'  onkeydown='borra(" + letterArr[i].id + ",event)' onkeyup='myarchivo(" + letterArr[i].id + ",event)'  onclick='activate(" + letterArr[i].id + ")' class='char menguando " + dato2 + " " + dato + "' type='text' maxlength='1'></input>";
  }
  mode = 0;
  ToggleInputBoxes(false);
}

function validaciones(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function creanodos() {
  //Se capitalizan las palabras por bug extraño
  for (var p = 0; p < palabraspro.length; p++) {
    palabraspro[p][0] = validaciones(palabraspro[p][0].toLowerCase());
  }
  var longitud = 0;
  palabraspro = palabraspro.sort(function () {
    return Math.random() - 0.5
  });
  //limita a 60 palabras
  if (palabraspro.length >= 61) {
    palabraspro.splice(60, 1);
  }
  //maximo 25 caracteres
  for (var p = 0; p < palabraspro.length; p++) {
    if (palabraspro[p][0].length > 25) {
      palabraspro[p][0] = palabraspro[p][0].substring(0, 25);
    }
  }
  if (numeropalabras < 4) {
    longitud = palabraspro.length;
  } else if (numeropalabras > palabraspro.length) {
    longitud = palabraspro.length;
  } else {
    longitud = numeropalabras;
  }
  for (var i = 0; i < longitud; i++) {
    var contenedormaestro = document.getElementById("supercenter");
    var contenedorpalabra = document.createElement("div");
    contenedorpalabra.setAttribute('style', 'display:none');
    contenedorpalabra.className = "line conteni";
    contenedormaestro.appendChild(contenedorpalabra);
    var inputprimario = document.createElement('input');
    inputprimario.setAttribute('type', 'text');
    inputprimario.setAttribute('value', palabraspro[i][0]);
    inputprimario.className = "word";
    contenedorpalabra.appendChild(inputprimario);
    var inputsecu = document.createElement('input');
    inputsecu.setAttribute('id', palabraspro[i][0]);
    if (debug == true && verLongitud == true) {
      $("#mododebug").show();
      var txt2 = ""
      var txt = ""
      txt = "&nbsp;<sup>" + palabraspro[i][1].length + "</sup>";
      txt2 = "&nbsp;<sup>" + palabraspro[i][0] + "</sup> &nbsp;&nbsp;";
      inputsecu.setAttribute('value', palabraspro[i][1] + txt + txt2);
    } else if (debug) {
      $("#mododebug").show();
      var txt2 = ""
      txt2 = "&nbsp;<sup>" + palabraspro[i][0] + "</sup> &nbsp;&nbsp;";
      inputsecu.setAttribute('value', palabraspro[i][1] + txt2);
    } else if (verLongitud) {
      var txt = ""
      txt = "&nbsp;<sup>" + palabraspro[i][1].length + "</sup>";
      inputsecu.setAttribute('value', palabraspro[i][1] + txt);
    } else {
      inputsecu.setAttribute('value', palabraspro[i][1]);
      inputsecu.className = "clue";
      contenedorpalabra.appendChild(inputsecu);
    }
    inputsecu.className = "clue";
    contenedorpalabra.appendChild(inputsecu);
  }
}

function Create() {
  creanodos();
  iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
  if (mode === 0) {
    ToggleInputBoxes(true);
    document.getElementById("crossword").innerHTML = BoardToHtml(" ")
    mode = 1;
    document.getElementById("btnCreate").style.display = "none";
  } else {
    GetWordsFromInput();
    for (var i = 0, isSuccess = false; i < 10 && !isSuccess; i++) {
      CleanVars();
      isSuccess = PopulateBoard();
    }
    var loco = document.getElementsByClassName("conteni");
    document.getElementById("crossword").innerHTML =
      (isSuccess) ? BoardToHtml(" ") : "Failed to find crossword.";
  }
}

function ToggleInputBoxes(active) {
  var w = document.getElementsByClassName('word'),
    d = document.getElementsByClassName('clue');
  for (var i = 0; i < w.length; i++) {
    if (active === true) {
      RemoveClass(w[i], 'hide');
      RemoveClass(d[i], 'clueReadOnly');
      d[i].disabled = '';
    } else {
      AddClass(w[i], 'hide');
      AddClass(d[i], 'clueReadOnly');
      d[i].disabled = 'readonly';
    }
  }
}


function GetWordsFromInput() {
  wordArr = [];
  for (var i = 0, val, w = document.getElementsByClassName("word"); i < w.length; i++) {
    val = w[i].value.toUpperCase();
    if (val !== null && val.length > 1) {
      wordArr.push(val);
    }
  }
}


function CleanVars() {
  Bounds.Clean();
  wordBank = [];
  wordsActive = [];
  board = [];
  ori = [];
  ori2 = [];
  cont = [];
  cont2 = [];
  palabra = [];
  palabra2 = [];
  master = [];
  letra = [];
  longitud = [];
  longitud1 = [];
  stringpalabra = [];
  stringpalabra2 = [];
  for (var i = 0; i < 100; i++) {
    board.push([]);
    ori.push([]);
    cont.push([]);
    palabra.push([]);
    ori2.push([]);
    cont2.push([]);
    palabra2.push([]);
    master.push([]);
    letra.push([]);
    longitud.push([]);
    longitud1.push([]);
    stringpalabra.push([]);
    stringpalabra2.push([]);

    for (var j = 0; j < 100; j++) {
      board[i].push(null);
      ori[i].push(null);
      cont[i].push(null);
      palabra[i].push(null);
      ori2[i].push(null);
      cont2[i].push(null);
      palabra2[i].push(null);
      master[i].push("");
      letra[i].push("");
      longitud[i].push(null);
      longitud1[i].push(null);
      stringpalabra[i].push("");
      stringpalabra2[i].push("");
    }
  }
}


function PopulateBoard() {
  PrepareBoard();

  for (var i = 0, isOk = true, len = wordBank.length; i < len && isOk; i++) {
    isOk = AddWordToBoard();
  }
  return isOk;
}


function PrepareBoard() {
  wordBank = [];

  for (var i = 0, len = wordArr.length; i < len; i++) {
    wordBank.push(new WordObj(wordArr[i]));
  }

  for (i = 0; i < wordBank.length; i++) {
    for (var j = 0, wA = wordBank[i]; j < wA.char.length; j++) {
      for (var k = 0, cA = wA.char[j]; k < wordBank.length; k++) {
        for (var l = 0, wB = wordBank[k]; k !== i && l < wB.char.length; l++) {
          wA.totalMatches += (cA === wB.char[l]) ? 1 : 0;
        }
      }
    }
  }
}

function obtenerlongitus(d) {
  var pato = d + "";
  var pis2 = pato.indexOf("L");
  pato = pato.substring(pis2 + 1, pato.length);
  var pronumeral;
  var posnumeral = pato.indexOf("D");
  if (posnumeral == 0) {
    pronumeral = pato.substring(posnumeral + 1, pato.length);
  } else {
    pronumeral = pato.substring(0, posnumeral);
  }
  var dato = parseInt(pronumeral);
  // console.log(dato);
  return dato;
}

function Reinicio() {
  location.reload();

}


function Revisar() {
  arregloincisosh = document.getElementsByClassName("proh");
  arregloincisosv = document.getElementsByClassName("prov");
  posh = arregloincisosh.length;
  posv = arregloincisosv.length;
  elementospalabra = document.getElementsByClassName("char");
  var pato = 0;
  for (var g = 0; g < elementospalabra.length; g++) {
    // console.log(elementospalabra[g].value);
    if (elementospalabra[g].value == "") {
      pato = 1;
    }
  }
  // console.log("soy" + pato);
  // console.log(palabrasmagicas);
  var arrh = [];
  correctasT = [];
  incorrectasT = [];
  if (pato == 0) {
    for (var i = 0; i < posh; i++) {
      var id = arregloincisosh[i].id + "";
      var posid = id.indexOf("L");
      var idpro = id.substring(posid + 1, id.length);
      var numeralpro = parseInt(idpro);
      var posx = id.indexOf("_");
      var cadenax = id.substring(1, posx);
      // console.log(cadenax);
      var numeralpro1 = parseInt(cadenax);
      var castidad = "";
      for (var j = 1; j <= numeralpro; j++) {
        var clasess = "H" + numeralpro1 + "_" + j;
        var superid = document.getElementsByClassName(clasess);
        castidad = castidad + superid[0].value;
        // console.log(superid[0]);
      }
      castidad = castidad.toUpperCase();

      for (var p = 0; p < palabrasmagicas.length; p++) {
        if (castidad == palabrasmagicas[p]) {
          correctasT.push(castidad);
          aciertos++;

          for (var v = 1; v <= numeralpro; v++) {
            var clasess = "H" + numeralpro1 + "_" + v;
            var superidb = document.getElementsByClassName(clasess);
            superidb[0].style.backgroundColor = "#c0fda7";

          }
        } else {
          incorrectasT.push(castidad);
        }

      }
      arrh.push(castidad);
      // console.log(arrh);
    }
    for (var k = 0; k < posv; k++) {
      var idv = arregloincisosv[k].id + "";
      var posidv = idv.indexOf("L");
      var idprov = idv.substring(posidv + 1, idv.length);
      var numeralprov = parseInt(idprov);
      var posvo = idv.indexOf("V");
      idv = idv.substring(posvo, posidv);
      var posxv = idv.indexOf("_");
      var cadenaxv = idv.substring(1, posxv);
      var numeralpro1v = parseInt(cadenaxv);
      var castidadv = "";
      for (var h = 1; h <= numeralprov; h++) {
        var clasessv = "V" + numeralpro1v + "_" + h;
        var superidv = document.getElementsByClassName(clasessv);
        castidadv = castidadv + superidv[0].value;

      }

      castidadv = castidadv.toUpperCase();
      for (var m = 0; m < palabrasmagicas.length; m++) {
        if (castidadv == palabrasmagicas[m]) {
          correctasT.push(castidadv);
          aciertos++;

          for (var r = 1; r <= numeralprov; r++) {
            var clasessv = "V" + numeralpro1v + "_" + r;
            var superidbv = document.getElementsByClassName(clasessv);
            superidbv[0].style.backgroundColor = "#c0fda7";
          }
        } else {
          incorrectasT.push(castidadv);
        }
      }
      arrh.push(castidadv);
      conteo = arregloincisosh.length;
      conteo2 = arregloincisosv.length;
      final = conteo + conteo2;
      let respuestasT = document.getElementsByClassName("respuestacorr")
      let respHTML = ""
      for (respuestai of respuestasT) {
        respHTML = respuestai.textContent.toUpperCase()
        if (correctasT.indexOf(respHTML) != -1) {
          //correcta

          // const rMB = correctasT.findIndex(iMB => iMB === correctasT);
          // console.log("ALGO: "+rMB)
          respuestai.nextSibling.style.display = "inline";
        } else {
          //incorrecta
          respuestai.nextSibling.nextSibling.style.display = "inline";
        }

      }


      mensaje = "";
      for (var j = 0; j < retroCal.length; j++) {
        console.log(aciertos);
        if (aciertos >= retroCal[j].LimInf && aciertos <= retroCal[j].LimSup) {
          mensaje = retroCal[j].Mensaje;
        }
      }


      try {
        tiempo = ((minutes * 60) + seconds)
        clearInterval(countdownTimer);
        console.log("TIEMPO: " + tiempo);
      } catch (e) {

      }
      //boton revisar
      if (tempo) {
        if (tiempo >= 60) { //Cuando el tiempo es mayor a un minuto se ocupa el siguiente formato de salida
          d = Number(temporal - seconds);

          var m = Math.floor(d % 3600 / 60);
          var s = Math.floor(d % 3600 % 60);
          var mDisplay = m > 0 ? m + (m == 1 ? " minutos " : " minutos, ") : "";
          var sDisplay = s > 0 ? s + (s == 1 ? " segundos" : " segundos") : "";

          swal({
            title: "Resultado",
            text: mensaje + ", has obtenido " + aciertos + " de " + final + " en " + mDisplay + sDisplay + ".",
            confirmButtonText: "Aceptar",
            type: "info",
            button: "Aceptar",
          });
          clearInterval(countdownTimer);
        } else {
          swal({
            title: "Resultado",
            text: mensaje + ", has obtenido " + aciertos + " de " + final + " en " + tiempo + " segundos.",
            confirmButtonText: "Aceptar",
            type: "info",
            button: "Aceptar",
          });
        } //else tiempo
        clearInterval(countdownTimer);
        $("#countdown").remove();
      } else { //tiempo
        swal({
          title: "Resultado",
          text: mensaje + ", has obtenido " + aciertos + " de " + final + ".",
          confirmButtonText: "Aceptar",
          type: "info",
          button: "Aceptar",
        });
      }
      document.getElementById("btnPlay").style.display = "none";
      document.getElementById("btnCreate").style.display = "none";
      document.getElementById("btnRevisar").style.display = "none";
      document.getElementById("btnReinicio").style.display = "";
      var totalpalabras = document.getElementsByClassName("respuestacorr");
      for (var pl = 0; pl < totalpalabras.length; pl++) {
        totalpalabras[pl].style.display = "";
      }


      // console.log(arrh);
    }

  } else {
    //REVISAR Falta respuestas
    swal({
      title: "Atención",
      text: "Por favor, llena todos los campos",
      confirmButtonText: "Aceptar",
      type: "info",
      button: "Aceptar",
    });

  }
  guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, aciertos, final);
}

// TODO: Clean this guy up
function AddWordToBoard() {
  var i, len, curIndex, curWord, curChar, curMatch, testWord, testChar,
    minMatchDiff = 9999,
    curMatchDiff;

  if (wordsActive.length < 1) {
    curIndex = 0;
    for (i = 0, len = wordBank.length; i < len; i++) {
      if (wordBank[i].totalMatches < wordBank[curIndex].totalMatches) {
        curIndex = i;
      }
    }
    wordBank[curIndex].successfulMatches = [{
      x: 12,
      y: 12,
      dir: 0
    }];
  } else {
    curIndex = -1;

    for (i = 0, len = wordBank.length; i < len; i++) {
      curWord = wordBank[i];
      curWord.effectiveMatches = 0;
      curWord.successfulMatches = [];
      for (var j = 0, lenJ = curWord.char.length; j < lenJ; j++) {
        curChar = curWord.char[j];
        for (var k = 0, lenK = wordsActive.length; k < lenK; k++) {
          testWord = wordsActive[k];
          for (var l = 0, lenL = testWord.char.length; l < lenL; l++) {
            testChar = testWord.char[l];
            if (curChar === testChar) {
              curWord.effectiveMatches++;

              var curCross = {
                x: testWord.x,
                y: testWord.y,
                dir: 0
              };
              if (testWord.dir === 0) {
                curCross.dir = 1;
                curCross.x += l;
                curCross.y -= j;
              } else {
                curCross.dir = 0;
                curCross.y += l;
                curCross.x -= j;
              }

              var isMatch = true;

              for (var m = -1, lenM = curWord.char.length + 1; m < lenM; m++) {
                var crossVal = [];
                if (m !== j) {
                  if (curCross.dir === 0) {
                    var xIndex = curCross.x + m;

                    if (xIndex < 0 || xIndex > board.length) {
                      isMatch = false;
                      break;
                    }

                    crossVal.push(board[xIndex][curCross.y]);
                    crossVal.push(board[xIndex][curCross.y + 1]);
                    crossVal.push(board[xIndex][curCross.y - 1]);
                  } else {
                    var yIndex = curCross.y + m;

                    if (yIndex < 0 || yIndex > board[curCross.x].length) {
                      isMatch = false;
                      break;
                    }

                    crossVal.push(board[curCross.x][yIndex]);
                    crossVal.push(board[curCross.x + 1][yIndex]);
                    crossVal.push(board[curCross.x - 1][yIndex]);
                  }

                  if (m > -1 && m < lenM - 1) {
                    if (crossVal[0] !== curWord.char[m]) {
                      if (crossVal[0] !== null) {
                        isMatch = false;
                        break;
                      } else if (crossVal[1] !== null) {
                        isMatch = false;
                        break;
                      } else if (crossVal[2] !== null) {
                        isMatch = false;
                        break;
                      }
                    }
                  } else if (crossVal[0] !== null) {
                    isMatch = false;
                    break;
                  }
                }
              }

              if (isMatch === true) {
                curWord.successfulMatches.push(curCross);
              }
            }
          }
        }
      }
      curMatchDiff = curWord.totalMatches - curWord.effectiveMatches;
      if (curMatchDiff < minMatchDiff && curWord.successfulMatches.length > 0) {
        curMatchDiff = minMatchDiff;
        curIndex = i;
      } else if (curMatchDiff <= 0) {
        return false;
      }
    }
  }

  if (curIndex === -1) {
    return false;
  }

  var spliced = wordBank.splice(curIndex, 1);
  wordsActive.push(spliced[0]);

  var pushIndex = wordsActive.length - 1,
    rand = Math.random(),
    matchArr = wordsActive[pushIndex].successfulMatches,
    matchIndex = Math.floor(rand * matchArr.length),
    matchData = matchArr[matchIndex];

  wordsActive[pushIndex].x = matchData.x;
  wordsActive[pushIndex].y = matchData.y;
  wordsActive[pushIndex].dir = matchData.dir;

  for (i = 0, len = wordsActive[pushIndex].char.length; i < len; i++) {
    var xIndex = matchData.x,
      yIndex = matchData.y;
    if (matchData.dir === 0) {
      xIndex += i;
      elem = wordsActive[pushIndex].char.length;
      if (inicio == 0) {
        cont[xIndex][yIndex] = 1;
        palabra[xIndex][yIndex] = contpalabra;
        letra[xIndex][yIndex] = letra[xIndex][yIndex] + "C";
        stringpalabra[xIndex][yIndex] = wordsActive[pushIndex].string;
        inicio = 1;
      } else {
        cont[xIndex][yIndex] = inicio + 1;
        palabra[xIndex][yIndex] = contpalabra;
        inicio++;
        if (inicio == elem) {
          inicio = 0;
          contpalabra++;
        }
      }
      arreglolongitudes.push(xIndex);
      longitud[xIndex][yIndex] = wordsActive[pushIndex].char.length;
      // console.log(wordsActive[pushIndex]);
      board[xIndex][yIndex] = wordsActive[pushIndex].char[i];
      ori[xIndex][yIndex] = "H";
    } else {
      yIndex += i;
      elem2 = wordsActive[pushIndex].char.length;
      if (inicio2 == 0) {
        cont2[xIndex][yIndex] = 1;
        palabra2[xIndex][yIndex] = contpalabra2;
        letra[xIndex][yIndex] = letra[xIndex][yIndex] + "T";
        stringpalabra2[xIndex][yIndex] = wordsActive[pushIndex].string;
        inicio2 = 1;
      } else {
        cont2[xIndex][yIndex] = inicio2 + 1;
        palabra2[xIndex][yIndex] = contpalabra2;
        inicio2++;
        if (inicio2 == elem2) {
          inicio2 = 0;
          contpalabra2++;
        }
      }
      longitud1[xIndex][yIndex] = wordsActive[pushIndex].char.length;
      // console.log(longitud1[xIndex][yIndex] + "");
      // console.log(wordsActive[pushIndex]);
      board[xIndex][yIndex] = wordsActive[pushIndex].char[i];
      ori2[xIndex][yIndex] = "V";
      console.log(ori2[xIndex][yIndex] + "_" + palabra2[xIndex][yIndex] + "_" + cont2[xIndex][yIndex]);
      arreglolongitudes.push(xIndex);
    }
    Bounds.Update(xIndex, yIndex);
  }
  return true;
}


function BoardToHtml(blank) {
  for (var i = Bounds.top - 1, str = ""; i < Bounds.bottom + 2; i++) {
    str += "<div class='row'>";
    for (var j = Bounds.left - 1; j < Bounds.right + 2; j++) {
      str += BoardCharToElement(board[j][i], ori[j][i], palabra[j][i], cont[j][i], ori2[j][i], palabra2[j][i], cont2[j][i], letra[j][i], longitud[j][i], longitud1[j][i], stringpalabra[j][i], stringpalabra2[j][i]);
    }
    str += "</div>";
  }
  var maximo = Math.max.apply(null, arreglolongitudes);

  var maximo2 = 64.8 + (maximo * 32.4);
  posi = 1;
  posi1 = 1;
  defineme = 1;
  controlbucle = 0;
  arreglocoincidencias = [];
  indicecoincidencias = 0;
  document.getElementById("crossword").style.minWidth = "" + maximo2 + "px";
  if (maximo2 > 1440) {
    document.getElementById("crossword").style.width = "" + maximo2 + "px";

    document.getElementById("supermister").style.display = "block";
    document.getElementById("respuestaspro").style.width = "30%";
    document.getElementById("respuestaspro").style.margin = "auto";
  } else {
    document.getElementById("crossword").style.width = "" + maximo2 + "px";
  }


  return str;
}


function BoardCharToElement(c, h, p, i, h1, p1, i1, l, k1, k2, cad1, cad2) {
  var arr = (c) ? ['square', 'letter'] : ['square'];
  // console.log(c + "" + p + "" + i);
  return EleStr('div', [{
    a: 'class',
    v: arr
  }], c, h, p, i, h1, p1, i1, l, k1, k2, cad1, cad2);
}



//---------------------------------//
//   OBJECT DEFINITIONS            //
//---------------------------------//

function WordObj(stringValue) {
  this.string = stringValue;
  this.char = stringValue.split("");
  this.totalMatches = 0;
  this.effectiveMatches = 0;
  this.successfulMatches = [];
}


//---------------------------------//
//   EVENTS                        //
//---------------------------------//

function RegisterEvents() {


  document.getElementById("btnCreate").addEventListener('click', Create, false);
  document.getElementById("btnPlay").addEventListener('click', Play, false);
  document.getElementById("btnRevisar").addEventListener('click', Revisar, false);
  document.getElementById("btnReinicio").addEventListener('click', Reinicio, false);

}
RegisterEvents();


//---------------------------------//
//   HELPER FUNCTIONS              //
//---------------------------------//

function EleStr(e, c, h, o, p, w, o1, p1, w1, l, k1, k2, cad1, cad2) {
  var arrmas = [];
  h = (h) ? h : "";
  for (var i = 0, s = "<" + e + " "; i < c.length; i++) {
    s += c[i].a + "='" + ArrayToString(c[i].v, " ") + "' ";
    arrmas = c[i].v;
    // console.log(c);
    for (var j = 0; j <= arrmas.length; j++) {
      if (arrmas[j] == 'letter') {

        if (o == null) {
          o = "H";
        }
        if (p == null) {
          p = 0;
        }
        if (w == null) {
          w = 0
        }
        if (o1 == null) {
          o1 = "V";
        }
        if (p1 == null) {
          p1 = 0;
        }
        if (w1 == null) {
          w1 = 0
        }
        if (k1 == null) {
          k1 = "D";
        }
        if (k2 == null) {
          k2 = "D"
        }

        var total = document.getElementsByClassName("clue");
        s += "id='" + o + "" + p + "_" + w + "" + o1 + "" + p1 + "_" + w1 + "L" + k1 + "F" + k2 + "'";

        //busca coincidencias
        if (controlbucle == 0) {
          for (var i = 0; i < letra.length; i++) {
            //Bucle que recorre el array que está en la posición i

            for (var j = 0; j < letra[i].length; j++) {
              if (letra[i][j] == "CT") {

                arreglocoincidencias.push(posi);
                posi++;
                posi1++;
              }
              if (letra[i][j] == "TC") {

                arreglocoincidencias.push(posi);
                posi++;
                posi1++;
              }
            }
          }
          controlbucle = 1
        }


        if (l == "CT" || l == "TC") {
          var car4 = o + "" + p + "_" + w + "" + o1 + "" + p1 + "_" + w1 + "L" + k1;
          var car5 = o + "" + p + "_" + w + "" + o1 + "" + p1 + "_" + w1 + "L" + k2;
          ejemploB = palabraspro[i][2]
          ejemploM = palabraspro[i][3]
          // var ejemploBV = palabraspro[i][2]
          // var ejemploMV = palabraspro[i][3]
          // console.log("00000 "+ejemploB+"00000 "+ejemploM)
          if (defineme == 0) {
            for (var u = 0; u < total.length; u++) {
              var stringloco3 = total[u].id + "";
              var descript3 = total[u].value + ""

              var torus3 = cad1.substring(0, 1);
              var minus3 = cad1.substring(1, cad1.length);

              var torus5 = cad2.substring(0, 1);
              var minus5 = cad2.substring(1, cad2.length);
              minus5 = minus5.toLowerCase();
              minus5 = torus5 + "" + minus5;
              minus3 = minus3.toLowerCase();
              minus3 = torus3 + "" + minus3;

              if (stringloco3 == minus3) {
                crearespuesta(stringloco3, arreglocoincidencias[indicecoincidencias], descript3, car4, 0,ejemploB,ejemploM);
              }

              if (stringloco3 == minus5) {
                crearespuesta2(stringloco3, arreglocoincidencias[indicecoincidencias], descript3, car5, 0,ejemploB,ejemploM);
              }
            }


          }
          var cadenapro5 = "./img/" + arreglocoincidencias[indicecoincidencias] + ".gif";
          s += "style= 'background-image: url(\"" + cadenapro5 + "\")'";
          indicecoincidencias++;

        }


        if (l == "C") {
          var car = o + "" + p + "_" + w + "" + o1 + "" + p1 + "_" + w1 + "L" + k1;
          if (defineme == 0) {
            for (var i = 0; i < total.length; i++) {
              var stringloco = total[i].id + "";
              var descript = total[i].value + ""
              var ejemploB = palabraspro[i][2]
              var ejemploM = palabraspro[i][3]
              // console.log("00001 "+ejemploB+"0001 "+ejemploM)
              var torus = cad1.substring(0, 1);
              var minus = cad1.substring(1, cad1.length);
              minus = minus.toLowerCase();
              minus = torus + "" + minus;

              if (stringloco == minus) {
                crearespuesta(stringloco, posi, descript, car, 1,ejemploB,ejemploM);
              }
            }
          }

          var cadenapro3 = "./img/" + posi + ".gif";
          s += "style= 'background-image: url(\"" + cadenapro3 + "\")'";
          posi++;
        }
        if (l == "T") {
          var car1 = o + "" + p + "_" + w + "" + o1 + "" + p1 + "_" + w1 + "L" + k2;
          if (defineme == 0) {
            for (var j = 0; j < total.length; j++) {
              var stringloco = total[j].id + "";
              var descript = total[j].value + ""

              var torus = cad2.substring(0, 1);
              var minus = cad2.substring(1, cad2.length);
              minus = minus.toLowerCase();
              minus = torus + "" + minus;
              ejemploB = palabraspro[j][2];
              ejemploM = palabraspro[j][3];
              console.log("00002 "+ejemploB+"0002 "+ejemploM)
              if (stringloco == minus) {
                crearespuesta2(stringloco, posi1, descript, car1, 1,ejemploB,ejemploM);
              }
            }

          }
          var cadenapro4 = "./img/" + posi1 + ".gif";
          s += "style= 'background-image: url(\"" + cadenapro4 + "\")'"
          posi1++;
        }
      }
    }
  }
  return (s + ">" + h + "</" + e + ">");
}

function ArrayToString(a, s) {
  if (a === null || a.length < 1) return "";
  if (s === null) s = ",";
  for (var r = a[0], i = 1; i < a.length; i++) {
    r += s + a[i];
  }
  return r;
}

function crearespuesta(a, b, c, k, g,rb,rm) {
  
  if (g == 0) {
    var controlatodo = document.getElementById("primeroh");
  } else {
    var controlatodo = document.getElementById("resp");
  }
  
  console.log("AH: "+a);
  console.log("BH: "+b);
  console.log("CH: "+c);
  console.log("KH: "+k);
  console.log("GH: "+g);
  // console.log("rbH: "+rb);
  // console.log("rmH: "+rm);


  var palomita = document.createElement('i')
  palomita.setAttribute('class', 'ip far fa-2x fa-check-circle blink')
  var tache = document.createElement('i')
  tache.setAttribute('class', 'it far fa-2x fa-times-circle blink')
  var retroBien = document.createElement("span");
  // var retroBientxt = document.createElement("span");
  retroBien.setAttribute('class', 'tooltip');
  retroBien.setAttribute('class', 'tooltiptext');
  retroBien.setAttribute('data-toggle', 'tooltip');
  retroBien.setAttribute('data-placement', 'auto left');
  retroBien.setAttribute('data-type', 'success');
  retroBien.setAttribute('title', rb);
  retroBien.setAttribute('style', "display: none;");
  retroBien.appendChild(palomita);
  // retroBien.appendChild(retroBientxt);
  var retroMal = document.createElement("span");
  retroMal.setAttribute('data-toggle', 'tooltip');
  retroMal.setAttribute('data-placement', 'auto left');
  retroMal.setAttribute('data-type', 'danger');
  retroMal.setAttribute('style', "display: none;");
  retroMal.setAttribute('title', rm);

  retroMal.appendChild(tache)

  var contenidoprimario = document.createElement("div");
  contenidoprimario.setAttribute('style', 'display:flex');
  controlatodo.appendChild(contenidoprimario);
  var contenidoprimario = document.createElement("div");
  contenidoprimario.setAttribute('style', 'display:flex');
  controlatodo.appendChild(contenidoprimario);
  var contentrespuestas = document.createElement("div");
  contentrespuestas.setAttribute('id', k);
  contentrespuestas.className = "proh";
  contentrespuestas.innerHTML = b + ".  " + c;
  contenidoprimario.appendChild(contentrespuestas);
  var respuestaspalabra = document.createElement("b");
  respuestaspalabra.className = "respuestacorr";
  respuestaspalabra.setAttribute('style', 'display:none');
  respuestaspalabra.innerHTML = "" + a
  contenidoprimario.appendChild(respuestaspalabra);
  contenidoprimario.appendChild(retroBien)
  contenidoprimario.appendChild(retroMal)
  var patino = a.toUpperCase();
  palabrasmagicas.push(patino);

}

function crearespuesta2(a, b, c, k, g,rb,rm) {
  if (g == 0) {
    var controlatodo = document.getElementById("primerov");
  } else {
    var controlatodo = document.getElementById("resp1");
  }
  console.log("AV: "+a);
  console.log("BV: "+b);
  console.log("CV: "+c);
  console.log("KV: "+k);
  console.log("GV: "+g);
  // console.log("rbV: "+rb);
  // console.log("rmV: "+rm);
  var palomitav = document.createElement('i')
  palomitav.setAttribute('class', 'ip far fa-2x fa-check-circle blink')
  var tachev = document.createElement('i')
  tachev.setAttribute('class', 'it far fa-2x fa-times-circle blink')

  var retroBienv = document.createElement("span");
  retroBienv.setAttribute('data-toggle', 'tooltip');
  retroBienv.setAttribute('data-placement', 'auto left');
  retroBienv.setAttribute('data-type', 'success')
  retroBienv.setAttribute('style', "display: none;");
  retroBienv.setAttribute('title', rb);
  retroBienv.appendChild(palomitav)

  var retroMalv = document.createElement("span");
  retroMalv.setAttribute('data-toggle', 'tooltip');
  retroMalv.setAttribute('data-placement', 'auto left');
  retroMalv.setAttribute('data-type', 'danger')
  retroMalv.setAttribute('style', "display: none;");
  retroMalv.setAttribute('title', rm);
  retroMalv.appendChild(tachev)

  var contenidoprimario = document.createElement("div");
  contenidoprimario.setAttribute('style', 'display:flex');
  controlatodo.appendChild(contenidoprimario);
  var contentrespuestas = document.createElement("div");
  contentrespuestas.setAttribute('id', k);
  contentrespuestas.className = "prov";
  var patinov = a.toUpperCase();
  palabrasmagicas.push(patinov);
  contentrespuestas.innerHTML = b + ". " + c;
  contenidoprimario.appendChild(contentrespuestas);
  var respuestaspalabra = document.createElement("b");
  respuestaspalabra.className = "respuestacorr";
  respuestaspalabra.setAttribute('style', 'display:none');
  respuestaspalabra.innerHTML = "" + a;
  contenidoprimario.appendChild(respuestaspalabra);
  contenidoprimario.appendChild(retroBienv)
  contenidoprimario.appendChild(retroMalv)
}

function AddClass(ele, classStr) {
  ele.className = ele.className.replaceAll(' ' + classStr, '') + ' ' + classStr;
}

function RemoveClass(ele, classStr) {
  ele.className = ele.className.replaceAll(' ' + classStr, '');
}

function ToggleClass(ele, classStr) {
  var str = ele.className.replaceAll(' ' + classStr, '');
  ele.className = (str.length === ele.className.length) ? str + ' ' + classStr : str;
}

String.prototype.replaceAll = function (replaceThis, withThis) {
  var re = new RegExp(replaceThis, "g");
  return this.replace(re, withThis);
};


//---------------------------------//
//   INITIAL LOAD                  //
//---------------------------------//
$("#btnRecargar").hide();
$("#prohibido").hide();
$("#btnIniciar").hide();
$("#countdown").hide();
$("#mododebug").hide();
if (window.parent.data_crm) {
  debug = true;
  tempo = true;
  verLongitud = true;
}
if (window.name == "movil") {
  esMobil = true;
} else {
  esMobil = isMobile();
}
$("#btnIniciar").hide();
if (esMobil) {
  $(".container").hide();

  $("#prohibido").show();
} else {
  Create();
  Play();
  // isMobile();
}

$("#btnCreate").click(function () {
  $("#btnPlay").hide();
  $("#btnRevisar").hide();
  $("#btnRecargar").show();
  $("#btnReinicio").show();
}); //btnCreate


if (tempo) {
  iniciarTempo();
  $("#countdown").show();
  $("#btnReinicio").hide();
}