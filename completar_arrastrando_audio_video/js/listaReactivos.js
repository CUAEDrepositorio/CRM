/*
-RAAR 03/04/2018, Agrego retro para cada arroba
FA: ["retro arroba 1","retro arroba 2"] Para indicar retro para cada arroba.....
A: Para q una casilla permita mas de una respuesta correcta indicarlas dividiendolas con un barra vertical (pipe), |, 
A: ejem... ["respuesta casilla A","respuesta 1 casilla B|respuesta 2 casilla B","multimedia/img01.png" ],  
*/

var reactivos = [
		 {Q:"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...@", 
		  A: ["audio/6.mp3","audio/3.mp3"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [""],     //retro por arroba
		  F: [
			"Muy bien audio correcto",														//Retro bien
			"Mal audio mal"														//Retro mal
		   ]},
		   {Q:"Qui equivocantur caballus quedo @", 
		  A: ["audio/3.mp3"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [""],     //retro por arroba
		  F: [
			"Muy bien audio correcto",														//Retro bien
			"Mal audio mal"														//Retro mal
		   ]}

			 ,{Q:"Magister dixit verita est @", 
			 A: ["multimedia/introduccion.mp4"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
			 FA: [""],     //retro por arroba
			 F: [
			 "Muy bien video correcto",														//Retro bien
			 "Mal video incorrecto"														//Retro mal
				]},

				{Q:"¿Quid est veritas @ ?", 
				A: ["multimedia/caso_iguala02.mp4"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
				FA: [""],//retro por arroba
				F: [
				  "Muy bien. Los policías municipales, al haber lanzado gas lacrimógeno y granadas al interior del autobús, pusieron en riesgo la seguridad personal de los normalistas; lo cual constituye un derecho, también protegido por el <b>párrafo 9º del artículo 21 constitucional</b, que prevé que la actuación de las instituciones de seguridad pública se regirá por el respeto a los derechos humanos.",//Retro bien
				  "Recuerda que es importante identificar dónde se encuentran establecidos los derechos humanos a nivel nacional e internacional, para exigir su cumplimiento a las autoridades responsables. "//Retro mal
				 ]}
		  ,
			   {Q: "Quid pro quo @", 
				A: ["multimedia/caso_iguala03.mp4"], //Gustave Courbe
				FA: [""],//retro por arroba
				F: [
				  "Muy bien. Los policías sometieron a los normalistas a tratos degradantes, al agredirlos físicamente, esposarlos y lanzarlos contra el piso; esto a su vez contravino lo dispuesto en el <b>primer párrafo del artículo 22 constitucional</b>, que establece entre otros, la prohibición del tormento de cualquier especie, así como otras penas inusitadas y trascendentales. ",//Retro bien
				  "Recuerda que es importante identificar dónde se encuentran establecidos los derechos humanos a nivel nacional e internacional, para exigir su cumplimiento a las autoridades responsables. "//Retro mal
				 ]}

];


// Ejemplo, para ejemplificar capacidades

/*
var reactivos = [
		 {Q:"audio @", 
		  A: ["audio/6.mp3"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [""],     //retro por arroba
		  F: [
			"",														//Retro bien
			""														//Retro mal
		   ]}
			 ,{Q:"video @", 
			 A: ["multimedia/introduccion.mp4"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
			 FA: [""],     //retro por arroba
			 F: [
			 "",														//Retro bien
			 ""														//Retro mal
				]}	
];
*/