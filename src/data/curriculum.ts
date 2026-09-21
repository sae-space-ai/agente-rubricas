// Datos del currículo de Enseñanzas Profesionales de Música en Extremadura
// Basado en la Programación Didáctica 2026/2027 para Música de Cámara, Banda y Orquesta

export type NivelEnsenanza = 'profesional';
export type Materia = 'Musica de Camara' | 'Banda' | 'Orquesta';

export interface CompetenciaEspecifica {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface CriterioEvaluacion {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface NivelLogro {
  nombre: string;
  nivel: number;
  color: string;
  descripcion: string;
}

export interface AsignaturaData {
  id: string;
  nombre: string;
  materia: Materia;
  nivel: NivelEnsenanza;
  cursos: string[];
  competencias: CompetenciaEspecifica[];
  criterios: CriterioEvaluacion[];
  instrumentos: string[];
}

// Materias disponibles según la Programación Didáctica 2026/2027
export const materias: { id: Materia; nombre: string; cursos: string[] }[] = [
  {
    id: 'Musica de Camara',
    nombre: 'Música de Cámara',
    cursos: ['4º', '5º', '6º'] // CRITICAL RULE: Solo en 4º, 5º y 6º
  },
  {
    id: 'Banda',
    nombre: 'Banda',
    cursos: ['1º', '2º', '3º', '4º', '5º', '6º'] // Todos los cursos
  },
  {
    id: 'Orquesta',
    nombre: 'Orquesta',
    cursos: ['1º', '2º', '3º', '4º', '5º', '6º'] // Todos los cursos
  }
];

// Niveles de Logro (Bloque XVII, 17.4)
export const nivelesLogro: NivelLogro[] = [
  {
    nombre: "Inicial",
    nivel: 1,
    color: "#ef4444",
    descripcion: "Dependencia del profesor, errores frecuentes, falta de autonomía."
  },
  {
    nombre: "En desarrollo",
    nivel: 2,
    color: "#f59e0b",
    descripcion: "Comprensión básica con apoyo puntual del profesor."
  },
  {
    nombre: "Adecuado",
    nivel: 3,
    color: "#3b82f6",
    descripcion: "Acción autónoma en situaciones habituales."
  },
  {
    nombre: "Consolidado",
    nivel: 4,
    color: "#10b981",
    descripcion: "Anticipación, flexibilidad, resolución de situaciones nuevas y transferibilidad."
  }
];

// Competencias (Bloque V): CM-1 a CM-7
export const competencias: CompetenciaEspecifica[] = [
  {
    id: "CM-1",
    nombre: "Ejecución instrumental",
    descripcion: "Dominio técnico del instrumento en el contexto de la agrupación."
  },
  {
    id: "CM-2",
    nombre: "Competencia rítmica y de coordinación",
    descripcion: "Mantenimiento del pulso, ritmo y coordinación con el grupo."
  },
  {
    id: "CM-3",
    nombre: "Competencia auditiva y de ajuste sonoro",
    descripcion: "Escucha activa y ajuste de afinación, equilibrio y planos sonoros."
  },
  {
    id: "CM-4",
    nombre: "Competencia de interpretación musical",
    descripcion: "Comprensión y ejecución del discurso musical, fraseo y estilo."
  },
  {
    id: "CM-5",
    nombre: "Competencia de interacción musical",
    descripcion: "Comunicación musical con los compañeros, seguimiento del director y diálogo entre voces."
  },
  {
    id: "CM-6",
    nombre: "Competencia de análisis y resolución musical",
    descripcion: "Análisis de la partitura, identificación de problemas y propuesta de soluciones."
  },
  {
    id: "CM-7",
    nombre: "Competencia de transferencia musical",
    descripcion: "Aplicación de conocimientos y habilidades a contextos musicales nuevos."
  }
];

// Criterios de Evaluación (Bloque X & XVII): CO-01 a CO-12
export const criterios: CriterioEvaluacion[] = [
  {
    id: "CO-01",
    nombre: "Preparación",
    descripcion: "Llegada al ensayo con la parte estudiada, material necesario y actitud positiva."
  },
  {
    id: "CO-02",
    nombre: "Ritmo y coordinación",
    descripcion: "Mantenimiento del pulso, respeto de las figuras rítmicas y coordinación con el grupo."
  },
  {
    id: "CO-03",
    nombre: "Escucha y ajuste",
    descripcion: "Escucha activa de las demás voces, ajuste de afinación, dinámica y equilibrio."
  },
  {
    id: "CO-04",
    nombre: "Afinación y sonido",
    descripcion: "Calidad del sonido emitido, afinación correcta y proyección adecuada."
  },
  {
    id: "CO-05",
    nombre: "Articulación y dinámica",
    descripcion: "Ejecución correcta de las articulaciones indicadas y respeto de las dinámicas."
  },
  {
    id: "CO-06",
    nombre: "Balance y función",
    descripcion: "Comprensión del rol de la propia voz en el conjunto y ajuste del volumen."
  },
  {
    id: "CO-07",
    nombre: "Interpretación y discurso",
    descripcion: "Comprensión del fraseo, agógica, estilo y carácter de la obra."
  },
  {
    id: "CO-08",
    nombre: "Adaptación",
    descripcion: "Capacidad de adaptarse a cambios de tempo, dinámica o interpretación del grupo."
  },
  {
    id: "CO-09",
    nombre: "Continuidad",
    descripcion: "Capacidad de mantener la ejecución sin detenciones, incluso ante dificultades."
  },
  {
    id: "CO-10",
    nombre: "Resolución de problemas",
    descripcion: "Identificación y solución autónoma de problemas técnicos o musicales durante el ensayo."
  },
  {
    id: "CO-11",
    nombre: "Autonomía y responsabilidad",
    descripcion: "Trabajo autónomo en casa, responsabilidad con la parte asignada y puntualidad."
  },
  {
    id: "CO-12",
    nombre: "Revisión y transferencia",
    descripcion: "Capacidad de autoevaluarse, revisar su interpretación y transferir aprendizajes a nuevas obras."
  }
];

// Instrumentos de Evaluación (Bloque X)
export const instrumentosEvaluacion = [
  "Rúbricas analíticas",
  "Listas de cotejo",
  "Registro de aula",
  "Autoevaluación",
  "Coevaluación",
  "Evidencias audiovisuales"
];

// Generar datos de asignaturas según la matriz de materias y cursos
export function generarAsignaturas(): AsignaturaData[] {
  const asignaturas: AsignaturaData[] = [];

  materias.forEach(materia => {
    materia.cursos.forEach(curso => {
      asignaturas.push({
        id: `${materia.id}-${curso}`,
        nombre: `${materia.nombre} (${curso})`,
        materia: materia.id,
        nivel: 'profesional',
        cursos: [curso],
        competencias: competencias,
        criterios: criterios,
        instrumentos: instrumentosEvaluacion
      });
    });
  });

  return asignaturas;
}

// Asignaturas generadas
export const asignaturas = generarAsignaturas();

// Función para obtener asignaturas por materia
export function getAsignaturasByMateria(materia: Materia): AsignaturaData[] {
  return asignaturas.filter(a => a.materia === materia);
}

// Función para obtener cursos disponibles por materia
export function getCursosByMateria(materia: Materia): string[] {
  const materiaData = materias.find(m => m.id === materia);
  return materiaData ? materiaData.cursos : [];
}

// Función para validar combinación materia-curso
export function validarMateriaCurso(materia: Materia, curso: string): { valido: boolean; mensaje?: string } {
  const cursosDisponibles = getCursosByMateria(materia);
  
  if (!cursosDisponibles.includes(curso)) {
    if (materia === 'Musica de Camara') {
      return {
        valido: false,
        mensaje: "Según la Programación Didáctica 2026/2027, Música de Cámara solo se imparte en 4º, 5º y 6º curso. ¿Desea generar una rúbrica para Banda u Orquesta en su lugar?"
      };
    }
    return {
      valido: false,
      mensaje: `La materia ${materia} no se imparte en ${curso} curso.`
    };
  }
  
  return { valido: true };
}

// Función para generar descriptores de logro según criterio y nivel
export function generarDescriptor(criterioId: string, nivel: number, curso: string): string {
  const criterio = criterios.find(c => c.id === criterioId);
  if (!criterio) return "";

  // Descriptores genéricos basados en el nivel de logro
  const descriptoresNivel: Record<number, string> = {
    1: `Necesita ayuda constante del profesor para ${criterio.nombre.toLowerCase()}. Comete errores frecuentes y muestra falta de autonomía.`,
    2: `Comprende los conceptos básicos de ${criterio.nombre.toLowerCase()} pero requiere apoyo puntual del profesor para su aplicación correcta.`,
    3: `Demuestra autonomía en ${criterio.nombre.toLowerCase()} en situaciones habituales de ensayo e interpretación.`,
    4: `Muestra anticipación, flexibilidad y capacidad de resolución en ${criterio.nombre.toLowerCase()}. Transfiere los aprendizajes a situaciones musicales nuevas.`
  };

  return descriptoresNivel[nivel] || "";
}

// Función para generar indicadores de logro (compatibilidad con exportService)
export function generarIndicadores(asignaturaId: string, criterioId: string, nivelNombre: string): string {
  const nivelData = nivelesLogro.find(n => n.nombre === nivelNombre);
  if (!nivelData) return "";

  const criterio = criterios.find(c => c.id === criterioId);
  if (!criterio) return "";

  // Extraer curso del ID de asignatura
  const cursoMatch = asignaturaId.match(/(\d+º)/);
  const curso = cursoMatch ? cursoMatch[1] : "1º";

  return generarDescriptor(criterioId, nivelData.nivel, curso);
}

// Función para obtener niveles de logro (compatibilidad)
export function getNivelesLogro(_nivel?: NivelEnsenanza): NivelLogro[] {
  return nivelesLogro;
}

// Función para obtener asignaturas por nivel (compatibilidad)
export function getAsignaturasByNivel(_nivel: NivelEnsenanza): AsignaturaData[] {
  return asignaturas;
}

// Información de los Decretos
export interface DecretoInfo {
  numero: string;
  anio: number;
  descripcion: string;
  nivel: NivelEnsenanza;
}

export const decretos: DecretoInfo[] = [
  {
    numero: '111/2007',
    anio: 2007,
    descripcion: 'Establece el currículo de las Enseñanzas Profesionales de Música de régimen especial',
    nivel: 'profesional'
  }
];
