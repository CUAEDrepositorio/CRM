function elegirDispositivo(disp, rec) {
  // var marco = document.getElementById("marco");
  // marco.style.display = "flex";

  var imgPC = document.getElementById(rec + "pc");
  var imgCelV = document.getElementById(rec + "celV");
  var imgCelH = document.getElementById(rec + "celH");
  var imgTabV = document.getElementById(rec + "tabletV");
  var imgTabH = document.getElementById(rec + "tabletH");

  document.getElementById(rec + "desktop").style.opacity = "0.3";
  document.getElementById(rec + "celularV").style.opacity = "0.3";
  document.getElementById(rec + "tabV").style.opacity = "0.3";
  document.getElementById(rec + "celularH").style.opacity = "0.3";
  document.getElementById(rec + "tabH").style.opacity = "0.3";

  imgPC.style.display = "none";
  imgCelV.style.display = "none";
  imgTabV.style.display = "none";
  imgCelH.style.display = "none";
  imgTabH.style.display = "none";

  if (disp == "1") {
    imgPC.style.display = "";
    document.getElementById(rec + "desktop").style.opacity = "1.0";
  }
  if (disp == "2") {
    imgCelV.style.display = "";
    document.getElementById(rec + "celularV").style.opacity = "1.0";
  }
  if (disp == "3") {
    imgTabV.style.display = "";
    document.getElementById(rec + "tabV").style.opacity = "1.0";
  }
  if (disp == "4") {
    imgCelH.style.display = "";
    document.getElementById(rec + "celularH").style.opacity = "1.0";
  }
  if (disp == "5") {
    imgTabH.style.display = "";
    document.getElementById(rec + "tabH").style.opacity = "1.0";
  }
}
