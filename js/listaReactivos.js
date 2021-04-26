var encabezados = [
    "Planeación y diseño de sistema",
    "Desarrollo de políticas",
    "Procedimientos al interior del sistema",
    "Normas, estándares, criterios y requisitos",
    "Selección e instrumentación de un sistema",
    "Procedimientos al interior del sistema-1",
    // "Normas, estándares, criterios y requisitos-1",
    // "Selección e instrumentación de un sistema-1"
];

var puntajes = [
    250,400,500,800,1000,11200
]
var reactivos = [
    //Categoria 1
    {
        categoria: 1,
        opcion: 1,
        //puntaje: 175,
        texto: "Sistema de gestión documental.",
        respuestas: [{
                respuesta: "a)  ¿Es utilizado para la creación, búsqueda y almacenamiento de documentos electrónicos?",
                correcta: true,
                retro: "Retroalimentación correcta Retroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Es una medida que se debe tener en cuenta si se quiere automatizar algún proceso o servicio?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)   ¿Son todos aquellos recursos, herramientas y programas que se utilizan para procesar, administrar y compartir la información?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 1,
        opcion: 2,
        //puntaje: 400,
        texto: "Facilita la valoración de los documentos previniendo la acumulación innecesaria de archivos.",
        respuestas: [{
                respuesta: "a)  ¿Desventaja de un sistema de gestión documental?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Ventaja de un sistema de gestión documental?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Beneficio de un sistema informático?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 1,
        opcion: 3,
        //puntaje: 600,
        texto: "Planeación de un sistema de gestión documental.",
        respuestas: [{
                respuesta: "a)  ¿Es el primer proceso que debe hacerse en conjunto, formando un grupo que sea el responsable del manejo de los archivos, el responsable de los procesos administrativos internos los responsables de los sistemas de información?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Es el proceso que prepara los archivos para su inclusión y almacenamiento en el sistema de información?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Es el proceso que sirve para asegurarse de que los archivos que serán introducidos al sistema de información y no suponen un riesgo de seguridad para el sistema?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 1,
        opcion: 4,
        //puntaje: 800,
        texto: "Archivista.",
        respuestas: [{
                respuesta: "a)  ¿Ayuda a tener claros los objetivos de la institución, su estructura organizacional y define cuáles son los departamentos que se encuentran en la institución, así como el trabajo que realizan y el tipo de documentos con los que trabajan?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Se encarga del diseño y la programación de los módulos que participan en el sistema de gestión documental, así como de definir los requerimientos tanto de <em>software</em> como de <em>hardware</em> necesarios para que el sistema funcione correctamente, participa en los procesos de preservación de los documentos electrónicos y colabora en el desarrollo de políticas con el fin de que se logre mantener la información íntegra y accesible cuando el usuario la solicite?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Debe organizar los documentos mediante los procesos de gestión documental, definir los ciclos de vida de los documentos que se integrarán en el sistema y revisar las normas que involucran los documentos electrónicos para que éstas sean aplicadas correctamente al sistema de gestión?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 1,
        opcion: 5,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 1,
        opcion: 6,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },    

    //CATEGORIA 2
    {
        categoria: 2,
        opcion: 1,
        //puntaje: 200,
        texto: "Elaboración de políticas.",
        respuestas: [{
                respuesta: "a)  ¿Son una parte muy importante, ya que proporcionan las guías sobre las que va a trabajar el sistema de gestión de documentos?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Son una parte secundaria, ya que proporcionan algunas directrices que ayudan a tener un control adecuado de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Determinan cuáles documentos se deben conservar y cuáles se deben eliminar de manera segura?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 2,
        opcion: 2,
        //puntaje: 400,
        texto: "Política de gestión de documentos.",
        respuestas: [{
                respuesta: "a)  ¿Es una asignación de roles, responsabilidades y competencias de todo el personal de la organización que crea o gestiona documentos o participa en el sistema de gestión de los mismos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Es el conjunto de estructuras, funciones, registros, procesos, procedimientos y criterios que desarrolla cada sujeto obligado, a través de la ejecución de la gestión documental?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Es una declaración de intenciones en la que se exponen las grandes líneas de actuación y los objetivos que una organización quiere alcanzar en relación a la gestión de los documentos que produce o recibe en el ejercicio de sus funciones y actividades?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 2,
        opcion: 3,
        //puntaje: 600,
        texto: "Actuaciones de las políticas de gestión de documentos.",
        respuestas: [{
                respuesta: "a)  ¿Realizar sus funciones y actividades de una manera ordenada, eficaz y responsable, prestar servicios al ciudadano y a otras organizaciones públicas o privadas, servir de apoyo y documentar la creación de políticas y la toma de decisiones en los niveles directivos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Comunicar a todo el personal de la organización la importancia que para la misma tiene una correcta gestión de documentos y archivos; formar a todo el personal (interno y externo) en materia de gestión de documentos y archivos e identificar los requisitos funcionales, normativos y administrativos necesarios para una correcta gestión y conservación de los documentos y archivos en un SGD?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Establecer en una política interna el Sistema Institucional de Archivos con sus componentes normativos y operativos, para la debida administración de sus archivos y gestión documental; establecer un programa anual de desarrollo archivístico y dotar a los documentos de archivo de los elementos de identificación necesarios para conocer su origen?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 2,
        opcion: 4,
        //puntaje: 800,
        texto: "Beneficios de desarrollar políticas de gestión documental en una organización.",
        respuestas: [{
                respuesta: "a)  ¿Eliminación y destrucción ilegal de sus documentos, incapacidad para aprovechar plenamente los datos y el conocimiento corporativo, así como todo el potencial de información y conocimiento de la organización, conducción de los negocios de la organización de manera inconsistente e ineficazmente?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Ejecutar más eficazmente las actividades en el seno de la organización o institución, evaluar de manera fiable los resultados de la organización, garantizar la continuidad en caso de catástrofe, cumplir con los requisitos legislativos y normativos, incluidas también todas las actividades y funciones del tratamiento archivístico y cumplir con los requisitos de supervisión y auditoría?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Evaluar, revisar y mejorar continuamente todas las actuaciones relativas a la propia Política de gestión de documentos, a todos los procesos identificados en el SGD, así como el propio SGD, y documentar todas las actuaciones realizadas y la propia política de gestión de documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 2,
        opcion: 5,
        //puntaje: 1000,
        texto: "Desventajas de no desarrollar políticas de gestión de documentos en una organización.",
        respuestas: [{
                respuesta: "a)  ¿Planificar estratégicamente los objetivos que se quieren alcanzar y analizar y normalizar todos los procesos relativos a la gestión documental que se desarrollan en el seno de la misma?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿El incumplimiento de los requisitos legislativos y normativos, la desacreditación de la institución y daño en su reputación, incapacidad para proporcionar prueba de las actividades de la organización y la correspondiente rendición de cuentas, pérdida de evidencia de la actividad organizativa?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Proteger, conservar y preservar la memoria corporativa, personal o colectiva, identificar los documentos vitales o esenciales para la organización de forma que la organización pueda seguir funcionando en caso de graves alteraciones y reducir los riesgos de pérdida de datos o de destrucción de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 2,
        opcion: 6,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    //Categoria 3
    {
        categoria: 3,
        opcion: 1,
        //puntaje: 200,
        texto: "Procedimiento.",
        respuestas: [{
                respuesta: "a)  ¿Apoyo y documentación a las actividades de investigación presentes y futuras, las realizaciones, los resultados, así como la investigación histórica?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Establece políticas de gestión documental electrónica, tiempo de guarda y custodia y políticas de protección de datos para toda plataforma institucional que hospede información de terceros?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Conjunto de directrices que determinan la forma de proceder en determinada ocasión para poder obtener un resultado previsto?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 3,
        opcion: 2,
        //puntaje: 400,
        texto: "Captura de los documentos.",
        respuestas: [{
                respuesta: "a)  ¿Es el proceso que determina qué documentos deben formar parte del sistema de gestión, y dicha evaluación debe hacerse tomando en cuenta las funciones de cada departamento, así como el tipo y los formatos de los documentos que manejan y las acciones o transacciones en las que participan los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Es el proceso que tiene el propósito de relacionar un documento con el usuario que lo creó y la información que contiene, de modo que esta relación sirva para vincularla con otros documentos que se encuentren dentro del sistema?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Es el proceso de formalizar la incorporación de un documento, es decir, dejar constancia de que un documento ha sido creado o recibido?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    }, 
    {
        categoria: 3,
        opcion: 3,
        //puntaje: 600,
        texto: "Registro de los documentos.",
        respuestas: [{
                respuesta: "a)  ¿Es el proceso que determina qué documentos deben formar parte del sistema de gestión, y dicha evaluación debe hacerse tomando en cuenta las funciones de cada departamento, así como el tipo y los formatos de los documentos que manejan, así como las acciones o transacciones en las que participan los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Es el proceso que tiene el propósito de relacionar un documento con el usuario que lo creó y la información que contiene, de modo que esta relación sirva para vincularla con otros documentos que se encuentren dentro del sistema?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Es el proceso de formalizar la incorporación de un documento, es decir, dejar constancia de que un documento ha sido creado o recibido?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 3,
        opcion: 4,
        //puntaje: 800,
        texto: "Acceso.",
        respuestas: [{
                respuesta: "a)  ¿Es el proceso en el que se regula a quién se le permite llevar a cabo una operación relacionada con un documento ya sea creación, consulta, modificación o eliminación, y en qué circunstancias este usuario puede realizar dichas acciones, todo esto aplicando controles previstos en una tabla de acceso y seguridad que será elaborada por los encargados del sistema de gestión?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Es el proceso de capturar un documento porque tenemos la intención de almacenarlo, pero, además de almacenarlo, debemos conservarlo asegurando su autenticidad, fiabilidad, integridad y disponibilidad durante el periodo necesario?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿En este proceso se identifica la categoría a la que pertenece un documento, teniendo en cuenta la actividad de la organización con la cual está relacionado y de la cual es evidencia?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 3,
        opcion: 5,
        //puntaje: 1000,
        texto: "Clasificación.",
        respuestas: [{
                respuesta: "a)  ¿Es el proceso en el que se regula a quién se le permite llevar a cabo una operación relacionada con un documento ya sea creación, consulta, modificación o eliminación, y en qué circunstancias este usuario puede realizar dichas acciones, todo esto aplicando controles previstos en una tabla de acceso y seguridad que será elaborada por los encargados del sistema de gestión?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Es el proceso de capturar un documento porque tenemos la intención de almacenarlo, pero, además de almacenarlo debemos conservarlo asegurando su autenticidad, fiabilidad, integridad y disponibilidad durante el periodo necesario?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿En este proceso se identifica la categoría a la que pertenece un documento, teniendo en cuenta la actividad de la organización con la cual está relacionado y de la cual es evidencia?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 3,
        opcion: 6,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    //CATEGORIA 4
    {
        categoria: 4,
        opcion: 1,
        //puntaje: 200,
        texto: "Normas y estándares.",
        respuestas: [{
                respuesta: "a)  ¿Tienen el propósito de brindar un camino a seguir para que se logren gestionar los documentos de manera que éstos sirvan para dar un significado a la institución, para que los documentos sirvan de apoyo a los procesos institucionales, que los documentos puedan dar información esencial para la toma de decisiones y para que esté accesible de manera rápida y segura para cuando sea solicitada?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Son el conjunto de estructuras, funciones, registros, procesos, procedimientos y criterios que desarrolla cada sujeto obligado, a través de la ejecución de la gestión documental?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Son el conjunto de datos que describen el contexto, contenido y estructura de los documentos de archivos y su administración, a través del tiempo, y que sirven para identificarlos, facilitar su búsqueda, administración y control de acceso?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 4,
        opcion: 2,
        //puntaje: 400,
        texto: "Criterio para la sistematización de los métodos.",
        respuestas: [{
                respuesta: "a)  ¿Establecer una política interna en el Sistema Institucional de Archivos con sus componentes normativos y operativos, para la debida administración de sus archivos y gestión documental?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Dotar a los documentos de archivo de los elementos de identificación necesarios para conocer su origen?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Establecer que todos los documentos de archivo en posesión de los sujetos obligados, con independencia del soporte en el que se encuentren, deberán ser tratados conforme a los procesos de gestión documental establecidos en los lineamientos?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 4,
        opcion: 3,
        //puntaje: 600,
        texto: "Criterio para la sistematización de las políticas, programas y grupo interdisciplinario.",
        respuestas: [{
                respuesta: "a)  ¿Establecer que todos los documentos de archivo en posesión de los sujetos obligados, con independencia del soporte en el que se encuentren, deberán ser tratados conforme a los procesos de gestión documental establecidos en los lineamientos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Establecer un grupo interdisciplinario para que, mediante el análisis de los procesos y los procedimientos institucionales que dan origen a la documentación que integra los expedientes de cada serie, permita establecer los valores documentales, plazos de conservación y políticas que garanticen el acceso a la información, así como la disposición documental?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Elaborar los instrumentos de control y consulta archivísticos, a través del análisis de los procesos con los que cuenten los sujetos obligados conforme a sus atribuciones y funciones?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 4,
        opcion: 4,
        //puntaje: 800,
        texto: "Criterio para la sistematización de los instrumentos de control, espacios y equipos.",
        respuestas: [{
                respuesta: "a)  ¿Capacitar en materia de administración de archivos y gestión documental, acceso a la información y protección de datos personales a los responsables del área coordinadora de archivos? ¿Archivos de trámite, concentración y, en su caso, histórico, así como al personal que integre las unidades de correspondencia?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Establecer en una política interna el Sistema Institucional de Archivos con sus componentes normativos y operativos, para la debida administración de sus archivos y gestión documental?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Elaborar los instrumentos de control y consulta archivísticos, a través del análisis de los procesos con los que cuenten los sujetos obligados conforme a sus atribuciones y funciones?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 4,
        opcion: 5,
        //puntaje: 1000,
        texto: "Criterio para la sistematización del personal, producción, uso, control y distribución.",
        respuestas: [{
                respuesta: "a)  ¿Promover el desarrollo de infraestructura y equipamiento para la administración de archivos y la gestión documental?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Racionalizar la producción, el uso, la distribución y el control de los documentos de archivo, y resguardar los documentos contenidos en sus archivos?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Establecer un programa anual de desarrollo archivístico?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 4,
        opcion: 6,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    //CATEGORIA 5
    {
        categoria: 5,
        opcion: 1,
        //puntaje: 200,
        texto: "Requerimientos del sistema de gestión documental descritos en el capítulo IV de los Lineamientos para la Organización y Conservación de los Archivos, apartado III.",
        respuestas: [{
                respuesta: "a)  ¿El alta de usuarios a diferentes niveles de acceso, la emisión de alertas cuando hay expedientes para transferir de un archivo a otro y el registro de las unidades administrativas generadoras de los archivos de trámite, para posteriormente configurar los reportes?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Fondo, sección, serie, cuadro general de clasificación archivística, catálogo de disposición documental, expedientes, documentos en formato electrónico, fechas extremas y acceso a la información?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Cuadro general de clasificación archivística, catálogo de disposición documental, guía general, inventario general, inventario de transferencia primaria, inventario de transferencia secundaria, inventario de baja documental, índices de los expedientes clasificados como reservados, inventario de unidades documentales consultadas en el archivo histórico; inventario de préstamos de expedientes, devoluciones y vencidos; calendario de caducidades, y guía de archivo documental?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 5,
        opcion: 2,
        //puntaje: 400,
        texto: "Requerimientos del sistema de gestión documental descritos en el capítulo IV de los Lineamientos para la Organización y Conservación de los Archivos, apartado I.",
        respuestas: [{
                respuesta: "a)  ¿El alta de usuarios a diferentes niveles de acceso, la emisión de alertas cuando hay expedientes para transferir de un archivo a otro y el registro de las unidades administrativas generadoras de los archivos de trámite, para posteriormente configurar los reportes?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Fondo, sección, serie, cuadro general de clasificación archivística, catálogo de disposición documental, expedientes, documentos en formato electrónico, fechas extremas y acceso a la información?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Carátula del expediente, ceja del expediente y solicitud de consulta de expedientes?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 5,
        opcion: 3,
        //puntaje: 600,
        texto: "Lineamiento vigésimo octavo de los Lineamientos para la Organización y Conservación de los Archivos.",
        respuestas: [{
                respuesta: "a)  ¿Establece que se podrán gestionar los documentos de archivos electrónicos en un servicio de nube privada, entendida ésta como un servicio no compartido por terceros el cual permite establecer las condiciones de uso concretas en cuanto a la gestión de los documentos y responsabilidad de los sistemas; conocer la ubicación de los servidores y de la información; establecer las condiciones de uso de la información de acuerdo con la normativa vigente; utilizar infraestructura de uso y acceso privado bajo el control de personal autorizado; custodiar la información sensible y mitigar los riesgos de seguridad mediante políticas de seguridad de la información; establecer el uso de estándares y adaptación a normas de calidad para gestionar los documentos de archivo electrónicos; posibilitar la integración con aplicaciones y sistemas internos <em>intranets</em>, portales institucionales y otras redes; reflejar en el sistema, de manera coherente y auditable, la política de gestión documental e información de los sujetos obligados, y propiciar un repositorio centralizado de información institucional?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Establece que los sistemas de administración de archivos y gestión documental que generen documentos de archivos electrónicos deberán privilegiar el uso de formatos no propietarios, para su accesibilidad, custodia y almacenamiento?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica que los servicios de almacenamiento y gestión de archivos en la nube pueden ser usados teniendo en cuenta lo siguiente: 1) que garanticen la seguridad y eviten el acceso no autorizado a la información; 2) se utilicen estándares de arquitectura de datos que permitan el uso, la conservación y la seguridad de documentos a largo plazo, interoperabilidad y esquemas de metadatos personalizados; 3) que las condiciones de uso del servicio contratado prevean la desaparición de prestador de servicios con o sin aviso para evitar la pérdida de toda la información almacenada, y 4) que los prestadores de servicios se rijan por la normatividad mexicana aplicable, con independencia de la ubicación geográfica de los servidores o la sede del prestador de servicios?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 5,
        opcion: 4,
        //puntaje: 800,
        texto: "Alfresco.",
        respuestas: [{
                respuesta: "a)  ¿Es un gestor documental que parte de una <em>suite</em> de gestión de contenidos, la cual también incluye gestión de imágenes y gestión de contenidos web? ¿Se trata de una multiplataforma, por lo que trabaja sobre distintos sistemas operativos y posibilita la creación de documentos y contenidos empresariales, de blogs, el uso de paquetes ofimáticos y además tienen herramientas colaborativas como calendarios, tableros de discusión, etcétera?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Permite a las empresas controlar la creación, el almacenamiento, la revisión y la distribución de los documentos, incrementando la eficiencia en la capacidad de reutilizar la información, así como el control del flujo de los documentos? ¿Integra todo lo esencial para la gestión de los documentos, la colaboración entre usuarios y las funcionalidades de búsqueda avanzada? ¿Es una única solución fácil de usar e incluye herramientas administrativas para definir los roles de los distintos usuarios, cuotas para cada uno de ellos, seguridad a nivel de documento, un completo <em>log</em> de actividad y la configuración de tareas automáticas?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Es una potente herramienta de ECM y gestión documental <em>open source</em> desarrollada por la empresa del mismo nombre? ¿Tiene una arquitectura ágil y flexible de última generación, además de unos precios realmente competitivos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 5,
        opcion: 5,
        //puntaje: 1000,
        texto: "Gladtolink",
        respuestas: [{
                respuesta: "a)  ¿Permite a las empresas controlar la creación, el almacenamiento, la revisión y la distribución de los documentos, incrementando la eficiencia en la capacidad de reutilizar la información, así como el control del flujo de los documentos? ¿Integra todo lo esencial para la gestión de los documentos, la colaboración entre usuarios y las funcionalidades de búsqueda avanzada? ¿Es una única solución fácil de usar e incluye herramientas administrativas para definir los roles de los distintos usuarios, cuotas para cada uno de ellos, seguridad a nivel de documento, un completo <em>log</em> de actividad y la configuración de tareas automáticas?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Permite la colaboración interna y con otras empresas, además de la gestión de grupos de trabajos? ¿Es un servicio basado en la nube de Microsoft (Azure) que cumple con las normas ISO 27001, SAE16/ISAE 3402, entre otras, lo cual garantiza una estructura segura, fiable y escalable que proporciona confidencialidad en los documentos por medio de mecanismos que prohíben la descarga de documentos sensibles e incorpora trazabilidad para saber qué documentos se han consultado y por cuál usuario?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Es un gestor documental que parte de una <em>suite</em> de gestión de contenidos, la cual también incluye gestión de imágenes y gestión de contenidos web? ¿Se trata de una multiplataforma, por lo que trabaja sobre distintos sistemas operativos y posibilita la creación de documentos y contenidos empresariales, de blogs, el uso de paquetes ofimáticos y además tienen herramientas colaborativas como calendarios, tableros de discusión, etcétera?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 5,
        opcion: 6,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    //Categoria 6
    {
        categoria: 6,
        opcion: 1,
        //puntaje: 175,
        texto: "Sistema de gestión documental.",
        respuestas: [{
                respuesta: "a)  ¿Es utilizado para la creación, búsqueda y almacenamiento de documentos electrónicos?",
                correcta: true,
                retro: "Retroalimentación correcta Retroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Es una medida que se debe tener en cuenta si se quiere automatizar algún proceso o servicio?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)   ¿Son todos aquellos recursos, herramientas y programas que se utilizan para procesar, administrar y compartir la información?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 6,
        opcion: 2,
        //puntaje: 400,
        texto: "Facilita la valoración de los documentos previniendo la acumulación innecesaria de archivos.",
        respuestas: [{
                respuesta: "a)  ¿Desventaja de un sistema de gestión documental?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Ventaja de un sistema de gestión documental?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Beneficio de un sistema informático?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 6,
        opcion: 3,
        //puntaje: 600,
        texto: "Planeación de un sistema de gestión documental.",
        respuestas: [{
                respuesta: "a)  ¿Es el primer proceso que debe hacerse en conjunto, formando un grupo que sea el responsable del manejo de los archivos, el responsable de los procesos administrativos internos los responsables de los sistemas de información?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "b)  ¿Es el proceso que prepara los archivos para su inclusión y almacenamiento en el sistema de información?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Es el proceso que sirve para asegurarse de que los archivos que serán introducidos al sistema de información y no suponen un riesgo de seguridad para el sistema?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 6,
        opcion: 4,
        //puntaje: 800,
        texto: "Archivista.",
        respuestas: [{
                respuesta: "a)  ¿Ayuda a tener claros los objetivos de la institución, su estructura organizacional y define cuáles son los departamentos que se encuentran en la institución, así como el trabajo que realizan y el tipo de documentos con los que trabajan?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Se encarga del diseño y la programación de los módulos que participan en el sistema de gestión documental, así como de definir los requerimientos tanto de <em>software</em> como de <em>hardware</em> necesarios para que el sistema funcione correctamente, participa en los procesos de preservación de los documentos electrónicos y colabora en el desarrollo de políticas con el fin de que se logre mantener la información íntegra y accesible cuando el usuario la solicite?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "c)  ¿Debe organizar los documentos mediante los procesos de gestión documental, definir los ciclos de vida de los documentos que se integrarán en el sistema y revisar las normas que involucran los documentos electrónicos para que éstas sean aplicadas correctamente al sistema de gestión?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
        ]
    },
    {
        categoria: 6,
        opcion: 5,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },
    {
        categoria: 6,
        opcion: 6,
        //puntaje: 1000,
        texto: "Norma ISO 15489.",
        respuestas: [{
                respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
            {
                respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
                correcta: true,
                retro: "Retroalimentación correcta"
            },
            {
                respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
                correcta: false,
                retro: "Retroalimentación incorrecta"
            },
        ]
    },

    // //Categoria 7
    // {
    //     categoria: 7,
    //     opcion: 1,
    //     //puntaje: 175,
    //     texto: "Sistema de gestión documental.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Es utilizado para la creación, búsqueda y almacenamiento de documentos electrónicos?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta Retroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correcta"
    //         },
    //         {
    //             respuesta: "b)  ¿Es una medida que se debe tener en cuenta si se quiere automatizar algún proceso o servicio?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "c)   ¿Son todos aquellos recursos, herramientas y programas que se utilizan para procesar, administrar y compartir la información?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 7,
    //     opcion: 2,
    //     //puntaje: 400,
    //     texto: "Facilita la valoración de los documentos previniendo la acumulación innecesaria de archivos.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Desventaja de un sistema de gestión documental?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Ventaja de un sistema de gestión documental?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "c)  ¿Beneficio de un sistema informático?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 7,
    //     opcion: 3,
    //     //puntaje: 600,
    //     texto: "Planeación de un sistema de gestión documental.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Es el primer proceso que debe hacerse en conjunto, formando un grupo que sea el responsable del manejo de los archivos, el responsable de los procesos administrativos internos los responsables de los sistemas de información?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "b)  ¿Es el proceso que prepara los archivos para su inclusión y almacenamiento en el sistema de información?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "c)  ¿Es el proceso que sirve para asegurarse de que los archivos que serán introducidos al sistema de información y no suponen un riesgo de seguridad para el sistema?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 7,
    //     opcion: 4,
    //     //puntaje: 800,
    //     texto: "Archivista.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Ayuda a tener claros los objetivos de la institución, su estructura organizacional y define cuáles son los departamentos que se encuentran en la institución, así como el trabajo que realizan y el tipo de documentos con los que trabajan?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Se encarga del diseño y la programación de los módulos que participan en el sistema de gestión documental, así como de definir los requerimientos tanto de <em>software</em> como de <em>hardware</em> necesarios para que el sistema funcione correctamente, participa en los procesos de preservación de los documentos electrónicos y colabora en el desarrollo de políticas con el fin de que se logre mantener la información íntegra y accesible cuando el usuario la solicite?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "c)  ¿Debe organizar los documentos mediante los procesos de gestión documental, definir los ciclos de vida de los documentos que se integrarán en el sistema y revisar las normas que involucran los documentos electrónicos para que éstas sean aplicadas correctamente al sistema de gestión?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 7,
    //     opcion: 5,
    //     //puntaje: 1000,
    //     texto: "Norma ISO 15489.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 7,
    //     opcion: 6,
    //     //puntaje: 1000,
    //     texto: "Norma ISO 15489.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },   
    
    

    // //Categoria 8
    // {
    //     categoria: 8,
    //     opcion: 1,
    //     //puntaje: 175,
    //     texto: "Sistema de gestión documental.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Es utilizado para la creación, búsqueda y almacenamiento de documentos electrónicos?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta Retroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correctaRetroalimentación correcta"
    //         },
    //         {
    //             respuesta: "b)  ¿Es una medida que se debe tener en cuenta si se quiere automatizar algún proceso o servicio?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "c)   ¿Son todos aquellos recursos, herramientas y programas que se utilizan para procesar, administrar y compartir la información?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 8,
    //     opcion: 2,
    //     //puntaje: 400,
    //     texto: "Facilita la valoración de los documentos previniendo la acumulación innecesaria de archivos.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Desventaja de un sistema de gestión documental?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Ventaja de un sistema de gestión documental?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "c)  ¿Beneficio de un sistema informático?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 8,
    //     opcion: 3,
    //     //puntaje: 600,
    //     texto: "Planeación de un sistema de gestión documental.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Es el primer proceso que debe hacerse en conjunto, formando un grupo que sea el responsable del manejo de los archivos, el responsable de los procesos administrativos internos los responsables de los sistemas de información?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "b)  ¿Es el proceso que prepara los archivos para su inclusión y almacenamiento en el sistema de información?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "c)  ¿Es el proceso que sirve para asegurarse de que los archivos que serán introducidos al sistema de información y no suponen un riesgo de seguridad para el sistema?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 8,
    //     opcion: 4,
    //     //puntaje: 800,
    //     texto: "Archivista.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Ayuda a tener claros los objetivos de la institución, su estructura organizacional y define cuáles son los departamentos que se encuentran en la institución, así como el trabajo que realizan y el tipo de documentos con los que trabajan?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Se encarga del diseño y la programación de los módulos que participan en el sistema de gestión documental, así como de definir los requerimientos tanto de <em>software</em> como de <em>hardware</em> necesarios para que el sistema funcione correctamente, participa en los procesos de preservación de los documentos electrónicos y colabora en el desarrollo de políticas con el fin de que se logre mantener la información íntegra y accesible cuando el usuario la solicite?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "c)  ¿Debe organizar los documentos mediante los procesos de gestión documental, definir los ciclos de vida de los documentos que se integrarán en el sistema y revisar las normas que involucran los documentos electrónicos para que éstas sean aplicadas correctamente al sistema de gestión?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 8,
    //     opcion: 5,
    //     //puntaje: 1000,
    //     texto: "Norma ISO 15489.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // },
    // {
    //     categoria: 8,
    //     opcion: 6,
    //     //puntaje: 1000,
    //     texto: "Norma ISO 15489.",
    //     respuestas: [{
    //             respuesta: "a)  ¿Propone la gestión de la calidad y del medio ambiente, obligando a definir adecuadamente los procedimientos que garanticen un control eficaz de los documentos?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //         {
    //             respuesta: "b)  ¿Propone la metodología DIRKS (<em>Designing and Implementing Recordkeeping Systems</em>), de origen australiano, para el diseño e implementación de un sistema de gestión de documentos y consta de ocho etapas?",
    //             correcta: true,
    //             retro: "Retroalimentación correcta"
    //         },
    //         {
    //             respuesta: "c)  ¿Especifica la utilización del formato PDF/A para la conservación a largo plazo de los documentos electrónicos, es un proyecto de norma española (PNE)?",
    //             correcta: false,
    //             retro: "Retroalimentación incorrecta"
    //         },
    //     ]
    // }    
];


