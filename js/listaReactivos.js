/*
****************************__ESTRUCTURA__****************************
var reactivos = [
	{
		Q: "reactivo @ reactivo @ reactivo.",
		A:["respuesta 1A|respuesta1B", "respuesta2A"]

		FA: [
			{
				correcta: "Retroalimentación por arroba correcta 1A",
				inincorrecta: "Retroalimentación por arroba incorrecta 1A",
			},
			{
				correcta: "Retroalimentación por arroba correcta 2A",
				inincorrecta: "Retroalimentación por arroba incorrecta 2A",
			}
		],
		F: [
			"Retroalimentación por reactivo 1 correcta",
			"Retroalimentación por reactivo 1 incorrecta"
		]    
	}
];

NOTA: los @ denotan la cantidad de respuestas que tendra el reactivo.
En el apartado de A cada par de corchetes cuadrados [] se escriben las respuestas de cada arroba separados por una coma.
Si se desea aceptar más de una respuesta por arroba colocar la barra vertical (pipe) |
*/


var reactivos = [{
		Q: 'Se conoce como @ a la persona que @ la cobertura del seguro y cumple con los requisitos establecidos por la compañía @.',
		A: ["asegurado", "asegura", "aseguradora"],
		FA: [{
				correcta: "Retroalimentación por arroba correcta 1A",
				incorrecta: "Retroalimentación por arroba incorrecta 1A"
			},
			{
				correcta: "Retroalimentación por arroba correcta 1B",
				incorrecta: "Retroalimentación por arroba incorrecta 1B"
			},
			{
				correcta: "Retroalimentación por arroba correcta 1C",
				incorrecta: "Retroalimentación por arroba incorrecta 1C"
			}
		],
		F: [
			"Retroalimentación por reactivo 1 correcta",
			"Retroalimentación por reactivo 1 incorrecta"
		]  
	},
	{
		Q: 'En BANORTE se manejan dos tipos de cobertura; en la cobertura @ se considera al @ y coacreditado. Este seguro contempla: Fallecimiento, invalidez permanente y total, daños a inmueble y contenidos.',
		A: ["básica", "titular"],
		FA: [{
				correcta: "Retroalimentación por arroba correcta 2A",
				incorrecta: "Retroalimentación por arroba incorrecta 2A"
			},
			{
				correcta: "Retroalimentación por arroba correcta 2B",
				incorrecta: "Retroalimentación por arroba incorrecta 2B"
			}
		],
		F: [
			"Retroalimentación por reactivo 2 correcta",
			"Retroalimentación por reactivo 2 incorrecta"
		]  
	},
	{
		Q: 'En la cobertura @ se incluyen dos coberturas adicionales dirigidas a @ que participen o no aportando @.',
		A: ["amplia", "mujeres", "ingresos"],
		FA: [{
				correcta: "Retroalimentación por arroba correcta 3A",
				incorrecta: "Retroalimentación por arroba incorrecta 3A"
			},
			{
				correcta: "Retroalimentación por arroba correcta 3B",
				incorrecta: "Retroalimentación por arroba incorrecta 3B"
			},
			{
				correcta: "Retroalimentación por arroba correcta 3C",
				incorrecta: "Retroalimentación por arroba incorrecta 3C"
			}
		],
		F: [
			"Retroalimentación por reactivo 3 correcta",
			"Retroalimentación por reactivo 3 incorrecta"
		]  
	},
	{
		Q: 'BANORTE ofrece además el seguro de @, el cual tiene los siguientes beneficios: asistencia en el hogar, @ de objetos personales, protección ante @ y responsabilidad @.',
		A: ["daños", "robo", "fenómenos de la naturaleza", "civil familiar"],
		FA: [{
				correcta: "Retroalimentación por arroba correcta 4A",
				incorrecta: "Retroalimentación por arroba incorrecta 4A"
			},
			{
				correcta: "Retroalimentación por arroba correcta 4B",
				incorrecta: "Retroalimentación por arroba incorrecta 4B"
			},
			{
				correcta: "Retroalimentación por arroba correcta 4C",
				incorrecta: "Retroalimentación por arroba incorrecta 4C"
			},
			{
				correcta: "Retroalimentación por arroba correcta 4D",
				incorrecta: "Retroalimentación por arroba incorrecta 4D"
			}
		],
		F: [
			"Retroalimentación por reactivo 4 correcta",
			"Retroalimentación por reactivo 4 incorrecta"
		]  
	},
	{
		Q: 'De igual forma los clientes pueden gozar de un seguro de @ siempre y cuando demuestren ser @ activos de una empresa mínimo @, tener más de @ y menos de @ y que la empresa cuente con @ (excepto cuando se labore dentro de @)',
		A: ["desempleo", "empleados|trabajadores", "2 años|24 meses|dos años", "21 años", "60 años", "RFC", "gobierno"],
		FA: [{
				correcta: "Retroalimentación por arroba correcta 5A",
				incorrecta: "Retroalimentación por arroba incorrecta 5A"
			},
			{
				correcta: "Retroalimentación por arroba correcta 5B",
				incorrecta: "Retroalimentación por arroba incorrecta 5B"
			},
			{
				correcta: "Retroalimentación por arroba correcta 5C",
				incorrecta: "Retroalimentación por arroba incorrecta 5C"
			},
			{
				correcta: "Retroalimentación por arroba correcta 5D",
				incorrecta: "Retroalimentación por arroba incorrecta 5D"
			},
			{
				correcta: "Retroalimentación por arroba correcta 5E",
				incorrecta: "Retroalimentación por arroba incorrecta 5E"
			},
			{
				correcta: "Retroalimentación por arroba correcta 5F",
				incorrecta: "Retroalimentación por arroba incorrecta 5F"
			},
			{
				correcta: "Retroalimentación por arroba correcta 5G",
				incorrecta: "Retroalimentación por arroba incorrecta 5G"
			}
		],
		F: [
			"Retroalimentación por reactivo 5 correcta",
			"Retroalimentación por reactivo 5 incorrecta"
		]  
	}
];