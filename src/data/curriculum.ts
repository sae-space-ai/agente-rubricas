// Datos del currículo de Enseñanzas Profesionales de Música en Extremadura
// Basado en el Decreto 58/2022

export interface CompetenciaEspecifica {
  id: string;
  descripcion: string;
  descriptores: string[];
}

export interface CriterioEvaluacion {
  id: string;
  competenciaId: string;
  descripcion: string;
}

export interface NivelLogro {
  nombre: string;
  color: string;
  descripcion: string;
}

export interface IndicadorLogro {
  nivel: string;
  descripcion: string;
}

export interface RubricaCriterio {
  criterioId: string;
  criterioDescripcion: string;
  indicadores: IndicadorLogro[];
}

export interface AsignaturaData {
  id: string;
  nombre: string;
  cursos: string[];
  competencias: CompetenciaEspecifica[];
  criterios: CriterioEvaluacion[];
  instrumentos: string[];
}

export const nivelesLogro: NivelLogro[] = [
  {
    nombre: "Inicial",
    color: "#ef4444",
    descripcion: "El alumno muestra dificultades significativas para alcanzar los objetivos previstos. Requiere apoyo constante."
  },
  {
    nombre: "En Desarrollo",
    color: "#f59e0b",
    descripcion: "El alumno avanza hacia los objetivos previstos pero necesita consolidar aspectos fundamentales. Requiere orientación frecuente."
  },
  {
    nombre: "Adquirido",
    color: "#3b82f6",
    descripcion: "El alumno alcanza los objetivos previstos de forma satisfactoria. Demuestra competencia adecuada."
  },
  {
    nombre: "Avanzado",
    color: "#10b981",
    descripcion: "El alumno supera los objetivos previstos mostrando un dominio excelente. Demuestra autonomía y creatividad."
  }
];

export const asignaturas: AsignaturaData[] = [
  {
    id: "lenguaje-musical",
    nombre: "Lenguaje Musical",
    cursos: ["1º", "2º", "3º", "4º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Conocer y utilizar los elementos básicos del lenguaje musical para comprender, analizar e interpretar obras musicales.",
        descriptores: ["Lectura rítmica", "Lectura melódica", "Dictado", "Análisis auditivo"]
      },
      {
        id: "CE2",
        descripcion: "Desarrollar la capacidad auditiva como herramienta fundamental para la comprensión y producción musical.",
        descriptores: ["Discriminación auditiva", "Memoria auditiva", "Percepción tonal", "Percepción rítmica"]
      },
      {
        id: "CE3",
        descripcion: "Comprender la organización del discurso musical y sus elementos constitutivos a través de la audición y el análisis.",
        descriptores: ["Forma musical", "Estructura", "Textura", "Armonía básica"]
      },
      {
        id: "CE4",
        descripcion: "Utilizar la voz y el cuerpo como medios de expresión musical, desarrollando la afinación y el sentido rítmico.",
        descriptores: ["Canto afinado", "Ritmo corporal", "Expresión vocal", "Coordinación"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Leer e interpretar partituras utilizando los elementos del lenguaje musical con fluidez y precisión." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Identificar y reproducir intervalos, escalas y acordes mediante la lectura y la escritura musical." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Reconocer y reproducir patrones rítmicos y melódicos de memoria." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Dictar fragmentos melódicos y rítmicos con precisión creciente." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Analizar obras musicales identificando sus elementos formales y estructurales." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Reconocer auditivamente las diferentes texturas y formas musicales." },
      { id: "C4.1", competenciaId: "CE4", descripcion: "Interpretar melodías con la voz manteniendo la afinación y el pulso." },
      { id: "C4.2", competenciaId: "CE4", descripcion: "Realizar ejercicios rítmicos corporales con coordinación y precisión." }
    ],
    instrumentos: ["Observación directa", "Pruebas escritas", "Dictados", "Ejercicios de lectura a primera vista", "Rúbrica de interpretación vocal"]
  },
  {
    id: "instrumento",
    nombre: "Instrumento Principal",
    cursos: ["1º", "2º", "3º", "4º", "5º", "6º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Interpretar obras musicales de diferentes estilos y épocas con el instrumento principal, demostrando control técnico y expresivo.",
        descriptores: ["Control técnico", "Calidad sonora", "Expresividad", "Estilo"]
      },
      {
        id: "CE2",
        descripcion: "Aplicar técnicas instrumentales adecuadas para la resolución de dificultades técnicas en las obras interpretadas.",
        descriptores: ["Postura", "Digitación/arcada", "Articulación", "Dinámica"]
      },
      {
        id: "CE3",
        descripcion: "Leer e interpretar partituras a primera vista con fluidez y comprensión musical.",
        descriptores: ["Lectura a primera vista", "Fluidez rítmica", "Comprensión musical", "Adaptación"]
      },
      {
        id: "CE4",
        descripcion: "Desarrollar la capacidad de memorización e interpretación de obras de memoria con seguridad escénica.",
        descriptores: ["Memorización", "Seguridad", "Comunicación", "Presencia escénica"]
      },
      {
        id: "CE5",
        descripcion: "Participar en agrupaciones camerísticas y orquestales, desarrollando habilidades de escucha conjunta y adaptación.",
        descriptores: ["Escucha activa", "Equilibrio sonoro", "Adaptación al grupo", "Comunicación musical"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Interpretar obras de diferentes estilos con calidad sonora y coherencia expresiva." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Aplicar criterios estilísticos adecuados en la interpretación de obras de distintas épocas." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Demostrar un dominio técnico adecuado al nivel que permita la resolución de las obras propuestas." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Mantener una postura y posición corporal correctas que favorezcan la producción sonora." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Leer a primera vista fragmentos musicales con fluidez rítmica y comprensión." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Interpretar partituras con comprensión del discurso musical y sus intenciones expresivas." },
      { id: "C4.1", competenciaId: "CE4", descripcion: "Interpretar obras de memoria con seguridad y calidad musical." },
      { id: "C4.2", competenciaId: "CE4", descripcion: "Demostrar una actitud comunicativa y expresiva ante el público." },
      { id: "C5.1", competenciaId: "CE5", descripcion: "Participar activamente en agrupaciones manteniendo el equilibrio sonoro y la cohesión del grupo." },
      { id: "C5.2", competenciaId: "CE5", descripcion: "Adaptar la interpretación a las indicaciones del director o del grupo." }
    ],
    instrumentos: ["Audiciones públicas", "Interpretación en clase", "Grabaciones", "Rúbrica de interpretación", "Autoevaluación del alumno"]
  },
  {
    id: "coro",
    nombre: "Coro",
    cursos: ["1º", "2º", "3º", "4º", "5º", "6º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Cantar en grupo manteniendo la afinación, el ritmo y la cohesión sonora del conjunto.",
        descriptores: ["Afinación", "Ritmo", "Cohesión grupal", "Equilibrio vocal"]
      },
      {
        id: "CE2",
        descripcion: "Interpretar repertorio vocal de diferentes estilos y épocas con propiedad estilística y expresividad.",
        descriptores: ["Repertorio variado", "Estilo", "Expresividad", "Dicción"]
      },
      {
        id: "CE3",
        descripcion: "Desarrollar la escucha activa y la sensibilidad hacia las demás voces del ensemble vocal.",
        descriptores: ["Escucha polifónica", "Equilibrio", "Integración", "Sensibilidad"]
      },
      {
        id: "CE4",
        descripcion: "Participar en la preparación y ejecución de audiciones y conciertos con responsabilidad y compromiso.",
        descriptores: ["Compromiso", "Responsabilidad", "Preparación", "Actitud escénica"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Mantener la afinación individual dentro del conjunto vocal." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Seguir el pulso y el ritmo con precisión en la interpretación coral." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Interpretar obras de diferentes estilos con propiedad y expresividad." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Aplicar una dicción correcta y comprensible en los diferentes idiomas del repertorio." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Escuchar activamente al resto de voces ajustando la propia emisión." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Integrarse en la sección y en el conjunto manteniendo el equilibrio sonoro." },
      { id: "C4.1", competenciaId: "CE4", descripcion: "Participar con regularidad y puntualidad en los ensayos y actuaciones." },
      { id: "C4.2", competenciaId: "CE4", descripcion: "Demostrar una actitud positiva y profesional en las actuaciones públicas." }
    ],
    instrumentos: ["Observación directa en ensayos", "Audiciones y conciertos", "Rúbrica de participación", "Autoevaluación grupal", "Evaluación entre pares"]
  },
  {
    id: "musica-camara",
    nombre: "Música de Cámara",
    cursos: ["2º", "3º", "4º", "5º", "6º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Interpretar obras camerísticas demostrando sensibilidad en la escucha conjunta y el equilibrio entre las voces.",
        descriptores: ["Escucha conjunta", "Equilibrio", "Diálogo musical", "Cohesión"]
      },
      {
        id: "CE2",
        descripcion: "Desarrollar habilidades de comunicación musical y toma de decisiones artísticas en el grupo.",
        descriptores: ["Comunicación", "Liderazgo compartido", "Negociación artística", "Creatividad grupal"]
      },
      {
        id: "CE3",
        descripcion: "Organizar y planificar el trabajo de ensayo de forma autónoma y eficiente.",
        descriptores: ["Planificación", "Organización", "Autonomía", "Eficiencia"]
      },
      {
        id: "CE4",
        descripcion: "Interpretar en público con seguridad, comunicatividad y rigor artístico.",
        descriptores: ["Seguridad escénica", "Comunicación", "Rigor", "Presencia"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Mantener el equilibrio sonoro entre las diferentes voces de la agrupación." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Demostrar sensibilidad en los momentos de diálogo y contraste entre las partes." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Participar activamente en las decisiones interpretativas del grupo." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Comunicarse musicalmente con los compañeros mediante señales no verbales." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Planificar los ensayos estableciendo objetivos claros y prioridades." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Trabajar de forma autónoma resolviendo dificultades técnicas y musicales." },
      { id: "C4.1", competenciaId: "CE4", descripcion: "Interpretar en público con seguridad y calidad artística." },
      { id: "C4.2", competenciaId: "CE4", descripcion: "Transmitir al público la intención expresiva de la obra." }
    ],
    instrumentos: ["Audiciones públicas", "Observación de ensayos", "Rúbrica de trabajo en grupo", "Memoria de trabajo", "Videoanálisis"]
  },
  {
    id: "harmonia",
    nombre: "Armonía",
    cursos: ["1º", "2º", "3º", "4º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Conocer y aplicar los principios de la organización armónica en la música tonal.",
        descriptores: ["Acordes", "Progresiones", "Funciones armónicas", "Cadencias"]
      },
      {
        id: "CE2",
        descripcion: "Analizar la estructura armónica de obras musicales identificando sus procedimientos compositivos.",
        descriptores: ["Análisis armónico", "Identificación de procedimientos", "Contexto estilístico", "Relación forma-armonía"]
      },
      {
        id: "CE3",
        descripcion: "Realizar ejercicios de realización armónica y bajo cifrado con corrección y coherencia musical.",
        descriptores: ["Realización al piano", "Bajo cifrado", "Corrección", "Coherencia"]
      },
      {
        id: "CE4",
        descripcion: "Reconocer auditivamente las progresiones armónicas y sus funciones en el discurso musical.",
        descriptores: ["Reconocimiento auditivo", "Funciones", "Progresiones", "Aplicación práctica"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Identificar y construir los diferentes tipos de acordes y sus inversiones." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Aplicar las reglas de enlace armónico con corrección." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Analizar armónicamente fragmentos musicales identificando funciones y progresiones." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Relacionar los procedimientos armónicos con el contexto estilístico de la obra." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Realizar ejercicios de armonización de melodías y bajos con coherencia." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Realizar al piano las armonizaciones propuestas con fluidez." },
      { id: "C4.1", competenciaId: "CE4", descripcion: "Reconocer auditivamente cadencias y progresiones armónicas." },
      { id: "C4.2", competenciaId: "CE4", descripcion: "Identificar la función armónica de los acordes en el contexto de una obra." }
    ],
    instrumentos: ["Ejercicios escritos", "Realización al piano", "Análisis de partituras", "Pruebas teóricas", "Dictados armónicos"]
  },
  {
    id: "historia-musica",
    nombre: "Historia de la Música",
    cursos: ["1º", "2º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Conocer los principales periodos, estilos y obras de la historia de la música occidental.",
        descriptores: ["Periodos históricos", "Estilos", "Obras representativas", "Compositores"]
      },
      {
        id: "CE2",
        descripcion: "Contextualizar las obras musicales en su marco histórico, social y cultural.",
        descriptores: ["Contexto histórico", "Relaciones interartísticas", "Evolución estilística", "Significado cultural"]
      },
      {
        id: "CE3",
        descripcion: "Analizar obras musicales identificando sus características estilísticas y su relevancia histórica.",
        descriptores: ["Análisis estilístico", "Características formales", "Innovación", "Influencia"]
      },
      {
        id: "CE4",
        descripcion: "Desarrollar el pensamiento crítico ante diferentes manifestaciones musicales a lo largo de la historia.",
        descriptores: ["Pensamiento crítico", "Argumentación", "Comparación", "Valoración"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Identificar los principales periodos y estilos de la historia de la música." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Conocer las obras y compositores más representativos de cada periodo." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Situar las obras musicales en su contexto histórico y cultural." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Establecer relaciones entre la música y otras manifestaciones artísticas." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Analizar obras identificando sus características estilísticas fundamentales." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Valorar la relevancia histórica de las obras estudiadas." },
      { id: "C4.1", competenciaId: "CE4", descripcion: "Argumentar de forma fundamentada sobre cuestiones musicales e históricas." },
      { id: "C4.2", competenciaId: "CE4", descripcion: "Comparar obras y estilos estableciendo criterios de análisis coherentes." }
    ],
    instrumentos: ["Trabajos de investigación", "Exámenes escritos y orales", "Audiciones comentadas", "Líneas del tiempo", "Ensayos críticos"]
  },
  {
    id: "coro-instrumento-complementario",
    nombre: "Coro / Instrumento Complementario",
    cursos: ["1º", "2º", "3º", "4º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Desarrollar competencias básicas en un segundo instrumento o en el canto coral complementario.",
        descriptores: ["Técnica básica", "Lectura", "Interpretación", "Progresión"]
      },
      {
        id: "CE2",
        descripcion: "Ampliar la formación musical general mediante la práctica de una nueva especialidad interpretativa.",
        descriptores: ["Versatilidad", "Adaptabilidad", "Visión global", "Enriquecimiento"]
      },
      {
        id: "CE3",
        descripcion: "Interpretar repertorio adecuado al nivel complementario con calidad y musicalidad.",
        descriptores: ["Repertorio adecuado", "Calidad", "Musicalidad", "Comprensión"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Demostrar el dominio de los aspectos técnicos básicos del instrumento o canto complementario." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Mostrar una progresión constante en el aprendizaje del instrumento complementario." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Aplicar los conocimientos musicales previos al nuevo instrumento o especialidad." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Mostrar una actitud abierta y positiva ante el aprendizaje de una nueva especialidad." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Interpretar obras del repertorio complementario con musicalidad y corrección." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Comprender las particularidades técnicas y expresivas del nuevo medio sonoro." }
    ],
    instrumentos: ["Audiciones de aula", "Rúbrica de interpretación", "Observación directa", "Progreso del alumno", "Actitud y trabajo diario"]
  }
];

// Función para generar indicadores de logro según criterio y nivel
export function generarIndicadores(asignaturaId: string, criterioId: string, nivel: string): string {
  const indicadores: Record<string, Record<string, Record<string, string>>> = {
    "lenguaje-musical": {
      "C1.1": {
        "Inicial": "No logra identificar las figuras rítmicas básicas ni las notas en las claves trabajadas. Muestra dificultades para mantener el pulso.",
        "En Desarrollo": "Identifica parcialmente las figuras rítmicas y notas. Mantiene el pulso con dificultad y comete errores frecuentes en la lectura.",
        "Adquirido": "Lee e interpreta partituras con fluidez aceptable, identificando correctamente figuras rítmicas y notas en las claves trabajadas.",
        "Avanzado": "Lee con fluidez y expresividad, realizando matices dinámicos y de tempo. Interpreta con seguridad y comprensión musical plena."
      },
      "C1.2": {
        "Inicial": "No identifica intervalos ni escalas de forma auditiva. Presenta dificultades significativas en la escritura musical.",
        "En Desarrollo": "Identifica algunos intervalos y escalas con ayuda. Comete errores en la escritura de intervalos y escalas.",
        "Adquirido": "Identifica y reproduce intervalos, escalas y acordes con corrección en la lectura y escritura musical.",
        "Avanzado": "Reconoce e identifica con rapidez intervalos, escalas y acordes complejos. Demuestra dominio en la escritura musical."
      },
      "C2.1": {
        "Inicial": "No logra reproducir patrones rítmicos ni melódicos simples de memoria.",
        "En Desarrollo": "Reproduce patrones simples con ayuda y comete errores en patrones de mayor complejidad.",
        "Adquirido": "Reconoce y reproduce de memoria patrones rítmicos y melódicos con precisión.",
        "Avanzado": "Memoriza y reproduce patrones complejos con facilidad. Demuestra excelente memoria auditiva musical."
      },
      "C2.2": {
        "Inicial": "No logra dictar fragmentos melódicos ni rítmicos simples.",
        "En Desarrollo": "Dicta fragmentos simples con errores frecuentes. Necesita varias audiciones para completar la tarea.",
        "Adquirido": "Dicta fragmentos melódicos y rítmicos con precisión adecuada al nivel.",
        "Avanzado": "Dicta con precisión fragmentos de complejidad superior. Demuestra excelente oído y rapidez en la transcripción."
      },
      "C3.1": {
        "Inicial": "No identifica los elementos formales básicos de una obra musical.",
        "En Desarrollo": "Identifica algunos elementos formales con ayuda. Su análisis es superficial e incompleto.",
        "Adquirido": "Analiza obras identificando correctamente sus elementos formales y estructurales.",
        "Avanzado": "Realiza análisis profundos y argumentados. Establece relaciones entre los elementos y el discurso musical global."
      },
      "C3.2": {
        "Inicial": "No reconoce auditivamente las texturas ni las formas musicales básicas.",
        "En Desarrollo": "Reconoce algunas texturas y formas con ayuda. Confunde elementos auditivos con frecuencia.",
        "Adquirido": "Reconoce auditivamente texturas y formas musicales con corrección.",
        "Avanzado": "Identifica con rapidez y precisión texturas y formas complejas. Argumenta sus respuestas con vocabulario técnico."
      },
      "C4.1": {
        "Inicial": "No mantiene la afinación ni el pulso al cantar. Muestra dificultades vocales significativas.",
        "En Desarrollo": "Canta con afinación inestable y pulso irregular. Necesita apoyo constante para mantener la línea melódica.",
        "Adquirido": "Interpreta melodías con afinación correcta y mantiene el pulso de forma regular.",
        "Avanzado": "Canta con afinación precisa, expresividad y musicalidad. Realiza matices dinámicos y de fraseo con naturalidad."
      },
      "C4.2": {
        "Inicial": "No logra coordinar los movimientos rítmicos corporales. Muestra descoordinación entre voz y cuerpo.",
        "En Desarrollo": "Realiza ejercicios rítmicos corporales con imprecisión. La coordinación es limitada.",
        "Adquirido": "Realiza ejercicios rítmicos corporales con coordinación y precisión adecuadas.",
        "Avanzado": "Ejecuta patrones rítmicos corporales complejos con naturalidad y expresividad. Demuestra excelente coordinación."
      }
    },
    "instrumento": {
      "C1.1": {
        "Inicial": "La interpretación presenta problemas graves de afinación, ritmo y calidad sonora. No se percibe intención expresiva.",
        "En Desarrollo": "Interpreta con calidad sonora mejorable. La afinación y el ritmo presentan irregularidades. Expresividad limitada.",
        "Adquirido": "Interpreta con calidad sonora, afinación y ritmo adecuados. Muestra coherencia expresiva en la obra.",
        "Avanzado": "Interpreta con excelencia técnica y expresiva. Demuestra madurez musical y dominio del estilo de la obra."
      },
      "C1.2": {
        "Inicial": "No aplica criterios estilísticos diferenciados. Interpreta todas las obras con el mismo enfoque.",
        "En Desarrollo": "Aplica algunos criterios estilísticos de forma inconsistente. La diferenciación entre estilos es limitada.",
        "Adquirido": "Aplica criterios estilísticos adecuados a cada época y compositor.",
        "Avanzado": "Demuestra un conocimiento profundo de los estilos y los aplica con naturalidad y personalidad interpretativa."
      },
      "C2.1": {
        "Inicial": "El dominio técnico es insuficiente para resolver las obras propuestas. Presenta tensiones y bloqueos.",
        "En Desarrollo": "Resuelve parcialmente las dificultades técnicas. Algunos pasajes presentan inseguridad técnica.",
        "Adquirido": "Demuestra un dominio técnico adecuado que permite resolver las obras con solvencia.",
        "Avanzado": "Domina con facilidad los recursos técnicos requeridos. Aborda pasajes complejos con naturalidad y seguridad."
      },
      "C2.2": {
        "Inicial": "La postura y posición corporal son incorrectas y generan problemas en la producción sonora.",
        "En Desarrollo": "Mantiene una postura aceptable pero con tensiones ocasionales que afectan la producción sonora.",
        "Adquirido": "Mantiene una postura correcta que favorece la producción sonora y previene lesiones.",
        "Avanzado": "Demuestra una postura natural y relajada. Utiliza el cuerpo de forma eficiente y expresiva."
      },
      "C3.1": {
        "Inicial": "No logra leer a primera vista con fluidez. Se detiene constantemente y pierde el pulso.",
        "En Desarrollo": "Lee con dificultades y detenciones frecuentes. El pulso es irregular y comete errores significativos.",
        "Adquirido": "Lee a primera vista con fluidez aceptable, manteniendo el pulso y cometiendo errores mínimos.",
        "Avanzado": "Lee a primera vista con fluidez y musicalidad. Mantiene el pulso constante y realiza matices expresivos."
      },
      "C3.2": {
        "Inicial": "Interpreta sin comprender el discurso musical. La lectura es mecánica y sin intención.",
        "En Desarrollo": "Comprende parcialmente el discurso musical. La interpretación muestra momentos de musicalidad intercalados.",
        "Adquirido": "Interpreta con comprensión del discurso musical y sus intenciones expresivas.",
        "Avanzado": "Comprende profundamente la obra y la transmite con convicción y personalidad artística."
      },
      "C4.1": {
        "Inicial": "No logra interpretar de memoria. Muestra inseguridad total y se detiene frecuentemente.",
        "En Desarrollo": "Interpreta de memoria con inseguridad. Se detiene en momentos de laguna memorística.",
        "Adquirido": "Interpreta de memoria con seguridad y continuidad. Muestra confianza en la ejecución.",
        "Avanzado": "Interpreta de memoria con total seguridad y libertad. Disfruta de la obra y la comunica plenamente."
      },
      "C4.2": {
        "Inicial": "Muestra nerviosismo excesivo que impide una comunicación efectiva con el público.",
        "En Desarrollo": "La comunicación con el público es limitada. Los nervios afectan parcialmente la interpretación.",
        "Adquirido": "Se comunica con el público de forma natural y transmite la intención musical.",
        "Avanzado": "Conecta con el público de forma excepcional. Demuestra carisma escénico y madurez artística."
      },
      "C5.1": {
        "Inicial": "No se integra en la agrupación. No escucha a los compañeros y desequilibra el conjunto.",
        "En Desarrollo": "Se integra parcialmente pero no ajusta su volumen ni se adapta al grupo con regularidad.",
        "Adquirido": "Participa activamente manteniendo el equilibrio sonoro y la cohesión del grupo.",
        "Avanzado": "Es un miembro activo y generador del grupo. Contribuye positivamente al equilibrio y la cohesión."
      },
      "C5.2": {
        "Inicial": "No sigue las indicaciones del director ni se adapta al grupo.",
        "En Desarrollo": "Sigue las indicaciones con retraso o de forma parcial. La adaptación al grupo es limitada.",
        "Adquirido": "Sigue correctamente las indicaciones del director y se adapta al grupo con prontitud.",
        "Avanzado": "Anticipa las indicaciones y responde con sensibilidad. Contribuye a la cohesión del grupo."
      }
    }
  };

  // Indicadores genéricos para asignaturas no detalladas
  const indicadoresGenericos: Record<string, string> = {
    "Inicial": "No alcanza los objetivos mínimos del criterio. Muestra dificultades significativas y requiere apoyo constante del profesor.",
    "En Desarrollo": "Avanza hacia los objetivos pero presenta lagunas importantes. Necesita orientación frecuente para progresar.",
    "Adquirido": "Alcanza satisfactoriamente los objetivos del criterio. Demuestra competencia adecuada y autonomía en la mayoría de las tareas.",
    "Avanzado": "Supera los objetivos mostrando un dominio excelente. Demuestra autonomía, creatividad y capacidad de transferir los aprendizajes."
  };

  // Intentar encontrar indicador específico
  if (indicadores[asignaturaId]?.[criterioId]?.[nivel]) {
    return indicadores[asignaturaId][criterioId][nivel];
  }

  return indicadoresGenericos[nivel] || "";
}
