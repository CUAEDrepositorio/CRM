/*
****************************__ESTRUCTURA__****************************
var reactivos = [
	{
		Q: "reactivo @ reactivo @ reactivo.",
		A:
		[
			{
				opcion: "respuesta",
				correcta: true
			},
			{
				opcion: "respuesta",
				correcta: false
			}
		],
				[
			{
				opcion: "respuesta",
				correcta: true
			},
			{
				opcion: "respuesta",
				correcta: false
			}
		],

		FA: [
			{
				correcta: "Retroalimentación por arroba correcta 1A",
				incorrecta: "Retroalimentación por arroba incorrecta 1A",
			},
			{
				correcta: "Retroalimentación por arroba correcta 2A",
				incorrecta: "Retroalimentación por arroba incorrecta 2A",
			}
		],
		F: [
			"Retroalimentación por reactivo 1 correcta",
			"Retroalimentación por reactivo 1 incorrecta"
		]    
	}
];

NOTA: los @ denotan la cantidad de respuestas que tendra el reactivo.
En el apartado de A cada par de corchetes cuadrados [] denotan las posibles respuestas de cada arroba.
*/

var reactivos = [{
		Q: "Carmen is from Mexico City and she’s @ FES Aragon’s student",
		A: [
			[{
					opcion: "a",
					correcta: true
				},
				{
					opcion: "an",
					correcta: false
				},
				{
					opcion: "the",
					correcta: false
				}
			]
		],
		FA: [{
			correcta: "Retroalimentación por arroba correcta",
			incorrecta: "Retroalimentación por arroba incorrecta",
		}],
		F: [
			"Retroalimentación por reactivo 1 correcta",
			"Retroalimentación por reactivo 1 incorrecta"
		]
	},
	{
		Q: "Every day, early in @ morning, she leaves home and drives to the clinic in @ town center. She usually has lunch with her colleagues and sometimes teaches in @ afternoon. At @ weekend, she often visits her brother’s family. They live in the countryside, about two hours away by @ car.",
		A: [
			[{
					opcion: "a",
					correcta: false
				},
				{
					opcion: "an",
					correcta: false
				},
				{
					opcion: "the",
					correcta: true
				}
			],
			[{
					opcion: "a",
					correcta: false
				},
				{
					opcion: "an",
					correcta: false,

				},
				{
					opcion: "the",
					correcta: true,

				}
			],
			[{
					opcion: "a",
					correcta: false,

				},
				{
					opcion: "an",
					correcta: false,

				},
				{
					opcion: "the",
					correcta: true,

				}
			],
			[{
					opcion: "a",
					correcta: false,

				},
				{
					opcion: "an",
					correcta: false,

				},
				{
					opcion: "the",
					correcta: true,

				}
			],
			[{
					opcion: "a",
					correcta: false,

				},
				{
					opcion: "an",
					correcta: false,

				},
				{
					opcion: "the",
					correcta: true,

				}
			]
		],
		FA: [{
				correcta: "Retroalimentación por arroba correcta 2A",
				incorrecta: "Retroalimentación por arroba incorrecta 2A",
			},
			{
				correcta: "Retroalimentación por arroba correcta 2B",
				incorrecta: "Retroalimentación por arroba incorrecta 2B",
			},
			{
				correcta: "Retroalimentación por arroba correcta 2C",
				incorrecta: "Retroalimentación por arroba incorrecta 2C",
			},
			{
				correcta: "Retroalimentación por arroba correcta 2D",
				incorrecta: "Retroalimentación por arroba incorrecta 2D",
			},
			{
				correcta: "Retroalimentación por arroba correcta 2E",
				incorrecta: "Retroalimentación por arroba incorrecta 2E",
			}
		],
		F: [
			"Retroalimentación por reactivo 2 correcta",
			"Retroalimentación por reactivo 2 incorrecta"
		]
	},
	{
		Q: "She likes cats and dogs because they are her favorite animals. She has @ exam tomorrow, her is exam is @ most difficult. Estadística Inferencial is that subject difficult one? She thinks it’s @ mess. She always studies on weekends to be ready for @ first round of that subject.",
		A: [
			[{
					opcion: "a",
					correcta: false
				},
				{
					opcion: "an",
					correcta: true
				},
				{
					opcion: "the",
					correcta: false
				}
			],
			[{
					opcion: "a",
					correcta: false
				},
				{
					opcion: "an",
					correcta: false
				},
				{
					opcion: "the",
					correcta: true
				}
			],
			[{
					opcion: "a",
					correcta: true
				},
				{
					opcion: "an",
					correcta: false
				},
				{
					opcion: "the",
					correcta: false
				}
			],
			[{
					opcion: "a",
					correcta: false
				},
				{
					opcion: "an",
					correcta: false
				},
				{
					opcion: "the",
					correcta: true
				}
			]
		],
		FA: [{
				correcta: "Retroalimentación por arroba correcta 3A",
				incorrecta: "Retroalimentación por arroba incorrecta 3A",
			},
			{
				correcta: "Retroalimentación por arroba correcta 3B",
				incorrecta: "Retroalimentación por arroba incorrecta 3B",
			},
			{
				correcta: "Retroalimentación por arroba correcta 3C",
				incorrecta: "Retroalimentación por arroba incorrecta 3C",
			},
			{
				correcta: "Retroalimentación por arroba correcta 3D",
				incorrecta: "Retroalimentación por arroba incorrecta 3D",
			},
			{
				correcta: "Retroalimentación por arroba correcta 3E",
				incorrecta: "Retroalimentación por arroba incorrecta 3E",
			}
		],
		F: [
			"Retroalimentación por reactivo 3 correcta",
			"Retroalimentación por reactivo 3 incorrecta"
		]
	}
];