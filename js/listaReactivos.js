/*
------------------------Guía de listaReactivos--------------------
Si necesito que sea un parrafo y se debe encontrar la palabra, seguir la siguiente estructura
IMPORTANTE debe estar activada la bandera en configRecurso; es decir esParrafo = true;
var words = [
  ["parrafo",
  "palabra a encontrar",
  "Retroalimentación correcta .", "Retroalimentación incorrecta ."]
];

IMPORTANTE debe estar desactivada la bandera en configRecurso; es decir esParrafo = false;
Si solo quiero que sean Palabras
var words = [
  ["","palabra a encontrar",
  "Retroalimentación correcta .", "Retroalimentación incorrecta ."]
];
*/



var words = [
  ["Sólo se considerarán como @ aquellas que hayan sido desahogadas en la audiencia de juicio.",
  "pruebas",
  "Retroalimentación correcta 1.", 
  "Retroalimentación incorrecta 1."]
  ,
  ["El @ proceso es una garantía procesal que debe estar presente en toda clase de procesos, no sólo en aquellos de orden penal, sino de tipo civil, administrativo o de cualquier otro.",
  "debido",
  "Retroalimentación correcta 2.", 
  "Retroalimentación incorrecta 2."]
  ,
  ["El @ penal tiene por objeto el esclarecimiento de los hechos, proteger al inocente, procurar que el culpable no quede impune y que los daños causados por el delito se reparen.",
  "proceso",
  "Retroalimentación correcta 3.", 
  "Retroalimentación incorrecta 3."]
  ,
  ["Para los efectos de la sentencia sólo se considerarán como prueba aquellas que hayan sido desahogadas en la audiencia de @.",
  "juicio",
  "Retroalimentación correcta 4.", 
  "Retroalimentación incorrecta 4."]
  ,
  ["La ley establecerá las excepciones y los requisitos para admitir en juicio la prueba anticipada, que por su naturaleza requiera desahogo @.",
  "previo",
  "Retroalimentación correcta 5.", 
  "Retroalimentación incorrecta 5."]
  ,
  ["El acusado debe ser juzgado antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor @ para su defensa.",
  "plazo",
  "Retroalimentación correcta 6.", 
  "Retroalimentación incorrecta 6."]
  ,
  ["La duda @ puede surgir en la mente del juez de manera casual, pero también se puede generar por medio de una estrategia del defensor perfectamente planeada.",
  "razonable",
  "Retroalimentación correcta 7.", 
  "Retroalimentación incorrecta 7."]
  ,
  ["La defensa es un derecho fundamental e @ que asiste a todo imputado.",
  "irrenunciable",
  "Retroalimentación correcta 8.", 
  "Retroalimentación incorrecta 8."]
  ,
  ["El derecho a la presunción de @ debe estar presente en todas las fases del proceso penal y en todas las instancias del mismo.",
  "inocencia",
  "Retroalimentación correcta 9.", 
  "Retroalimentación incorrecta 9."]
  ,
  ["Se denomina prueba a todo conocimiento cierto o probable sobre un hecho, que ingresando al proceso como medio de prueba en una audiencia y desahogada bajo los principios de inmediación y @.",
  "contradicción",
  "Retroalimentación correcta 10.", 
  "Retroalimentación incorrecta 10."]
];