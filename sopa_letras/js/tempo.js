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
  $("#solve").hide();
  $("#again").hide();
  $("#Palabras").hide();
}

function iniciarTempo() {
  console.log("iniciarTempo");
  var countdownTimer = 0;
  inicial();
  $("#btn-iniciar").click(function () {
    $("#countdown").show();
    $(".puzzleSquare").prop("disabled", false);
    temporizador();
    $("#solve").show();
    $("#Palabras").show();
    $("#btn-iniciar").hide();
  }); //iniciar

  $("#again").click(function () {
    inicial();
    $("#countdown").empty();
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = ""
  }); //again

  $("#solve").click(function () {
    $("#again").show();
    $("#solve").hide();
    $("#countdown").remove();
    clearInterval(countdownTimer);
    $("#countdown").empty();
  });

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
      if (aciertos >= retroCal[j].LimInf && aciertos <= retroCal[j].LimSup) {
        mensaje = retroCal[j].Mensaje;
      }
    }
    var final = words.length;
    if (seconds == 0) {
      clearInterval(countdownTimer);
      var final = words.length;
      $('.puzzleSquare').addClass('complete');
      swal({
        title: "Se acabó el tiempo",
        text: mensaje + ", has encontrado " + aciertos + " de " + final,
        confirmButtonText: "Aceptar",
        type: "info",
        button: "Aceptar",
      });
      $(".puzzleSquare").prop("disabled", true);
    } else {
      seconds--;
    }

  } //secondPassed
  countdownTimer = setInterval(secondPassed, 1000);
  return;
} //temporizador