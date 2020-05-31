/*
-RAAR 03/04/2018, Agrego retro para cada arroba
-RAAR 14/05/2018, Agrego insertado de imagenes en respuestas....

Q: indicar con una arroba la casilla droppable, debe tener por lo menos un caracter aparte por lo menos un guin "-"
A: poner un texto o la direccion de la imagen, si el sistema detecta imagen la pone, si no, lo pone como texto...
A: si se requiere una casilla en Q: para texto, o sea sin arroba, se debe rellenar con "" el espacio correspondiente en A:, ya se valida que no se desplieguen blancos...
*/

var reactivos = [
	{Q: ["Casos u objetivos logrados previo estudio independiente y clases","Conocimiento logrado de acuerdo con los contenidos declarativo, procedimental o actitudinal", "¿Qué se logrará? (verbo de la taxonomía de Bloom o Marzano)","Contextos diseñados para la adquisición del aprendizaje","Indicadores del logro El alumno:"],  //El primero se puede usar como encabezado, pero es funcional para incluir arrobas....
	 A: [],   	   
	 FA: [],     //retro por arroba
	 F: [
	 "retro 1 ",														//Retro bien
	 "retro 2 "														//Retro mal
		]}
 	,
	{Q: ["Un alumno de tercer año identifica algunos trastornos psiquiátricos al observar en consulta externa el interrogatorio y la exploración física realizada por el médico responsable en el consultorio.","@", "@", "@", "@"], 
	 A: ["","Identifica algunos  trastornos psiquiátricos.","Identificar.", "Práctica de observación en consulta externa con interrogatorio y exploración física.","Diferencia la expresión corporal de los trastornos psiquiátricos."],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
	 FA: [["buena1","mala1"],["buena2","mala2"],["buena3","mala3"]],     //retro por arroba		  
	 F: [
	 " ",
	 " "
		]}
	 ,		
	{Q: ["Un alumno de cuarto año emplea la búsqueda de información en fuentes confiables para fundamentar el diagnóstico de algunos pacientes durante la sesión clínica mensual.","@", "@", "@", "@"], 
	 A: ["","Emplea adecuadamente la búsqueda de información en fuentes confiables para fundamentar el diagnóstico de pacientes.", "Emplear.", "Diagnóstico a pacientes y sesión clínica mensual.","Define la pregunta y selecciona conceptos para que la búsqueda sea eficiente."], 
	 FA: [["buena6","mala6"],["buena7","mala7"],["buena8","mala8"],["buena9","mala9"],["buena10","mala10"]],     //retro por arroba			  
	 F: [
	 " ",
	 " "
		]}
	,
	{
		Q: ["Un alumno de primer año y sus compañeros de equipo aplican los indicadores de la guía de salud para conformar un reporte, después de realizar una observación del ambiente socioeconómico y cultural de la población objetivo. ", "@", "@", "@", "@"],
		A: ["","Aplicación de los indicadores de la guía de salud, mediante la observación del ambiente socioeconómico y cultural.", "Aplicar.", "Práctica de campo con observación de entorno social.","Identifica y sabe obtener datos definidos de acuerdo con los indicadores de salud."],
		FA: [["buena6", "mala6"], ["buena7", "mala7"], ["buena8", "mala8"], ["buena9", "mala9"], ["buena10", "mala10"]],     //retro por arroba			  
		F: [
			" ",
			" "
		]
	}		  
];

/*
var reactivos = [
	{Q: ["Imperativo", "Declarativo", "Funcional", "Orientado a objetos"],  //El primero se puede usar como encabezado, pero es funcional para incluir arrobas....
	 A: [],   	   
	 FA: [],     //retro por arroba
	 F: [
	 "retro 1 ",														//Retro bien
	 "retro 2 "														//Retro mal
		]}
 ,
 {Q: ["@", "@", "@", "@"], 
 A: ["C|COBOL|FORTRAN|Pascal|Perl", "Maude|Prolog|SQL", "Miranda|Lisp|Scheme", "Simula|Smalltalk|C++|Java|C#"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
 FA: [["buena1","mala1"],["buena2","mala2"],["buena3","mala3"],["buena4","mala4"]],     //retro por arroba		  
 F: [
 " ",
 " "
	]}
,		
{Q: ["@", "@", "@", "@"], 
A: ["C|COBOL|FORTRAN|Pascal|Perl","Maude|Prolog|SQL","Miranda|Lisp|Scheme","Simula|Smalltalk|C++|Java|C#"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
FA: [["buena6","mala6"],["buena7","mala7"],["buena8","mala8"],["buena9","mala9"]],     //retro por arroba			  
 F: [
 " ",
 " "
	]},
	{Q: ["@", "@", "@", "@"], 
	A: ["C|COBOL|FORTRAN|Pascal|Perl","Maude|Prolog|SQL","Miranda|Lisp|Scheme","Simula|Smalltalk|C++|Java|C#"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
	FA: [["buena1","mala1"],["buena2","mala2"],["buena3","mala3"],["buena4","mala4"]],     //retro por arroba		  
	F: [
	" ",
	" "
	   ]}
,		
{Q: ["@", "@", "@", "@"], 
A: ["C|COBOL|FORTRAN|Pascal|Perl","Maude|Prolog|SQL","Miranda|Lisp|Scheme","Simula|Smalltalk|C++|Java|C#"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
FA: [["buena1","mala1"],["buena2","mala2"],["buena3","mala3"],["buena4","mala4"]],     //retro por arroba		  
	 F: [
	 " ",
	 " "
		]}
 ,		
 {Q: ["@", "@", "@", "@"], 
	A: ["C|COBOL|FORTRAN|Pascal|Perl","Maude|Prolog|SQL","Miranda|Lisp|Scheme","Simula|Smalltalk|C++|Java|C#"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
	FA: [["buena6","mala6"],["buena7","mala7"],["buena8","mala8"],["buena9","mala9"]],     //retro por arroba			  
	 F: [
	 " ",
	 " "
		]},
			  
];
*/

/*
// RAAR Sep 3,18: Va a ser caso ejemplo..
var reactivos = [
		 {Q: ["GRUPO","EQUIPO"],  //El primero se puede usar como encabezado, pero es funcional para incluir arrobas....
		  A: [],   	   
		  FA: [],     //retro por arroba
		  F: [
			"retro 1 ",														//Retro bien
			"retro 2 "														//Retro mal
		   ]}
		,
		 {Q: ["-@","Metas claras"], 
		  A: ["Objetivos difusos|respuesta2"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [],     //retro por arroba		  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["Trabajo y responsabilidad individuales","-@"], 
		  A: ["Responsabilidad compartida"],
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["-@","Actividades conjuntas"], 
		  A: ["Actividades individuales"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["Resultados individuales","-@"], 
		  A: ["Resultados colectivos"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["-@","Liderazgos referenciales compartidos"], 
		  A: ["Decisiones de jefaturas. Líderes formales"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,		
		 {Q: ["Sin empoderamiento (no se otorga poder al grupo)","@-"], 
		  A: ["Con empoderamiento (la organización otorga poder a los equipos)"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		
		 {Q: ["-@","Se miden y evalúan los resultados obtenidos"], 
		  A: ["No se miden los resultados del grupo"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		
		 {Q: ["Sin premios por los resultados obtenidos","-@"], 
		  A: ["Con premios por los resultados obtenidos"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,		
		 {Q: ["-@","Se toman decisiones en conjunto"], 
		  A: ["No se toman decisiones en conjunto"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,		
		 {Q: ["Las normas y la cultura no tienen relación con la tarea","-@"], 
		  A: ["Las normas y la cultura están relacionadas con los objetivos de la tarea"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}		  
];
*/

