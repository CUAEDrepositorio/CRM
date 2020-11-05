var remainingSeconds = 0;
var countdownTimer = 0;

var seconds = 0;
var temporal;
seconds = ((minutes * 60)) + (seg % 60)
temporal = seconds;
console.log("TEMPORAL: " + temporal);

if (seg > 59) {
  seg = 0;
  seconds = minutes * 60 + seg;
}
if (minutes < 0) {
  minutes = 0;
  seconds = minutes * 60 + seg;
}

$(document).ready(function () {
  if (tempo) {
    iniciarTempo();
    clearInterval(countdownTimer);
  } else {
    $("#btn-iniciar").hide();
    activarCartas();
  }

}); //funcion inicial
function iniciarTempo() {
  var countdownTimer = 0;
  $("#revisar").hide();
  $("#pasar").hide();
  $("#botonCerrarRetroplus").hide();
  $("#btn-iniciar").show();
  deactivarCartas();

  $("#btn-iniciar").click(function () {
    activarCartas();
    temporizador();
    $("#revisar").show();
    // $("#pasar").show(); //Forzar al alumno a que conteste
    $("#botonCerrarRetroplus").hide();
    $("#btn-iniciar").hide();
  }); //boton-iniciar

  $("#botonCerrarRetroplus").click(function () {
    function Actualizar() {
      location.reload(true);
    }
    $("#revisar").hide();
    $("#pasar").hide();
    $("#botonCerrarRetroplus").hide();
    $("#btn-iniciar").show();
    $("#countdown").empty();
    clearInterval(countdownTimer);
    var countdownTimer = 0;
    document.getElementById('countdown').innerHTML = ""
  }); //boton-botonCerrarRetro

}
//ANTERIOR
function temporizador() {
  //número de segundos a contar
  function secondPassed() {
    var minutes = Math.round((seconds - 30) / 60); //calcula el número de minutos
    remainingSeconds = seconds % 60; //calcula los segundos
    //si los segundos usan sólo un dígito, añadimos un cero a la izq
    if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
    var final = rutas.length;
    for (var j = 0; j < retroCal.length; j++) {
      console.log(aciertos);
      if (aciertos >= retroCal[j].LimInf && aciertos <= retroCal[j].LimSup) {
        mensaje = retroCal[j].Mensaje;
      }
    } //for

    if (seconds == 0) {
      clearInterval(countdownTimer);
      var final = rutas.length;
      $('#Parte1').addClass('complete');
      $('#Parte2').addClass('complete');
      swal({
        title: "¡Se acabó el tiempo! \n",
        // text: "Obtuviste " + aciertos + "/"+ final +" respuestas correctas.\n "+mensaje,
        confirmButtonText: "Aceptar",
        button: "Aceptar"
      });
      $("#revisar").hide();
      clearInterval(countdownTimer);
      document.getElementById('countdown').innerHTML = ""
      deactivarCartas();
      $("#pasar").show();
      $("#botonCerrarRetroplus").hide();
      $("#revisarcont").hide();
      $(".retroBien").hide();
      $(".retroMal").hide();
      $("#pasar").click(function () {
        $("#botonCerrarRetroplus").show();
      });

    } else {
      seconds--;
    }

  } //secondPassed
  countdownTimer = setInterval(secondPassed, 1000);
  return;
} //temporizador