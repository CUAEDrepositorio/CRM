var actualOpcion = "";
var puntaje;
var total = 0;
var buenas = 0;
var incorrectas = 0;
var categoria = 0;
var opcion = 0;
var intentos = 0;
var caja;
var categorias = encabezados.length;
var totalPuntaje = 0;

$(document).ready(function () {
    if (window.name == "movil") {
        esMobil = true;
    } else {
        esMobil = isMobile();
    }
    if (esMobil) {
        $(".encabezado").hide();
        $("#btnProximo").hide();
        $("#mododebug").hide();
        $("#prohibido").show();
    } else {
        $("#prohibido").hide();
        $("#mododebug").hide();
        $("#btnProximo").hide();
        $(".encabezado").show();
        $(".instrucccion_texto").show();
        if (debug) {
            $("#mododebug").show();
        }
        create_board();
    }

    window.onresize = function () {
        //alert("body.scrollWidth "+document.body.scrollWidth + "screen.availWidth " +screen.availWidth + "document.body.clientWidth "+document.body.clientWidth );
        if (document.body.clientWidth > 768) {
            $("#prohibido").hide();
            $("#mododebug").hide();
            $("#btnProximo").hide();
            $(".encabezado").show();
            $(".instrucccion_texto").show();
            $(".tablero").show();
        } else {
            $("#prohibido").show();
            $("#mododebug").hide();
            $("#btnProximo").hide();
            $(".encabezado").hide();
            $(".instrucccion_texto").hide();
            $(".tablero").hide();
        }
    }

    //para cada clic de los elementos del tipo catOpcion
    $(".catOpcion").click(function () {
        caja = $(this); // obtener el objeto
        actualOpcion = caja.attr("id"); //obtener el id de donde se obtiene la posicion
        var datos = actualOpcion.split("_");
        categoria = datos[1]; // obtener valor categoria
        opcion = datos[2]; // obtener valor opcion
        console.log("categoria:  " + datos[1]);
        console.log("opcion:  " + datos[2]);
        var seleccionado = buscarPregunta(categoria, opcion);
        //obtenemos el elemento que alamcena temporalmente  las preguntas
        try {
            var elementoPregunta = document.getElementById("preguntas");
            elementoPregunta.innerHTML = "";
            var clase = this.getAttribute("class"); // obtenemos la clase del elemento
            //si no se ha deshabilitado
            if (clase.indexOf("disabled") == -1) {
                //creamos la pregunta
                crearPregunta(seleccionado, elementoPregunta);
            }
        } catch (error) {
            //console.log(error)
        }
    });

    actualOpcion = "";
    puntaje = 0;
    total = reactivos.length;
    buenas = 0;
    incorrectas = 0;
    intentos = 0;

});


// buscamos la pregunta en el arrreglo de preguntas
function buscarPregunta(categoria, opcion) {
    var seleccionado;
    //recorremos el arreglo de preguntas
    for (var i = 0; i < total; i++) {
        var actual = reactivos[i];
        //si los datos coinciden con los de la pregunta a buscar
        if (reactivos[i].categoria == categoria && reactivos[i].opcion == opcion) {
            seleccionado = actual;
        } //fin if
    } //fin for
    return seleccionado;
} //fin function buscarPregunta


function crearPregunta(actual, destino) {
    var opcion;
    var panel_heading;
    var panel_collapse;
    var panel_body = "";
    var modal_body = $(".modal-body");
    var panel_default = "";
    var panel_group = $("#accordion");
    panel_group.html("")

    // $("#preguntas").html('<span class="textoPregunta">' + actual.texto + " </span>");
    $(".panel-group").html('<span class="textoPregunta">' + actual.texto + " </span>");
    actual.respuestas.forEach(function (elemento, indice) {

        panel_default = document.createElement("div");
        panel_default.setAttribute("class", "panel panel-default");
        panel_heading = document.createElement("div");
        panel_heading.setAttribute("class", "panel-heading btn collapsed");
        panel_heading.setAttribute("data-toggle", "collapse");
        panel_heading.setAttribute("data-target", "#collapse" + indice);
        panel_heading.setAttribute("data-parent", "#accordion");
        panel_heading.setAttribute("aria-expanded", "false");
        panel_heading.innerHTML = "<p id=txt_panel>" + elemento.respuesta + "</p>";

        panel_default.appendChild(panel_heading);

        panel_collapse = document.createElement("div");
        panel_collapse.setAttribute("class", "panel-collapse collapse");
        panel_collapse.setAttribute("id", "collapse" + indice);

        panel_body = document.createElement("div");
        panel_body.setAttribute("class", "panel-body");
        panel_collapse.append(panel_body);

        divpreguntas = document.createElement("div");
        divpreguntas.className = "preguntas"

        opcion = document.createElement("a");
        opcion.className = "respuesta";
        opcion.id = "op" + indice;
        opcion.setAttribute("data-correcto", elemento.correcta);
        opcion.setAttribute("data-retro", elemento.retro);
        opcion.innerHTML = elemento.respuesta;


        if (debug) {
            var debugtxt = document.createElement('p');
            debugtxt.innerHTML = elemento.correcta;
            opcion.appendChild(debugtxt);
        }

        var palomita = document.createElement('i')
        palomita.setAttribute('class', 'ip far fa-2x fa-check-circle blink')
        var retroBien = document.createElement("span");
        retroBien.setAttribute('data-toggle', 'tooltip');
        retroBien.setAttribute('data-placement', 'left');
        retroBien.setAttribute('data-type', 'success');
        retroBien.setAttribute('data-title', '');
        retroBien.setAttribute('style', "display: none;");
        retroBien.appendChild(palomita);

        var tache = document.createElement('i')
        tache.setAttribute('class', 'it far fa-2x fa-times-circle blink')
        var retroMal = document.createElement("span");
        retroMal.setAttribute('data-toggle', 'tooltip');
        retroMal.setAttribute('data-placement', 'left');
        retroMal.setAttribute('data-type', 'danger');
        retroMal.setAttribute('data-title', '');
        retroMal.setAttribute('style', "display: none;");
        retroMal.appendChild(tache);

        destino.appendChild(opcion);
        opcion.appendChild(retroBien);
        opcion.appendChild(retroMal);

        modal_body.append(destino); //coloca las preguntas
        $("#modalReactivos").modal();
        panel_group.append(panel_default);
        panel_default.append(panel_collapse);
        divpreguntas.append(opcion);
        panel_body.append(divpreguntas);
    });

    setClicBotones();
    setClicHeading();
}

function setClicBotones() {

    for (let i = 0; i < document.getElementsByClassName("preguntas").length; i++) {
        var oList = document.getElementsByClassName("preguntas")[i].getElementsByTagName("a")[0];
        if (oList.className.indexOf("respuesta") == 0) {
            hacerRespuesta(oList);

        }
    }
}

function setClicHeading() {
    for (let i = 0; i < document.getElementsByClassName("preguntas").length; i++) {
        var oList = document.getElementsByClassName("panel-heading btn collapsed")[i]
        setClicAria(oList)
    }

}


function setClicAria(boton) {
    boton.onclick = function () {
        var d_target = this.getAttribute("data-target");
        if ($(".panel-group").children().length == 3) {
            if (d_target == "#collapse0") {
                if (this.getAttribute("class") == "panel-heading btn collapsed") {
                    this.firstChild.setAttribute("style", "display: none;");
                    if ((this.getAttribute("class") == "panel-heading btn collapsed") ||
                        (document.getElementsByClassName("panel-heading btn")[1].getAttribute("class") == "panel-heading btn")) {
                        this.parentElement.nextElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                    }
                } else {
                    this.firstChild.setAttribute("style", "display: '';");
                }
            } else if (d_target == "#collapse1") {
                if (this.getAttribute("class") == "panel-heading btn collapsed") {
                    this.firstChild.setAttribute("style", "display: none;");
                    if ((this.getAttribute("class") == "panel-heading btn collapsed") ||
                        (document.getElementsByClassName("panel-heading btn")[0].getAttribute("class") == "panel-heading btn")) {
                        this.parentElement.previousElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                    }
                } else {
                    this.firstChild.setAttribute("style", "display: '';");
                }
            }
        } else if ($(".panel-group").children().length == 4) {
            if (d_target == "#collapse0") {
                if (this.getAttribute("class") == "panel-heading btn collapsed") {
                    this.firstChild.setAttribute("style", "display: none;");
                    if ((this.getAttribute("class") == "panel-heading btn collapsed") ||
                        (document.getElementsByClassName("panel-heading btn")[1].getAttribute("class") == "panel-heading btn")) {
                        this.parentElement.nextElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                        this.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                    }
                } else {
                    this.firstChild.setAttribute("style", "display: '';");
                }
            } else if (d_target == "#collapse1") {
                if (this.getAttribute("class") == "panel-heading btn collapsed") {
                    this.firstChild.setAttribute("style", "display: none;");
                    if ((this.getAttribute("class") == "panel-heading btn collapsed") ||
                        (document.getElementsByClassName("panel-heading btn")[0].getAttribute("class") == "panel-heading btn")) {
                        this.parentElement.previousElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                        this.parentElement.nextElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                    }
                } else {
                    this.firstChild.setAttribute("style", "display: '';");
                }
            } else if (d_target == "#collapse2") {
                if (this.getAttribute("class") == "panel-heading btn collapsed") {
                    this.firstChild.setAttribute("style", "display: none;");
                    if (document.getElementsByClassName("panel-heading btn")[2].getAttribute("class") == "panel-heading btn" ||
                        (this.getAttribute("class") == "panel-heading btn collapsed")) {
                        this.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                        this.parentElement.previousElementSibling.firstElementChild.firstElementChild.setAttribute("style", "display: ;");
                    }
                } else {
                    this.firstChild.setAttribute("style", "display: '';");
                }

            }
        }
    }
}

function hacerRespuesta(boton) {

    boton.onclick = function () {

        if (this.getAttribute("data-correcto").length == 4) {

            buenas++;
            var elemento = document.getElementById("op_" + categoria + "_" + opcion);
            elemento.childNodes[0].style.color = '#54900e';
            elemento.onclick = null;
            elemento.className = "catOpcion";
            elemento.className = "catOpcion disabled";
            elemento.className = "catOpcion complete disabled";
            puntaje += parseInt(elemento.getAttribute("data-puntaje"), 10);
            document.getElementById("puntaje").innerHTML = "Total:&nbsp;" + puntaje
            this.className = "respuesta bien disabled";
            this.onclick = null; //deshabilitamos esta opcion para que no vuelva a contestar

            var n4 = ((document.getElementsByClassName((document.getElementsByClassName(this.parentElement.getAttribute("class"))[0].parentNode).getAttribute("class"))[0].parentNode).getAttribute("class"));
            n4 = n4.substr(0, 14);
            var nodo_op = this.getAttribute("id").charAt(this.getAttribute("id").length - 1);
            var base = document.getElementsByClassName(document.getElementsByClassName(n4)[0].parentNode.getAttribute("class").substr(6, 13))[0]
            if ($(".panel-group").children().length == 4) {
                if (nodo_op == "0") {
                    base.firstChild.setAttribute("data-target", "#collapse01");
                    base.nextSibling.lastChild.removeAttribute("id");
                    base.nextSibling.nextSibling.lastChild.removeAttribute("id");
                    var bloqueo01 = base.nextSibling.lastChild.previousSibling.getAttribute("class").substr(0, 13);
                    $("." + bloqueo01).addClass("disabled");
                    var bloqueo02 = base.nextSibling.nextSibling.lastChild.getAttribute("class").substr(0, 13);
                    $("." + bloqueo02).addClass("disabled");

                } else if (nodo_op == "1") {
                    base.nextSibling.nextSibling.lastChild.removeAttribute("id");
                    base.lastChild.removeAttribute("id");
                    var bloqueo11 = base.nextSibling.nextSibling.lastChild.previousElementSibling.getAttribute("class").substr(0, 14);
                    $("." + bloqueo11).addClass("disabled");
                    var bloqueo12 = base.lastChild.previousElementSibling.getAttribute("class").substr(0, 14);
                    $("." + bloqueo12).addClass("disabled");
                } else {
                    base.nextElementSibling.nextElementSibling.firstChild.setAttribute("data-target", "#collapse21");
                    base.nextSibling.lastChild.removeAttribute("id");
                    base.nextSibling.previousSibling.lastChild.removeAttribute("id");
                    var bloqueo20 = base.nextSibling.lastChild.previousElementSibling.getAttribute("class").substr(0, 13);
                    $("." + bloqueo20).addClass("disabled");
                    var bloqueo21 = base.nextSibling.previousSibling.lastChild.previousElementSibling.getAttribute("class").substr(0, 13);
                    $("." + bloqueo21).addClass("disabled");

                }
                this.childNodes[this.childNodes.length - 2].firstElementChild.classList.remove("ocultar");
                this.childNodes[this.childNodes.length - 2].style.display = ""
                this.childNodes[this.childNodes.length - 2].setAttribute("data-title", this.getAttribute("data-retro"));

                if (nodo_op == "1") {
                    base.nextElementSibling.firstElementChild.setAttribute("data-target", "#collapse100");
                }
            } else if ($(".panel-group").children().length == 3) {
                if (nodo_op == "0") {
                    base.firstChild.setAttribute("data-target", "#collapse01");
                    base.nextSibling.lastChild.removeAttribute("id");
                } else if (nodo_op == "1") {
                    base.lastChild.removeAttribute("id");
                }
                this.childNodes[this.childNodes.length - 2].firstElementChild.classList.remove("ocultar");
                this.childNodes[this.childNodes.length - 2].style.display = ""
                this.childNodes[this.childNodes.length - 2].setAttribute("data-title", this.getAttribute("data-retro"));

                if (nodo_op == "1") {
                    base.nextElementSibling.firstElementChild.setAttribute("data-target", "#collapse100");
                    base.firstElementChild.setAttribute("data-target", "#collapse110");
                } else {
                    base.nextElementSibling.firstElementChild.setAttribute("data-target", "#collapse100");
                    base.firstElementChild.setAttribute("data-target", "#collapse110");
                }
            } //3

        } else {

            var elemento = document.getElementById("op_" + categoria + "_" + opcion);
            elemento.childNodes[0].style.color = '#911a19';
            elemento.onclick = null;
            elemento.className = "catOpcion complete disabled";
            puntaje -= parseInt(elemento.getAttribute("data-puntaje"), 10);
            document.getElementById("puntaje").innerHTML = "Total:&nbsp;" + puntaje
            this.className = "respuesta mal disabled";
            this.onclick = null;
            var nodo_op = this.getAttribute("id").charAt(this.getAttribute("id").length - 1);
            var n4 = ((document.getElementsByClassName((document.getElementsByClassName(this.parentElement.getAttribute("class"))[0].parentNode).getAttribute("class"))[0].parentNode).getAttribute("class"));
            n4 = n4.substr(0, 14);
            var base = document.getElementsByClassName(document.getElementsByClassName(n4)[0].parentNode.getAttribute("class").substr(6, 13))[0]
            if ($(".panel-group").children().length == 4) {
                if (nodo_op == "0") {
                    base.firstChild.setAttribute("data-target", "#collapse01");
                    base.nextSibling.lastChild.removeAttribute("id");
                    base.nextSibling.nextSibling.lastChild.removeAttribute("id");
                    var bloqueo01 = base.nextSibling.lastChild.previousSibling.getAttribute("class").substr(0, 13);
                    $("." + bloqueo01).addClass("disabled");
                    var bloqueo02 = base.nextSibling.nextSibling.lastChild.getAttribute("class").substr(0, 13);
                    $("." + bloqueo02).addClass("disabled");
                } else if (nodo_op == "1") {
                    base.nextSibling.nextSibling.lastChild.removeAttribute("id");
                    base.lastChild.removeAttribute("id");
                    var bloqueo11 = base.nextSibling.nextSibling.lastChild.previousElementSibling.getAttribute("class").substr(0, 14);
                    $("." + bloqueo11).addClass("disabled");
                    var bloqueo12 = base.lastChild.previousElementSibling.getAttribute("class").substr(0, 14);
                    $("." + bloqueo12).addClass("disabled");
                } else {
                    base.nextElementSibling.nextElementSibling.firstChild.setAttribute("data-target", "#collapse21");
                    base.nextSibling.lastChild.removeAttribute("id");
                    base.nextSibling.previousSibling.lastChild.removeAttribute("id");
                    var bloqueo20 = base.nextSibling.lastChild.previousElementSibling.getAttribute("class").substr(0, 13);
                    $("." + bloqueo20).addClass("disabled");
                    var bloqueo21 = base.nextSibling.previousSibling.lastChild.previousElementSibling.getAttribute("class").substr(0, 13);
                    $("." + bloqueo21).addClass("disabled");
                }
                this.childNodes[this.childNodes.length - 1].firstElementChild.classList.remove("ocultar");
                // this.childNodes[this.childNodes.length - 1].classList.add("mostrar");
                this.childNodes[this.childNodes.length - 1].style.display = ""
                this.childNodes[this.childNodes.length - 1].setAttribute("data-title", this.getAttribute("data-retro"));
                if (nodo_op == "1") {
                    base.nextElementSibling.firstElementChild.setAttribute("data-target", "#collapse100");
                }
            } else if ($(".panel-group").children().length == 3) {
                if (nodo_op == "0") {
                    base.firstChild.setAttribute("data-target", "#collapse01");
                    base.nextSibling.lastChild.removeAttribute("id");
                } else if (nodo_op == "1") {
                    base.lastChild.removeAttribute("id");
                }
                this.childNodes[this.childNodes.length - 1].firstElementChild.classList.remove("ocultar");
                this.childNodes[this.childNodes.length - 1].style.display = ""
                this.childNodes[this.childNodes.length - 1].setAttribute("data-title", this.getAttribute("data-retro"));

                if (nodo_op == "1") {
                    base.nextElementSibling.firstElementChild.setAttribute("data-target", "#collapse100");
                    base.firstElementChild.setAttribute("data-target", "#collapse110");
                } else {
                    base.nextElementSibling.firstElementChild.setAttribute("data-target", "#collapse100");
                    base.firstElementChild.setAttribute("data-target", "#collapse110");
                }
            }
            desactivarBotones();
        }
        revisar();
    };

    boton.className = 'respuesta';
}

function deshacerOpcion(boton) {
    boton.onclick = null;
    boton.className = 'respuesta disabled';
}

function desactivarBotones() {

    for (let i = 0; i < document.getElementsByClassName("preguntas").length; i++) {
        var objeto = document.getElementsByClassName("preguntas")[i].getElementsByTagName("a")[0];
        if (objeto.className.indexOf("respuestas") == 0) {
            deshacerOpcion(objeto);
        }

    }

}

function revisar() {

    if (puntaje >= puntajeExito) {
        $(".catOpcion").addClass("disabled")
        intentos++;
        swal({
            title: "Resultado",
            text: "Obtuviste " + puntaje + " puntos.<br>" + textoRetroGeneral,
            confirmButtonText: "Aceptar",
            closeOnConfirm: true,
            html: true
        });
        $("#btnProximo").show();
        $("#btnProximo").click(siguiente);
    }

}

function siguiente() {
    if (intentos < maxIntentos) {
        $("#btnProximo").hide();
        puntaje = 0;
        $("#puntaje").html("Total:&nbsp;&nbsp;0")
        if (siguienteIntentoBlanco) {
            $(".catOpcion").attr("class", "catOpcion");
            $(".textoOpcion").attr("style", "color:#385461;");
        } else {
            $(".catOpcion").removeClass("disabled");
            $(".complete").addClass("disabled");

        }

    } else {
        swal({
            title: "Atención",
            text: "Has alcanzado el máximo número de intentos:  " + maxIntentos + ".",
            confirmButtonText: "Aceptar",
            closeOnConfirm: true,
            html: true
        });
    }
}

function create_board() {

    document.getElementById("txtPaneles").innerHTML = reactivos.length

    if (puntajeExito == 0) {
        for (let i = 0; i < puntajes.length; i++) {
            totalPuntaje += encabezados.length * puntajes[i]
        }
        document.getElementById("txtPuntos").innerHTML = totalPuntaje * .40
        puntajeExito = totalPuntaje * .40
    } else {
        document.getElementById("txtPuntos").innerHTML = puntajeExito
    }


    var tablero = document.createElement("div")
    tablero.className = "tablero";
    document.body.appendChild(tablero);

    var espacio = document.createElement("br");
    document.body.appendChild(espacio);
    var btnIntentos = document.createElement("button");

    btnIntentos.setAttribute("id", "btnProximo");
    btnIntentos.innerHTML = "Siguiente intento";
    document.body.appendChild(btnIntentos);

    if (encabezados.length == 5) {
        tablero.setAttribute("style", "width: 770px");
    } else if (encabezados.length == 6) {
        tablero.setAttribute("style", "width: 910px");
    } else if (encabezados.length == 7) {
        tablero.setAttribute("style", "width: 1060px");
    } else {
        tablero.setAttribute("style", "width: 1210px");
    }

    if (encabezados.length < 5 || encabezados.length > 8) {
        $(".tablero").hide();
        var tablero_val = document.createElement("p");
        tablero_val.innerHTML = "Debe haber entre 5 y 8 categorias.";
        tablero_val.setAttribute("style", "font-size: 50px;margin: 200px;line-height:40px;margin-left: 600px;font-weight: 700;");
        document.body.appendChild(tablero_val);

    }


    var listaCategorias = document.createElement("div")
    listaCategorias.className = "listaCategorias";
    tablero.appendChild(listaCategorias);

    var listaOpciones = document.createElement("div");
    listaOpciones.className = "listaOpciones";
    listaOpciones.setAttribute("id", "listaOp")
    tablero.appendChild(listaOpciones);

    var divbarra = document.createElement("div");
    divbarra.className = "barraTareas";

    var divretro = document.createElement("div");
    divretro.className = "textoRetroalimentar";
    divretro.innerHTML = "&nbsp;";

    var divpuntaje = document.createElement("div");
    divpuntaje.className = "puntaje";
    divpuntaje.setAttribute("id", "puntaje");
    divpuntaje.innerHTML = "Total:&nbsp;&nbsp;0"
    divbarra.appendChild(divretro);
    divbarra.appendChild(divpuntaje);

    var divpregunta = document.createElement("div");
    divpregunta.setAttribute("id", "preguntas");
    divpregunta.innerHTML = "&nbsp;";

    tablero.appendChild(divbarra);
    tablero.appendChild(divpregunta);

    encabezados.forEach(function (elemento, indice) {
        var txt = document.createElement("div");
        txt.setAttribute("class", "categoria")
        txt.innerHTML = elemento;
        listaCategorias.appendChild(txt);
    });

    for (let i = 0; i < reactivos.length; i++) {
        var tarjetas = document.createElement("div");
        const columna = (i % categorias);
        const renglon = Math.trunc(i / categorias);
        listaOpciones.appendChild(tarjetas);
        tarjetas.setAttribute("id", 'op_' + (columna + 1) + '_' + (renglon + 1))
        tarjetas.setAttribute("class", "catOpcion");
        tarjetas.setAttribute("data-texto", columna + 1);
        tarjetas.setAttribute("data-puntaje", puntajes[renglon]);
        var spanPuntaje = document.createElement("span");
        spanPuntaje.setAttribute("class", "textoOpcion");

        if (renglon == puntajes.length) {
            spanPuntaje.innerHTML = "0";
        } else {
            spanPuntaje.innerHTML = (puntajes[renglon]);
        }

        tarjetas.appendChild(spanPuntaje);
        // spanPuntaje.innerHTML = (puntajes[columna * reactivosXCategoria + renglon]);
    }
}

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('Esto es un dispositivo móvil');
        return true;
    }
}