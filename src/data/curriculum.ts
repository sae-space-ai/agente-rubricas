// Datos del currículo de Enseñanzas Artísticas de Música en Extremadura
// Basado en:
// - Decreto 110/2007 (modificado por Decreto 54/2022): Enseñanzas Elementales
// - Decreto 111/2007: Enseñanzas Profesionales

export type NivelEnsenanza = 'elemental' | 'profesional';

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

export interface AsignaturaData {
  id: string;
  nombre: string;
  nivel: NivelEnsenanza;
  cursos: string[];
  competencias: CompetenciaEspecifica[];
  criterios: CriterioEvaluacion[];
  instrumentos: string[];
}

export interface DecretoInfo {
  numero: string;
  anio: number;
  descripcion: string;
  nivel: NivelEnsenanza;
  modificadoPor?: string;
}

// Información de los Decretos Oficiales
export const decretos: DecretoInfo[] = [
  {
    numero: '110/2007',
    anio: 2007,
    descripcion: 'Regula el currículo de las Enseñanzas Elementales de Música de régimen especial',
    nivel: 'elemental',
    modificadoPor: '54/2022'
  },
  {
    numero: '54/2022',
    anio: 2022,
    descripcion: 'Modifica el Decreto 110/2007 adaptándolo a la LOMLOE e incorpora la especialidad de Órgano',
    nivel: 'elemental'
  },
  {
    numero: '111/2007',
    anio: 2007,
    descripcion: 'Establece el currículo de las Enseñanzas Profesionales de Música de régimen especial',
    nivel: 'profesional'
  }
];

// Niveles de logro para Enseñanzas Elementales (Apto/No Apto simplificado con 4 niveles)
export const nivelesLogroElemental: NivelLogro[] = [
  {
    nombre: "No Apt",
    color: "#ef4444",
    descripcion: "El alumno no alcanza los objetivos mínimos establecidos. Requiere apoyo significativo."
  },
  {
    nombre: "Apt con Deficiencias",
    color: "#f59e0b",
    descripcion: "El alumno alcanza los objetivos mínimos con dificultades. Necesita consolidar aspectos fundamentales."
  },
  {
    nombre: "Apt",
    color: "#3b82f6",
    descripcion: "El alumno alcanza satisfactoriamente los objetivos previstos. Demuestra competencia adecuada."
  },
  {
    nombre: "Apt con Excelencia",
    color: "#10b981",
    descripcion: "El alumno supera los objetivos previstos mostrando un dominio excelente y autonomía."
  }
];

// Niveles de logro para Enseñanzas Profesionales
export const nivelesLogroProfesional: NivelLogro[] = [
  {
    nombre: "Inicial",
    color: "#ef4444",
    descripcion: "El alumno muestra dificultades significativas para alcanzar los objetivos previstos. Requiere apoyo constante."
  },
  {
    nombre: "En Desarrollo",
    color: "#f59e0b",
    descripcion: "El alumno avanza hacia los objetivos previstos pero necesita consolidar aspectos fundamentales."
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

// Especialidades instrumentales (comunes a ambos niveles)
export const especialidadesInstrumentales = [
  'Acordeón', 'Arpa', 'Clarinete', 'Clave', 'Contrabajo', 'Fagot',
  'Flauta travesera', 'Flauta de Pico', 'Guitarra', 'Instrumentos de Púa',
  'Oboe', 'Órgano', 'Percusión', 'Piano', 'Saxofón', 'Trompa',
  'Trompeta', 'Trombón', 'Tuba', 'Viola', 'Viola de Gamba',
  'Violín', 'Violoncello'
];

// Asignaturas de Enseñanzas ELEMENTALES (Decreto 110/2007 modificado por 54/2022)
export const asignaturasElementales: AsignaturaData[] = [
  {
    id: "elemental-lenguaje-musical",
    nombre: "Lenguaje Musical",
    nivel: "elemental",
    cursos: ["1º", "2º", "3º", "4º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Conocer y utilizar los elementos básicos del lenguaje musical como herramienta para la lectura, escritura e invención de música.",
        descriptores: ["Lectura rítmica", "Lectura melódica", "Escritura musical", "Improvisación"]
      },
      {
        id: "CE2",
        descripcion: "Desarrollar la capacidad auditiva como medio de aprendizaje y conocimiento del lenguaje musical.",
        descriptores: ["Discriminación auditiva", "Memoria auditiva", "Percepción tonal", "Percepción rítmica"]
      },
      {
        id: "CE3",
        descripcion: "Utilizar la voz como medio de expresión musical, desarrollando las capacidades auditivas y de afinación.",
        descriptores: ["Canto afinado", "Repertorio vocal", "Expresión", "Respiración"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Leer e interpretar partituras con fluidez y precisión rítmica y melódica." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Escribir fragmentos musicales dictados o inventados con corrección." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Reconocer y reproducir patrones rítmicos y melódicos de memoria." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Dictar fragmentos melódicos y rítmicos sencillos con precisión." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Interpretar melodías con la voz manteniendo la afinación y el pulso." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Cantar en grupo ajustando la propia voz a la del conjunto." }
    ],
    instrumentos: ["Observación directa", "Pruebas escritas", "Dictados", "Lectura a primera vista", "Ejercicios de canto"]
  },
  {
    id: "elemental-instrumento",
    nombre: "Instrumento",
    nivel: "elemental",
    cursos: ["1º", "2º", "3º", "4º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Adoptar una postura corporal adecuada que permita la interpretación del instrumento con facilidad y sin tensiones.",
        descriptores: ["Postura", "Relajación", "Posición", "Respiración"]
      },
      {
        id: "CE2",
        descripcion: "Utilizar las técnicas básicas del instrumento para interpretar piezas de dificultad progresiva.",
        descriptores: ["Emisión sonora", "Articulación", "Digitación", "Control dinámico"]
      },
      {
        id: "CE3",
        descripcion: "Interpretar obras de diferentes estilos y épocas adaptadas al nivel, mostrando sensibilidad auditiva y musical.",
        descriptores: ["Repertorio variado", "Estilo", "Expresividad", "Lectura"]
      },
      {
        id: "CE4",
        descripcion: "Mostrar interés por la música como forma de expresión y comunicación, participando en audiciones y actividades del centro.",
        descriptores: ["Motivación", "Participación", "Actitud", "Compromiso"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Mantener una postura corporal correcta que favorezca la producción sonora y previene lesiones." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Demostrar relajación en la ejecución evitando tensiones innecesarias." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Demostrar el dominio de las técnicas básicas del instrumento en la interpretación de obras." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Controlar los aspectos básicos de la emisión sonora: afinación, calidad del sonido y dinámica." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Interpretar obras de diferentes estilos con calidad sonora y coherencia expresiva." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Leer e interpretar partituras con fluidez rítmica y comprensión musical." },
      { id: "C4.1", competenciaId: "CE4", descripcion: "Participar en audiciones y actividades musicales del centro con responsabilidad." },
      { id: "C4.2", competenciaId: "CE4", descripcion: "Mostrar hábitos de estudio regulares y autonomía en el trabajo." }
    ],
    instrumentos: ["Audiciones de aula", "Observación directa", "Grabaciones", "Rúbrica de interpretación", "Cuaderno de trabajo"]
  },
  {
    id: "elemental-coro",
    nombre: "Coro",
    nivel: "elemental",
    cursos: ["3º", "4º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Cantar en grupo manteniendo la afinación, el ritmo y la cohesión sonora del conjunto.",
        descriptores: ["Afinación", "Ritmo", "Cohesión", "Equilibrio vocal"]
      },
      {
        id: "CE2",
        descripcion: "Interpretar repertorio vocal adecuado al nivel con propiedad estilística y expresividad.",
        descriptores: ["Repertorio variado", "Dicción", "Expresividad", "Estilo"]
      },
      {
        id: "CE3",
        descripcion: "Desarrollar la escucha activa y la sensibilidad hacia las demás voces del conjunto.",
        descriptores: ["Escucha activa", "Equilibrio", "Integración", "Sensibilidad"]
      }
    ],
    criterios: [
      { id: "C1.1", competenciaId: "CE1", descripcion: "Mantener la afinación individual dentro del conjunto vocal." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Seguir el pulso y el ritmo con precisión en la interpretación coral." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Interpretar obras de diferentes estilos con propiedad y expresividad." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Aplicar una dicción correcta y comprensible en las obras interpretadas." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Escuchar activamente al resto de voces ajustando la propia emisión." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Integrarse en el conjunto manteniendo el equilibrio sonoro." }
    ],
    instrumentos: ["Observación directa en ensayos", "Audiciones", "Rúbrica de participación", "Autoevaluación"]
  }
];

// Asignaturas de Enseñanzas PROFESIONALES (Decreto 111/2007)
export const asignaturasProfesionales: AsignaturaData[] = [
  {
    id: "profesional-lenguaje-musical",
    nombre: "Lenguaje Musical",
    nivel: "profesional",
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
    id: "profesional-instrumento",
    nombre: "Instrumento Principal",
    nivel: "profesional",
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
    id: "profesional-musica-camara",
    nombre: "Música de Cámara",
    nivel: "profesional",
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
    id: "profesional-coro",
    nombre: "Coro",
    nivel: "profesional",
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
    id: "profesional-harmonia",
    nombre: "Armonía",
    nivel: "profesional",
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
    id: "profesional-historia-musica",
    nombre: "Historia de la Música",
    nivel: "profesional",
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
    id: "profesional-instrumento-complementario",
    nombre: "Instrumento Complementario",
    nivel: "profesional",
    cursos: ["1º", "2º", "3º", "4º"],
    competencias: [
      {
        id: "CE1",
        descripcion: "Desarrollar competencias básicas en un segundo instrumento complementario a la especialidad principal.",
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
      { id: "C1.1", competenciaId: "CE1", descripcion: "Demostrar el dominio de los aspectos técnicos básicos del instrumento complementario." },
      { id: "C1.2", competenciaId: "CE1", descripcion: "Mostrar una progresión constante en el aprendizaje del instrumento complementario." },
      { id: "C2.1", competenciaId: "CE2", descripcion: "Aplicar los conocimientos musicales previos al nuevo instrumento." },
      { id: "C2.2", competenciaId: "CE2", descripcion: "Mostrar una actitud abierta y positiva ante el aprendizaje de una nueva especialidad." },
      { id: "C3.1", competenciaId: "CE3", descripcion: "Interpretar obras del repertorio complementario con musicalidad y corrección." },
      { id: "C3.2", competenciaId: "CE3", descripcion: "Comprender las particularidades técnicas y expresivas del nuevo medio sonoro." }
    ],
    instrumentos: ["Audiciones de aula", "Rúbrica de interpretación", "Observación directa", "Progreso del alumno", "Actitud y trabajo diario"]
  }
];

// Combinar todas las asignaturas
export const asignaturas: AsignaturaData[] = [
  ...asignaturasElementales,
  ...asignaturasProfesionales
];

// Función para obtener niveles de logro según el nivel de enseñanza
export function getNivelesLogro(nivel: NivelEnsenanza): NivelLogro[] {
  return nivel === 'elemental' ? nivelesLogroElemental : nivelesLogroProfesional;
}

// Función para obtener asignaturas por nivel
export function getAsignaturasByNivel(nivel: NivelEnsenanza): AsignaturaData[] {
  return nivel === 'elemental' ? asignaturasElementales : asignaturasProfesionales;
}

// Función para generar indicadores de logro según criterio y nivel
export function generarIndicadores(asignaturaId: string, criterioId: string, nivel: string): string {
  // Indicadores genéricos para todos los criterios
  const indicadoresGenericos: Record<string, Record<string, string>> = {
    "elemental": {
      "No Apt": "No alcanza los objetivos mínimos establecidos en el criterio. Presenta dificultades significativas que impiden la progresión.",
      "Apt con Deficiencias": "Alcanza los objetivos mínimos con dificultades evidentes. Necesita consolidar aspectos fundamentales del criterio.",
      "Apt": "Alcanza satisfactoriamente los objetivos del criterio. Demuestra competencia adecuada y autonomía en la mayoría de las tareas.",
      "Apt con Excelencia": "Supera los objetivos del criterio mostrando un dominio excelente. Demuestra autonomía, creatividad y capacidad de transferencia."
    },
    "profesional": {
      "Inicial": "No alcanza los objetivos mínimos del criterio. Muestra dificultades significativas y requiere apoyo constante del profesor.",
      "En Desarrollo": "Avanza hacia los objetivos pero presenta lagunas importantes. Necesita orientación frecuente para progresar.",
      "Adquirido": "Alcanza satisfactoriamente los objetivos del criterio. Demuestra competencia adecuada y autonomía en la mayoría de las tareas.",
      "Avanzado": "Supera los objetivos mostrando un dominio excelente. Demuestra autonomía, creatividad y capacidad de transferir los aprendizajes."
    }
  };

  // Determinar el nivel de enseñanza por el ID de la asignatura
  const nivelEnsenanza = asignaturaId.startsWith('elemental') ? 'elemental' : 'profesional';

  return indicadoresGenericos[nivelEnsenanza]?.[nivel] || "";
}
