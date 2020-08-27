/**
* Wordfind.js 0.0.1
* (c) 2012 Bill, BunKat LLC.
* Wordfind is freely distributable under the MIT license.
* For all details and documentation:
*     http://github.com/bunkat/wordfind

	-LPFR Agosto 27, 2019 se agrego pintado de palabras, al encontrarlas
	-LPFR Agosto 27, 2019 se agrego estructura nueva de lista de reactivas
   -LPFR Agosto 27, 2019 se agrego visibildiad de palabras encontradas en respuestas.
*/
var idObjetivo = 0;
var aciertos = 0;
var inc = 0;
var camino;
var bodyOriginal;
var countdownTimer = 0;
// var tiempo;
var mensaje;
var countdownTimer = 0;
var d;
var txt = "";
var wordTemp;
var retroBien = [];
var retroMal = [];
var palomita = "<i class='ip far fa-2x fa-check-circle blink'></i>";
var tache = "<i class='it far fa-2x fa-times-circle blink'></i>";
// var retroBienT;
var retroMalT;
var retroBien;
var retroMal;


if (window.parent.data_crm) {
  debug = true;
  tempo = true;
  verLongitud = true;
  orientaciones = true;
}

function creaColores(cuantos) {
  var arreglo = [];
  for (var i = 0; i < cuantos; i++) {
    var comp1 = Math.floor(Math.random() * 255);
    var comp2 = Math.floor(Math.random() * 255);
    var comp3 = Math.floor(Math.random() * 255);
    arreglo.push('rgb(' + comp1 + ',' + comp2 + ',' + comp3 + ')')
  }
  return (arreglo)
};

var patrono = creaColores(50);

(function (document, $, wordfind) {


  'use strict';

  /**
   * An example game using the puzzles created from wordfind.js. Click and drag
   * to highlight words.
   *
   * WordFindGame requires wordfind.js and jQuery.
   */

  /**
   * Initializes the WordFindGame object.
   *
   * @api private
   */
  var WordFindGame = function () {
    // List of words for this game
    var wordList = [];
    var parrlist = [];

    /**
     * Draws the puzzle by inserting rows of buttons into el.
     *
     * @param {String} el: The jQuery element to write the puzzle to
     * @param {[[String]]} puzzle: The puzzle to draw
     */
    var drawPuzzle = function (el, puzzle) {

      var output = '';
      // for each row in the puzzle
      for (var i = 0, height = puzzle.length; i < height; i++) {
        // append a div to represent a row in the puzzle
        var row = puzzle[i];
        output += '<div>';
        // for each element in that row
        for (var j = 0, width = row.length; j < width; j++) {
          output += '<button class="puzzleSquare" x="' + j + '" y="' + i + '">';
          output += row[j] || '&nbsp;';
          output += '</button>';
        }
        // close our div that represents a row
        output += '</div>';
      }

      $(el).html(output);
    };

    /**
     * Draws the words by inserting an unordered list into el.
     *
     * @param {String} el: The jQuery element to write the words to
     * @param {[String]} words: The words to draw
     */

    var drawWords = function (el, words) {
      // patrono = patrono.sort(function() {return Math.random() - 0.5});
      var output = '<ul>';
      for (var i = 0, len = words.length; i < len; i++) {
        if (esParrafo == true) {
          var word = words[i];
          var debugWords = words[i].sup();
          var oracion = parrlist[i];
          var contenido = "";
          for (var m = 0; m < oracion.length; m++) {
            if (m == 0) {
              contenido += "" + (i + 1) + ". ";
            }
            if (oracion.charAt(m) == "@") {
              if (debug) {
                $("#mododebug").show();
                contenido += '<span data-resp="' + word + '" class="word ' + word +
                  ' ocultar normal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
                  debugWords;
              } else
                contenido += '<span data-resp="' + word + '" class="word ' + word +
                ' ocultar normal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
            } else {
              contenido += oracion.charAt(m);
            }
          } //for oracion
          if (verLongitud) {
            txt = "&nbsp;<sup>" + oracion.length + "</sup>";
            output += '<li>' + contenido + txt;
          } else {
            output += '<li id="' + word + '">' + contenido;
          }


        } else { //cuando solo son palabras
          var word = words[i];
          output += '<li id="' + word + '" class="word ' + word + '">' + (i + 1) + '. ' + word + "</li>";
          if (verLongitud) {
            txt = "&nbsp;<sup>" + word.length + "</sup>";
            output += txt;
          }
        }
      } //for words.length
      output += '</ul>';
      $(el).html(output);
      bodyOriginal = document.body.innerHTML;
    };

    /**
     * Game play events.
     *
     * The following events handle the turns, word selection, word finding, and
     * game end.
     *
     */

    // Game state
    var startSquare, selectedSquares = [],
      curOrientation, curWord = '';

    /**
     * Event that handles mouse down on a new square. Initializes the game state
     * to the letter that was selected.
     *
     */
    var startTurn = function () {
      $(this).addClass('selected');
      startSquare = this;
      selectedSquares.push(this);
      curWord = $(this).text();
    };



    /**
     * Event that handles mouse over on a new square. Ensures that the new square
     * is adjacent to the previous square and the new square is along the path
     * of an actual word.
     *
     */
    var select = function (target) {
      // if the user hasn't started a word yet, just return
      if (!startSquare) {
        return;
      }

      // if the new square is actually the previous square, just return
      var lastSquare = selectedSquares[selectedSquares.length - 1];
      if (lastSquare == target) {
        return;
      }

      // see if the user backed up and correct the selectedSquares state if
      // they did
      var backTo;
      for (var i = 0, len = selectedSquares.length; i < len; i++) {
        if (selectedSquares[i] == target) {
          backTo = i + 1;
          break;
        }
      }

      while (backTo < selectedSquares.length) {
        $(selectedSquares[selectedSquares.length - 1]).removeClass('selected');
        selectedSquares.splice(backTo, 1);
        curWord = curWord.substr(0, curWord.length - 1);
      }


      // see if this is just a new orientation from the first square
      // this is needed to make selecting diagonal words easier
      var newOrientation = calcOrientation(
        $(startSquare).attr('x') - 0,
        $(startSquare).attr('y') - 0,
        $(target).attr('x') - 0,
        $(target).attr('y') - 0
      );

      if (newOrientation) {
        selectedSquares = [startSquare];
        curWord = $(startSquare).text();
        if (lastSquare !== startSquare) {
          $(lastSquare).removeClass('selected');
          lastSquare = startSquare;
        }
        curOrientation = newOrientation;
      }

      // see if the move is along the same orientation as the last move
      var orientation = calcOrientation(
        $(lastSquare).attr('x') - 0,
        $(lastSquare).attr('y') - 0,
        $(target).attr('x') - 0,
        $(target).attr('y') - 0
      );

      // if the new square isn't along a valid orientation, just ignore it.
      // this makes selecting diagonal words less frustrating
      if (!orientation) {
        return;
      }

      // finally, if there was no previous orientation or this move is along
      // the same orientation as the last move then play the move
      if (!curOrientation || curOrientation === orientation) {
        curOrientation = orientation;
        playTurn(target);
      }

    };

    var touchMove = function (e) {
      var xPos = e.originalEvent.touches[0].pageX;
      var yPos = e.originalEvent.touches[0].pageY;
      var targetElement = document.elementFromPoint(xPos, yPos);
      select(targetElement)
    };

    var mouseMove = function () {
      select(this);
    };

    /**
     * Updates the game state when the previous selection was valid.
     *
     * @param {el} square: The jQuery element that was played
     */
    var playTurn = function (square) {
      // make sure we are still forming a valid word
      for (var i = 0, len = wordList.length; i < len; i++) {
        if (wordList[i].indexOf(curWord + $(square).text()) === 0) {
          // console.log("CurdWord " + curWord)
          // console.log("wordList " + wordList)
          $(square).addClass('selected');
          selectedSquares.push(square);
          curWord += $(square).text();
          break;
        } //if
      }
    };

    /**
     * Event that handles mouse up on a square. Checks to see if a valid word
     * was created and updates the class of the letters and word if it was. Then
     * resets the game state to start a new word.
     *
     */
    
    var endTurn = function () {

      // see if we formed a valid word
      for (var i = 0, len = wordList.length; i < len; i++) {


        if (wordList[i] === curWord) {

          aciertos++;
          $('.selected').addClass('found');
          //colores aleatorios que se le agregan a las palabras
          $('.selected').css("background-color", patrono[inc])
          console.log(wordList.length);
          retroBien = words[i][2];

          var retroBienT = '<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + retroBien + '">' + palomita + '</span>'
          // wordList.splice(i, 1);
          //se agregan las clases para mostrar la palabra
          $('#' + curWord).prepend(retroBienT);
          $('.' + curWord).addClass('wordFound');
          var dato = $('.' + curWord).attr("data-resp");
          $('.' + curWord).html(dato);

          $('.' + curWord).css("color", patrono[inc])
          $('.' + curWord).removeClass("normal");
          $('[data-toggle="tooltip"]').each(function () {
            var options = {
              html: true
            };

            if ($(this)[0].hasAttribute('data-type')) {
              options['template'] =
                '<div class="tooltip ' + $(this).attr('data-type') + '" role="tooltip">' +
                ' <div class="tooltip-arrow"></div>' +
                ' <div class="tooltip-inner"></div>' +
                '</div>';
            }
            $(this).tooltip(options);
          });
          inc++;
        } //if wordlist

        var mensaje = "";
        for (var j = 0; j < retroCal.length; j++) {
          console.log(aciertos);

          if (aciertos >= retroCal[j].LimInf && aciertos <= retroCal[j].LimSup) {
            mensaje = retroCal[j].Mensaje;
          }
        }
        var tempSeg = seg-seconds
        //se revisa si estan todas encontradas
        if (inc == words.length) {
          var final = words.length;
          $('.puzzleSquare').addClass('complete');

          if (tempo) {
            if ((tiempo) >= 60) { //Cuando el tiempo es mayor a un minuto se ocupa el siguiente formato de salida
              d = Number(temporal - seconds);
              var m = Math.floor(d % 3600 / 60);
              var s = Math.floor(d % 3600 % 60);
              var mDisplay = m > 0 ? m + (m == 1 ? " minutos " : " minutos, ") : "";
              var sDisplay = s > 0 ? s + (s == 1 ? " segundos" : " segundos") : "";

              swal({
                title: "Resultado\n",
                text: "Obtuviste " + aciertos + "/" + final + " respuestas correctas en " + mDisplay + sDisplay + ".\n" + mensaje,
                confirmButtonText: "Aceptar",
                button: "Aceptar",
              });
              clearInterval(countdownTimer);
            } else {
              swal({
                title: "Resultado\n",
                text: "Obtuviste " + aciertos + "/" + final + " respuestas correctas en " + tempSeg + " segundos" + ".\n" + mensaje,
                confirmButtonText: "Aceptar",
                button: "Aceptar",
              });
            } //else tiempo
            clearInterval(countdownTimer);
            $("#countdown").remove();
            $("#again").show();
            $("#solve").hide();
          } else {
            swal({
              title: "Resultado",
              text: "Obtuviste " + aciertos + "/" + final + " respuestas correctas.\n" + mensaje,
              confirmButtonText: "Aceptar",
              button: "Aceptar",
            });
          }
        }
        // location.reload();

      }
      guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, aciertos, final);
      // reset the turn
      $('.selected').removeClass('selected');
      startSquare = null;
      selectedSquares = [];
      curWord = '';
      curOrientation = null;
    };

    /**
     * Given two points, ensure that they are adjacent and determine what
     * orientation the second point is relative to the first
     *
     * @param {int} x1: The x coordinate of the first point
     * @param {int} y1: The y coordinate of the first point
     * @param {int} x2: The x coordinate of the second point
     * @param {int} y2: The y coordinate of the second point
     */
    var calcOrientation = function (x1, y1, x2, y2) {

      for (var orientation in wordfind.orientations) {
        var nextFn = wordfind.orientations[orientation];
        var nextPos = nextFn(x1, y1, 1);

        if (nextPos.x === x2 && nextPos.y === y2) {
          return orientation;
        }
      }

      return null;
    };

    return {

      /**
       * Creates a new word find game and draws the board and words.
       *
       * Returns the puzzle that was created.
       *
       * @param {[String]} words: The words to add to the puzzle
       * @param {String} puzzleEl: Selector to use when inserting the puzzle
       * @param {String} wordsEl: Selector to use when inserting the word list
       * @param {Options} options: WordFind options to use when creating the puzzle
       */
      create: function (words, puzzleEl, wordsEl, options) {

        if (words.length >= 41) {
          words.splice(40, 1);
        }

        for (var p = 0; p < words.length; p++) {
          if (words[p][1].length > 18) {
            words[p][1] = words[p][1].substring(0, 18);
          }
          // se chequea el regex de que el string no tenga espacio
          words[p][1] = words[p][1].replace(/\s/g, "\u00a0");
        }

        for (var i = 0; i < words.length; i++) {
          wordList.push(words[i][1]);
        }

        for (var j = 0; j < words.length; j++) {
          parrlist.push(words[j][0]);
        }

        console.log(wordList);
        var puzzle = wordfind.newPuzzle(words, options);

        // draw out all of the words
        drawPuzzle(puzzleEl, puzzle);
        drawWords(wordsEl, wordList);

        // attach events to the buttons
        // optimistically add events for windows 8 touch
        if (window.navigator.msPointerEnabled) {
          $('.puzzleSquare').on('MSPointerDown', startTurn);
          $('.puzzleSquare').on('MSPointerOver', select);
          $('.puzzleSquare').on('MSPointerUp', endTurn);
        } else {
          $('.puzzleSquare').mousedown(startTurn);
          $('.puzzleSquare').mouseenter(mouseMove);
          $('.puzzleSquare').mouseup(endTurn);
          $('.puzzleSquare').on("touchstart", startTurn);
          $('.puzzleSquare').on("touchmove", touchMove);
          $('.puzzleSquare').on("touchend", endTurn);
        }

        return puzzle;
      },

      /**
       * Solves an existing puzzle.
       *
       * @param {[[String]]} puzzle: The puzzle to solve
       * @param {[String]} words: The words to solve for
       */
      solve: function (puzzle, words) {
        //iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);

        var solution = wordfind.solve(puzzle, words).found;

        for (var i = 0, len = solution.length; i < len; i++) {
          var word = solution[i].word,
            orientation = solution[i].orientation,
            x = solution[i].x,
            y = solution[i].y,
            next = wordfind.orientations[orientation];
          // retroMal = words[i][3]
          if (!$('.' + word).hasClass('wordFound')) {
            for (var j = 0, size = word.length; j < size; j++) {
              var nextPos = next(x, y, j);
              $('[x="' + nextPos.x + '"][y="' + nextPos.y + '"]').addClass('solved');
            }
            retroMal = words[i][3]
            retroMalT = '<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + retroMal + '">' + tache + '</span>'
            $('.' + word).addClass('wordFound');
            $('#' + word).prepend(retroMalT);
          }
        }

        var subraya = document.getElementsByClassName("normal");

        for (var m = 0; m < subraya.length; m++) {
          $(subraya[m]).addClass("subraya");

          var contenidopalabra = $(subraya[m]).attr("data-resp");
          retroMal = words[m][3]
          retroMalT = '<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + retroMal + '">' + tache + '</span>'
          $(subraya[m]).html(contenidopalabra);
        }

        var final = words.length;
        var mensaje = "";
        for (var j = 0; j < retroCal.length; j++) {
          console.log(aciertos);

          if (aciertos >= retroCal[j].LimInf && aciertos <= retroCal[j].LimSup) {
            mensaje = retroCal[j].Mensaje;
          }
        }

        //SWAL ver respuestas
        swal({
          title: "Resultado\n",
          text: "Obtuviste " + aciertos + "/" + final + " respuestas correctas.\n" + mensaje,
          confirmButtonText: "Aceptar",
          button: "Aceptar",
        });
        clearInterval(countdownTimer);
      }
    };
  };


  /**
   * Allow game to be used within the browser
   */
  window.wordfindgame = WordFindGame();

}(document, jQuery, wordfind));