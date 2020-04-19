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

function inicial() {
  $("#countdown").hide();
  $("#btnIniciar").show();
  $("#btnPlay").hide();
  $("#btnRevisar").hide();
  $("#btnCreate").hide();
  $("#respuestaspro").hide();
  $(".row").hide();
}

function iniciarTempo() {
  console.log("iniciarTempo");
  var countdownTimer = 0;
  inicial();
  $("#btnIniciar").click(function () {
    $(".row").show();
    $("#respuestaspro").show();
    $("#btnIniciar").hide();
    $("#btnPlay").show();
    $("#btnRevisar").show();
    $("#btnCreate").show();
    temporizador();
  }); //btnIniciar

  $("#btnCreate").click(function () {
    $("#countdown").remove();
    clearInterval(countdownTimer);
    $("#countdown").empty();
    $("#btnPlay").hide();
    $("#btnRevisar").hide();
  });
  $("#btnRevisar").click(function () {
    //$("#countdown").remove();
    clearInterval(countdownTimer);
    //$("#countdown").empty();

  }); //btnCreate
} //iniciarTempo
function temporizador() {
  //número de segundos a contar
  console.log("temporizador");

  function secondPassed() {
    //seconds = ((minutes * 60) + seg)
    var a = Math.round((seconds - 30) / 60); //calcula el número de minutos
    //var a = ((minutes * 60) + seconds)
    remainingSeconds = seconds % 60; //calcula los segundos
    //si los segundos usan sólo un dígito, añadimos un cero a la izq
    if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }
    try {
      document.getElementById('countdown').innerHTML = a + ":" + remainingSeconds;
    } catch (e) {}
    var mensaje = "";
    for (var j = 0; j < retroCal.length; j++) {
      console.log(aciertos);

      if (aciertos >= retroCal[j].LimInf && aciertos <= retroCal[j].LimSup) {
        mensaje = retroCal[j].Mensaje;
      }
    }


    if (seconds == 0) {
      Revisar();
      clearInterval(countdownTimer);
      swal({
        title: "Se acabó el tiempo",
        text: mensaje + ", has obtenido " + aciertos + " de " + numeropalabras,
        confirmButtonText: "Aceptar",
        type: "info",
        button: "Aceptar",
      });
      $("#btnPlay").hide();
      $("#btnRevisar").hide();
      $("#btnReinicio").hide();
      $("#btnCreate").show();
    } else {
      seconds--;
    }

  } //secondPassed
  countdownTimer = setInterval(secondPassed, 1000);
  return;
} //temporizador