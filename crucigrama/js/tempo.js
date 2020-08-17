var remainingSeconds = 0;
// var countdownTimer = 0;
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
  // var countdownTimer = 0;
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
    // clearInterval(countdownTimer);
    $("#countdown").empty();
    $("#btnPlay").hide();
    $("#btnRevisar").hide();
  });
} //iniciarTempo
function temporizador() {
  function secondPassed() {
    var a = Math.round((seconds - 30) / 60); //calcula el número de minutos
    remainingSeconds = seconds % 60; //calcula los segundos
    if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }
    try {
      document.getElementById('countdown').innerHTML = a + ":" + remainingSeconds;
    } catch (e) {}
    if (seconds == 0) {
      // clearInterval(countdownTimer);
      swal({
        title: "¡Se acabó el tiempo!\n",
        confirmButtonText: "Aceptar",
        button: "Aceptar",
      });
      $("#btnPlay").hide();
      $("#btnRevisar").hide();
      $("#btnReinicio").hide();
      $("#btnCreate").show();
    } else {
      seconds --;
    }

  } //secondPassed
  countdownTimer = setInterval(secondPassed, 1000);
  return;
} //temporizador