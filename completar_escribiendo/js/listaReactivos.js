/* 
___________________Ayuda___________________
Permitir más de una respuesta correcta por casilla, indicarlo con barra vertical (pipe) |
Cada arroba @ indica la casilla de la respuesta
	Q: 'Se conoce como @ a la persona que @ ',
		A: ["respuesta1A|respuesta2A", "respuesta2B|respuesta2B"],

NOTA: Las respuestas serán tomadas de forma correcta o incorrecta DEPENDIENDO DE COMO SE ESCRIBA en la listaReactivos
Q: 'Se conoce como @ a la persona que @ ',
		A: ["Asegurado", "contratacion"],
Es decir la palabra "Asegurado" para que se tome de forma CORRECTA 
deberá ser escrita la primera letra en mayúscula y las demás en minúsculas.
La palabra "contratacion" será correcta SIN acento, si se llega a escribir con acento será incorrecta.
*/
var reactivos = [{
		Q: 'Se conoce como @ a la persona que @ la cobertura del seguro y cumple con los requisitos establecidos por la compañía @.',
		A: ["asegurado", "contratación", "aseguradora"],
		FA: [{
				correcta: "respuesta correcta 1A",
				incorrecta: "respuesta incorrecta 1A"
			},
			{
				correcta: "respuesta correcta 1B",
				incorrecta: "respuesta incorrecta 1B"
			},
			{
				correcta: "respuesta correcta 1C",
				incorrecta: "respuesta incorrecta 1C"
			}
		],
		F: [
			"Buen trabajo, has reafirmado tu aprendizaje.",
			"Medita con cuidado tu respuesta."
		]
	},
	{
		Q: 'En BANORTE se manejan dos tipos de cobertura; en la cobertura @ se considera al @ y coacreditado. Este seguro contempla: Fallecimiento, invalidez permanente y total, daños a inmueble y contenidos.',
		A: ["básica", "titular"],
		FA: [{
				correcta: "respuesta correcta 2A",
				incorrecta: "respuesta incorrecta 2A"
			},
			{
				correcta: "respuesta correcta 2B",
				incorrecta: "respuesta incorrecta 2B"
			}
		],
		F: [
			"Ese fue un buen trabajo, tu aprendizaje va bien.",
			"Piensa bien tu respuesta."
		]
	},
	{
		Q: 'En la cobertura @ se incluyen dos coberturas adicionales dirigidas a @ que participen o no aportando @.',
		A: ["amplia", "mujeres", "ingresos"],
		FA: [{
				correcta: "respuesta correcta 3A",
				incorrecta: "respuesta incorrecta 3A"
			},
			{
				correcta: "respuesta correcta 3B",
				incorrecta: "respuesta incorrecta 3B"
			},
			{
				correcta: "respuesta correcta 3C",
				incorrecta: "respuesta incorrecta 3C"
			}
		],
		F: [
			"Lo has hecho bien.",
			"Piensa bien tu respuesta."
		]
	},
	{
		Q: 'BANORTE ofrece además el seguro de @, el cual tiene los siguientes beneficios: asistencia en el hogar, @ de objetos personales, protección ante @ y responsabilidad @.',
		A: ["daños", "robo", "fenómenos de la naturaleza", "civil familiar"],
		FA: [{
				correcta: "respuesta correcta 4A",
				incorrecta: "respuesta incorrecta 4A"
			},
			{
				correcta: "respuesta correcta 4B",
				incorrecta: "respuesta incorrecta 4B"
			},
			{
				correcta: "respuesta correcta 4C",
				incorrecta: "respuesta incorrecta 4C"
			},
			{
				correcta: "respuesta correcta 4D",
				incorrecta: "respuesta incorrecta 4D"
			}
		],
		F: [
			"Excelente trabajo.",
			"Piensa bien tu respuesta."
		]
	},
	{
		Q: 'De igual forma los clientes pueden gozar de un seguro de @ siempre y cuando demuestren ser @ activos de una empresa mínimo @, tener más de @ y menos de @ y que la empresa cuente con @ (excepto cuando se labore dentro de @)',
		A: ["desempleo", "empleados|trabajadores", "2 años|24 meses|dos años", "21 años", "60 años", "RFC", "gobierno"],
		FA: [{
				correcta: "respuesta correcta 5A",
				incorrecta: "respuesta incorrecta 5A"
			},
			{
				correcta: "respuesta correcta 5B",
				incorrecta: "respuesta incorrecta 5B"
			},
			{
				correcta: "respuesta correcta 5C",
				incorrecta: "respuesta incorrecta 5C"
			},
			{
				correcta: "respuesta correcta 5D",
				incorrecta: "respuesta incorrecta 5D"
			},
			{
				correcta: "respuesta correcta 5E",
				incorrecta: "respuesta incorrecta 5E"
			},
			{
				correcta: "respuesta correcta 5F",
				incorrecta: "respuesta incorrecta 5F"
			},
			{
				correcta: "respuesta correcta 5G",
				incorrecta: "respuesta incorrecta 5G"
			}
		],
		F: [
			"Ese fue un buen trabajo, tu aprendizaje va bien.",
			"Medita con cuidado lo que vas a responder."
		]
	}
];