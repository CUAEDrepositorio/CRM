var remainingSeconds = 0;
var seconds = 0;
var temporal;
var a, countdownTimer;


function inicial() {
  $("#countdown").hide();
  $("#btnIniciar").show();
  $("#btnPlay").hide();
  $("#btnRevisar").hide();
  $("#btnCreate").hide();
  $(".row").hide();
  $(".contrespuestasv").hide();
  $(".contrespuestash").hide();

}

function iniciarTempo() {
  inicial();
  $("#btnIniciar").click(function () {
    $(".row").show();
    $("#countdown").show();
    $(".contrespuestasv").show();
    $(".contrespuestash").show();
    $("#btnIniciar").hide();
    $("#btnPlay").show();
    $("#btnRevisar").show();
    if (intentos == (maxIntentos - 1)) {
      $("#btnCreate").show();
    } else {
      $("#btnCreate").hide();
    }
    seconds = ((minutes * 60)) + (seg % 60);
    temporal = seconds;
    console.log("A");
    console.log("B");
    console.log("seconds: "+seconds);
    if (seg > 59) {
      seg = 0;
      seconds = minutes * 60 + seg;
    }
    if (minutes < 0) {
      minutes = 0;
      seconds = minutes * 60 + seg;
    }
    temporizador();
    
  }); //btnIniciar

  $("#btnCreate").click(function () {
    $("#btnPlay").hide();
    $("#btnIntento").show();
    $("#btnRevisar").hide();
  });
} //iniciarTempo


function temporizador() {
  function secondPassed(intent) {
    //calcula el número de minutos
    a = Math.round((seconds - 30) / 60);
    //calcula los segundos
    remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }
    try {
      document.getElementById('countdown').innerHTML = a + ":" + remainingSeconds;
    } catch (e) {}
    if (seconds == 0) {
      swal({
        title: "¡Se acabó el tiempo!\n",
        confirmButtonText: "Aceptar",
        button: "Aceptar",
      });
      clearInterval(countdownTimer);
      intentos++;
      $("input").attr('disabled', 'disabled');
      $("#btnPlay").hide();
      $("#btnRevisar").hide();
      $("#btnCreate").hide();
      $("#btnIntento").show();
      $("#countdown").hide();
    } else {
      seconds--;
    }
  } //secondPassed
  countdownTimer = setInterval(() => {secondPassed(intentos)}, 1000);
  return;
} //temporizador