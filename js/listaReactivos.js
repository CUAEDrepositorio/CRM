/*
-RAAR 03/04/2018, Agrego retro para cada arroba
FA: {correcta:"respuesta correcta",incorrecta:"respuesta incorrecta"} Una por arroba....
A: Para q una casilla permita mas de una respuesta correcta indicarlas dividiendolas con un barra vertical (pipe), |, 
A: ejem... ["respuesta casilla A","respuesta 1 casilla B|respuesta 2 casilla B","multimedia/img01.png" ],  
*/
var reactivos = [
	{
		Q: "En una institución pública la gestión del archivo está regulada por @",
		A: ["Ley <sup>General</sup> de <em>Archivos</em>"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING  
		FA: [//retro por arroba
			{ correcta: "A correcta", incorrecta: "A incorrecta"},
			{ correcta: "B correcta", incorrecta: "B incorrecta"}
		],     //retro por arroba
		F: [ //retro por pregunta
			"Toda institución perteneciente a la Administración pública está regulada por la Ley General de Archivos (DOF 15 de junio de 2018. entrada en vigor 15 de junio de 2019)",														//Retro bien
			"Recuerda que todas las instituciones de gobierno federal, estatales, municipales pertenecientes a la Administración Pública son sujetos obligados por la Ley General de Archivos"														//Retro mal
		]
	}
	,
	{
		Q: "Todo archivo de la Administración Pública debe publicar en el portal de transparencia institucional su @",
		A: ["Catálogo de Disposición Documental"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		FA: [
			{ correcta: "CC1", incorrecta: "DD1"},
			{ correcta: "CC2", incorrecta: "DD2"}
		],     //retro por arroba
		F: [
			"El Catálogo de Disposición Documental deberá subirse al portal de transparencia de la institución, de acuerdo a lo dispuesto en la Ley General de Transparencia y Acceso a la Información, ya que en ese catálogo la ciudadanía puede tener una clara idea de los tiempos en que se conserva la información y el acceso a ella.",														//Retro bien
			"Recuerda que, de acuerdo a lo dispuesto en la Ley General de Transparencia y Acceso a la Información, toda institución pública debe subir a su página web un formato con información para que la ciudadanía pueda tener una clara idea de los tiempos en que se conserva la información y el acceso a ella."														//Retro mal
		]
	}
	,
	{
		Q: "La Administración de archivos persigue el @",
		A: ["funcionamiento óptimo de los mismos"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		FA: [
			{ correcta: "EE", incorrecta: "FF"}
		],     //retro por arroba
		F: [
			"La Administración de archivos se basa en varios elementos esenciales: un sistema de archivos y una legislación de archivos, apoyados ambos en presupuestos económicos y en personal suficiente, con cierta formación especializada. Su correcta planeación dará por resultado un funcionamiento óptimo de la entidad archivística",														//Retro bien
			"Recuerda que en esta Unidad de aprendizaje se vio que La administración de archivos persigue el funcionamiento óptimo de los mismos, y se basa en varios elementos esenciales: un sistema de archivos y una legislación de archivos, apoyados ambos en presupuestos económicos y en personal suficiente, con cierta formación especializada, los cuales se agrupan en un Sistema de gestión archivística"														//Retro mal
		]
	}
	,
	{
		Q: "Es un sistema que comprende una legislación sobre los archivos, normativas internas, personal capacitado, instalaciones adecuadas y los acervos. @",
		A: ["Gestión archivística"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		FA: [
			{ correcta: "GG", incorrecta: "HH"}
		],     //retro por arroba
		F: [
			"la gestión de archivos se enfocará al cuidado, conservación y puesta en servicio de la información contenida en los archivos para lo cual es necesario contar con el acervo, la normativa, personal capacitado, instalaciones adecuadas.",														//Retro bien
			"Recuerda que se enfocará al cuidado, conservación y puesta en servicio de la información contenida en los archivos para lo cual es necesario contar con el acervo, la normativa, personal capacitado, instalaciones adecuadas."														//Retro mal
		]
	}
	,
	{
		Q: "Un archivo debe brindar servicio de información a la ciudadanía de acuerdo a lo dispuesto en la Ley de Transparencia, para ello debe contar con un @",
		A: ["Área de servicio al público"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		FA: [
			{ correcta: "II", incorrecta: "JJ"}
		],     //retro por arroba
		F: [
			"El área de servicio al público es el espacio en que la ciudadanía tiene para solicitar información específica sobre las entidades públicas, además de aquella que de acuerdo a lo dispuesto en la Ley de Transparencia, deberá subirse al portal de transparencia institucional.",														//Retro bien
			"Recuerda que además de la información en este medio de la página web institucional, toda institución archivística debe tener un área o personal encargado de dar respuesta a las solicitudes de información de la ciudadanía."														//Retro mal
		]
	}
	,
	{
		Q: "La planeación de las instalaciones de un archivo son fundamentales para @",
		A: ["la buena operatividad de un archivo"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		FA: [
			{ correcta: "KK", incorrecta: "LL"}
		],     //retro por arroba
		F: [
			"Un espacio adecuado para la guarda, para los procesos técnicos, contar con áreas de servicio al público, con talleres de conservación, reprografía, todo de acuerdo a las dimensiones del acervo que se custodia, serán clave para la buena operatividad del archivo.",														//Retro bien
			"Recuerda que contar con los espacios necesarios para la guarda del archivo, así como para todas las tareas que implica ponerlo al servicio de la institución y del público, implica contar con las condiciones físicas y los espacios necesarios para las diferentes tareas que conlleva la correcta administración del archivo."														//Retro mal
		]
	}
	,
	{
		Q: "Son las tareas que desarrolla un archivista en el área de organización y descripción @",
		A: ["Elaboración del cuadro de clasificación, la clasificación, descripción e instalación."],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		FA: [
			{ correcta: "MM", incorrecta: "NN"}
		],     //retro por arroba
		F: [
			"El área de organización y descripción de un archivo es la encargada del procesamiento de los fondos documentales, desde la recepción, la construcción del Cuadro General de Descripción Archivística, el Catálogo de Disposición Documental, la clasificación, el ordenamiento, la elaboración de inventarios y de la Guía Simple, tal como los dispone la Ley General de Archivos.",														//Retro bien
			"Recuerda que esta área es la encargada del procesamiento de varios procesos que son regulados por la ley general de archivos."														//Retro mal
		]
	}
	,
	{
		Q: "El cuidado de las condiciones físicas de los acervos que integran un archivo son responsabilidad del profesional @",
		A: ["Conservador y restaurador"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		FA: [
			{ correcta: "OO", incorrecta: "PP"}
		],     //retro por arroba
		F: [
			"Los conservadores son los encargados de la preservación del patrimonio documental a través de la implementación de medidas de conservación preventiva, capacitación e intervención de los bienes deteriorados, con la finalidad de revalorarlos y devolverles su uso y función.",														//Retro bien
			"Recuerda que existen profesionales encargados de funciones específicas que tienen que ver con la preservación y funcionamiento de los archivos."														//Retro mal
		]
	}
];
// RAAR Sep 3, 18:Va a ser ejemplo general...
/*

var reactivos = [
	{Q:"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...@", 
	 A: ["img/mapa.jpg","ad ephesios"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
	 FA: [//retro por arroba
		 		{correcta:"¡Muy bien! Efectivamente, el método Cornell consiste en formar secciones que se redactan en diferentes momentos.",incorrecta:"Haz un esfuerzo por recordar el nombre de esta estrategia, contiene secciones que se elaboran en diferentes momentos."},
	 			{correcta:"<BR><strong>Descripción 1. </strong>Correcto: Para empezar, es importante contemplar el problema como una situación que puede resolverse. ",incorrecta:"Considera que la visión del<BR>problema se refiere a la manera <BR>en que lo percibes. ¿Es posible o imposible?"}
		 ],     //retro por arroba
	 F: [ //retro por pregunta
	 "¡Muy bien! Efectivamente, el método Cornell consiste en formar secciones que se redactan en diferentes momentos.",														//Retro bien
	 "Haz un esfuerzo por recordar el nombre de esta estrategia, contiene secciones que se elaboran en diferentes momentos."														//Retro mal
		]}
 ,
	{Q:"Qui equivocantur caballus quedo @", 
	 A: ["ipso facto","curriculum"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
	 FA: [		 
		 {correcta:"<strong>Paso 2. </strong>Correcto: Te acercas a la mitad del proceso. ",incorrecta:"Recuerda lo que debes hacer tras crear la visión del problema."},
		 {correcta:"<BR><strong>Descripción 2. </strong>Correcto: ¡Muy bien! Delimitar el <BR>problema es el siguiente paso.",incorrecta:"Ya piensas que el problema se puede resolver. ¿Qué debes hacer ahora?"}
		 ],     //retro por arroba
	 F: [
	 "¡Buena respuesta! Tomar apuntes tiene ventajas como: memorizar mejor, sintetizar, repasar, profundizar y comprender los conocimientos.",														//Retro bien
	 "Parece que tienes dudas sobre las ventajas de tomar apuntes."														//Retro mal
		]}
 ,
	{Q:"Magister dixit verita est @", 
	 A: ["carpe diem"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
	 FA: [ 
		 {correcta:"<strong>Paso 3. </strong>Correcto: ¡Bien! Llegaste a la mitad del proceso.",incorrecta:"Recuerda que es importante pensar en las vías de solución."},
		 {correcta:"<strong>Descripción 3. </strong>Correcto: Con un problema claro, puedes comenzar a generar opciones.",incorrecta:"Ahora que delimitaste el problema, ¿qué puedes generar?"}
		 ],     //retro por arroba
	 F: [
	 "¡Felicidades! Comprendiste muy bien las características de un mapa mental.",														//Retro bien
	 "Es recomendable que vuelvas a revisar las características del mapa mental."														//Retro mal
		]}
 ,
	{Q:"¿Quid est veritas @ ?" , 
	 A: ["habemus papam","img/mapa.jpg","carpe diem"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
	 FA: [
		 {correcta:"<strong>Paso 4. </strong>Correcto: El cuarto paso es la toma de decisiones.", incorrecta:"Recuerda lo que debes hacer tras generar opciones de solución."},
		 {correcta:"<strong>Descripción 4. </strong>Correcto: Es el momento de identificar ventajas y desventajas de cada opción.",incorrecta:"Considera que ya tienes una lista de opciones. ¿Qué podrías hacer para tomar una decisión?"}
		],     //retro por arroba
	 F: [
	 "¡Bien! Sin duda comprendiste qué son las supernotas.",														//Retro bien
	 "Mejorarás en tu siguiente intento. Recuerda que esta estrategia es similar a una historieta organizada para tomar apuntes."														//Retro mal
		]}
 ,

	{Q:"Quid pro quo @", 
	 A: ["a priori ","img/mapa.jpg","ad ephesios"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
	 FA: [
		 {correcta:"<strong>Paso 5. </strong>Correcto: ¡Bien! Este es el final del proceso.",  incorrecta:"¿Qué debes hacer cuando ya has implementado la solución a tu problema?"},
		 {correcta:"<BR><strong>Descripción 5. </strong>Correcto: ¡Excelente! El paso final consiste en evaluar tus resultados.",incorrecta:"Ya tienes un plan de acción. ¿Cómo puedes saber si te sirvió?"}
		 ],     //retro por arroba
	 F: [
	 "¡Felicidades! Si aplicas los consejos para tomar apuntes lograrás sin duda un aprendizaje significativo.",														//Retro bien
	 "No se trata de una estrategia particular. Es de sabios escuchar consejos y mejorar."														//Retro mal
		]}
		,
		{Q:"¿Quid est veritas @ ?" , 
		 A: ["habemus papam","img/mapa.jpg","carpe diem"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		 FA: [
			 {correcta:"<strong>Paso 4. </strong>Correcto: El cuarto paso es la toma de decisiones.", incorrecta:"Recuerda lo que debes hacer tras generar opciones de solución."},
			 {correcta:"<strong>Descripción 4. </strong>Correcto: Es el momento de identificar ventajas y desventajas de cada opción.",incorrecta:"Considera que ya tienes una lista de opciones. ¿Qué podrías hacer para tomar una decisión?"}
			],     //retro por arroba
		 F: [
		 "¡Bien! Sin duda comprendiste qué son las supernotas.",														//Retro bien
		 "Mejorarás en tu siguiente intento. Recuerda que esta estrategia es similar a una historieta organizada para tomar apuntes."														//Retro mal
			]}
	 ,
		{Q:"Quid pro quo @", 
		 A: ["a priori ","img/mapa.jpg","ad ephesios"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		 FA: [
			 {correcta:"<strong>Paso 5. </strong>Correcto: ¡Bien! Este es el final del proceso.",  incorrecta:"¿Qué debes hacer cuando ya has implementado la solución a tu problema?"},
			 {correcta:"<BR><strong>Descripción 5. </strong>Correcto: ¡Excelente! El paso final consiste en evaluar tus resultados.",incorrecta:"Ya tienes un plan de acción. ¿Cómo puedes saber si te sirvió?"}
			 ],     //retro por arroba
		 F: [
		 "¡Felicidades! Si aplicas los consejos para tomar apuntes lograrás sin duda un aprendizaje significativo.",														//Retro bien
		 "No se trata de una estrategia particular. Es de sabios escuchar consejos y mejorar."														//Retro mal
			]}
];

*/
