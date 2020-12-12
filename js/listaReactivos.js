/*
------------------------Estructura de listaReactivos----------------
var palabraspro =[
    ["palabra1","Definición corta",
    "Retro Bien","Retro Mal"],
    ["palabra2","Definición corta",
    "Retro Bien","Retro Mal"],
    ["palabra3","Definición corta",
    "Retro Bien","Retro Mal"]
];
NOTA: Longitud mínima de las palabras 2 y máxima 25
NOTA: Automáticamente se crea el crucigrama y define las palabras que estarán en forma vertical y horizontal.
NOTA: Acepta palabras con acento y diéresis, de acuerdo como se escriba la palabra será tomada como correcta.
Ejemplo:
    ["Programacion",
    "Ciencia de las computadoras.",
    "Retro Bien",
    "Retro Mal"]
    Será tomada como correcta programacion SIN acento.

    ["Programación",
    "Ciencia de las computadoras.",
    "Retro Bien",
    "Retro Mal"]
    Será tomada como correcta programación CON acento.
*/


var palabraspro = [
    ["Separado",
        "Cuando dos elementos están lejos.",
        "Retroalimentación correcta 1.",
        "Retroalimentación incorrecta 1."
    ],

    ["Cuidado",
        "Mantenerse alerta.",
        "Retroalimentación correcta 2.",
        "Retroalimentación incorrecta 2."
    ],

    ["ONU",
        "Organización de las Naciones Unidas. ",
        "Retroalimentación correcta 3.",
        "Retroalimentación incorrecta 3."
    ],

    ["Realidad",
        "Todo lo real.",
        "Retroalimentación correcta 4.",
        "Retroalimentación incorrecta 4."
    ],

    ["Amable",
        "Persona que siempre te trata bien.",
        "Retroalimentación correcta 5.",
        "Retroalimentación incorrecta 5."
    ],

    ["Camino",
        "Cuando regresamos a casa.",
        "Retroalimentación correcta 6.",
        "Retroalimentación incorrecta 6."
    ],

    ["Programación",
        "Ciencia de las computadoras.",
        "Retroalimentación correcta 7.",
        "Retroalimentación incorrecta 7."
    ],

    ["Constitución",
        "Firmada en 1917.",
        "Retroalimentación correcta 8.",
        "Retroalimentación incorrecta 8."
    ],

    ["Cuchillo",
        "Utensilio utilizado para cortar.",
        "Retroalimentación correcta 10.",
        "Retroalimentación incorrecta 10."
    ],

    ["Celular",
        "Permite comunicarnos de manera sencilla.",
        "Retroalimentación correcta 11.",
        "Retroalimentación incorrecta 11."
    ],

    ["Caballo",
        "Animal con cuatro patas.",
        "Retroalimentación correcta 12.",
        "Retroalimentación incorrecta 12."
    ],

    ["Corazón",
        "Late y late para dar vida.",
        "Retroalimentación correcta 13.",
        "Retroalimentación incorrecta 13."
    ],

    ["Castillo",
        "Construcción de la Edad Media.",
        "Retroalimentación correcta 14.",
        "Retroalimentación incorrecta 14."
    ],

    ["Muralla",
        "Para que no pase nadie.",
        "Retroalimentación correcta 15.",
        "Retroalimentación incorrecta 15."
    ],

    ["Computadora",
        "Conjunto de dispositivos digitales.",
        "Retroalimentación correcta 16.",
        "Retroalimentación incorrecta 16."
    ],

    ["Ingeniería",
        "El arte del ingenio para resolver problemas.",
        "Retroalimentación correcta 17.",
        "Retroalimentación incorrecta 17."
    ],

    ["Laboratorio",
        "Lugar para experimentar.",
        "Retroalimentación correcta 18.",
        "Retroalimentación incorrecta 18."
    ],

    ["Esternocleidomastoideo",
        "Músculo ubicado en la zona anterior y lateral del cuello.",
        "Retroalimentación correcta 19.",
        "Retroalimentación incorrecta 19."
    ],

    ["Claustrofobia",
        "Miedo a los espacios cerrados.",
        "Retroalimentación correcta 20.",
        "Retroalimentación incorrecta 20."
    ],

    ["Ventilador",
        "Algo que da aire.",
        "Retroalimentación correcta 21.",
        "Retroalimentación incorrecta 21."
    ],

    ["Tornado",
        "Catástrofe con vientos.",
        "Retroalimentación correcta 22.",
        "Retroalimentación incorrecta 22."
    ],

    ["Iglesia",
        "Lugar de rezo.",
        "Retroalimentación correcta 23.",
        "Retroalimentación incorrecta 23."
    ],

    ["Miguel Hidalgo",
        "Padre de la patria (México).",
        "Retroalimentación correcta 24.",
        "Retroalimentación incorrecta 24."
    ],

    ["Cálculo diferencial",
        "Materia de ingeniería.",
        "Retroalimentación correcta 25.",
        "Retroalimentación incorrecta 25."
    ]
];